export interface QuizQuestion {
    id: number;
    category: 'rdd' | 'farmacologia' | 'mix' | 'legale' | 'emergenze';
    difficulty: 1 | 2 | 3;
    question: string;
    options: string[];
    correct: number; // index
    explanation: string;
    link?: string; // optional link to relevant page
}

export const QUIZ_CATEGORIES: Record<string, { label: string; color: string; emoji: string }> = {
    rdd: { label: 'Riduzione del Danno', color: '#10B981', emoji: '🛡️' },
    farmacologia: { label: 'Farmacologia', color: '#8B5CF6', emoji: '🧬' },
    mix: { label: 'Mix & Interazioni', color: '#EF4444', emoji: '⚠️' },
    legale: { label: 'Aspetti Legali', color: '#F59E0B', emoji: '⚖️' },
    emergenze: { label: 'Emergenze', color: '#EC4899', emoji: '🚑' },
};

export const quizQuestions: QuizQuestion[] = [
    // === RIDUZIONE DEL DANNO ===
    {
        id: 1,
        category: 'rdd',
        difficulty: 1,
        question: 'Qual è la regola fondamentale della riduzione del danno?',
        options: [
            'Non consumare mai sostanze',
            'Informarsi prima di consumare e ridurre i rischi',
            'Consumare solo sostanze legali',
            'Affidarsi al parere degli amici'
        ],
        correct: 1,
        explanation: 'La riduzione del danno non promuove né condanna il consumo: mira a fornire informazioni oggettive per chi sceglie di consumare, aiutandolo a ridurre i rischi per la salute.',
        link: '/rischi'
    },
    {
        id: 2,
        category: 'rdd',
        difficulty: 1,
        question: 'Cosa significa "Set & Setting"?',
        options: [
            'Il dosaggio e la modalità di assunzione',
            'Lo stato d\'animo (set) e l\'ambiente circostante (setting)',
            'La composizione chimica della sostanza',
            'L\'insieme di regole legali'
        ],
        correct: 1,
        explanation: '"Set" è il tuo stato mentale, fisico ed emotivo. "Setting" è l\'ambiente e le persone con cui ti trovi. Entrambi influenzano enormemente l\'esperienza e i rischi.',
        link: '/rischi/drug-set-setting'
    },
    {
        id: 3,
        category: 'rdd',
        difficulty: 2,
        question: 'Perché è importante fare il Drug Checking?',
        options: [
            'Per sapere se la sostanza è legale',
            'Per conoscere la composizione e il dosaggio reale della sostanza',
            'Per ottenere un certificato di qualità',
            'Per registrare il proprio consumo'
        ],
        correct: 1,
        explanation: 'Il Drug Checking analizza la composizione reale delle sostanze, identificando adulteranti pericolosi e dosaggi inattesi. È uno strumento fondamentale di prevenzione.',
        link: '/drugchecking'
    },
    {
        id: 4,
        category: 'rdd',
        difficulty: 2,
        question: 'Dopo aver consumato MDMA, quanto tempo bisognerebbe aspettare prima di riconsumarne?',
        options: [
            '1-2 giorni',
            '1 settimana',
            '3-4 settimane minimo',
            '6 mesi'
        ],
        correct: 2,
        explanation: 'L\'MDMA esaurisce le riserve di serotonina. Il corpo impiega almeno 3-4 settimane per rigenerarle. Consumare troppo frequentemente aumenta i rischi di neurotossicità e depressione.',
        link: '/sostanze/ecstasy-mdma'
    },
    // === FARMACOLOGIA ===
    {
        id: 5,
        category: 'farmacologia',
        difficulty: 1,
        question: 'La caffeina appartiene a quale categoria di sostanze?',
        options: [
            'Psichedelici',
            'Downer',
            'Stimolanti',
            'Dissociativi'
        ],
        correct: 2,
        explanation: 'La caffeina è uno stimolante. Aumenta la vigilanza e riduce la sensazione di stanchezza agendo come antagonista dei recettori dell\'adenosina.',
        link: '/sostanze/caffeina'
    },
    {
        id: 6,
        category: 'farmacologia',
        difficulty: 2,
        question: 'Cosa sono i "downer"?',
        options: [
            'Sostanze che causano euforia intensa',
            'Sostanze con effetto rilassante che rallentano le attività corporee',
            'Sostanze che alterano la percezione sensoriale',
            'Sostanze che aumentano l\'energia'
        ],
        correct: 1,
        explanation: 'I downer (alcol, canapa, eroina, benzodiazepine) distendono i muscoli, riducono l\'ansia e rallentano le funzioni corporee. Hanno un potenziale di dipendenza elevato.',
        link: '/sostanze'
    },
    {
        id: 7,
        category: 'farmacologia',
        difficulty: 2,
        question: 'Cosa significa "tolleranza" in farmacologia?',
        options: [
            'La capacità di accettare gli effetti collaterali',
            'La necessità di aumentare il dosaggio per ottenere lo stesso effetto',
            'La resistenza legale al consumo',
            'La capacità di consumare senza effetti'
        ],
        correct: 1,
        explanation: 'La tolleranza si sviluppa quando il corpo si adatta alla sostanza, richiedendo dosi sempre maggiori per ottenere lo stesso effetto. Questo aumenta significativamente i rischi.'
    },
    {
        id: 8,
        category: 'farmacologia',
        difficulty: 3,
        question: 'Quale neurotrasmettitore è principalmente coinvolto negli effetti empatogeni dell\'MDMA?',
        options: [
            'Dopamina',
            'GABA',
            'Serotonina',
            'Acetilcolina'
        ],
        correct: 2,
        explanation: 'L\'MDMA agisce principalmente favorendo il rilascio massivo di serotonina, responsabile delle sensazioni di empatia, apertura emotiva e connessione con gli altri.',
        link: '/sostanze/ecstasy-mdma'
    },
    {
        id: 9,
        category: 'farmacologia',
        difficulty: 1,
        question: 'L\'alcol appartiene a quale categoria di sostanze psicoattive?',
        options: [
            'Stimolanti',
            'Psichedelici',
            'Downer',
            'Empatogeni'
        ],
        correct: 2,
        explanation: 'L\'alcol è un downer: deprime il sistema nervoso centrale, rallenta i riflessi e riduce le inibizioni. È la sostanza psicoattiva più consumata e una delle più pericolose.',
        link: '/sostanze/alcol'
    },
    {
        id: 10,
        category: 'farmacologia',
        difficulty: 3,
        question: 'Cos\'è la "sindrome serotoninergica"?',
        options: [
            'Un effetto piacevole della serotonina',
            'Una carenza di serotonina nel cervello',
            'Un\'emergenza medica causata da eccesso di serotonina',
            'Un test per misurare la serotonina'
        ],
        correct: 2,
        explanation: 'La sindrome serotoninergica è un\'emergenza potenzialmente letale causata da un eccesso di serotonina, spesso dovuta al mix di MDMA con antidepressivi (SSRI/SNRI) o MAO-inibitori.',
        link: '/rischi/policonsumo'
    },
    // === MIX & INTERAZIONI ===
    {
        id: 11,
        category: 'mix',
        difficulty: 1,
        question: 'Quale mix è considerato particolarmente pericoloso?',
        options: [
            'Cannabis + caffeina',
            'Alcol + GHB/GBL',
            'Tabacco + nicotina',
            'Acqua + vitamine'
        ],
        correct: 1,
        explanation: 'Il mix alcol + GHB/GBL è estremamente pericoloso! Entrambi sono downer e potenziano reciprocamente gli effetti depressivi sul sistema respiratorio, rischiando arresto respiratorio e morte.',
        link: '/rischi/policonsumo'
    },
    {
        id: 12,
        category: 'mix',
        difficulty: 2,
        question: 'Perché mescolare stimolanti e downer è rischioso?',
        options: [
            'Gli effetti si annullano a vicenda',
            'Il corpo riceve segnali contraddittori e i rischi di sovradosaggio aumentano',
            'Non ci sono rischi particolari',
            'Si diventa più sobri'
        ],
        correct: 1,
        explanation: 'Mescolare stimolanti e downer maschera gli effetti dell\'altra sostanza, portando a consumarne di più. Quando una sostanza smette di agire prima dell\'altra, gli effetti residui possono essere pericolosi.',
        link: '/rischi/policonsumo'
    },
    {
        id: 13,
        category: 'mix',
        difficulty: 3,
        question: 'Perché è pericoloso assumere MDMA con antidepressivi SSRI?',
        options: [
            'Gli SSRI annullano gli effetti dell\'MDMA',
            'Il rischio di sindrome serotoninergica potenzialmente letale',
            'Si sviluppa dipendenza più rapidamente',
            'Causa allergie cutanee'
        ],
        correct: 1,
        explanation: 'Gli SSRI bloccano la ricaptazione della serotonina. Combinati con l\'MDMA (che ne causa il rilascio massivo), possono provocare un accumulo pericoloso di serotonina nel cervello → sindrome serotoninergica.',
        link: '/rischi/policonsumo'
    },
    {
        id: 14,
        category: 'mix',
        difficulty: 2,
        question: 'Cosa si rischia mescolando cocaina e alcol?',
        options: [
            'Nessun rischio aggiuntivo',
            'Si forma cocaetilene, una sostanza tossica per il cuore',
            'L\'alcol annulla gli effetti della cocaina',
            'Si diventa più lucidi'
        ],
        correct: 1,
        explanation: 'Quando cocaina e alcol vengono assunti insieme, il fegato produce cocaetilene, una sostanza cardiotossica che aumenta significativamente il rischio di infarto e aritmie.',
        link: '/rischi/policonsumo'
    },
    // === ASPETTI LEGALI ===
    {
        id: 15,
        category: 'legale',
        difficulty: 1,
        question: 'Il Drug Checking in Svizzera è...',
        options: [
            'Illegale e punibile',
            'Legale e offerto come servizio di prevenzione',
            'Disponibile solo con prescrizione medica',
            'Riservato alle forze dell\'ordine'
        ],
        correct: 1,
        explanation: 'In Svizzera il Drug Checking è un servizio di prevenzione legale, offerto da diverse organizzazioni come danno.ch, per analizzare in modo anonimo la composizione delle sostanze.',
        link: '/drugchecking'
    },
    {
        id: 16,
        category: 'legale',
        difficulty: 2,
        question: 'In Svizzera, guidare sotto l\'effetto di cannabis è...',
        options: [
            'Legale sotto i 18 anni',
            'Tollerato con basse quantità',
            'Vietato con tolleranza zero per il THC',
            'Permesso se si ha la patente da più di 5 anni'
        ],
        correct: 2,
        explanation: 'In Svizzera vige la tolleranza zero per il THC nella circolazione stradale. Anche tracce minime nel sangue comportano sanzioni, ritiro della patente e procedimenti penali.',
        link: '/rischi/tracce-consumo-organismo'
    },
    {
        id: 17,
        category: 'legale',
        difficulty: 2,
        question: 'Le "Nuove Sostanze Psicoattive" (NSP) sono chiamate anche...',
        options: [
            'Farmaci da banco',
            'Legal highs / designer drugs',
            'Integratori alimentari',
            'Vitamine sintetiche'
        ],
        correct: 1,
        explanation: 'Le NSP (New Psychoactive Substances) sono dette "legal highs" perché modificano la struttura chimica di sostanze illegali per aggirare la legislazione, ma NON significa che siano sicure.',
        link: '/sostanze/nsp'
    },
    // === EMERGENZE ===
    {
        id: 18,
        category: 'emergenze',
        difficulty: 1,
        question: 'Qual è il numero d\'emergenza da chiamare in Svizzera?',
        options: [
            '112',
            '144',
            '118',
            '911'
        ],
        correct: 1,
        explanation: 'Il 144 è il numero delle urgenze sanitarie in Svizzera. Non esitare MAI a chiamare in caso di emergenza — non ci sono conseguenze legali per chi chiede aiuto.',
        link: '/rischi/emergenze'
    },
    {
        id: 19,
        category: 'emergenze',
        difficulty: 1,
        question: 'Se qualcuno è incosciente ma respira, quale posizione assume?',
        options: [
            'Seduto a gambe incrociate',
            'Posizione di recupero laterale',
            'Supino con le braccia lungo i fianchi',
            'In piedi appoggiato al muro'
        ],
        correct: 1,
        explanation: 'La posizione laterale di sicurezza impedisce il soffocamento per aspirazione del vomito. Metti la persona su un fianco con la bocca verso il basso e chiama immediatamente il 144.',
        link: '/rischi/emergenze'
    },
    {
        id: 20,
        category: 'emergenze',
        difficulty: 2,
        question: 'In caso di sospetto colpo di calore (ipertermia), cosa fare?',
        options: [
            'Dare alcol per raffreddare il corpo',
            'Spostare in un luogo fresco, bagnare con acqua, chiamare il 144',
            'Far muovere la persona per far circolare il sangue',
            'Dare caffeina per tenerla sveglia'
        ],
        correct: 1,
        explanation: 'L\'ipertermia è un\'emergenza comune con MDMA e stimolanti in ambienti caldi. Spostare in luogo fresco, bagnare con acqua tiepida (non ghiacciata), far bere acqua a piccoli sorsi e chiamare subito il 144.',
        link: '/rischi/emergenze'
    },
    {
        id: 21,
        category: 'emergenze',
        difficulty: 3,
        question: 'In caso di overdose da oppiacei, quale farmaco può salvare la vita?',
        options: [
            'Adrenalina',
            'Naloxone (Narcan)',
            'Aspirina',
            'Diazepam'
        ],
        correct: 1,
        explanation: 'Il Naloxone (Narcan) è un antagonista degli oppiacei che può invertire rapidamente un\'overdose da eroina o fentanyl. È disponibile come spray nasale ed è fondamentale averlo a disposizione.',
        link: '/rischi/emergenze'
    },
    {
        id: 22,
        category: 'rdd',
        difficulty: 1,
        question: 'Qual è il modo più sicuro per provare una nuova sostanza?',
        options: [
            'Prendere una dose piena subito',
            'Iniziare con una dose ridotta (allergy test) e aspettare gli effetti',
            'Prendere due sostanze insieme per confrontare',
            'Fidarsi di chi te la vende'
        ],
        correct: 1,
        explanation: 'Inizia SEMPRE con una dose ridotta (allergy test) quando provi qualcosa di nuovo. Aspetta gli effetti completi prima di eventualmente ridosare. Ogni corpo reagisce diversamente.',
        link: '/rischi'
    },
    {
        id: 23,
        category: 'farmacologia',
        difficulty: 3,
        question: 'I recettori GABA sono il bersaglio principale di quali sostanze?',
        options: [
            'LSD e funghi',
            'Benzodiazepine, alcol e GHB',
            'Cocaina e anfetamine',
            'MDMA e MDA'
        ],
        correct: 1,
        explanation: 'I recettori GABA-A sono potenziati da benzodiazepine, alcol, GHB e barbiturici. Il GABA è il principale neurotrasmettitore inibitorio — ecco perché queste sostanze causano sedazione e rilassamento.',
    },
    {
        id: 24,
        category: 'mix',
        difficulty: 3,
        question: 'Perché il mix MDMA + alcol è sconsigliato?',
        options: [
            'L\'alcol riduce gli effetti dell\'MDMA',
            'L\'MDMA maschera l\'intossicazione alcolica, rischio disidratazione e ipertermia',
            'Non ci sono rischi particolari',
            'L\'MDMA neutralizza l\'alcol nel sangue'
        ],
        correct: 1,
        explanation: 'L\'MDMA riduce la percezione dell\'ubriachezza, portando a bere di più. Inoltre entrambe le sostanze favoriscono la disidratazione e l\'ipertermia, aumentando il rischio di colpo di calore.',
        link: '/rischi/policonsumo'
    },
    {
        id: 25,
        category: 'emergenze',
        difficulty: 2,
        question: 'Quando NON bisogna esitare a chiamare il 144?',
        options: [
            'Solo quando qualcuno perde conoscenza',
            'Mai, per evitare problemi legali',
            'Sempre in caso di dubbio — meglio una chiamata in più che una vita in meno',
            'Solo se si è maggiorenni'
        ],
        correct: 2,
        explanation: 'Il personale medico è tenuto al segreto professionale. Non ci sono conseguenze legali per chi chiede aiuto. Una chiamata può salvare una vita. Non esitare MAI.',
        link: '/rischi/emergenze'
    },
];
