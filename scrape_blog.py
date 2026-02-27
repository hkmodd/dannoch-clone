"""
Scraper for danno.ch blog/news articles.
Extracts titles, dates, categories, and full article content.
"""
import urllib.request
import json
import re
import time
from html.parser import HTMLParser


BASE = 'https://danno.ch'

# Known blog post paths from site_map + existing hardcoded posts
BLOG_PATHS = [
    '/news-blog/565-ketamina-ieri-e-oggi',
    '/news-blog/563-sai-cosa-compri',
    '/news-blog/562-covid-19-lockdown-2020-consumo-sostanze',
    '/news-blog/561-uso-di-sostanze-a-scopo-ricreativo-in-svizzera-2019',
    '/news-blog/558-qual-e-il-limite',
    # Try to discover more blog pages from the listing
]


def clean(text):
    text = text.replace('\xa0', ' ')
    text = re.sub(r'\s+', ' ', text).strip()
    footer = "Danno.ch 2022 © | contatti | info@danno.ch | informazioni legali | impressum | mappa del sito"
    text = text.replace(footer, '').strip()
    return text


class BlogListParser(HTMLParser):
    """Parse the blog listing page to find article links."""
    def __init__(self):
        super().__init__()
        self.links = []
        
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == 'a':
            href = d.get('href', '')
            if '/news-blog/' in href and href != '/news-blog/' and href not in self.links:
                # Normalize
                if href.startswith('/'):
                    self.links.append(href)
                elif href.startswith(BASE):
                    self.links.append(href.replace(BASE, ''))


class BlogArticleParser(HTMLParser):
    """Parse a single blog article page."""
    def __init__(self):
        super().__init__()
        self.title = ''
        self.in_title = False
        self.in_article = False
        self.paragraphs = []
        self.in_p = False
        self.p_buf = ''
        self.headings = []
        self.in_heading = False
        self.heading_buf = ''
        self.heading_level = 0
        self.date_text = ''
        self.in_date = False
        self.in_headerlink = False
        
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == 'h1':
            self.in_title = True
            self.title = ''
        if d.get('itemprop') == 'articleBody':
            self.in_article = True
        if tag == 'time':
            self.in_date = True
            self.date_text = d.get('datetime', '')
        if tag == 'a' and 'headerlink' in d.get('class', ''):
            self.in_headerlink = True
        if not self.in_article:
            return
        if tag == 'p':
            self.in_p = True
            self.p_buf = ''
        if tag in ('h2', 'h3', 'h4'):
            self.in_heading = True
            self.heading_buf = ''
            self.heading_level = int(tag[1])
    
    def handle_endtag(self, tag):
        if tag == 'h1':
            self.in_title = False
        if tag == 'time':
            self.in_date = False
        if tag == 'a' and self.in_headerlink:
            self.in_headerlink = False
            return
        if not self.in_article:
            return
        if tag == 'p' and self.in_p:
            self.in_p = False
            text = clean(self.p_buf)
            if text and text != 'Condividi':
                self.paragraphs.append(text)
        if tag in ('h2', 'h3', 'h4') and self.in_heading:
            self.in_heading = False
            heading = clean(self.heading_buf)
            if heading and heading != 'Cerca':
                self.headings.append({
                    'level': self.heading_level,
                    'text': heading,
                    'after_paragraph': len(self.paragraphs),
                })
    
    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.in_date and not self.date_text:
            self.date_text += data
        if self.in_headerlink:
            return
        if not self.in_article:
            return
        if self.in_p:
            self.p_buf += data
        if self.in_heading:
            self.heading_buf += data


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
        print(f"  ERROR: {e}")
        return None


def main():
    print("=" * 60)
    print("BLOG SCRAPER — danno.ch")
    print("=" * 60)
    
    # Step 1: Try to discover more blog posts from the listing page
    print("\n[1] Discovering blog posts from listing page...")
    listing_html = fetch(BASE + '/news-blog')
    discovered_paths = set(BLOG_PATHS)
    
    if listing_html:
        parser = BlogListParser()
        parser.feed(listing_html)
        for link in parser.links:
            discovered_paths.add(link)
        print(f"  Found {len(parser.links)} links on listing page")
    
    # Also try paginated listing
    for page in range(2, 6):
        url = f'{BASE}/news-blog?start={5*(page-1)}'
        print(f"  Checking page {page}: {url}")
        html = fetch(url)
        if html:
            parser = BlogListParser()
            parser.feed(html)
            for link in parser.links:
                discovered_paths.add(link)
            print(f"    Found {len(parser.links)} links")
        time.sleep(0.2)
    
    all_paths = sorted(discovered_paths)
    print(f"\n  Total unique blog paths: {len(all_paths)}")
    
    # Step 2: Scrape each article
    print("\n[2] Scraping articles...")
    articles = []
    
    for i, path in enumerate(all_paths):
        print(f"  [{i+1}/{len(all_paths)}] {path}")
        html = fetch(BASE + path)
        if not html:
            print("    → SKIPPED")
            continue
        
        parser = BlogArticleParser()
        try:
            parser.feed(html)
        except Exception as e:
            print(f"    Parse error: {e}")
            continue
        
        title = clean(parser.title)
        if title == 'Condividi' or not title:
            # Derive from path
            slug = path.strip('/').split('/')[-1]
            # Remove numeric prefix
            slug = re.sub(r'^\d+-', '', slug)
            title = slug.replace('-', ' ').title()
        
        # Filter out navigation junk from paragraphs
        real_paragraphs = [p for p in parser.paragraphs 
                          if not any(nav in p for nav in ['Home Chi siamo', 'Danno.ch 2022'])]
        
        if real_paragraphs:
            # Build sections
            sections = []
            current_section = {'heading': '', 'paragraphs': []}
            
            for pi, para in enumerate(real_paragraphs):
                # Check if a heading should be inserted before this paragraph
                for h in parser.headings:
                    if h['after_paragraph'] == pi:
                        if current_section['paragraphs']:
                            sections.append(current_section)
                        current_section = {'heading': h['text'], 'paragraphs': []}
                current_section['paragraphs'].append(para)
            
            if current_section['paragraphs']:
                sections.append(current_section)
            
            slug = path.strip('/').split('/')[-1]
            
            articles.append({
                'path': path,
                'slug': slug,
                'title': title,
                'date': parser.date_text or '',
                'sections': sections,
            })
            print(f"    → {title} | {len(real_paragraphs)} paragraphs, {len(sections)} sections")
        else:
            print(f"    → SKIPPED (no content)")
        
        time.sleep(0.3)
    
    # Save
    with open('scraped_blog.json', 'w', encoding='utf-8') as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)
    
    print(f"\n{'='*60}")
    print(f"DONE: {len(articles)} articles scraped → scraped_blog.json")
    print(f"{'='*60}")


if __name__ == '__main__':
    main()
