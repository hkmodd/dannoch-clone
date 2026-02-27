"""Fix rischi.ts data: Chill Out cleanup, merge articles, Safer Sex restructure, etc."""
import re

with open('src/data/rischi.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. CHILL OUT — trim intro to first 3 paragraphs only
old_chill_intro_start = "intro: 'Il consumo di sostanze sovraccarica il corpo"
idx = content.index(old_chill_intro_start)
# Find the end of intro value (next line starting with "    sections:")
intro_end = content.index("    sections: [\n", idx)
old_intro_line = content[idx:intro_end]
# Keep only first 3 paragraphs
new_chill_intro = r"""intro: 'Il consumo di sostanze sovraccarica il corpo ed è quindi necessario prevedere dei momenti in cui riposare, sia durante il consumo che dopo aver consumato.\n\nSiccome il consumo di sostanze psicoattive aumenta la temperatura corporea, è importante fare delle pause in locali freschi o all\'aria aperta.\n\nGli spazi o i locali che nei club o nei festival sono destinati al recupero, sono appunto chiamati chill out.',
"""
content = content[:idx] + new_chill_intro + content[intro_end:]

# 2. COMPOSIZIONE DELLE SOSTANZE — add drug checking link reference  
old_comp = "{ id: 'composizione-delle-sostanze', title: 'Composizione delle sostanze'"
new_comp = "{ id: 'composizione-delle-sostanze', title: 'Composizione delle sostanze (Drug Checking)'"
content = content.replace(old_comp, new_comp, 1)

# Also update in rischiDb
old_comp_title = "    title: 'Composizione delle sostanze',"
new_comp_title = "    title: 'Composizione delle sostanze (Drug Checking)',"
content = content.replace(old_comp_title, new_comp_title, 1)

# 3. MODALITÀ DI CONSUMO — clean intro (remove duplicated table data from intro text)
old_mod_intro_start = "'modalita-di-consumo': {"
idx_mod = content.index(old_mod_intro_start)
idx_mod_intro = content.index("    intro: '", idx_mod)
idx_mod_intro_end = content.index("    sections: [\n", idx_mod)
# Replace with clean intro (only the first 3 sentences)
new_mod_intro = r"""    intro: 'La modalità di consumo è il modo attraverso il quale una sostanza psicoattiva entra nell\'organismo.\n\nLe diverse sostanze possono essere consumate in diversi modi che influenzano la durata degli effetti e i rischi.\n\nA dipendenza della modalità di consumo è necessario adeguare i dosaggi e usare del materiale di safer use.',
"""
content = content[:idx_mod_intro] + new_mod_intro + content[idx_mod_intro_end:]

# 4. MERGE: Remove standalone disfunzione-erettile (content already in sostanze-psicoattive-e-farmaci)
# Remove from rischiList
content = re.sub(r"\s*\{ id: '498-disfunzionamento-erettile'.*?\},?\n", "\n", content)
# Remove from rischiDb 
content = re.sub(r"  '498-disfunzionamento-erettile': \{.*?\n  \},\n", "", content, flags=re.DOTALL)

# 5. MERGE: Remove standalone ormoni (content already in farmaci section)
content = re.sub(r"\s*\{ id: '493-ormoni-estrogeni'.*?\},?\n", "\n", content)
content = re.sub(r"  '493-ormoni-estrogeni': \{.*?\n  \},\n", "", content, flags=re.DOTALL)

# 6. MERGE: Remove standalone pillola (content already in farmaci section)  
content = re.sub(r"\s*\{ id: '497-pillala-anticoncezionale'.*?\},?\n", "\n", content)
content = re.sub(r"  '497-pillala-anticoncezionale': \{.*?\n  \},\n", "", content, flags=re.DOTALL)

# 7. POLICONSUMO — rename to include "(mix pericolosi)"
content = content.replace(
    "{ id: 'policonsumo', title: 'Policonsumo'",
    "{ id: 'policonsumo', title: 'Policonsumo (mix pericolosi)'"
)
content = content.replace(
    "    title: 'Policonsumo',",
    "    title: 'Policonsumo (mix pericolosi)',",
    1
)

# 8. Clean policonsumo intro — trim to just the first few paragraphs (table is in sections)
old_poli_intro_start_marker = "'policonsumo': {"
idx_poli = content.index(old_poli_intro_start_marker)
idx_poli_intro = content.index("    intro: '", idx_poli)
idx_poli_sections = content.index("    sections: [\n", idx_poli)
new_poli_intro = r"""    intro: 'Il consumo combinato di due o più sostanze in poco tempo, sovraccarica il corpo e la mente.\n\nGli effetti della combinazione di due o più sostanze sono difficili da prevedere e generalmente non corrispondono alla somma dei rispettivi effetti: 1+1≠2!\n\nA dipendenza della sostanza, gli effetti possono essere amplificati o condizionare la mente e il corpo in diversi modi. In entrambi i casi, il corpo è messo particolarmente sotto pressione.\n\nSe nonostante i rischi decidi di consumare combinazioni di diverse sostanze, cerca di evitare le combinazioni più pericolose e rispetta le raccomandazioni di safer use.',
"""
content = content[:idx_poli_intro] + new_poli_intro + content[idx_poli_sections:]

# 9. MERGE: Tracce + Circolazione stradale → single article
# First, rename tracce in rischiList
content = content.replace(
    "{ id: 'tracce-del-consumo-nell-organismo', title: 'Tracce del consumo nell\\'organismo'",
    "{ id: 'tracce-del-consumo-nell-organismo', title: 'Tracce nell\\'organismo e circolazione stradale'"
)
# Remove consumo-e-circolazione-stradale from rischiList
content = re.sub(r"\s*\{ id: 'consumo-e-circolazione-stradale'.*?\},?\n", "\n", content)

# In rischiDb: update tracce title and merge circolazione content into tracce sections
content = content.replace(
    "    title: 'Tracce del consumo nell\\'organismo',",
    "    title: 'Tracce nell\\'organismo e circolazione stradale',",
    1
)

# Remove consumo-e-circolazione-stradale from rischiDb (its content will be added to tracce intro)
content = re.sub(r"  'consumo-e-circolazione-stradale': \{.*?\n  \},\n", "", content, flags=re.DOTALL)

# Update tracce keywords to include circolazione keywords
content = content.replace(
    "keywords: ['test', 'sangue', 'urine', 'capello', 'patente', 'quanto dura', 'smaltimento', 'rilevabilità']",
    "keywords: ['test', 'sangue', 'urine', 'capello', 'patente', 'quanto dura', 'smaltimento', 'rilevabilità', 'guidare', 'macchina', 'auto', 'ritiro', 'polizia', 'etilometro', 'tolleranza zero']"
)

with open('src/data/rischi.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ All fixes applied to rischi.ts")
