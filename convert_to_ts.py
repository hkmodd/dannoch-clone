"""
Convert scraped_substances.json into a TypeScript data module.
Reads the JSON, maps fields to the TS interface, and outputs src/data/sostanze.ts
"""
import json
import re
import os

# Category mapping from the existing Sostanze.tsx
CATEGORY_MAP = {
    '2-fa-3-fa-4-fa': 'Stimolanti',
    '2c-b-2c-x': 'Psichedelici',
    'alcol': 'Downer',
    'anfetamina-speed': 'Stimolanti',
    'anfetamina-speed-e-prodotti-di-taglio': 'Stimolanti',
    'benzodiazepine': 'Downer',
    'caffeina': 'Stimolanti',
    'canapa': 'Downer',
    'canapa-cbd': 'Downer',
    'cannabinoidi-sintetici': 'Nuove Sostanze Psicoattive (NSP)',
    'cocaina': 'Stimolanti',
    'cocaina-e-prodotti-di-taglio': 'Stimolanti',
    'codeina': 'Downer',
    'dmt-5-meo-dmt': 'Psichedelici',
    'dom-doi-dob-doc': 'Psichedelici',
    'dxm': 'Dissociativi',
    'ecstasy-mdma': 'Empatogeni / Entactogeni',
    'ecstasy-mdma-e-prodotti-di-taglio': 'Empatogeni / Entactogeni',
    'efedrina': 'Stimolanti',
    'eroina': 'Downer',
    'gas-esilarante': 'Dissociativi',
    'ghb-gbl': 'Downer',
    'ketamina': 'Dissociativi',
    'khat': 'Stimolanti',
    'lsd': 'Psichedelici',
    'm-cpp': 'Stimolanti',
    'mda': 'Empatogeni / Entactogeni',
    'mdai': 'Empatogeni / Entactogeni',
    'mdea': 'Empatogeni / Entactogeni',
    'mdpv': 'Stimolanti',
    'mefedrone': 'Stimolanti',
    'mescalina': 'Psichedelici',
    'metanfetamina': 'Stimolanti',
    'metilone': 'Stimolanti',
    'metoxetamina': 'Dissociativi',
    'nbome': 'Psichedelici',
    'neurolettici': 'Downer',
    'nuove-sostanze-psicoattive-nsp': 'Nuove Sostanze Psicoattive (NSP)',
    'oppiacei': 'Downer',
    'oppio': 'Downer',
    'pcp': 'Dissociativi',
    'pma-pmma': 'Stimolanti',
    'popper': 'Stimolanti',
    'psilocibina-funghi-allucinogeni': 'Psichedelici',
    'ritalin-concerta': 'Stimolanti',
    'salvia-divinorum': 'Psichedelici',
    'solanacee-psicoattive': 'Psichedelici',
    'tabacco-nicotina': 'Stimolanti',
    'tfmpp': 'Stimolanti',
    'viagra-levitra-cialis': 'Stimolanti',
}

