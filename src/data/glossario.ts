// Glossario farmacologico e di riduzione del danno
// Curated from danno.ch substance/rischi data + pharmacological references

export interface GlossarioTerm {
    id: string;
    term: string;
    definition: string;
    category: 'farmacologia' | 'rischi' | 'safer-use' | 'legale' | 'medico';
    relatedTerms?: string[];
}

export const GLOSSARIO_CATEGORIES: Record<string, { label: string; color: string }> = {
    'farmacologia': { label: 'Farmacologia', color: '#8b5cf6' },
    'rischi': { label: 'Rischi', color: '#ef4444' },
    'safer-use': { label: 'Safer Use', color: '#22c55e' },
    'legale': { label: 'Legale', color: '#f59e0b' },
    'medico': { label: 'Medico', color: '#3b82f6' },
};

export const glossarioTerms: GlossarioTerm[] = [
    {
        id: 'bad-trip',
        term: 'Bad Trip',
        definition: 'Esperienza negativa e angosciante sotto l\'effetto di sostanze psichedeliche o altre sostanze psicoattive. Può manifestarsi con ansia, panico, paranoia, allucinazioni terrificanti e senso di perdita di controllo. In caso di bad trip, è importante restare vicini alla persona, parlarle con calma e portarla in un luogo tranquillo.',
        category: 'rischi',
        relatedTerms: ['set-setting', 'psichedelici', 'talk-down'],
    },
    {
        id: 'craving',
        term: 'Craving',
        definition: 'Desiderio compulsivo e irrefrenabile di consumare una sostanza psicoattiva. Il craving è uno dei sintomi principali della dipendenza e può essere scatenato da stimoli ambientali, emotivi o sociali associati al consumo. Si manifesta sia a livello fisico che psicologico.',
        category: 'farmacologia',
        relatedTerms: ['dipendenza', 'tolleranza', 'astinenza'],
    },
    {
        id: 'dipendenza',
        term: 'Dipendenza',
        definition: 'Condizione in cui il consumo di una sostanza diventa compulsivo nonostante le conseguenze negative. Si distinguono la dipendenza fisica (il corpo si adatta alla sostanza e reagisce alla sua assenza con sintomi di astinenza) e la dipendenza psicologica (bisogno emotivo e comportamentale della sostanza). La velocità con cui si sviluppa dipende dalla sostanza, dalla frequenza di consumo e dalla predisposizione individuale.',
        category: 'medico',
        relatedTerms: ['craving', 'tolleranza', 'astinenza'],
    },
    {
        id: 'dopamina',
        term: 'Dopamina',
        definition: 'Neurotrasmettitore coinvolto nei meccanismi del piacere, della motivazione e della ricompensa. Molte sostanze psicoattive (cocaina, anfetamine, ecstasy) agiscono aumentando i livelli di dopamina nel cervello, producendo sensazioni di euforia. L\'esaurimento della dopamina dopo il consumo è responsabile del «down» e dei sentimenti depressivi post-consumo.',
        category: 'farmacologia',
        relatedTerms: ['serotonina', 'noradrenalina', 'neurotrasmettitore'],
    },
    {
        id: 'downer',
        term: 'Downer (Depressore)',
        definition: 'Sostanza che rallenta l\'attività del sistema nervoso centrale. I downer riducono la frequenza cardiaca, la respirazione e l\'attività cerebrale, producendo effetti sedativi, rilassanti e ansiolitici. Includono alcol, benzodiazepine, GHB/GBL, oppiacei e ketamina. Il mix di più downer è estremamente pericoloso e può causare arresto respiratorio.',
        category: 'farmacologia',
        relatedTerms: ['upper', 'policonsumo', 'overdose'],
    },
    {
        id: 'drug-checking',
        term: 'Drug Checking',
        definition: 'Servizio di analisi chimica che permette di verificare la composizione e la purezza delle sostanze psicoattive. In Svizzera è disponibile presso il DIZ (Drogeninformationszentrum, Zurigo) e il DIB+ (Drogen Info Plus, Berna). L\'analisi identifica il principio attivo, il dosaggio e la presenza di sostanze di taglio o contaminanti pericolosi. È uno degli strumenti più efficaci di riduzione del danno.',
        category: 'safer-use',
        relatedTerms: ['composizione', 'taglio', 'purezza'],
    },
    {
        id: 'drug-set-setting',
        term: 'Drug, Set & Setting',
        definition: 'I tre fattori che determinano gli effetti del consumo: Drug (la sostanza, la sua composizione e dosaggio), Set (lo stato fisico e mentale del consumatore, umore, aspettative, salute) e Setting (il contesto ambientale, il luogo, le persone presenti). L\'interazione di questi tre fattori influenza decisamente l\'esperienza e i rischi.',
        category: 'safer-use',
        relatedTerms: ['bad-trip', 'safer-use'],
    },
    {
        id: 'flashback',
        term: 'Flashback',
        definition: 'Rivivere spontaneamente, a distanza di tempo, gli effetti di un\'esperienza con sostanze psichedeliche, senza averle consumate nuovamente. I flashback possono verificarsi giorni, settimane o mesi dopo il consumo e sono generalmente brevi. In rari casi possono diventare frequenti e disturbanti (HPPD - Hallucinogen Persisting Perception Disorder).',
        category: 'rischi',
        relatedTerms: ['psichedelici', 'bad-trip'],
    },
    {
        id: 'hangover',
        term: 'Hangover (Down)',
        definition: 'Periodo di malessere che segue il consumo di sostanze psicoattive. È causato dall\'esaurimento dei neurotrasmettitori (serotonina, dopamina) e dallo stress fisico del consumo. I sintomi includono stanchezza, irritabilità, sentimenti depressivi, mancanza di motivazione, difficoltà di concentrazione e insonnia. Il recupero richiede riposo, alimentazione sana e idratazione.',
        category: 'rischi',
        relatedTerms: ['serotonina', 'dopamina', 'chill-out'],
    },
    {
        id: 'lstup',
        term: 'LStup (Legge sugli stupefacenti)',
        definition: 'La Legge federale sugli stupefacenti e sulle sostanze psicotrope è il quadro normativo svizzero che disciplina la produzione, il commercio, il possesso e il consumo di sostanze stupefacenti. L\'acquisto, il possesso, la produzione e la vendita della maggior parte delle sostanze psicoattive sono punibili. Il possesso fino a 10 grammi di canapa per maggiorenni è punito con una multa disciplinare di CHF 100.-.',
        category: 'legale',
        relatedTerms: ['tolleranza-zero'],
    },
    {
        id: 'neurotrasmettitore',
        term: 'Neurotrasmettitore',
        definition: 'Molecola segnale che trasmette informazioni tra le cellule nervose (neuroni) nel cervello. I principali neurotrasmettitori coinvolti negli effetti delle sostanze psicoattive sono: serotonina (umore, emozioni), dopamina (piacere, motivazione), noradrenalina (stress, vigilanza), GABA (inibizione, rilassamento) e endorfine (dolore, piacere). Le sostanze psicoattive alterano l\'equilibrio di questi messaggeri chimici.',
        category: 'farmacologia',
        relatedTerms: ['dopamina', 'serotonina', 'noradrenalina'],
    },
    {
        id: 'noradrenalina',
        term: 'Noradrenalina',
        definition: 'Neurotrasmettitore coinvolto nella risposta allo stress, nella vigilanza e nell\'attenzione. L\'anfetamina e la metanfetamina aumentano i livelli di noradrenalina, incrementando la frequenza cardiaca, la pressione sanguigna e lo stato di allerta. L\'eccesso di noradrenalina contribuisce all\'ansia, al panico e allo stress cardiovascolare.',
        category: 'farmacologia',
        relatedTerms: ['dopamina', 'serotonina', 'neurotrasmettitore'],
    },
    {
        id: 'nsp',
        term: 'NSP (Nuove Sostanze Psicoattive)',
        definition: 'Composti sintetici progettati per imitare gli effetti delle sostanze psicoattive tradizionali, spesso non ancora classificati nella legislazione sugli stupefacenti. Conosciute anche come «research chemicals» o «legal highs», sono particolarmente pericolose perché le informazioni sui loro effetti, dosaggi e rischi sono molto scarse. Frequenti le false dichiarazioni e gli errori di etichettaggio.',
        category: 'rischi',
        relatedTerms: ['drug-checking', 'composizione'],
    },
    {
        id: 'overdose',
        term: 'Overdose (Sovradosaggio)',
        definition: 'Assunzione di una quantità eccessiva di sostanza che provoca una reazione tossica nell\'organismo, potenzialmente letale. I sintomi variano in base alla sostanza: perdita di coscienza, arresto respiratorio (oppiacei), ipertermia e convulsioni (stimolanti), coma (depressori). In caso di sospetta overdose, chiamare immediatamente il 144 e informare i soccorritori sulle sostanze consumate.',
        category: 'medico',
        relatedTerms: ['emergenza', 'policonsumo'],
    },
    {
        id: 'policonsumo',
        term: 'Policonsumo',
        definition: 'Consumo combinato di due o più sostanze psicoattive in un breve periodo di tempo. Gli effetti della combinazione sono imprevedibili e non corrispondono alla somma dei singoli effetti (1+1≠2). Il policonsumo sovraccarica il corpo, in particolare il fegato e i reni, e aumenta significativamente il rischio di effetti collaterali gravi, overdose e morte.',
        category: 'rischi',
        relatedTerms: ['cocaetilene', 'downer', 'upper'],
    },
    {
        id: 'psichedelici',
        term: 'Psichedelici (Allucinogeni)',
        definition: 'Classe di sostanze che alterano profondamente la percezione, il pensiero e le emozioni, spesso producendo allucinazioni visive e uditive, sinestesie e modifiche del senso del tempo e dello spazio. Includono LSD, psilocibina (funghi magici), mescalina, DMT e 2C-B. Agiscono principalmente sul sistema della serotonina. Gli effetti dipendono fortemente dal «set» e dal «setting».',
        category: 'farmacologia',
        relatedTerms: ['serotonina', 'bad-trip', 'flashback', 'drug-set-setting'],
    },
    {
        id: 'psicoattivo',
        term: 'Psicoattivo',
        definition: 'Aggettivo che descrive qualsiasi sostanza in grado di modificare le funzioni cerebrali, alterando percezioni, umore, coscienza, cognizione o comportamento. Include sostanze legali (caffeina, alcol, nicotina, farmaci) e illegali (cocaina, ecstasy, LSD, eroina). L\'effetto psicoattivo è il risultato dell\'interazione della sostanza con i neurotrasmettitori cerebrali.',
        category: 'farmacologia',
        relatedTerms: ['neurotrasmettitore', 'droga'],
    },
    {
        id: 'safer-use',
        term: 'Safer Use',
        definition: 'Insieme di raccomandazioni e comportamenti volti a ridurre i rischi legati al consumo di sostanze psicoattive. Include: informarsi sulla sostanza e i suoi effetti, testare con una piccola dose, evitare il policonsumo, bere acqua regolarmente, non guidare, informare gli amici, utilizzare materiale sterile per lo sniffo o l\'iniezione, e prevedere tempo per il recupero.',
        category: 'safer-use',
        relatedTerms: ['drug-set-setting', 'drug-checking', 'safer-sniffing'],
    },
    {
        id: 'serotonina',
        term: 'Serotonina',
        definition: 'Neurotrasmettitore che regola l\'umore, le emozioni, il sonno, l\'appetito e la temperatura corporea. L\'ecstasy (MDMA) provoca un massiccio rilascio di serotonina, responsabile degli effetti empatici ed euforici. Il successivo deficit di serotonina causa il «down» post-consumo. La combinazione di sostanze serotoninergiche (ecstasy + antidepressivi SSRI/MAO-inibitori) può provocare una sindrome serotoninergica potenzialmente letale.',
        category: 'farmacologia',
        relatedTerms: ['dopamina', 'noradrenalina', 'neurotrasmettitore', 'hangover'],
    },
    {
        id: 'sindrome-serotoninergica',
        term: 'Sindrome Serotoninergica',
        definition: 'Condizione potenzialmente letale causata da un eccesso di serotonina nel cervello. Si verifica tipicamente combinando ecstasy/MDMA con antidepressivi (SSRI, MAO-inibitori) o altre sostanze serotoninergiche. I sintomi includono agitazione, confusione, tachicardia, ipertermia, tremori, convulsioni e, nei casi gravi, collasso cardiocircolatorio e morte. Richiede intervento medico immediato (tel. 144).',
        category: 'medico',
        relatedTerms: ['serotonina', 'policonsumo', 'overdose'],
    },
    {
        id: 'talk-down',
        term: 'Talk Down',
        definition: 'Tecnica di supporto verbale utilizzata per aiutare una persona durante un bad trip o un attacco di panico. Consiste nel parlare con tono calmo e rassicurante, mantenere un contatto fisico (se la persona lo consente), ricordare che gli effetti sono temporanei e dovuti alla sostanza, e guidare il pensiero verso immagini positive. Non lasciare mai sola la persona.',
        category: 'safer-use',
        relatedTerms: ['bad-trip', 'emergenza'],
    },
    {
        id: 'tolleranza',
        term: 'Tolleranza',
        definition: 'Fenomeno per cui l\'organismo si adatta alla presenza di una sostanza, richiedendo dosi sempre più elevate per ottenere gli stessi effetti. La tolleranza si sviluppa con il consumo regolare e varia da sostanza a sostanza. È il primo stadio verso la dipendenza fisica. Fare pause regolari di consumo («quaresima») aiuta a ridurre la tolleranza.',
        category: 'farmacologia',
        relatedTerms: ['dipendenza', 'astinenza', 'craving'],
    },
    {
        id: 'tolleranza-zero',
        term: 'Tolleranza Zero',
        definition: 'Principio legale svizzero secondo cui la guida sotto l\'effetto di qualsiasi sostanza stupefacente è vietata, indipendentemente dalla quantità. Un test positivo comporta l\'immediata revoca della licenza di condurre. In caso d\'incidente, l\'assicurazione non copre i costi. Per l\'alcol, il limite è 0.0‰ per i neopatentati e 0.5‰ per gli altri conducenti.',
        category: 'legale',
        relatedTerms: ['lstup'],
    },
    {
        id: 'upper',
        term: 'Upper (Stimolante)',
        definition: 'Sostanza che accelera l\'attività del sistema nervoso centrale. Gli stimolanti aumentano la frequenza cardiaca, la pressione sanguigna, la temperatura corporea e l\'attività cerebrale, producendo sensazioni di energia, euforia e lucidità. Includono cocaina, anfetamine (speed), metanfetamina (crystal meth), ecstasy (MDMA) e catinoni. Il sovraccarico cardiovascolare è il rischio principale.',
        category: 'farmacologia',
        relatedTerms: ['downer', 'dopamina', 'noradrenalina'],
    },
    {
        id: 'astinenza',
        term: 'Astinenza (Sindrome di)',
        definition: 'Insieme di sintomi fisici e psicologici che si manifestano quando si interrompe o riduce bruscamente il consumo di una sostanza da cui si è diventati dipendenti. I sintomi variano in base alla sostanza: tremori, sudorazione, nausea (alcol); dolori muscolari, diarrea (oppiacei); irritabilità, insonnia (stimolanti). La sindrome di astinenza da alcol e benzodiazepine può essere pericolosa e richiede supervisione medica.',
        category: 'medico',
        relatedTerms: ['dipendenza', 'tolleranza', 'craving'],
    },
    {
        id: 'cocaetilene',
        term: 'Cocaetilene',
        definition: 'Sostanza tossica che si forma nel fegato quando cocaina e alcol vengono assunti contemporaneamente. Il cocaetilene ha effetti cardiotossici superiori a quelli della cocaina stessa, aumentando significativamente il rischio di morte improvvisa, aritmie e infarto. La combinazione cocaina-alcol è una delle cause più frequenti di ricovero ospedaliero legato al consumo di sostanze.',
        category: 'rischi',
        relatedTerms: ['policonsumo', 'overdose'],
    },
];

// Build a lookup map for quick access
export const glossarioDb: Record<string, GlossarioTerm> = {};
for (const term of glossarioTerms) {
    glossarioDb[term.id] = term;
}
