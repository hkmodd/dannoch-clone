"""
Convert scraped_rischi.json → src/data/rischi.ts
Generates a TypeScript data module for all Rischi articles.
"""
import json, re

# Map from path slug to correct Italian title  
TITLE_MAP = {
    'al-momento-dell-acquisto': "Al momento dell'acquisto",
    'chill-out-cool-down': 'Chill out & cool down',
    'composizione-delle-sostanze': 'Composizione delle sostanze',
    'consumo-e-circolazione-stradale': 'Consumo e circolazione stradale',
    'cosa-dice-la-legge': 'Cosa dice la legge?',
    'cosa-fare-in-caso-di-emergenza': 'Cosa fare in caso di emergenza?',
    'cosa-succede-nel-cervello': 'Cosa succede nel cervello?',
    'drug-set-setting': 'Drug, Set & Setting',
    'informazioni-per-gli-uomini': 'Informazioni per gli uomini',
    'informazioni-per-le-donne': 'Informazioni per le donne',
    'modalita-di-consumo': 'Modalità di consumo',
    'policonsumo': 'Policonsumo',
    'safer-sex': 'Safer Sex',
    'safer-sniffing': 'Safer Sniffing',
    'safer-use': 'Safer Use',
    'sostanze-psicoattive-e-farmaci': 'Sostanze psicoattive e farmaci',
    'sostanze-psicoattive-e-patologie': 'Sostanze psicoattive e patologie',
    'too-much-consumo-problematico': 'Too much? Consumo problematico',
    'tracce-del-consumo-nell-organismo': "Tracce del consumo nell'organismo",
    '497-pillala-anticoncezionale': 'Pillola anticoncezionale',
    '493-ormoni-estrogeni': 'Ormoni ed estrogeni',
    '498-disfunzionamento-erettile': 'Disfunzionamento erettile',
}

# Keywords for search
KEYWORDS_MAP = {
    'al-momento-dell-acquisto': ['comprare', 'spacciatore', 'mercato nero', 'internet', 'legal highs', 'riconoscere', 'fregatura', 'research chemicals', 'NSP'],
    'chill-out-cool-down': ['riposo', 'pausa', 'caldo', 'bere', 'hangover', 'down', 'recupero', 'dormire', 'stanchezza'],
    'composizione-delle-sostanze': ['taglio', 'purezza', 'analisi', 'drug checking', "cosa c'è dentro", 'principio attivo'],
    'consumo-e-circolazione-stradale': ['guidare', 'macchina', 'auto', 'patente', 'ritiro', 'polizia', 'incidente', 'assicurazione', 'etilometro', 'tolleranza zero'],
    'cosa-dice-la-legge': ['polizia', 'arresto', 'multa', 'legale', 'illegale', 'prigione', 'avvocato', '10 grammi', 'LStup', 'reato', 'controllo'],
    'cosa-fare-in-caso-di-emergenza': ['144', 'ambulanza', 'bad trip', 'panico', 'collasso', 'ospedale', 'svenimento', 'cuore', 'respirazione', 'aiuto', 'soccorso'],
    'cosa-succede-nel-cervello': ['serotonina', 'dopamina', 'neuroni', 'danni', 'memoria', 'recettori', 'sinapsi', 'neurotrasmettitori'],
    'drug-set-setting': ['ambiente', "stato d'animo", 'umore', 'compagnia', 'preparazione', 'regole', 'viaggio', 'trip'],
    'informazioni-per-gli-uomini': ['uomo', 'maschio', 'sesso', 'erezione', 'impotenza', 'spermatozoi', 'fertilità', 'testosterone'],
    'informazioni-per-le-donne': ['donna', 'ragazza', 'ciclo', 'mestruazioni', 'gravidanza', 'incinta', 'allattamento', 'pillola', 'peso'],
    'modalita-di-consumo': ['sniffare', 'fumare', 'iniettare', 'vena', 'orale', 'mangiare', 'naso', 'siringa', 'pippare', 'calare', 'rettale'],
    'policonsumo': ['mischiare', 'mix', 'insieme', 'alcol e', 'cocktail', 'interazioni', 'pericolo', 'cocaetilene'],
    'safer-sex': ['sesso', 'preservativo', 'malattie', 'HIV', 'MST', 'gravidanza', 'infezioni', 'rapporto', 'consenso', 'PEP'],
    'safer-sniffing': ['naso', 'pippare', 'cannuccia', 'banconota', 'sangue', 'mucose', 'pulizia', 'epatite'],
    'safer-use': ['regole', 'sicurezza', 'riduzione del danno', 'consigli', 'bere acqua', 'dosaggio', 'start low', 'go slow'],
    'sostanze-psicoattive-e-farmaci': ['medicine', 'antibiotici', 'pillola', 'viagra', 'antidepressivi', 'interazioni', 'medico', 'cura', 'MAO', 'SSRI'],
    'sostanze-psicoattive-e-patologie': ['malattie', 'cuore', 'epilessia', 'diabete', 'ansia', 'depressione', 'asma', 'respiro'],
    'too-much-consumo-problematico': ['dipendenza', 'smettere', 'aiuto', 'problemi', 'psichiatra', 'esagerare', 'controllo', 'astinenza'],
    'tracce-del-consumo-nell-organismo': ['test', 'sangue', 'urine', 'capello', 'patente', 'quanto dura', 'smaltimento', 'rilevabilità'],
}