# Display name mapping from Sostanze.tsx
NAME_MAP = {
    '2-fa-3-fa-4-fa': '2-FA / 3-FA / 4-FA',
    '2c-b-2c-x': '2C-B / 2C-X',
    'alcol': 'Alcol',
    'anfetamina-speed': 'Anfetamina-Speed',
    'anfetamina-speed-e-prodotti-di-taglio': 'Anfetamina-Speed e Prodotti di Taglio',
    'benzodiazepine': 'Benzodiazepine',
    'caffeina': 'Caffeina',
    'canapa': 'Canapa',
    'canapa-cbd': 'Canapa CBD',
    'cannabinoidi-sintetici': 'Cannabinoidi sintetici',
    'cocaina': 'Cocaina',
    'cocaina-e-prodotti-di-taglio': 'Cocaina e Prodotti di Taglio',
    'codeina': 'Codeina',
    'dmt-5-meo-dmt': 'DMT / 5-MeO-DMT',
    'dom-doi-dob-doc': 'DOM / DOI / DOB / DOC',
    'dxm': 'DXM',
    'ecstasy-mdma': 'Ecstasy-MDMA',
    'ecstasy-mdma-e-prodotti-di-taglio': 'Ecstasy-MDMA e Prodotti di Taglio',
    'efedrina': 'Efedrina',
    'eroina': 'Eroina',
    'gas-esilarante': 'Gas esilarante',
    'ghb-gbl': 'GHB-GBL',
    'ketamina': 'Ketamina',
    'khat': 'Khat',
    'lsd': 'LSD',
    'm-cpp': 'm-CPP',
    'mda': 'MDA',
    'mdai': 'MDAI',
    'mdea': 'MDEA',
    'mdpv': 'MDPV',
    'mefedrone': 'Mefedrone',
    'mescalina': 'Mescalina',
    'metanfetamina': 'Metanfetamina',
    'metilone': 'Metilone',
    'metoxetamina': 'Metoxetamina',
    'nbome': 'NBOMe',
    'neurolettici': 'Neurolettici',
    'nuove-sostanze-psicoattive-nsp': 'Nuove Sostanze Psicoattive (NSP)',
    'oppiacei': 'Oppiacei',
    'oppio': 'Oppio',
    'pcp': 'PCP',
    'pma-pmma': 'PMA / PMMA',
    'popper': 'Popper',
    'psilocibina-funghi-allucinogeni': 'Psilocibina-funghi allucinogeni',
    'ritalin-concerta': 'Ritalin - Concerta',
    'salvia-divinorum': 'Salvia divinorum',
    'solanacee-psicoattive': 'Solanacee psicoattive',
    'tabacco-nicotina': 'Tabacco-Nicotina',
    'tfmpp': 'TFMPP',
    'viagra-levitra-cialis': 'Viagra / Levitra / Cialis',
}

# ID mapping for route matching (from Sostanze.tsx)
ID_MAP = {
    '2-fa-3-fa-4-fa': '2-fa-3-fa-4-fa',
    '2c-b-2c-x': '2cb',
    'alcol': 'alcol',
    'anfetamina-speed': 'speed',
    'anfetamina-speed-e-prodotti-di-taglio': 'anfetamina-speed-e-prodotti-di-taglio',
    'benzodiazepine': 'benzodiazepine',
    'caffeina': 'caffeina',
    'canapa': 'cannabis',
    'canapa-cbd': 'canapa-cbd',
    'cannabinoidi-sintetici': 'cannabinoidi-sintetici',
    'cocaina': 'cocaina',
    'cocaina-e-prodotti-di-taglio': 'cocaina-e-prodotti-di-taglio',
    'codeina': 'codeina',
    'dmt-5-meo-dmt': 'dmt',
    'dom-doi-dob-doc': 'dom-doi-dob-doc',
    'dxm': 'dxm',
    'ecstasy-mdma': 'mdma',
    'ecstasy-mdma-e-prodotti-di-taglio': 'ecstasy-mdma-e-prodotti-di-taglio',
    'efedrina': 'efedrina',
    'eroina': 'eroina',
    'gas-esilarante': 'gas-esilarante',
    'ghb-gbl': 'ghb',
    'ketamina': 'ketamina',
    'khat': 'khat',
    'lsd': 'lsd',
    'm-cpp': 'm-cpp',
    'mda': 'mda',
    'mdai': 'mdai',
    'mdea': 'mdea',
    'mdpv': 'mdpv',
    'mefedrone': 'mefedrone',
    'mescalina': 'mescalina',
    'metanfetamina': 'metanfetamina',
    'metilone': 'metilone',
    'metoxetamina': 'metoxetamina',
    'nbome': 'nbome',
    'neurolettici': 'neurolettici',
    'nuove-sostanze-psicoattive-nsp': 'nsp',
    'oppiacei': 'oppiacei',
    'oppio': 'oppio',
    'pcp': 'pcp',
    'pma-pmma': 'pma-pmma',
    'popper': 'popper',
    'psilocibina-funghi-allucinogeni': 'funghi',
    'ritalin-concerta': 'ritalin-concerta',
    'salvia-divinorum': 'salvia-divinorum',
    'solanacee-psicoattive': 'solanacee-psicoattive',
    'tabacco-nicotina': 'tabacco-nicotina',
    'tfmpp': 'tfmpp',
    'viagra-levitra-cialis': 'viagra-levitra-cialis',
}

def escape_ts(s):
    """Escape a string for TypeScript single-quoted string."""
    if not s:
        return ''
    s = s.replace('\\', '\\\\')
    s = s.replace("'", "\\'")
    s = s.replace('\n', ' ')
    s = s.replace('\r', '')
    return s.strip()

