"""
Scraper for danno.ch — extracts all substance data from the live site.
Outputs a JSON file with structured data for each substance.
"""
import json
import re
import sys
import time
from urllib.request import urlopen, Request
from html.parser import HTMLParser

BASE = "https://danno.ch"

class LinkParser(HTMLParser):
    """Extract all /sostanze/xxx links from the substances listing page."""
    def __init__(self):
        super().__init__()
        self.links = []
    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            d = dict(attrs)
            href = d.get('href', '')
            if href.startswith('/sostanze/') and href != '/sostanze/':
                slug = href.rstrip('/')
                if slug not in self.links:
                    self.links.append(slug)

class SubstanceParser(HTMLParser):
    """Extract structured content from a single substance page."""
    def __init__(self):
        super().__init__()
        self.in_article = False
        self.in_accordion_heading = False
        self.in_acc_content = False
        self.in_li = False
        self.in_h1 = False
        self.current_section = None
        self.title = ""
        self.intro = ""
        self.sections = {}
        self.current_text = []
        self.li_items = []
        self.article_depth = 0
        self.in_h6 = False
        self.h6_text = ""
        self.intro_fields = {}
        self.current_intro_field = None
        self.intro_text_buffer = []
        self.in_intro_area = True
        
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        cls = d.get('class', '')
        
        if tag == 'h1':
            self.in_h1 = True
            self.current_text = []
            
        if tag == 'div' and d.get('itemprop') == 'articleBody':
            self.in_article = True
            self.article_depth = 0
            
        if self.in_article and tag == 'div':
            self.article_depth += 1
            
        if tag == 'h6' and self.in_article:
            self.in_h6 = True
            self.h6_text = ""
            
        if tag == 'a' and 'headerlink' in cls:
            self.in_accordion_heading = True
            self.current_text = []
            self.in_intro_area = False
            
        if tag == 'div' and 'acc-content' in cls:
            self.in_acc_content = True
            self.current_text = []
            self.li_items = []
            
        if tag == 'li' and self.in_acc_content:
            self.in_li = True
            self.current_text = []
    
    def handle_endtag(self, tag):
        if tag == 'h1' and self.in_h1:
            self.in_h1 = False
            self.title = ''.join(self.current_text).strip()
            self.current_text = []
            
        if tag == 'h6' and self.in_h6:
            self.in_h6 = False
            field_name = self.h6_text.strip().upper()
            if self.current_intro_field and self.intro_text_buffer:
                self.intro_fields[self.current_intro_field] = ' '.join(
                    t.strip() for t in self.intro_text_buffer if t.strip()
                )
            self.current_intro_field = field_name
            self.intro_text_buffer = []
            
        if self.in_article and tag == 'div':
            self.article_depth -= 1
            if self.article_depth < 0:
                self.in_article = False
                if self.current_intro_field and self.intro_text_buffer:
                    self.intro_fields[self.current_intro_field] = ' '.join(
                        t.strip() for t in self.intro_text_buffer if t.strip()
                    )
            
        if tag == 'a' and self.in_accordion_heading:
            self.in_accordion_heading = False
            section_name = ''.join(self.current_text).strip()
            section_name = section_name.replace('Open or Close', '').strip()
            self.current_section = section_name
            self.current_text = []
            
        if tag == 'div' and self.in_acc_content:
            self.in_acc_content = False
            if self.current_section:
                if self.li_items:
                    self.sections[self.current_section] = {
                        'type': 'list',
                        'items': self.li_items,
                        'text': ' '.join(t.strip() for t in self.current_text if t.strip())
                    }
                else:
                    self.sections[self.current_section] = {
                        'type': 'text',
                        'text': ' '.join(t.strip() for t in self.current_text if t.strip())
                    }
            self.current_text = []
            self.li_items = []
            
        if tag == 'li' and self.in_li:
            self.in_li = False
            item_text = ''.join(self.current_text).strip()
            if item_text:
                self.li_items.append(item_text)
            self.current_text = []
            
    def handle_data(self, data):
        if self.in_h1:
            self.current_text.append(data)
        if self.in_h6:
            self.h6_text += data
        if self.in_accordion_heading:
            self.current_text.append(data)
        if self.in_acc_content:
            self.current_text.append(data)
        if self.in_article and self.in_intro_area and not self.in_acc_content and not self.in_h6 and not self.in_h1:
            if self.current_intro_field:
                self.intro_text_buffer.append(data)
            elif not self.current_intro_field and data.strip():
                self.intro += data

    def handle_entityref(self, name):
        char = {'nbsp': ' ', 'amp': '&', 'lt': '<', 'gt': '>', 'quot': '"'}.get(name, f'&{name};')
        if self.in_acc_content:
            self.current_text.append(char)
        if self.in_article and self.in_intro_area and self.current_intro_field:
            self.intro_text_buffer.append(char)
        if self.in_h1:
            self.current_text.append(char)
        if self.in_accordion_heading:
            self.current_text.append(char)
        if self.in_article and self.in_intro_area and not self.current_intro_field:
            self.intro += char

    def handle_charref(self, name):
        try:
            char = chr(int(name[1:], 16)) if name.startswith('x') else chr(int(name))
        except:
            char = ''
        if self.in_acc_content:
            self.current_text.append(char)


