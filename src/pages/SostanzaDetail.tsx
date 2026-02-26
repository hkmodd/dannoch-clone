import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Info, ShieldCheck } from 'lucide-react';

export function SostanzaDetail() {
  const { id } = useParams();

  // Expanded database with accurate harm reduction data
  const db: Record<string, any> = {
    '2-fa-3-fa-4-fa': {
      name: '2-FA / 3-FA / 4-FA',
      aka: 'Fluoroanfetamina',
      class: 'Stimolanti / NSP',
      duration: '2-FA: 1-2 ore | 3-FA: 4-6 ore | 4-FA: 4-8 ore',
      onset: '2-FA: 5-20 min | 3-FA/4-FA: 30-90 min',
      effects: 'Euforia, aumento dell’attenzione, riduzione del bisogno di dormire e dell’appetito, aumento del bisogno di parlare. In generale, gli effetti sono simili a quelli dell\'anfetamina (speed) o della metanfetamina. La 4-FA agisce inoltre sul sistema serotoninergico provocando effetti empatogeni e entactogeni simili a quelli dell’ecstasy.',
      risks: 'I rischi e gli effetti collaterali sono in gran parte sconosciuti. I consumatori parlano di allucinazioni visive e uditive, aggressività, sudorazione e insonnia. Il consumo regolare di dosi elevate può provocare psicosi, spesso provocate anche dalla mancanza di sonno. È inoltre possibile sviluppare una dipendenza con sintomi prevalentemente psichici.',
      saferUse: [
        'Dosare con prudenza, aspettare almeno 1 ora e valutare gli effetti.',
        'Consumare solo in un ambiente a proprio agio e in compagnia di altre persone (buon «setting»).',
        'Informare le persone presenti della sostanza e del dosaggio che si intende consumare.',
        'Bere acqua o bibite isotoniche a sufficienza (5dl ogni ora) e prendere aria fresca.',
        'Quando gli effetti svaniscono, bisogna accettare la discesa. Ricaricare non permette di raggiungere gli effetti desiderati.',
        'A causa della mancanza d’informazioni sulle interazioni, rinunciare al policonsumo (alcol compreso).'
      ]
    },
    '2cb': {
      name: '2C-B / 2C-X',
      aka: 'Nexus',
      class: 'Psichedelici',
      duration: 'Circa 4 – 8 ore',
      onset: 'Ingerito 30-60 min | Sniffato 5-10 min',
      effects: 'Le percezioni e le sensazioni diventano più intense, leggera euforia, il desiderio sessuale può aumentare. A partire da 15-20 mg, gli effetti sono per lo più allucinogeni. Le barriere tra mondo interiore e esteriore si dissolvono. Spesso si percepiscono fugaci motivi colorati e campi luminosi. Con la musica, sovrapposizione dell’udito e della vista.',
      risks: 'Dilatazione delle pupille, aumento della pressione sanguigna, convulsioni, vertigini, nausea. La temperatura corporea può cambiare sgradevolmente. In caso di sovradosaggio si verificano perdita d’orientamento, stati confusionali, ansia, paura di morire. Il consumo regolare può provocare depressione e stati di paura.',
      saferUse: [
        'Tieni conto di «set» e «setting»: consuma solo in luoghi in cui ti senti sicuro e a tuo agio.',
        'Non assumere mai 2C-B da solo.',
        'Non aumentare la dose, prudenza con i dosaggi (2 mg fanno la differenza).',
        'Non mischiare con alcol e medicamenti (in particolare MAO-inibitori)! La combinazione con ecstasy può provocare convulsioni.',
        'Se sniffi, rispetta le regole del «safer sniffing». Attenzione: provoca un doloroso bruciore al naso!'
      ]
    },
    'alcol': {
      name: 'Alcol',
      aka: 'Etanolo, Booze',
      class: 'Downer',
      duration: 'Smaltimento: 0.1-0.15‰ all\'ora',
      onset: '30-60 min',
      effects: 'Effetto stimolante, rilassamento, disinibizione, euforia. A dosi elevate, riduce le capacità di reazione e provoca eccessi di fiducia in sé stessi, loquacità, irritabilità e aggressività.',
      risks: 'Disturbi dell’equilibrio, della parola e della vista. Alto rischio d’incidenti. Con dosi molto elevate (3-4‰): surriscaldamento o ipotermia, coma, morte. Il "binge drinking" può provocare un\'intossicazione rapida con soppressione dei riflessi vitali (soffocamento da vomito). L’alcol può generare forte dipendenza fisica e psichica ed è un co-cancerogeno.',
      saferUse: [
        'Non bere per noia o quando sei triste.',
        'Bere lentamente per fare in modo che rimanga un piacere.',
        'Non bere a stomaco vuoto.',
        'Evitare di mischiare bevande alcoliche e bevi acqua regolarmente (un bicchiere d’acqua dopo ogni drink).',
        'Rinunciare al consumo di alcol se si usano altre sostanze psicoattive (es. alcol+GHB = rischio di soffocamento).',
        'Chi beve non guida.'
      ]
    },
    'speed': {
      name: 'Anfetamina-Speed',
      aka: 'Speed, Pep, Pasta',
      class: 'Stimolanti',
      duration: '6 – 12 ore',
      onset: 'Sniffata 2-10 min | Ingerita 30-45 min',
      effects: 'Il rilascio di noradrenalina aumenta le prestazioni e la dopamina aumenta la fiducia in se stessi. Aumento della temperatura corporea, soppressione della fame e del sonno, sensazione di maggiore efficienza, euforia e loquacità.',
      risks: 'Tremolio, agitazione, nausea, tachicardia, disturbi del sonno, irritabilità, aggressività. Ad alti dosaggi: allucinazioni, arresto circolatorio, ictus, infarto. Pericolo di surriscaldamento (fino a 41°C) e disidratazione. Sviluppo di forte dipendenza psichica, carenze di calcio, psicosi e danni agli organi con uso cronico.',
      saferUse: [
        'Far analizzare la sostanza (drug checking). La purezza varia moltissimo.',
        'Prima di consumare, chiediti quanto tempo vuoi rimanere sveglio.',
        'La modalità meno rischiosa è l’ingestione («bömbeli»).',
        'La pasta di anfetamina deve essere fatta seccare perché contiene solventi tossici.',
        'Bevi acqua a sufficienza (5 dl ogni ora) e mangia dopo il consumo.',
        'Fai pause di alcune settimane tra un consumo e l\'altro.'
      ]
    },
    'anfetamina-speed-e-prodotti-di-taglio': {
      name: 'Speed e Prodotti di Taglio',
      aka: 'Taglio dello Speed',
      class: 'Informazione',
      duration: 'Variabile',
      onset: 'Variabile',
      effects: 'L’anfetamina è generalmente tagliata con caffeina e altre sostanze. Visivamente è impossibile distinguere la purezza. I prodotti di taglio più frequenti sono caffeina, fenilacetone, 4-metilanfetamina (4-MeA) e sottoprodotti di sintesi.',
      risks: 'La 4-MeA può provocare una pericolosa sindrome serotoninergica letale. La caffeina aumenta il rischio di disidratazione e tachicardia. I solventi (fenilacetone) nelle paste danneggiano gravemente le mucose. La variabilità della purezza porta spesso a sovradosaggio involontario.',
      saferUse: [
        'Fai sempre analizzare la sostanza (Drug Checking).',
        'Fai seccare sempre la pasta prima di consumarla per far evaporare i solventi tossici.',
        'Non assumere mai dosi elevate supponendo che la purezza sia bassa.',
        'Evita il mix con altre sostanze stimolanti.'
      ]
    },
    'benzodiazepine': {
      name: 'Benzodiazepine',
      aka: 'Valium, Xanax, Lexotan, Benzo',
      class: 'Downer',
      duration: '1.5 - 48 ore (dipende dal farmaco)',
      onset: 'Circa 15 min',
      effects: 'In caso di agitazione e ansia, hanno un effetto calmante, soporifero e di rilassamento muscolare. Ad alti dosaggi provocano intorpidimento, sonnolenza, vuoti di memoria.',
      risks: 'Rischio di crisi convulsive o epilettiche. In caso di consumo prolungato: elevato potenziale di dipendenza con sintomi fisici e psichici. L\'astinenza è potenzialmente mortale (delirium tremens, convulsioni).',
      saferUse: [
        'Assumere solo su prescrizione medica.',
        'I mix di medicamenti o con alcol/GHB/eroina possono essere fatali (arresto respiratorio).',
        'Non interrompere bruscamente l\'assunzione dopo un uso prolungato, ma scalare le dosi con un medico.',
        'Non guidare sotto l\'effetto di benzo.'
      ]
    },
    'caffeina': {
      name: 'Caffeina',
      aka: 'Caffè, Energy Drink, Guaranà',
      class: 'Stimolanti',
      duration: '1.5 - 5 ore',
      onset: '5 - 10 min',
      effects: 'Rende vigili, velocizza il battito cardiaco, aumenta temporaneamente le prestazioni. A dosaggi elevati (300-400mg) provoca euforia.',
      risks: 'Palpitazioni, irrequietezza, disidratazione. Alte dosi: sudorazione, urgenza minzionale, aritmie, tremori, insonnia. Il consumo regolare causa dipendenza fisica (astinenza: mal di testa, stanchezza). Il mix con analgesici può causare danni ai reni.',
      saferUse: [
        'Non assumere caffeina pura sintetica, ma piuttosto caffè o bevande.',
        'Attenzione: la caffeina in polvere è spesso venduta come speed o usata come taglio.',
        'Evita il mix con altri stimolanti (anfetamina, MDMA) per non sovraccaricare il cuore.',
        'Bevi acqua per compensare l\'effetto diuretico.'
      ]
    },
    'cannabis': {
      name: 'Canapa (THC)',
      aka: 'Erba, Hashish, Olio, Maria',
      class: 'Psichedelici / Downer',
      duration: 'Fumata: 1-2 ore | Ingerita: 8-14 ore',
      onset: 'Fumata: Pochi min | Ingerita: 1-2 ore',
      effects: 'Rilassa, calma, stimola l’appetito, intensifica i sentimenti, porta a stati d’estrema euforia. La percezione del tempo rallenta. Dosi elevate o prodotti con poco CBD possono avere effetti allucinogeni.',
      risks: 'Tachicardia, occhi rossi, bocca secca. Vertigini e nausea (specie le prime volte). A dosi elevate: collasso circolatorio, paranoia, crisi depressive. A lungo termine: dipendenza psicologica, problemi di memoria a breve termine, apatia, danni polmonari (se fumata).',
      saferUse: [
        'Se ingerita (space cake), gli effetti tardano ad arrivare: non ridosare per impazienza!',
        'Usa un vaporizzatore per evitare i danni della combustione.',
        'Evita l\'uso quotidiano e non fumare solo indoor.',
        'Non fumare se non stai bene psicologicamente (rischio psicosi latenti).',
        'Fuma puro o con alternative al tabacco per evitare la dipendenza da nicotina.'
      ]
    },
    'canapa-cbd': {
      name: 'Canapa CBD',
      aka: 'Canapa Light, Erba Legale',
      class: 'Downer',
      duration: 'Fumata: 1-4 ore | Ingerita: 8-14 ore',
      onset: 'Fumata: Pochi min | Ingerita: 1-2 ore',
      effects: 'Non ha effetti psicotropi e non provoca ebbrezza. Sensazione di rilassamento corporeo. Il CBD può avere effetti stabilizzanti sull’umore.',
      risks: 'Effetti nocivi legati alla combustione (se fumata). In combinazione con il tabacco, rischio di dipendenza dalla nicotina. Attenzione: può far risultare positivi ai test antidroga stradali a causa delle tracce residue di THC (<1%).',
      saferUse: [
        'Usa un vaporizzatore per evitare i danni ai polmoni.',
        'Non guidare subito dopo aver fumato grandi quantità (rischio test positivo al THC).',
        'Attenzione all\'ingestione: gli effetti sono più lunghi e imprevedibili.',
        'Può essere usata come sostituto per ridurre il consumo di THC o tabacco.'
      ]
    },
    'cannabinoidi-sintetici': {
      name: 'Cannabinoidi Sintetici',
      aka: 'Spice, Legal Highs, K2',
      class: 'NSP / Psichedelici',
      duration: '3 - 6 ore',
      onset: 'Pochi secondi/minuti',
      effects: 'Euforia, rilassamento, modifiche della percezione. Effetti simili alla canapa ma molto più intensi e imprevedibili, poiché agiscono su tutti i recettori cerebrali.',
      risks: 'Estremamente tossici. Nausea, vomito, aggressività, tachicardia, convulsioni, danni ai reni, psicosi, desiderio di morire. Rischio di dipendenza altissimo con crisi d\'astinenza fisiche gravi già dopo pochi giorni.',
      saferUse: [
        'SCONSIGLIATI. La descrizione sulla confezione è spesso falsa.',
        'Se decidi di consumare, inizia con dosi microscopiche (0.1g possono già essere troppi).',
        'Non mischiare MAI con alcol o altre droghe.',
        'Consuma solo in un ambiente sicuro con persone sobrie presenti.',
        'In caso di tachicardia forte o dolori toracici, chiama subito il 144.'
      ]
    },
    'cocaina': {
      name: 'Cocaina',
      aka: 'Coca, Neve, Bianca',
      class: 'Stimolanti',
      duration: 'Sniffata: 30-90 min | Fumata/Iniettata: 5-20 min',
      onset: 'Sniffata: 2-3 min | Fumata/Iniettata: pochi secondi',
      effects: 'Soppressione della fatica, della fame e della sete. Euforia, maggiore senso d’efficienza, significativo aumento della fiducia in se stessi, bisogno di muoversi, agitazione, loquacità, perdita delle inibizioni e delle paure, maggiore propensione al rischio. Durante la discesa: stanchezza, sentimenti depressivi, irritabilità, ansia e forte desiderio di un’altra dose («craving»).',
      risks: 'Disturbi del sonno, irritabilità, aggressività, ansia, stati deliranti, depressione, disturbi della memoria, iperattività, contrazioni nervose, spasmi muscolari, tremori, restringimento delle arterie, aumento della pressione sanguigna e della frequenza cardiaca, crisi ipertensive e, in casi estremi, infarto o ictus. Danni al fegato e ai reni causati dalle tossine legate all’impiego di sostanze di taglio. Se fumata come freebase o crack, provoca danni alla cavità orale, ai polmoni e alle vie respiratorie.',
      saferUse: [
        'Attenzione: rischio di dipendenza molto elevato! Fare regolari pause di consumo.',
        'Ritualizzare il consumo esclusivamente in occasioni particolari.',
        'Consumare piccole quantità ed evitare di consumare frequentemente.',
        'Mangiare alimenti sani, prima e dopo il consumo. Non consumare a stomaco vuoto.',
        'Sniffare è la modalità di consumo meno rischiosa. Fumare crack o freebase aumenta i rischi.',
        'Le persone affette da patologie cardiache, asma, problemi al fegato o ipertiroidismo non dovrebbero consumare cocaina.',
        'Le persone epilettiche dovrebbero rinunciare al consumo (rischio di convulsioni).',
        'Non prendere cocaina quando si usa MDMA! L’effetto dell’ecstasy sarebbe annullato.',
        'L’uso simultaneo di alcol e cocaina aumenta la propensione a comportamenti aggressivi e il rischio d’intossicazione alcolica.'
      ]
    },
    'cocaina-e-prodotti-di-taglio': {
      name: 'Cocaina e Prodotti di Taglio',
      aka: 'Taglio della Cocaina',
      class: 'Informazione',
      duration: 'Variabile',
      onset: 'Variabile',
      effects: 'La cocaina è generalmente un composto di cocaina e di una o più sostanze di taglio. Una parte non è psicoattiva (lattosio, amido), altre sono selezionate per far sembrare più forte la purezza o rafforzare/prolungare gli effetti. Il levamisolo, la fenacetina e gli anestetici locali sono i prodotti di taglio psicoattivi più frequenti.',
      risks: 'La variabilità della purezza è un rischio spesso sottovalutato. Maggiore è la concentrazione, maggiore è il rischio di sovradosaggio. Levamisolo: vomito, diarrea, reazioni allergiche, disturbi del sistema nervoso, indebolimento del sistema immunitario (maggiore vulnerabilità a infezioni). Fenacetina: effetti cancerogeni e danni ai reni. Anestetici locali (lidocaina, benzocaina): irrequietezza, convulsioni, coma, reazioni allergiche, aritmie. Se iniettati, possono causare paralisi del sistema nervoso centrale o blocco cardiaco (AV-block) potenzialmente letale.',
      saferUse: [
        'Fai sempre analizzare la sostanza (Drug Checking).',
        'Non assumere mai dosi elevate supponendo che la purezza sia bassa.',
        'Evita l\'uso frequente per limitare l\'esposizione a sostanze tossiche come il levamisolo.',
        'L\'iniezione di cocaina tagliata con anestetici locali è estremamente pericolosa.'
      ]
    },
    'codeina': {
      name: 'Codeina',
      aka: 'Sizzurp, Purple Drank, Lean, Texas Tea',
      class: 'Downer / Oppiacei',
      duration: '2 - 3 ore',
      onset: 'Orale: fino a 30 min | Rettale: 10 min',
      effects: 'La codeina è un farmaco i cui effetti sono strettamente legati alla persona, ma può generalmente provocare serenità, euforia, agitazione, aumento della fiducia in se stessi. A dosi elevate, leggero effetto sedativo (100 – 200 mg), o grave sonnolenza.',
      risks: 'Bocca secca, mal di testa, nausea, vomito, brividi, aumento della temperatura corporea, sudorazione, disidratazione, perdita d’appetito. Reazioni allergiche frequenti (prurito, rush cutanei). Crampi allo stomaco e costipazione. A dosi elevate: grave sonnolenza, riduzione della frequenza respiratoria (pericolo!). In caso di sovradosaggio in combinazione con altri «downer», può causare un arresto respiratorio potenzialmente fatale.',
      saferUse: [
        'La codeina è un farmaco e dovrebbe essere usata per curare una malattia per un periodo limitato di tempo, preferibilmente sotto prescrizione medica.',
        'Dosare con prudenza, non ricaricare. Non superare la dose giornaliera poiché non produrrebbe nessun aumento degli effetti.',
        'Bere acqua a sufficienza (5 dl ogni ora).',
        'La miscela di codeina e bibite analcoliche (es. Sprite) è rischiosa: con zucchero e anidride carbonica, la salita degli effetti è più rapida, più intensa ed è più difficile stabilirne il dosaggio.',
        'Evitare assolutamente il mix con alcol, GHB, ketamina, eroina, benzodiazepine o antistaminici (rischio di arresto respiratorio letale).'
      ]
    },
    'dmt-5-meo-dmt': {
      name: 'DMT / 5-MeO-DMT',
      aka: 'Ayahuasca, Changa, Molecola dello spirito',
      class: 'Psichedelici',
      duration: 'Fumato: 10-45 min | Ingerito: più ore',
      onset: 'Fumato: pochi secondi | Sniffato: alcuni min | Ingerito: 60 min',
      effects: 'Aumento della pressione sanguigna e del battito cardiaco, dilatazione delle pupille. Breve euforia, percezione del tempo fortemente alterata (rallentamento). L’immersione in universi bizzarri, la separazione di corpo e mente, la dissoluzione dell’Io e una sensazione di unione con il mondo sono la regola; esperienze di stati di pre-morte sono pure frequenti. Con il 5-MeO si percepiscono motivi colorati sovrapposti palpitanti.',
      risks: 'Provoca spesso nausea e vomito. Aumento della frequenza cardiaca, respirazione accelerata, pressione alta, aumento della salivazione, tremito, agitazione, disturbi motori, sensazioni di cadere. Il forte cambiamento di percezione e la dissoluzione dell’identità personale possono essere vissuti in modo traumatico anche dai consumatori più navigati («bad trip»).',
      saferUse: [
        'Rinunciare al consumo se si ha paura dei potenti effetti psichedelici. La paura può scatenare esperienze negative.',
        'Non assumere DMT da soli! Sedersi in un locale protetto (non durante i party) in compagnia di persone esperte di cui potersi fidare (Trip Sitter).',
        'La prima volta, assumere una dose bassa e non prenderne un’altra!',
        'Rinunciare a miscele avventate. L’assunzione contemporanea con alcol ne modifica gli effetti e può avere effetti collaterali spiacevoli.',
        'Le persone che soffrono di pressione alta dovrebbero rinunciare al consumo.',
        'Anche se l’ebbrezza è breve, gli effetti secondari possono durare diverse ore (capacità di guida compromessa).',
        'Fai delle pause fra un consumo e l’altro. Concediti tempo e tranquillità per smaltire il trip.'
      ]
    },
    'dom-doi-dob-doc': {
      name: 'DOM / DOI / DOB / DOC',
      aka: 'Anfetamine allucinogene, Trip',
      class: 'Psichedelici',
      duration: 'DOM: 10-12 ore | DOI/DOB: 8-30 ore | DOC: 8-20 ore',
      onset: 'Primi effetti: 1 ora | Apice: 3 ore',
      effects: 'La lunga salita degli effetti è una caratteristica comune. Dopo l\'inizio, l\'ebbrezza rimane stabile per diverse ore. Le percezioni sono intensificate. Spesso si avverte un forte bisogno di movimento e di attività fisica. A elevati dosaggi di DOB e DOI, si percepiscono motivi colorati; il DOM e il DOC hanno effetti ottici piuttosto lievi.',
      risks: 'Siccome occorre molto tempo per raggiungere l’apice degli effetti, il pericolo di sovradosaggio è particolarmente elevato soprattutto se si assumono diverse dosi in successione. La lunga durata degli effetti può provocare attacchi di panico, stati confusionali e paura. A dosi elevate possono presentarsi temporaneamente sintomi di paralisi o d\'insensibilità al dolore (pericolo di ferimenti!).',
      saferUse: [
        'Dosare con prudenza e NON assumere più dosi in un’unica occasione: rischio altissimo di sovradosaggio a causa della lenta salita.',
        'NON sono droghe ricreative da party. Dovrebbero essere assunte solo da consumatori esperti.',
        'Consumare solo se in perfetta forma fisica e psichica (buon «set») e in un ambiente sicuro («setting»).',
        'Durante il trip, bevi acqua in abbondanza.',
        'Trattandosi di derivati anfetaminici, sovraccaricano fortemente il corpo. Mangia cibi ricchi di vitamine per il recupero.',
        'Concediti almeno un giorno di tranquillità dopo il trip per elaborare l’esperienza.'
      ]
    },
    'dxm': {
      name: 'DXM',
      aka: 'Destrometorfano, Bexin, Pulmofor',
      class: 'Downer / Dissociativi',
      duration: 'Variabile',
      onset: 'Variabile',
      effects: 'Il destrometorfano è un oppiaceo sintetico che agisce contro la tosse. Ad alti dosaggi (da 300 mg), gli effetti sono considerati "forti", prevalentemente euforizzanti e di carattere allucinogeno/dissociativo.',
      risks: 'Ad elevati dosaggi, il DXM ha effetti tossici sull\'organismo. Irritazioni della pelle e forte prurito. Il consumo regolare ha un elevato potenziale di dipendenza. A lungo termine: assuefazione, riduzione del desiderio sessuale, sterilità, stitichezza, insonnia, agitazione.',
      saferUse: [
        'I medicinali dovrebbero essere assunti solo su prescrizione medica.',
        'I mix di medicamenti possono essere fatali.',
        'Evitare assolutamente il mix con eroina, oppiacei, alcol, codeina, ketamina, GHB/GBL (rischio di arresto respiratorio).'
      ]
    },
    'ecstasy-mdma': {
      name: 'Ecstasy-MDMA',
      aka: 'XTC, Molly, Emma, Paste',
      class: 'Empatogeni / Entactogeni',
      duration: '4 – 6 ore',
      onset: '30 - 90 min (talvolta di più)',
      effects: 'L’MDMA favorisce il rilascio di serotonina. Gli stimoli della fame e della sete diminuiscono, aumenta l’attenzione, la temperatura corporea e la pressione sanguigna. Sensazione di leggerezza, spensieratezza e benessere. La percezione visiva e uditiva cambiano, la musica è percepita in modo più intenso, le inibizioni diminuiscono, aumenta il bisogno di contatto fisico e si avverte un forte sentimento di comunione con gli altri (empatia).',
      risks: 'Intorpidimento mandibolare (bruxismo), tremore muscolare, nausea, vomito, aumento della pressione. Mette sotto pressione cuore, fegato e reni. Rischio di colpi di calore (ipertermia). In caso di sovradosaggio: crampi muscolari, allucinazioni, attacchi d’asma e crisi epilettiche. Il "down" nei giorni successivi può causare forte depressione.',
      saferUse: [
        'Fai analizzare la pasticca (drug checking). Se non puoi, prova prima mezza pastiglia e aspetta almeno 2 ore.',
        'Non superare 1.5 mg per kg di peso (uomini) o 1.3 mg per kg (donne).',
        'Evitare di ricaricare (aumentare il dosaggio).',
        'Bere acqua a sufficienza (5 dl ogni ora) e fare pause per rinfrescarsi.',
        'Quando gli effetti svaniscono, accetta la discesa. Ricaricare non funziona perché le riserve di serotonina sono esaurite.',
        'Fai pause di almeno 4-6 settimane tra un consumo e l\'altro per ripristinare la serotonina.',
        'Attenzione ai mix letali con MAO-inibitori o farmaci antiretrovirali.'
      ]
    },
    'ecstasy-mdma-e-prodotti-di-taglio': {
      name: 'Ecstasy e Prodotti di Taglio',
      aka: 'Pasticche tagliate',
      class: 'Informazione',
      duration: 'Variabile',
      onset: 'Variabile',
      effects: 'Sul mercato nero, l\'MDMA è spesso venduto sotto forma di pasticche la cui composizione è imprevedibile. Pillole con lo stesso logo possono avere composizioni totalmente diverse. Molto spesso contengono più di 120 mg di MDMA (dose altissima). I prodotti di taglio più frequenti sono caffeina e anfetamina.',
      risks: 'Dosi superiori a 120 mg provocano crampi alla mascella, movimento incontrollato degli occhi (nistagmo), disidratazione e forte stress cardiovascolare. Talvolta le pasticche contengono sostanze molto diverse come 2C-B, MDA, metanfetamina, ketamina o PMA/PMMA (estremamente tossico).',
      saferUse: [
        'Fai sempre analizzare la pasticca (Drug Checking).',
        'Non fidarti mai del logo o del colore della pillola.',
        'Inizia sempre con un quarto o mezza pasticca e aspetta almeno 2 ore.',
        'Evita di consumare a stomaco vuoto, fai un pasto leggero prima.',
        'Bevi acqua e fai pause regolari per evitare il colpo di calore.'
      ]
    },
    'efedrina': {
      name: 'Efedrina',
      aka: 'Mormon Tea, Ma-Huang',
      class: 'Stimolanti',
      duration: 'Fino a 8 ore',
      onset: '20 - 60 min',
      effects: 'Stimola il sistema circolatorio, aumenta le prestazioni, stimola il movimento fisico e inibisce l’appetito.',
      risks: 'Tachicardia, agitazione, disidratazione già a partire da bassi dosaggi. Senso di oppressione e soffocamento, aumento della pressione sanguigna, vertigini, aritmie. In caso di sovradosaggio: infarti. A lungo termine: insonnia, aggressività, danni a denti, fegato e reni, psicosi. Elevato rischio di dipendenza psicologica.',
      saferUse: [
        'Dosare con prudenza, soprattutto se si consumano foglie di efedra (la concentrazione varia molto).',
        'Bere acqua a sufficienza (5 dl ogni ora), ma niente alcol!',
        'Sconsigliato per chi soffre di problemi circolatori, tiroide, fegato o reni.',
        'Senza un adeguato accompagnamento medico, l’efedrina non aiuta a perdere peso in modo sano.',
        'Evitare il mix con altri stimolanti (MDMA, cocaina, speed).'
      ]
    },
    'eroina': {
      name: 'Eroina',
      aka: 'Diacetilmorfina, Roba, Brown Sugar',
      class: 'Downer / Oppiacei',
      duration: '2 - 5 ore',
      onset: 'Iniettata/Fumata: pochi secondi | Sniffata: alcuni min',
      effects: 'Calma il dolore, tranquillizza, elimina l’ansia e rende euforici. L’euforia iniziale (flash) è seguita da uno stato di benessere e sensazioni d’indifferenza, tranquillità, serenità e soddisfazione.',
      risks: 'Rallentamento della respirazione, nausea, vomito, prurito, abbassamento della pressione, restringimento delle pupille. Un sovradosaggio causa arresto respiratorio che può portare a danni cerebrali o morte (la dose mortale per chi non ha tolleranza è di soli 60 mg). Altissimo rischio di dipendenza fisica e psicologica con gravissime crisi d\'astinenza.',
      saferUse: [
        'Sniffare è la modalità di consumo con minori rischi (rispetto all\'iniezione), ma può sempre provocare un’overdose.',
        'La purezza sul mercato nero è imprevedibile: il rischio di overdose è altissimo, specialmente dopo pause di consumo (perdita di tolleranza).',
        'Non consumare MAI da soli.',
        'Non mischiare MAI con alcol, GHB, ketamina o benzodiazepine (rischio di arresto respiratorio letale).',
        'Avere sempre a disposizione il Naloxone (antidoto per l\'overdose da oppiacei) e sapere come usarlo.'
      ]
    }
  };

  const data = db[id as string] || { 
    name: id?.toUpperCase(), aka: 'Sconosciuto', class: 'N/A', duration: 'N/A', onset: 'N/A',
    effects: 'Nessun dato disponibile.', risks: 'Nessun dato disponibile.', saferUse: ['Nessun dato disponibile.']
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 pointer-events-auto"
    >
      {/* Sidebar / Sticky Info */}
      <div className="w-full md:w-1/3 flex flex-col gap-8 md:sticky md:top-32 h-fit">
        <Link to="/sostanze" className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:opacity-50 transition-opacity w-fit">
          <ArrowLeft className="w-4 h-4" /> Torna all'elenco
        </Link>
        
        <div>
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] mix-blend-difference"
          >
            {data.name}
          </motion.h1>
          <p className="font-mono text-sm opacity-60 mt-4 uppercase tracking-widest">{data.aka}</p>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="font-mono text-xs opacity-50 uppercase">Classe</span>
            <span className="font-mono text-xs text-right">{data.class}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="font-mono text-xs opacity-50 uppercase">Durata</span>
            <span className="font-mono text-xs text-right">{data.duration}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="font-mono text-xs opacity-50 uppercase">Salita (Onset)</span>
            <span className="font-mono text-xs text-right">{data.onset}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full md:w-2/3 flex flex-col gap-8">
        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold uppercase tracking-tighter">Effetti</h2>
          </div>
          <p className="font-light leading-relaxed text-white/80">
            {data.effects}
          </p>
        </motion.section>

        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-red-500/10 backdrop-blur-md border border-red-500/20 p-8 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-bold uppercase tracking-tighter text-red-100">Rischi & Effetti Collaterali</h2>
          </div>
          <p className="font-light leading-relaxed text-white/80">
            {data.risks}
          </p>
        </motion.section>

        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-green-500/10 backdrop-blur-md border border-green-500/20 p-8 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold uppercase tracking-tighter text-green-100">Safer Use (Regole d'oro)</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.saferUse.map((rule: string, index: number) => (
              <div key={index} className="p-4 bg-black/40 rounded-xl border border-white/5">
                <p className="text-sm font-light opacity-90">{rule}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