def extract_section_text(sections, *names):
    """Extract text from first matching section name."""
    for name in names:
        if name in sections:
            sec = sections[name]
            return sec.get('text', '')
    return ''

def extract_section_items(sections, *names):
    """Extract items list from first matching section name."""
    for name in names:
        if name in sections:
            sec = sections[name]
            return sec.get('items', [])
    return []

def parse_onset_duration(effects_text):
    """Try to extract onset and duration from the effects text."""
    onset = ''
    duration = ''
    
    # Look for "Inizio degli effetti" pattern
    m = re.search(r'Inizio degli effetti\s*(.*?)(?:Durata degli effetti|Effetti secondari|$)', effects_text, re.IGNORECASE)
    if m:
        onset = m.group(1).strip().rstrip('.')
        
    # Look for "Durata degli effetti" pattern  
    m = re.search(r'Durata degli effetti\s*(.*?)(?:Effetti secondari|$)', effects_text, re.IGNORECASE)
    if m:
        duration = m.group(1).strip().rstrip('.')
    
    return onset, duration

def clean_effects_text(text):
    """Remove onset/duration info from effects text to avoid duplication."""
    # Remove everything from "Inizio degli effetti" onwards
    cleaned = re.split(r'\s*Inizio degli effetti', text, flags=re.IGNORECASE)[0]
    return cleaned.strip()