def fetch(url):
    req = Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    })
    with urlopen(req, timeout=15) as resp:
        return resp.read().decode('utf-8', errors='replace')


def clean_text(s):
    s = re.sub(r'\s+', ' ', s).strip()
    s = s.replace('\u00a0', ' ')
    return s


def main():
    print("[1/3] Fetching substance list from danno.ch/sostanze ...", flush=True)
    html = fetch(f"{BASE}/sostanze")
    
    lp = LinkParser()
    lp.feed(html)
    
    slugs = lp.links
    print(f"      Found {len(slugs)} substance pages.", flush=True)
    
    all_data = {}
    
    print(f"[2/3] Scraping {len(slugs)} substance pages...", flush=True)
    for i, slug in enumerate(slugs):
        url = f"{BASE}{slug}"
        substance_id = slug.replace('/sostanze/', '').strip('/')
        print(f"  [{i+1}/{len(slugs)}] {substance_id} ...", end=" ", flush=True)
        
        try:
            html = fetch(url)
            sp = SubstanceParser()
            sp.feed(html)
            
            result = {
                'id': substance_id,
                'title': clean_text(sp.title),
                'intro': clean_text(sp.intro),
                'fields': {},
                'sections': {}
            }
            
            for k, v in sp.intro_fields.items():
                result['fields'][k] = clean_text(v)
            
            for section_name, section_data in sp.sections.items():
                if section_data['type'] == 'list':
                    result['sections'][section_name] = {
                        'text': clean_text(section_data.get('text', '')),
                        'items': [clean_text(item) for item in section_data['items']]
                    }
                else:
                    result['sections'][section_name] = {
                        'text': clean_text(section_data['text'])
                    }
            
            all_data[substance_id] = result
            print(f"OK ({len(result['sections'])} sections)", flush=True)
            
        except Exception as e:
            print(f"ERROR: {e}", flush=True)
            all_data[substance_id] = {'id': substance_id, 'error': str(e)}
        
        time.sleep(0.3)
    
    output_path = "scraped_substances.json"
    print(f"\n[3/3] Writing {len(all_data)} substances to {output_path} ...", flush=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)
    
    print(f"\nDone! {len(all_data)} substances scraped.", flush=True)
    
    # Summary
    print("\n=== SUMMARY ===")
    for sid, data in all_data.items():
        if 'error' in data:
            print(f"  X {sid}: {data['error']}")
        else:
            sections = list(data.get('sections', {}).keys())
            fields = list(data.get('fields', {}).keys())
            print(f"  OK {sid}: {data.get('title', '?')} | sections: {sections} | fields: {fields}")

if __name__ == '__main__':
    main()
