"""Restructure Safer Sex article with proper sections in rischi.ts"""

with open('src/data/rischi.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the entire safer-sex entry
old_start = "  'safer-sex': {"
old_end_marker = "  'safer-sniffing': {"

idx_start = content.index(old_start)
idx_end = content.index(old_end_marker)

new_safer_sex = """  'safer-sex': {
    id: 'safer-sex',
    title: 'Safer Sex',
    keywords: ['sesso', 'preservativo', 'malattie', 'HIV', 'MST', 'gravidanza', 'infezioni', 'rapporto', 'consenso', 'PEP', 'chemsex'],
    intro: 'Le sostanze psicoattive possono aumentare la propensione al rischio e il desiderio sessuale. Fare l\\'amore è fonte di piacere e fa bene alla salute, ma una persona sessualmente attiva corre anche dei rischi, soprattutto sotto l\\'effetto di sostanze psicoattive.\\n\\n«Safer sex» non significa solamente contraccezione ma proteggersi dalle infezioni sessualmente trasmissibili come l\\'HIV, epatite, sifilide, gonorrea, clamidia e altre infezioni.',
    sections: [
      { heading: 'Regole fondamentali', content: 'Anche sotto l\\'effetto di sostanze psicoattive, bisogna sempre usare il preservativo nei rapporti sessuali con penetrazione. Il preservativo offre la migliore protezione contro le infezioni sessualmente trasmissibili e protegge anche da una gravidanza indesiderata.', items: ['Durante i rapporti orali, sperma e sangue mestruale non devono entrare in contatto con la bocca.', 'In caso di uso comune di «sex toys» usate il preservativo.', 'Ecstasy, speed, LSD e cocaina disidratano le mucose (rischio di rottura del preservativo). Usare sempre un preservativo e del lubrificante.', 'In caso di penetrazioni anali o di rapporti sessuali prolungati sostituire il preservativo e usare del lubrificante.', 'In caso di prurito, bruciore o perdite, occorre consultare un medico.'] },
      { heading: 'Sostanze e rischio sessuale', content: 'Alcune sostanze aumentano particolarmente i comportamenti sessuali a rischio:', items: ['Alcol: la disinibizione e la fiducia in se stessi aumentano la propensione al rischio. Il consumo eccessivo di alcol è spesso causa di rapporti sessuali non protetti. L\\'alcol è anche usato per assoggettare persone a scopo sessuale.', 'GHB/GBL: l\\'effetto disinibitorio e l\\'aumento del desiderio sessuale aumentano il rischio. A dosi elevate, rischio di aggressione sessuale («gocce KO», «droga da stupro»).', 'Popper: i comportamenti a rischio aumentano a causa dei suoi effetti antidolorifici e afrodisiaci.', 'Ketamina: i comportamenti a rischio aumentano a causa dell\\'effetto narcotico e della perdita del senso della realtà.', 'Metanfetamina (crystal meth): aumento dei comportamenti a rischio dovuti all\\'effetto stimolante, antidolorifico, afrodisiaco e all\\'aumento della fiducia in se stessi.', 'Cocaina: rischi dovuti alla disinibizione, all\\'effetto antidolorifico e all\\'aumento della fiducia in se stessi.'] },
      { heading: 'Consenso e protezione', content: 'ATTENZIONE: oltre a quelle citate, esistono anche altre sostanze che favoriscono l\\'assunzione di comportamenti sessuali a rischio!', items: ['Consumare sostanze psicoattive solo di comune accordo.', 'Prima del rapporto, parlare delle sostanze che si intendono consumare e dei dosaggi.', 'Chiarire con il partner quali sono le pratiche sessuali «OK» e quelle tabù.', 'Concordare un «segnale di stop» per dire al partner quando si va troppo oltre.', 'Non assumere quantità tali da impedire di capire i segnali del partner.', 'Se qualcuno ti molesta e non smette nemmeno dopo un chiaro «no», informa la sicurezza. Fai attenzione alle persone che cercano di sedurti offrendoti da bere o delle sostanze: watch out your drink!'] },
      { heading: 'In caso di emergenza', content: 'Se sei vittima di violenza sessuale, vai subito in ospedale per degli accertamenti e rivolgiti al Servizio per l\\'aiuto alle vittime di reato.', items: ['In caso di rapporti sessuali non protetti o di rottura del preservativo, potresti aver contratto il virus HIV o un\\'altra infezione sessualmente trasmissibile (IST).', 'La profilassi post esposizione (PEP) può ridurre il rischio d\\'infezione da HIV, ma deve essere fatta possibilmente entro 72 ore.', 'In Ticino, è possibile rivolgersi al Servizio di malattie infettive dell\\'Ospedale Civico di Lugano o al pronto soccorso dell\\'ospedale più vicino.', 'Le donne potrebbero dover fare i conti con gravidanze indesiderate. La «pillola del giorno dopo» può essere richiesta in farmacia, al medico, al ginecologo o nei Centri di pianificazione familiare.', 'Osserva il tuo corpo: se noti dei cambiamenti (secrezioni, cambiamenti della pelle, prurito) consulta subito un medico.'] },
    ],
  },
"""

content = content[:idx_start] + new_safer_sex + content[idx_end:]

with open('src/data/rischi.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Safer Sex restructured with 4 proper sections")