def main():
    with open('scraped_substances.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    entries = []
    
    for slug, sub in data.items():
        if 'error' in sub:
            continue
            
        sid = ID_MAP.get(slug, slug)
        name = NAME_MAP.get(slug, sub.get('title', slug))
        category = CATEGORY_MAP.get(slug, sub.get('fields', {}).get('GRUPPO', 'N/A'))
        
        fields = sub.get('fields', {})
        sections = sub.get('sections', {})
        intro = sub.get('intro', '')
        
        # Extract effects, cleaning onset/duration from the text
        effects_full = extract_section_text(sections, 'Effetti')
        onset, duration = parse_onset_duration(effects_full)
        effects = clean_effects_text(effects_full)
        
        # If no effects section, use intro
        if not effects:
            effects = intro
            
        # Extract risks  
        risks = extract_section_text(sections, 'Rischi e effetti collaterali')
        long_term_risks = extract_section_text(sections, 'Rischi a lungo termine')
        
        # Extract safer use items
        safer_use = extract_section_items(sections, 'Safer use', 'Safer Use')
        
        # If safer use from section doesn't have items, check for text
        if not safer_use:
            safer_text = extract_section_text(sections, 'Safer use', 'Safer Use')
            if safer_text:
                safer_use = [safer_text]
        
        # Extract metadata fields
        appearance = fields.get('ASPETTO', '')
        consumption = fields.get('MODALITÀ DI CONSUMO', '')
        dosage = fields.get('DOSAGGIO', '') or fields.get('DOSAGGIO DMT', '')
        mix_warnings = fields.get('ATTENZIONE AI MIX CON...', '')
        group = fields.get('GRUPPO', '')
        
        # Build aka from group or intro snippet
        aka = group if group else category
        
        # Override onset/duration from fields if available
        if not onset:
            onset = 'Variabile'
        if not duration:
            duration = 'Variabile'
        
        entries.append({
            'id': sid,
            'slug': slug,
            'name': name,
            'aka': aka,
            'class': group or category,
            'category': category,
            'duration': duration,
            'onset': onset,
            'intro': intro,
            'appearance': appearance,
            'consumption': consumption,
            'dosage': dosage,
            'mixWarnings': mix_warnings,
            'effects': effects,
            'risks': risks,
            'longTermRisks': long_term_risks,
            'saferUse': safer_use,
        })
    
    # Generate TypeScript
    ts_lines = []
    ts_lines.append("/**")
    ts_lines.append(" * Complete substance database for danno.ch")
    ts_lines.append(" * Auto-generated from danno.ch scrape — DO NOT EDIT MANUALLY")
    ts_lines.append(" * Source: https://danno.ch/sostanze")
    ts_lines.append(" */")
    ts_lines.append("")
    ts_lines.append("export interface Sostanza {")
    ts_lines.append("  id: string;")
    ts_lines.append("  name: string;")
    ts_lines.append("  aka: string;")
    ts_lines.append("  class: string;")
    ts_lines.append("  category: string;")
    ts_lines.append("  duration: string;")
    ts_lines.append("  onset: string;")
    ts_lines.append("  intro: string;")
    ts_lines.append("  appearance: string;")
    ts_lines.append("  consumption: string;")
    ts_lines.append("  dosage: string;")
    ts_lines.append("  mixWarnings: string;")
    ts_lines.append("  effects: string;")
    ts_lines.append("  risks: string;")
    ts_lines.append("  longTermRisks: string;")
    ts_lines.append("  saferUse: string[];")
    ts_lines.append("}")
    ts_lines.append("")
    ts_lines.append("export const CATEGORY_COLORS: Record<string, string> = {")
    ts_lines.append("  'Psichedelici': '#8B5CF6',")
    ts_lines.append("  'Empatogeni / Entactogeni': '#EC4899',")
    ts_lines.append("  'Stimolanti': '#F59E0B',")
    ts_lines.append("  'Dissociativi': '#06B6D4',")
    ts_lines.append("  'Downer': '#6366F1',")
    ts_lines.append("  'Nuove Sostanze Psicoattive (NSP)': '#EF4444',")
    ts_lines.append("};")
    ts_lines.append("")
    ts_lines.append("export const sostanzeList: Array<{ id: string; name: string; category: string }> = [")
    
    # Sort entries by name for the list
    sorted_entries = sorted(entries, key=lambda e: e['name'].lower())
    for e in sorted_entries:
        ts_lines.append(f"  {{ id: '{escape_ts(e['id'])}', name: '{escape_ts(e['name'])}', category: '{escape_ts(e['category'])}' }},")
    ts_lines.append("];")
    ts_lines.append("")
    
    ts_lines.append("export const sostanzeDb: Record<string, Sostanza> = {")
    
    for e in sorted_entries:
        sid = escape_ts(e['id'])
        ts_lines.append(f"  '{sid}': {{")
        ts_lines.append(f"    id: '{sid}',")
        ts_lines.append(f"    name: '{escape_ts(e['name'])}',")
        ts_lines.append(f"    aka: '{escape_ts(e['aka'])}',")
        ts_lines.append(f"    class: '{escape_ts(e['class'])}',")
        ts_lines.append(f"    category: '{escape_ts(e['category'])}',")
        ts_lines.append(f"    duration: '{escape_ts(e['duration'])}',")
        ts_lines.append(f"    onset: '{escape_ts(e['onset'])}',")
        ts_lines.append(f"    intro: '{escape_ts(e['intro'])}',")
        ts_lines.append(f"    appearance: '{escape_ts(e['appearance'])}',")
        ts_lines.append(f"    consumption: '{escape_ts(e['consumption'])}',")
        ts_lines.append(f"    dosage: '{escape_ts(e['dosage'])}',")
        ts_lines.append(f"    mixWarnings: '{escape_ts(e['mixWarnings'])}',")
        ts_lines.append(f"    effects: '{escape_ts(e['effects'])}',")
        ts_lines.append(f"    risks: '{escape_ts(e['risks'])}',")
        ts_lines.append(f"    longTermRisks: '{escape_ts(e['longTermRisks'])}',")
        
        # Safer use array
        if e['saferUse']:
            ts_lines.append(f"    saferUse: [")
            for item in e['saferUse']:
                ts_lines.append(f"      '{escape_ts(item)}',")
            ts_lines.append(f"    ],")
        else:
            ts_lines.append(f"    saferUse: [],")
        
        ts_lines.append(f"  }},")
    
    ts_lines.append("};")
    ts_lines.append("")
    
    output = '\n'.join(ts_lines)
    
    os.makedirs('src/data', exist_ok=True)
    with open('src/data/sostanze.ts', 'w', encoding='utf-8') as f:
        f.write(output)
    
    print(f"Generated src/data/sostanze.ts with {len(entries)} substances.")
    
    # Print which IDs are in the new list
    print("\nSubstance IDs:")
    for e in sorted_entries:
        print(f"  {e['id']} -> {e['name']}")

if __name__ == '__main__':
    main()
