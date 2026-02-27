"""
Full site scraper for danno.ch
Maps every page, section, and content block across the entire site.
Outputs a complete content map as JSON.
"""
import urllib.request
import json
import time
import re
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

BASE = 'https://danno.ch'
VISITED = set()
SITE_MAP = {}

class FullPageParser(HTMLParser):
    """Extract all internal links + page metadata from any page."""
    def __init__(self):
        super().__init__()
        self.links = set()
        self.title = ''
        self.in_title = False
        self.meta_desc = ''
        self.headings = []   # (level, text)
        self.in_heading = 0
        self.heading_buf = ''
        self.nav_links = []
        self.in_nav = False
        self.in_main = False
        self.main_text_len = 0
        self.images = []
        self.in_article = False
        self.article_text = ''
        self.sections = []
        self.current_section = ''
        self.section_content = ''
        self.accordion_titles = []
        self.in_accordion_title = False
        self.accordion_buf = ''
    
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        
        if tag == 'title':
            self.in_title = True
            
        if tag == 'meta':
            if d.get('name','').lower() == 'description':
                self.meta_desc = d.get('content', '')
        
        if tag == 'a':
            href = d.get('href', '')
            if href and not href.startswith(('#', 'javascript:', 'mailto:', 'tel:')):
                if href.startswith('/'):
                    self.links.add(href)
                elif href.startswith(BASE):
                    self.links.add(href.replace(BASE, ''))
        
        if tag in ('h1','h2','h3','h4','h5','h6'):
            self.in_heading = int(tag[1])
            self.heading_buf = ''
        
        if tag == 'nav':
            self.in_nav = True
            
        if tag == 'main':
            self.in_main = True
            
        if tag == 'img':
            src = d.get('src', '')
            alt = d.get('alt', '')
            if src:
                self.images.append({'src': src, 'alt': alt})
        
        # Detect accordion/section titles
        if tag == 'a' and 'headerlink' in d.get('class', ''):
            self.in_accordion_title = True
            self.accordion_buf = ''
        
        # Article body detection
        if d.get('itemprop') == 'articleBody':
            self.in_article = True
    
    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        if tag in ('h1','h2','h3','h4','h5','h6') and self.in_heading:
            if self.heading_buf.strip():
                self.headings.append((self.in_heading, self.heading_buf.strip()))
            self.in_heading = 0
        if tag == 'nav':
            self.in_nav = False
        if tag == 'main':
            self.in_main = False
        if self.in_accordion_title and tag == 'a':
            self.in_accordion_title = False
            if self.accordion_buf.strip():
                self.accordion_titles.append(self.accordion_buf.strip())
    
    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.in_heading:
            self.heading_buf += data
        if self.in_main:
            self.main_text_len += len(data.strip())
        if self.in_accordion_title:
            self.accordion_buf += data
        if self.in_article:
            self.article_text += data

def fetch(url):
    """Fetch URL with error handling."""
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
        return None

def scrape_page(path):
    """Scrape a single page and return its metadata."""
    if path in VISITED:
        return None
    VISITED.add(path)
    
    url = BASE + path
    html = fetch(url)
    if not html:
        return None
    
    parser = FullPageParser()
    try:
        parser.feed(html)
    except:
        pass
    
    # Clean title
    title = parser.title.strip()
    if ' - ' in title:
        title = title.split(' - ')[0].strip()
    
    result = {
        'path': path,
        'url': url,
        'title': title,
        'meta_description': parser.meta_desc,
        'headings': [{'level': h[0], 'text': h[1]} for h in parser.headings[:20]],
        'main_text_length': parser.main_text_len,
        'image_count': len(parser.images),
        'internal_links': sorted(list(parser.links)),
        'accordion_sections': parser.accordion_titles,
        'article_text_preview': parser.article_text[:500].strip() if parser.article_text else '',
    }
    
    return result, parser.links

def categorize_path(path):
    """Categorize a path into a site section."""
    if path == '/' or path == '':
        return 'home'
    parts = path.strip('/').split('/')
    if parts[0].isdigit():
        # Joomla-style numeric paths
        if len(parts) > 1:
            return parts[1] if not parts[1].isdigit() else parts[0]
        return 'page-' + parts[0]
    return parts[0]

def main():
    print("=" * 60)
    print("FULL SITE SCRAPER — danno.ch")
    print("=" * 60)
    
    # Start with the homepage and key known paths
    seed_paths = [
        '/',
        '/sostanze',
        '/informazioni',
        '/drug-checking',
        '/news',
        '/contatti',
    ]
    
    to_visit = list(seed_paths)
    all_pages = {}
    
    # BFS crawl
    iteration = 0
    max_pages = 200  # safety limit
    
    while to_visit and iteration < max_pages:
        path = to_visit.pop(0)
        
        # Normalize
        path = path.rstrip('/')
        if not path:
            path = '/'
        
        # Skip external, anchors, media files
        if any(path.endswith(ext) for ext in ['.pdf', '.jpg', '.png', '.gif', '.css', '.js', '.xml', '.ico']):
            continue
        if path in VISITED:
            continue
            
        # Skip obvious non-content paths
        if any(skip in path for skip in ['/component/', '/administrator/', '/feed/', 'format=feed', 'print=1', '/images/', '/media/']):
            continue
        
        print(f"  [{iteration+1}] Scraping: {path}")
        result = scrape_page(path)
        
        if result:
            page_data, new_links = result
            category = categorize_path(path)
            page_data['category'] = category
            all_pages[path] = page_data
            
            # Queue new internal links
            for link in new_links:
                link = link.rstrip('/')
                if not link:
                    link = '/'
                if link not in VISITED and link not in to_visit:
                    # Only follow danno.ch internal links
                    if not link.startswith('http'):
                        to_visit.append(link)
        
        iteration += 1
        time.sleep(0.2)  # politeness
    
    # Build summary
    sections = {}
    for path, data in all_pages.items():
        cat = data['category']
        if cat not in sections:
            sections[cat] = []
        sections[cat].append({
            'path': path,
            'title': data['title'],
            'text_length': data['main_text_length'],
            'headings_count': len(data['headings']),
            'images': data['image_count'],
            'accordions': len(data['accordion_sections']),
        })
    
    output = {
        'crawl_stats': {
            'total_pages': len(all_pages),
            'total_links_discovered': len(VISITED),
            'sections': {k: len(v) for k, v in sections.items()},
        },
        'sections_summary': sections,
        'pages': all_pages,
    }
    
    with open('site_map.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    # Print summary
    print("\n" + "=" * 60)
    print("CRAWL COMPLETE")
    print("=" * 60)
    print(f"Total pages scraped: {len(all_pages)}")
    print(f"\nSections found:")
    for section, pages in sorted(sections.items()):
        print(f"  [{section}] — {len(pages)} pages")
        for p in pages[:5]:
            print(f"    → {p['path']} | {p['title']} ({p['text_length']} chars)")
        if len(pages) > 5:
            print(f"    ... and {len(pages)-5} more")
    
    print(f"\nOutput saved to site_map.json")

if __name__ == '__main__':
    main()