def escape_ts(s):
    """Escape for TS single-quoted strings."""
    s = s.replace('\\', '\\\\')
    s = s.replace("'", "\\'")
    s = s.replace('\n', '\\n')
    s = s.replace('\r', '')
    return s

def clean_footer(text):
    """Remove danno.ch footer text."""
    footer = "Danno.ch 2022 © | contatti | info@danno.ch | informazioni legali | impressum | mappa del sito"
    return text.replace(footer, '').strip()

def slug_from_path(path):
    """Extract slug from path."""
    # Handle /rischi/xxx and /171-rischi/xxx/yyy
    parts = path.strip('/').split('/')
    return parts[-1]

def main():
    with open('scraped_rischi.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    lines = []
    lines.append("// Auto-generated from scraped_rischi.json")
    lines.append("// Do not edit manually — re-run convert_rischi_to_ts.py to regenerate")
    lines.append("")
    lines.append("export interface RischiSection {")
    lines.append("  heading: string;")
    lines.append("  content: string;")
    lines.append("  items: string[];")
    lines.append("  table?: string[][];")
    lines.append("}")
    lines.append("")
    lines.append("export interface RischiArticle {")
    lines.append("  id: string;")
    lines.append("  title: string;")
    lines.append("  keywords: string[];")
    lines.append("  intro: string;")
    lines.append("  sections: RischiSection[];")
    lines.append("}")
    lines.append("")
    
    # Build rischiList
    entries = []
    for article in data:
        slug = slug_from_path(article['path'])
        title = TITLE_MAP.get(slug, slug.replace('-', ' ').title())
        
        # Filter out "Cerca" navigation sections
        real_sections = [s for s in article['sections'] if s.get('heading', '') != 'Cerca']
        
        # Extract intro from first section content
        intro = ''
        content_sections = []
        for i, sec in enumerate(real_sections):
            content = clean_footer(sec.get('content', ''))
            items = sec.get('items', [])
            # Clean items
            items = [clean_footer(item) for item in items if item and item not in 
                     ['Home', 'Chi siamo', 'Rischi', 'Sostanze', 'Drug checking', 
                      'Consulenza', 'Blog', 'Sondaggio', 'Collabora', 'Flyers', 
                      'Partner', 'Links', 'Contatti', 'Facebook', 'Instagram']]
            
            if i == 0 and not sec.get('heading'):
                # First section without heading = intro
                intro = content
                if items:
                    content_sections.append({
                        'heading': '',
                        'content': '',
                        'items': items,
                        'table': sec.get('table')
                    })
                elif sec.get('table'):
                    content_sections.append({
                        'heading': '',
                        'content': '',
                        'items': [],
                        'table': sec.get('table')
                    })
            else:
                content_sections.append({
                    'heading': sec.get('heading', ''),
                    'content': content,
                    'items': items,
                    'table': sec.get('table')
                })
        
        entries.append({
            'slug': slug,
            'title': title,
            'intro': intro,
            'sections': content_sections,
        })
    
    # Generate rischiList
    lines.append("export const rischiList: { id: string; title: string; keywords: string[] }[] = [")
    for entry in sorted(entries, key=lambda e: e['title'].lower()):
        slug = entry['slug']
        title = entry['title']
        kw = KEYWORDS_MAP.get(slug, [])
        kw_str = ', '.join(f"'{escape_ts(k)}'" for k in kw)
        lines.append(f"  {{ id: '{escape_ts(slug)}', title: '{escape_ts(title)}', keywords: [{kw_str}] }},")
    lines.append("];")
    lines.append("")
    
    # Generate rischiDb
    lines.append("export const rischiDb: Record<string, RischiArticle> = {")
    for entry in sorted(entries, key=lambda e: e['title'].lower()):
        slug = entry['slug']
        title = entry['title']
        intro = entry['intro']
        kw = KEYWORDS_MAP.get(slug, [])
        kw_str = ', '.join(f"'{escape_ts(k)}'" for k in kw)
        
        lines.append(f"  '{escape_ts(slug)}': {{")
        lines.append(f"    id: '{escape_ts(slug)}',")
        lines.append(f"    title: '{escape_ts(title)}',")
        lines.append(f"    keywords: [{kw_str}],")
        lines.append(f"    intro: '{escape_ts(intro)}',")
        lines.append(f"    sections: [")
        
        for sec in entry['sections']:
            heading = sec.get('heading', '')
            content = sec.get('content', '')
            items = sec.get('items', [])
            table = sec.get('table')
            
            items_str = ', '.join(f"'{escape_ts(item)}'" for item in items if item)
            
            if table:
                table_rows = []
                for row in table:
                    cells = ', '.join(f"'{escape_ts(cell)}'" for cell in row)
                    table_rows.append(f"        [{cells}]")
                table_str = ',\n'.join(table_rows)
                lines.append(f"      {{ heading: '{escape_ts(heading)}', content: '{escape_ts(content)}', items: [{items_str}], table: [\n{table_str}\n      ] }},")
            else:
                lines.append(f"      {{ heading: '{escape_ts(heading)}', content: '{escape_ts(content)}', items: [{items_str}] }},")
        
        lines.append(f"    ],")
        lines.append(f"  }},")
    lines.append("};")
    
    output = '\n'.join(lines) + '\n'
    with open('src/data/rischi.ts', 'w', encoding='utf-8') as f:
        f.write(output)
    
    print(f"Generated src/data/rischi.ts with {len(entries)} articles")
    print(f"  rischiList: {len(entries)} items")
    print(f"  rischiDb: {len(entries)} entries")

if __name__ == '__main__':
    main()
