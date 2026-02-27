"""
Scraper for danno.ch /glossario/* pages
Extracts glossary term definitions.
"""
import urllib.request
import json
import re
import time
from html.parser import HTMLParser

BASE = 'https://danno.ch'

class GlossarioParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ''
        self.in_title = False
        self.in_article = False
        self.content = ''
        self.in_p = False
        self.p_buf = ''
        self.in_headerlink = False
        self.in_list_item = False
        self.list_buf = ''
        self.items = []
        
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == 'h1':
            self.in_title = True
            self.title = ''
        if d.get('itemprop') == 'articleBody':
            self.in_article = True
        if not self.in_article:
            return
        if tag == 'a' and 'headerlink' in d.get('class', ''):
            self.in_headerlink = True
        if tag == 'p':
            self.in_p = True
            self.p_buf = ''
        if tag == 'li':
            self.in_list_item = True
            self.list_buf = ''
    
    def handle_endtag(self, tag):
        if tag == 'h1':
            self.in_title = False
        if tag == 'a' and self.in_headerlink:
            self.in_headerlink = False
            return
        if not self.in_article:
            return
        if tag == 'p' and self.in_p:
            self.in_p = False
            text = clean(self.p_buf)
            if text and text != 'Condividi':
                if self.content:
                    self.content += '\n\n' + text
                else:
                    self.content = text
        if tag == 'li' and self.in_list_item:
            self.in_list_item = False
            item = clean(self.list_buf)
            if item and item not in ['Home', 'Chi siamo', 'Rischi', 'Sostanze', 
                'Drug checking', 'Consulenza', 'Blog', 'Sondaggio', 'Collabora', 
                'Flyers', 'Partner', 'Links', 'Contatti', 'Facebook', 'Instagram']:
                self.items.append(item)
    
    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.in_headerlink:
            return
        if not self.in_article:
            return
        if self.in_p:
            self.p_buf += data
        if self.in_list_item:
            self.list_buf += data

def clean(text):
    text = text.replace('\xa0', ' ')
    text = re.sub(r'\s+', ' ', text).strip()
    footer = "Danno.ch 2022 © | contatti | info@danno.ch | informazioni legali | impressum | mappa del sito"
    text = text.replace(footer, '').strip()
    return text

def fetch(url):
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        with urllib.request.urlopen(req, timeout=10) as resp:
            raw = resp.read()
            try:
                return raw.decode('utf-8')
            except:
                return raw.decode('latin-1')
    except Exception as e:
        print(f"  ERROR fetching {url}: {e}")
        return None


# Glossary pages from site_map.json
GLOSSARIO_PATHS = [
    '/glossario/bad-trip',
    '/glossario/craving',
    '/glossario/downer',
    '/glossario/droga',
    '/glossario/flashback',
    '/glossario/hangover',
    '/glossario/new-psychoactive-substances-nsp',
    '/glossario/overdose',
    '/glossario/psicoattivo',
    '/glossario/set-setting',
    '/glossario/tolleranza',
    '/glossario/upper',
]

def main():
    print("=" * 60)
    print("GLOSSARIO SCRAPER — danno.ch") 
    print("=" * 60)
    
    all_data = []
    
    for i, path in enumerate(GLOSSARIO_PATHS):
        print(f"  [{i+1}/{len(GLOSSARIO_PATHS)}] {path}")
        url = BASE + path
        html = fetch(url)
        if not html:
            print(f"         → SKIPPED")
            continue
        
        parser = GlossarioParser()
        try:
            parser.feed(html)
        except Exception as e:
            print(f"  Parse error: {e}")
            continue
        
        title = clean(parser.title)
        if title == 'Condividi':
            # Extract title from path
            slug = path.strip('/').split('/')[-1]
            title = slug.replace('-', ' ').title()
        
        content = parser.content
        
        if content:
            all_data.append({
                'path': path,
                'slug': path.strip('/').split('/')[-1],
                'title': title,
                'content': content,
                'items': parser.items,
            })
            print(f"         → {title} | {len(content)} chars, {len(parser.items)} items")
        else:
            print(f"         → SKIPPED (no content)")
        
        time.sleep(0.2)
    
    with open('scraped_glossario.json', 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)
    
    print(f"\n{'='*60}")
    print(f"DONE: {len(all_data)} terms scraped → scraped_glossario.json")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
