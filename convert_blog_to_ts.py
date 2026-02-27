"""
Convert scraped_blog.json → src/data/blog.ts
"""
import json
import re

TITLE_MAP = {
    '532-cocaina-2016': 'Cocaina 2016: prodotti di taglio e purezza',
    '540-cocaina-100': 'Cocaina 100%: i rischi della purezza',
    '547-che-cos-e-la-canapa-cbd': 'Che cos\'è la canapa CBD?',
    '549-75-anni-di-lsd': '75 anni di LSD',
    '555-che-differenza-c-e-tra-cocaina-e-crack': 'Che differenza c\'è tra cocaina e crack?',
    '556-cocaina-purezza-e-prodotti-di-taglio-2018': 'Cocaina: purezza e prodotti di taglio 2018',
    '558-qual-e-il-limite': 'Qual è il limite?',
    '561-uso-di-sostanze-a-scopo-ricreativo-in-svizzera-2019': 'Uso di sostanze a scopo ricreativo in Svizzera 2019',
    '562-covid-19-lockdown-2020-consumo-sostanze': 'COVID-19, Lockdown 2020 e il consumo di sostanze',
    '563-sai-cosa-compri': 'Sai cosa compri?',
    '565-ketamina-ieri-e-oggi': 'Ketamina, ieri e oggi',
    '73-cosa-succede-al-tuo-corpo-e-al-tuo-cervello-quando-mischi-le-droghe': 'Cosa succede al tuo corpo e al tuo cervello quando mischi le droghe?',
}

CATEGORY_MAP = {
    '532-cocaina-2016': 'Drug Checking',
    '540-cocaina-100': 'Sostanze',
    '547-che-cos-e-la-canapa-cbd': 'Sostanze',
    '549-75-anni-di-lsd': 'Storia',
    '555-che-differenza-c-e-tra-cocaina-e-crack': 'Sostanze',
    '556-cocaina-purezza-e-prodotti-di-taglio-2018': 'Drug Checking',
    '558-qual-e-il-limite': 'Prevenzione',
    '561-uso-di-sostanze-a-scopo-ricreativo-in-svizzera-2019': 'Statistiche',
    '562-covid-19-lockdown-2020-consumo-sostanze': 'Ricerca',
    '563-sai-cosa-compri': 'Drug Checking',
    '565-ketamina-ieri-e-oggi': 'Sostanze',
    '73-cosa-succede-al-tuo-corpo-e-al-tuo-cervello-quando-mischi-le-droghe': 'Rischi',
}

DATE_MAP = {
    '532-cocaina-2016': '24 Aprile 2017',
    '540-cocaina-100': '20 Giugno 2017',
    '547-che-cos-e-la-canapa-cbd': '22 Febbraio 2018',
    '549-75-anni-di-lsd': '16 Aprile 2018',
    '555-che-differenza-c-e-tra-cocaina-e-crack': '19 Ottobre 2018',
    '556-cocaina-purezza-e-prodotti-di-taglio-2018': '22 Novembre 2018',
    '558-qual-e-il-limite': '23 Maggio 2019',
    '561-uso-di-sostanze-a-scopo-ricreativo-in-svizzera-2019': '29 Settembre 2020',
    '562-covid-19-lockdown-2020-consumo-sostanze': '21 Marzo 2021',
    '563-sai-cosa-compri': '24 Dicembre 2021',
    '565-ketamina-ieri-e-oggi': '15 Dicembre 2025',
    '73-cosa-succede-al-tuo-corpo-e-al-tuo-cervello-quando-mischi-le-droghe': '6 Novembre 2016',
}

def esc(s):
    return s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n')


def main():
    with open('scraped_blog.json', 'r', encoding='utf-8') as f:
        articles = json.load(f)
    
    lines = []
    lines.append('// Blog articles data — auto-generated from danno.ch')
    lines.append('')
    lines.append('export interface BlogArticle {')
    lines.append('  id: string;')
    lines.append('  title: string;')
    lines.append('  date: string;')
    lines.append('  category: string;')
    lines.append('  excerpt: string;')
    lines.append('  paragraphs: string[];')
    lines.append('}')
    lines.append('')
    
    # Build list and db
    list_entries = []
    db_entries = []
    
    for art in articles:
        slug = art['slug']
        title = TITLE_MAP.get(slug, art['title'])
        category = CATEGORY_MAP.get(slug, 'Generale')
        date = DATE_MAP.get(slug, '')
        
        # Collect all paragraphs, skip the first one if it's just a date
        paras = []
        for sec in art['sections']:
            for p in sec['paragraphs']:
                # Skip standalone date lines
                if re.match(r'^\d{2}\.\d{2}\.\d{4}$', p.strip()):
                    continue
                # Skip very short link-only paragraphs
                if len(p.strip()) < 10 and not any(c.isalpha() for c in p):
                    continue
                paras.append(p)
        
        if not paras:
            continue
        
        # First paragraph as excerpt (max 200 chars)
        excerpt = paras[0][:200]
        if len(paras[0]) > 200:
            excerpt = excerpt.rsplit(' ', 1)[0] + '...'
        
        list_entries.append(f"  {{ id: '{esc(slug)}', title: '{esc(title)}', date: '{esc(date)}', category: '{esc(category)}', excerpt: '{esc(excerpt)}' }},")
        
        para_lines = []
        for p in paras:
            para_lines.append(f"    '{esc(p)}',")
        
        db_entries.append(f"  '{esc(slug)}': {{\n    id: '{esc(slug)}',\n    title: '{esc(title)}',\n    date: '{esc(date)}',\n    category: '{esc(category)}',\n    excerpt: '{esc(excerpt)}',\n    paragraphs: [\n{chr(10).join(para_lines)}\n    ],\n  }},")
    
    # blogList — for the listing page
    lines.append('export const blogList: Omit<BlogArticle, \'paragraphs\'>[] = [')
    for e in list_entries:
        lines.append(e)
    lines.append('];')
    lines.append('')
    
    # blogDb — for detail pages
    lines.append('export const blogDb: Record<string, BlogArticle> = {')
    for e in db_entries:
        lines.append(e)
    lines.append('};')
    lines.append('')
    
    out = '\n'.join(lines)
    with open('src/data/blog.ts', 'w', encoding='utf-8') as f:
        f.write(out)
    
    print(f'Generated src/data/blog.ts — {len(list_entries)} articles')


if __name__ == '__main__':
    main()
