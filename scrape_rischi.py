"""
Scraper for danno.ch /rischi/* pages
Extracts article content for each Rischi topic.
"""
import urllib.request
import json
import re
import time
from html.parser import HTMLParser

BASE = 'https://danno.ch'

class RischiParser(HTMLParser):
    """Parse a Rischi detail page for structured content."""
    def __init__(self):
        super().__init__()
        self.title = ''
        self.in_title = False
        self.in_article = False
        self.article_started = False
        self.sections = []
        self.current_section = {'heading': '', 'content': '', 'items': []}
        self.in_heading = 0
        self.heading_buf = ''
        self.in_list_item = False
        self.list_buf = ''
        self.in_table = False
        self.table_data = []
        self.current_row = []
        self.in_td = False
        self.in_th = False
        self.td_buf = ''
        self.in_p = False
        self.p_buf = ''
        self.in_strong = False
        self.strong_buf = ''
        self.intro = ''
        self.intro_done = False
        self.depth = 0
        self.skip = False
        self.in_headerlink = False
        # Fields from sidebar
        self.fields = {}
        self.in_field_label = False
        self.field_label = ''
        self.in_field_value = False
        self.field_value = ''
        
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        
        if tag == 'h1':
            self.in_title = True
            self.title = ''
            
        if d.get('itemprop') == 'articleBody':
            self.in_article = True
            self.article_started = True
            
        if not self.in_article:
            return
            
        if tag == 'a' and 'headerlink' in d.get('class', ''):
            self.in_headerlink = True
            return
            
        if tag in ('h2', 'h3', 'h4', 'h5', 'h6'):
            self.in_heading = int(tag[1])
            self.heading_buf = ''
            # Save previous section
            if self.current_section['heading'] or self.current_section['content']:
                self.sections.append(self.current_section)
            self.current_section = {'heading': '', 'level': self.in_heading, 'content': '', 'items': []}
            
        if tag == 'li':
            self.in_list_item = True
            self.list_buf = ''
            
        if tag == 'p':
            self.in_p = True
            self.p_buf = ''
            
        if tag == 'strong' or tag == 'b':
            self.in_strong = True
            self.strong_buf = ''
            
        if tag == 'table':
            self.in_table = True
            self.table_data = []
            
        if tag == 'tr':
            self.current_row = []
            
        if tag == 'td':
            self.in_td = True
            self.td_buf = ''
            
        if tag == 'th':
            self.in_th = True
            self.td_buf = ''
    
    def handle_endtag(self, tag):
        if tag == 'h1':
            self.in_title = False
            
        if tag == 'div' and self.in_article:
            # Could be end of article body
            pass
            
        if not self.in_article:
            return
            
        if tag == 'a' and self.in_headerlink:
            self.in_headerlink = False
            return
        
        if tag in ('h2', 'h3', 'h4', 'h5', 'h6') and self.in_heading:
            self.current_section['heading'] = clean(self.heading_buf)
            self.in_heading = 0
            
        if tag == 'li' and self.in_list_item:
            self.in_list_item = False
            item = clean(self.list_buf)
            if item:
                self.current_section['items'].append(item)
                
        if tag == 'p' and self.in_p:
            self.in_p = False
            text = clean(self.p_buf)
            if text:
                if self.current_section['content']:
                    self.current_section['content'] += '\n\n' + text
                else:
                    self.current_section['content'] += text
                    
        if tag in ('strong', 'b') and self.in_strong:
            self.in_strong = False
            
        if tag == 'td' and self.in_td:
            self.in_td = False
            self.current_row.append(clean(self.td_buf))
            
        if tag == 'th' and self.in_th:
            self.in_th = False
            self.current_row.append(clean(self.td_buf))
            
        if tag == 'tr' and self.current_row:
            self.table_data.append(self.current_row)
            
        if tag == 'table' and self.in_table:
            self.in_table = False
            if self.table_data:
                self.current_section['table'] = self.table_data
    
    def handle_data(self, data):
        if self.in_title:
            self.title += data
        
        if self.in_headerlink:
            return
            
        if not self.in_article:
            return
            
        if self.in_heading:
            self.heading_buf += data
        if self.in_list_item:
            self.list_buf += data
        if self.in_p:
            self.p_buf += data
        if self.in_td or self.in_th:
            self.td_buf += data

