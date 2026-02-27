"""Audit rischi.ts data vs scraped JSON to find gaps."""
import json

d = json.load(open('scraped_rischi.json', 'r', encoding='utf-8'))

for x in d:
    if 'drug-set' in x['path']:
        print('=== DRUG SET SETTING ===')
        for s in x['sections']:
            heading = s.get('heading', '(no heading)')
            content = s.get('content', '')
            items = s.get('items', [])
            print(f"--- SECTION: {heading} ---")
            print(f"Content length: {len(content)} chars")
            print(f"Items: {len(items)} items")
            if content:
                print(content[:300] + '...' if len(content) > 300 else content)
            if items:
                for it in items[:3]:
                    print(f"  • {it[:100]}...")
            print()

print("\n=== COSA FARE EMERGENZA (checking if scraped) ===")
for x in d:
    if 'emergenza' in x['path']:
        print(f"FOUND: {x['path']}")
        for s in x['sections']:
            print(f"  {s.get('heading', '?')}: {len(s.get('content',''))} chars, {len(s.get('items',[]))} items")

print("\n=== CHEMSEX (checking) ===")
for x in d:
    if 'chemsex' in x['path'] or 'desiderio' in x['path']:
        print(f"FOUND: {x['path']}")

print("\n=== ALL PATHS IN rischiList vs scraped ===")
scraped_paths = [x['path'].split('/')[-1] for x in d]
print(f"Scraped: {scraped_paths}")