def clean(text):
    """Clean extracted text."""
    text = text.replace('\xa0', ' ')
    text = re.sub(r'\s+', ' ', text).strip()
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

def scrape_rischi_page(path):
    """Scrape a single rischi page."""
    url = BASE + path
    html = fetch(url)
    if not html:
        return None
    
    parser = RischiParser()
    try:
        parser.feed(html)
    except Exception as e:
        print(f"  Parse error: {e}")
    
    # Flush last section
    if parser.current_section['heading'] or parser.current_section['content']:
        parser.sections.append(parser.current_section)
    
    title = clean(parser.title)
    
    return {
        'path': path,
        'title': title,
        'sections': parser.sections,
    }

# All rischi paths from site_map.json crawl
RISCHI_PATHS = [
    '/rischi/al-momento-dell-acquisto',
    '/rischi/chill-out-cool-down',
    '/rischi/composizione-delle-sostanze',
    '/rischi/consumo-e-circolazione-stradale',
    '/rischi/consumo-e-desiderio-sessuale-chemsex',
    '/rischi/cosa-dice-la-legge',
    '/rischi/cosa-fare-in-caso-di-emergenza',
    '/rischi/cosa-succede-nel-cervello',
    '/rischi/drug-set-setting',
    '/rischi/informazioni-per-gli-uomini',
    '/rischi/informazioni-per-le-donne',
    '/rischi/modalita-di-consumo',
    '/rischi/modalita-di-consumo/paracadute-bomba',
    '/rischi/modalita-di-consumo/booty-bumping-plugging',
    '/rischi/modalita-di-consumo/fumare',
    '/rischi/modalita-di-consumo/inalare',
    '/rischi/modalita-di-consumo/ingerire',
    '/rischi/modalita-di-consumo/iniettare',
    '/rischi/modalita-di-consumo/sniffare',
    '/rischi/policonsumo',
    '/rischi/safer-sex',
    '/rischi/safer-sniffing',
    '/rischi/safer-use',
    '/rischi/sostanze-psicoattive-e-farmaci',
    '/rischi/sostanze-psicoattive-e-patologie',
    '/rischi/too-much-consumo-problematico',
    '/rischi/tracce-del-consumo-nell-organismo',
    # Sub-pages under farmaci
    '/171-rischi/sostanze-psicoattive-e-farmaci/497-pillala-anticoncezionale',
    '/171-rischi/sostanze-psicoattive-e-farmaci/493-ormoni-estrogeni',
    '/171-rischi/sostanze-psicoattive-e-farmaci/498-disfunzionamento-erettile',
]

def main():
    print("=" * 60)
    print("RISCHI SCRAPER — danno.ch")
    print("=" * 60)
    
    all_data = []
    
    for i, path in enumerate(RISCHI_PATHS):
        print(f"  [{i+1}/{len(RISCHI_PATHS)}] {path}")
        result = scrape_rischi_page(path)
        if result and result['title']:
            all_data.append(result)
            section_count = len(result['sections'])
            total_content = sum(len(s.get('content', '')) for s in result['sections'])
            total_items = sum(len(s.get('items', [])) for s in result['sections'])
            print(f"         → {result['title']} | {section_count} sections, {total_content} chars, {total_items} items")
        else:
            print(f"         → SKIPPED (no content)")
        time.sleep(0.2)
    
    with open('scraped_rischi.json', 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)
    
    print(f"\n{'='*60}")
    print(f"DONE: {len(all_data)} articles scraped → scraped_rischi.json")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
