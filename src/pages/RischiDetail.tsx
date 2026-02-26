import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function RischiDetail() {
  const { id } = useParams();

  const db: Record<string, any> = {
    'cosa-dice-la-legge': {
      title: 'Cosa dice la legge?',
      content: (
        <>
          <p className="mb-6">
            L’acquisto, il possesso, la produzione o la fabbricazione, l’importazione o l’esportazione della maggior parte delle sostanze psicoattive nonché la loro promozione sono punibili in base alla Legge federale sugli stupefacenti (LStup).
          </p>
          <p className="mb-6">
            Questa norma si applica indipendentemente dal modo in cui si acquisiscono le sostanze. Se acquisti, possiedi o consumi le sostanze iscritte nella LStup, la polizia può denunciarti al giudice anche nel caso di piccole quantità. Anche ordinare sostanze attraverso Internet può essere punito dalla legge perché, indicando l’indirizzo postale del destinatario, l’anonimato non è più garantito.
          </p>
          <p className="mb-6">
            Il possesso di piccole quantità di canapa da parte di persone maggiorenni fino a un massimo di 10 grammi è punito con una multa disciplinare di fr. 100.-, senza che sia sporta denuncia. La multa disciplinare è esclusa se il consumatore è in possesso di oltre 10 grammi di canapa o commette simultaneamente altre infrazioni alla LStup o ad altre leggi (per esempio, se oltre alla canapa, l’autore è in possesso di cocaina, oppure se guida in stato d’ebbrezza, oppure se consuma canapa alla guida…).
          </p>
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl mt-8">
            <h3 className="font-bold uppercase tracking-widest mb-4 text-blue-400">In caso di controllo</h3>
            <p className="mb-4 text-sm">
              In caso di controllo d’identità, le uniche informazioni che bisogna rilasciare sono: nome e cognome, data di nascita, luogo di domicilio, luogo d’attinenza e la propria occupazione. Non si è tenuti a fornire informazioni relative al datore di lavoro, al salario, ai precedenti penali o altre informazioni personali. In mancanza di un documento d’identità, si può essere trattenuti per una verifica delle generalità fino a 24 ore.
            </p>
            <p className="text-sm">
              In caso di arresto, vale il diritto di rifiutare di rilasciare qualsiasi altra dichiarazione per evitare di aggravare la situazione e, nel caso di un interrogatorio, si ha il diritto a un avvocato. Al momento dell’arresto la polizia è tenuta a comunicare i motivi dell’arresto.
            </p>
          </div>
        </>
      )
    },
    'cosa-fare-il-caso-di-emergenza': {
      title: 'Cosa fare in caso di emergenza?',
      content: (
        <>
          <p className="mb-6 font-bold text-xl text-red-400">
            In caso di emergenza è importante mantenere la calma.
          </p>
          <ul className="list-disc list-inside space-y-2 mb-8 text-white/80">
            <li>Restare vicino alla persona che sta male e fare in modo che rimanga cosciente.</li>
            <li>Avvisare una terza persona che possa chiamare il medico di picchetto o l'ambulanza (tel. 144) e prestare i primi soccorsi fino all’arrivo dei soccorritori.</li>
            <li>Informare i soccorritori, che sono tenuti al segreto professionale, sulle sostanze e le quantità consumate.</li>
          </ul>

          <h3 className="text-2xl font-bold mt-8 mb-4">Bad trip, attacchi di panico e crisi emotive</h3>
          <p className="mb-4">Non lasciare mai sola la persona in bad trip. Parlale con tono calmo («talk down») e prova a farle pensare a qualcosa di positivo rassicurandola.</p>
          <p className="mb-4">Cambiare posto può essere una buona idea: porta la persona all’esterno per farle prendere un po’ d’aria fresca e offrile dell’acqua o del tè.</p>
          <p className="mb-8">Mantieni sempre un contatto fisico (se la persona che sta male lo consente). Se la situazione non dovesse migliorare, chiama l’ambulanza o il medico di picchetto (tel. 144).</p>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-red-400">Chiama immediatamente il 144 in caso di…</h3>
          <div className="space-y-6">
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl">
              <h4 className="font-bold text-red-200 mb-2">Perdita di conoscenza / Problemi respiratori</h4>
              <p className="text-sm">Pallore grigiastro, perdita di conoscenza, forti vertigini, respirazione irregolare, assenza di risposta, polso debole. Far distendere la persona in posizione laterale. Controlla il polso (sul collo) e la respirazione. Fare in modo che la persona non prenda freddo. Se non richiesto, non dare né da mangiare né da bere.</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-xl">
              <h4 className="font-bold text-orange-200 mb-2">Colpo di calore</h4>
              <p className="text-sm">Viso arrossato, testa calda, polso accelerato, nausea, mal di testa. Accompagna la persona in un angolo fresco e tranquillo. Far sdraiare la persona con la testa sollevata e rimanerle accanto. Parlare e far bere delle bibite ricche di vitamine e bibite zuccherate. Non dare niente da mangiare!</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-xl">
              <h4 className="font-bold text-yellow-200 mb-2">Stato di shock</h4>
              <p className="text-sm">Polso rapido e debole, viso pallido, sudorazione fredda, agitazione, disorientamento, nausea. Far sdraiare la persona sulla schiena, tenere le gambe alzate, controllare la respirazione, il polso e lo stato di coscienza.</p>
            </div>
          </div>
        </>
      )
    },
    'cosa-succede-nel-cervello': {
      title: 'Cosa succede nel cervello?',
      content: (
        <>
          <p className="mb-6">
            Il cervello è costituito da circa 100 miliardi di cellule nervose che si scambiano segnali attraverso i neurotrasmettitori (molecole segnale). La maggior parte delle sostanze psicoattive agiscono in particolare sulla trasmissione della serotonina, della dopamina e della noradrenalina.
          </p>
          <p className="mb-8">
            Nel sistema nervoso esistono molti tipi di neurotrasmettitori cui corrispondono specifici ricettori in grado di riconoscerne la struttura proprio come fa una serratura con una chiave. Ogni neurotrasmettitore svolge una sua funzione che può essere alla base di un diverso stato mentale. Le sostanze psicoattive interferiscono sull'equilibrio dei neurotrasmettitori e quando questo equilibrio cambia, i sentimenti e le percezioni si alterano.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h4 className="font-bold text-blue-400 mb-2">Alcol</h4>
              <p className="text-sm opacity-80">Aumentando l’inibizione dei neurotrasmettitori GABA, modifica il funzionamento dell’organismo agendo in particolare sulle aree che controllano il pensiero e il movimento.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h4 className="font-bold text-purple-400 mb-2">LSD & Psichedelici</h4>
              <p className="text-sm opacity-80">Agisce sulla percezione visiva e sul sistema della serotonina. Imitano stati mentali straordinari come sogni, depersonalizzazione e sinestesie.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h4 className="font-bold text-pink-400 mb-2">Ecstasy (MDMA)</h4>
              <p className="text-sm opacity-80">Favorendo la trasmissione della serotonina, interviene sui centri emotivi, temperatura corporea e sonno. Il deficit successivo causa il tipico "down" depressivo.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h4 className="font-bold text-yellow-400 mb-2">Cocaina & Speed</h4>
              <p className="text-sm opacity-80">Favoriscono la liberazione di dopamina e noradrenalina, agendo sulle aree del piacere, incrementando l'attività cerebrale e il sistema di risposta allo stress.</p>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl mt-8">
            <h3 className="font-bold uppercase tracking-widest mb-2 text-red-400">Attenzione: Sviluppo Cerebrale</h3>
            <p className="text-sm">
              Il consumo di sostanze psicoattive durante l’età dello sviluppo interferisce sullo sviluppo del cervello e il rischio di sviluppare un consumo problematico nel corso degli anni è più elevato. Il consumo precoce può provocare danni al sistema nervoso centrale e compromettere lo sviluppo personale.
            </p>
          </div>
        </>
      )
    },
    'drug-set-setting': {
      title: 'Drug, Set & Setting',
      content: (
        <>
          <p className="mb-8 text-xl font-light">
            Gli effetti delle sostanze psicoattive dipendono dal <strong>Set</strong> (stato interiore), dal <strong>Setting</strong> (ambiente) e dalla <strong>Drug</strong> (la sostanza stessa). Questi tre fattori interdipendenti esercitano un’influenza decisiva sugli effetti e sui rischi.
          </p>

          <div className="space-y-8">
            <div className="bg-blue-500/10 border border-blue-500/20 p-8 rounded-2xl">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-blue-400">1. Drug (La Sostanza)</h3>
              <ul className="list-disc list-inside space-y-2 mb-4 opacity-80">
                <li>Profilo degli effetti (effetti attesi, collaterali, a lungo termine)</li>
                <li>Composizione chimica e purezza</li>
                <li>Dosaggio assunto</li>
              </ul>
              <p className="text-sm italic opacity-60">Domande chiave: Di chi mi posso fidare? Conosco i rischi? Ho fatto analizzare la sostanza?</p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 p-8 rounded-2xl">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-purple-400">2. Set (Stato Interiore)</h3>
              <ul className="list-disc list-inside space-y-2 mb-4 opacity-80">
                <li>Età, sesso, peso corporeo</li>
                <li>Stato di salute fisico e psichico attuale</li>
                <li>Aspettative e motivazioni del consumo</li>
                <li>Stato d'animo (ansia, felicità, stress)</li>
              </ul>
              <p className="text-sm italic opacity-60">Domande chiave: Mi sento bene fisicamente e mentalmente? Perché voglio consumare oggi?</p>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 p-8 rounded-2xl">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-green-400">3. Setting (L'Ambiente)</h3>
              <ul className="list-disc list-inside space-y-2 mb-4 opacity-80">
                <li>Luogo fisico (club, casa, festival, natura)</li>
                <li>Persone presenti (amici fidati vs sconosciuti)</li>
                <li>Presenza di un Trip Sitter sobrio</li>
                <li>Disponibilità di acqua, zone chill-out e vie di fuga</li>
              </ul>
              <p className="text-sm italic opacity-60">Domande chiave: Mi sento al sicuro qui? Mi fido delle persone intorno a me? Come torno a casa?</p>
            </div>
          </div>
        </>
      )
    },
    'informazioni-per-gli-uomini': {
      title: 'Informazioni per gli uomini',
      content: (
        <>
          <p className="mb-6 text-lg">
            Il consumo regolare di sostanze psicoattive può avere ripercussioni sulle prestazioni sessuali e/o sulla fertilità.
          </p>
          <ul className="list-disc list-inside space-y-4 text-white/80">
            <li>Poiché il consumo eccessivo di alcol danneggia i collegamenti nervosi tra il cervello e il pene, diminuendo la produzione di testosterone, può provocare impotenza e sterilità.</li>
            <li>Il consumo cronico di canapa o di cocaina può modificare e ridurre la produzione di spermatozoi.</li>
            <li>Gli uomini dovrebbero sostenere la propria partner durante la gravidanza discutendo delle questioni legate al consumo di sostanze. Rinunciare insieme al consumo di sostanze psicoattive può essere di grande sostegno.</li>
            <li>Il consumo di sostanze psicoattive mischiato a farmaci per il disfunzionamento erettile (es. Viagra, Cialis) può essere estremamente pericoloso, specialmente con i popper (rischio di collasso cardiovascolare fatale).</li>
            <li>Anche l'uso combinato di anabolizzanti e sostanze psicoattive comporta gravi rischi per il sistema cardiovascolare e il fegato.</li>
          </ul>
        </>
      )
    },
    'informazioni-per-le-donne': {
      title: 'Informazioni per le donne',
      content: (
        <>
          <p className="mb-6 text-lg">
            Il peso, la massa muscolare e la concentrazione di liquidi nell'organismo delle donne sono generalmente inferiori rispetto a quelli degli uomini. Anche il metabolismo funziona diversamente.
          </p>
          <div className="bg-purple-500/10 border border-purple-500/20 p-6 rounded-xl mb-8">
            <h3 className="font-bold uppercase tracking-widest mb-2 text-purple-400">Dosaggi Inferiori</h3>
            <p className="text-sm">A parità di effetti desiderati, i dosaggi delle sostanze devono essere inferiori per le donne rispetto a quelli degli uomini. Ad esempio, per l'MDMA, la regola di safer use suggerisce un massimo di 1.3mg per kg di peso corporeo per le donne (contro 1.5mg per gli uomini).</p>
          </div>
          
          <ul className="list-disc list-inside space-y-4 text-white/80 mb-8">
            <li>Il consumo regolare di ecstasy, cocaina o anfetamina può creare disturbi mestruali. Attenzione: anche se il ciclo è irregolare, c’è sempre la possibilità di rimanere incinta.</li>
            <li>Vomito e diarrea – effetti collaterali comuni delle sostanze psicoattive – possono limitare o annullare l’effetto della pillola anticoncezionale.</li>
          </ul>

          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl">
            <h3 className="font-bold uppercase tracking-widest mb-2 text-red-400">Gravidanza e Allattamento</h3>
            <p className="text-sm mb-4">Le donne in gravidanza dovrebbero rinunciare totalmente al consumo di sostanze psicoattive. Il consumo di alcol, canapa, ecstasy, anfetamina, cocaina o nicotina può avere gravi conseguenze sullo sviluppo del feto, provocare malformazioni o causare nascite premature.</p>
            <p className="text-sm">Anche durante l'allattamento bisognerebbe rinunciare al consumo. I principi attivi (in particolare il THC della canapa, che si deposita nei tessuti adiposi) vengono trasmessi al neonato attraverso il latte materno.</p>
          </div>
        </>
      )
    },
    'al-momento-dell-acquisto': {
      title: 'Al momento dell\'acquisto',
      content: (
        <>
          <p className="mb-6 text-lg">
            Non comprare la prima cosa che ti passa tra le mani. Innanzitutto informati sugli effetti, gli effetti secondari, i dosaggi e comportati in modo critico.
          </p>
          <p className="mb-6 text-white/80">
            Quando si acquistano sostanze sul mercato nero, dagli amici o su internet, i rischi sono difficili da valutare. Non è possibile sapere esattamente se quello che hai acquistato è effettivamente la sostanza che volevi procurarti. È difficile stabilire quali possano essere i principi attivi, la purezza, i possibili prodotti di taglio e di conseguenza il dosaggio corretto.
          </p>
          <p className="mb-8 text-white/80">
            Per determinare la quantità, la qualità e la presenza d’impurità, è necessaria un’analisi chimica (Drug Checking). Per questo motivo è sempre meglio andarci piano e provare prima una piccola dose (Start Low, Go Slow).
          </p>

          <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-xl">
            <h3 className="font-bold uppercase tracking-widest mb-2 text-yellow-400">Attenzione: legale non significa sicuro</h3>
            <p className="text-sm mb-4">
              Sebbene i cosiddetti «research chemicals» o «legal highs» (Nuove Sostanze Psicoattive - NSP) siano spacciati come legali, non significa che siano innocui. Occorre molta prudenza perché le informazioni sui loro effetti e sui rischi a lungo termine sono inesistenti.
            </p>
            <p className="text-sm mb-4">
              I produttori cercano di raggirare le leggi introducendo sul mercato molecole non ancora identificate e mai sperimentate sull’uomo. Le informazioni fornite sul web dai venditori sono spesso manipolate (es. «ha gli stessi effetti dell’ecstasy»), ma i rischi sono imprevedibili.
            </p>
            <p className="text-sm">
              Anche le cosiddette «droghe naturali» possono essere pericolose. Il fatto che si tratti di piante o funghi non significa che siano meno tossici delle sostanze sintetiche. La concentrazione di principi attivi in natura è estremamente variabile e imprevedibile.
            </p>
          </div>
        </>
      )
    },
    'composizione-delle-sostanze': {
      title: 'Composizione delle sostanze',
      content: (
        <>
          <p className="mb-6 text-lg">
            Pasticche, polveri, cristalli, blotter e liquidi venduti sul mercato nero contengono concentrazioni variabili di principi attivi (purezza), sostanze diverse rispetto a quelle dichiarate (contraffazioni), più principi attivi che interagiscono tra loro e imprevedibili prodotti di taglio.
          </p>
          <p className="mb-8 text-white/80">
            La composizione delle sostanze illegali è estremamente variabile e i rischi per la salute sono difficili da valutare. Anche le nuove sostanze psicoattive (NSP) acquistate semi-legalmente via internet sono pericolose. False dichiarazioni ed errori di etichettaggio sono frequenti.
          </p>

          <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl mb-8">
            <h3 className="font-bold uppercase tracking-widest mb-2 text-blue-400">L'importanza del Drug Checking</h3>
            <p className="text-sm">
              Per ridurre i rischi legati all’imprevedibilità, solo un’analisi chimica di laboratorio permette di stabilire la composizione (analisi qualitativa) e la concentrazione di principi attivi (analisi quantitativa) contenuti in una sostanza, in modo da poter valutare i rischi reali e stabilire un dosaggio sensato.
            </p>
          </div>

          <p className="text-white/80 italic">
            Nota bene: Se hai acquistato una pasticca o una polvere che non è segnalata nelle allerte pubbliche, non significa che sia “sicura” o che contenga effettivamente il principio attivo che ti aspetti. Senza un’analisi chimica non è possibile conoscerne la composizione.
          </p>
        </>
      )
    },
    'chill-out-cool-down': {
      title: 'Chill out & cool down',
      content: (
        <>
          <p className="mb-6 text-lg">
            Il consumo di sostanze sovraccarica il corpo ed è quindi necessario prevedere dei momenti in cui riposare, sia durante il consumo che dopo aver consumato.
          </p>
          <p className="mb-8 text-white/80">
            Siccome il consumo di molte sostanze psicoattive (specialmente stimolanti ed empatogeni) aumenta la temperatura corporea, è vitale fare delle pause in locali freschi o all’aria aperta. Gli spazi che nei club o nei festival sono destinati al recupero sono chiamati "chill out".
          </p>

          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
            <h3 className="font-bold text-xl mb-6">Regole per il recupero:</h3>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold mt-1">→</span>
                <span>Evita di indossare cappelli e copricapi spessi mentre balli, perché buona parte dello scambio termico passa attraverso la testa.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold mt-1">→</span>
                <span>Prevedi del tempo per recuperare. Dopo aver consumato, è importante aver la possibilità di rilassarsi in un ambiente tranquillo.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold mt-1">→</span>
                <span>Un’alimentazione sana, ricca di vitamine e una bella dormita rafforzano le difese immunitarie che vengono ridotte dal consumo, dallo stress fisico e dalla mancanza di sonno.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold mt-1">→</span>
                <span>In particolare dopo l’assunzione di MDMA, speed o cocaina, si verifica un "hangover" (down) caratterizzato da mancanza di motivazione, tristezza o ansia. È normale: il tuo cervello ha esaurito i neurotrasmettitori.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-1">→</span>
                <span>In caso di hangover, <strong>evita assolutamente di consumare ancora</strong> per "tirarti su". Non faresti altro che peggiorare il crollo successivo, rafforzare gli effetti collaterali e aumentare il rischio di dipendenza.</span>
              </li>
            </ul>
          </div>
        </>
      )
    },
    'consumo-e-circolazione-stradale': {
      title: 'Consumo e circolazione stradale',
      content: (
        <>
          <p className="mb-6 text-lg font-bold text-red-400">
            Al volante vale il principio della «tolleranza zero» per tutte le sostanze stupefacenti.
          </p>
          <p className="mb-6 text-white/80">
            Il consumo di sostanze psicoattive ha ripercussioni gravi sulla capacità di guida. La legge considera il conducente come un soggetto attivo che ha sempre la responsabilità nei confronti di se stesso e degli altri.
          </p>
          <p className="mb-8 text-white/80">
            Le sostanze influenzano, per molto più tempo di quanto si possa percepire soggettivamente, la valutazione delle distanze, la percezione dei rischi, la vigilanza e i tempi di reazione.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl">
              <h3 className="font-bold uppercase tracking-widest mb-2 text-red-200">Conseguenze Legali</h3>
              <p className="text-sm mb-2">Un test positivo porta all’immediata revoca della patente di guida.</p>
              <p className="text-sm mb-2">In caso d’incidente sotto l'effetto di sostanze, l’assicurazione può rivalersi su di te e non coprire i costi (regresso).</p>
              <p className="text-sm">Se un’analisi del sangue conferma l’esito, bisognerà dimostrare l’idoneità alla guida tramite costose perizie mediche, psicologiche e analisi del capello.</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-xl">
              <h3 className="font-bold uppercase tracking-widest mb-2 text-yellow-200">Regole d'oro</h3>
              <ul className="list-disc list-inside text-sm space-y-2">
                <li>Non guidare MAI sotto l'effetto di sostanze.</li>
                <li>Anche guidare la bicicletta o il monopattino elettrico è illegale e pericoloso.</li>
                <li>Attendi almeno 12-24 ore dopo la fine degli effetti prima di rimetterti alla guida.</li>
                <li>Organizza il rientro prima di uscire (mezzi pubblici, taxi, o un amico designato che resta sobrio).</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    'safer-sniffing': {
      title: 'Safer Sniffing',
      content: (
        <>
          <p className="mb-6 text-lg">
            Lo scambio di materiale usato per sniffare come cannucce o banconote può trasmettere malattie infettive gravi.
          </p>
          <p className="mb-8 text-white/80">
            Piccole ferite delle mucose nasali causate dalle estremità delle cannucce possono essere dei vettori d’infezione (per esempio per l’epatite C). È quindi indispensabile evitare di usare la stessa cannuccia!
          </p>

          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl mb-8">
            <h3 className="font-bold text-xl mb-6">Regole d'oro per il naso:</h3>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold mt-1">1.</span>
                <span>Tagliare la polvere il più finemente possibile: più i cristalli sono grossi, maggiore è la possibilità di danni e micro-tagli alle mucose nasali.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold mt-1">2.</span>
                <span>Fare attenzione che la superficie sulla quale si sniffa sia pulita. Evita schermi di smartphone sporchi o tavolette dei bagni pubblici.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold mt-1">3.</span>
                <span>Usa solo la TUA cannuccia personale. Non usare banconote (sono piene di batteri).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold mt-1">4.</span>
                <span>Pulire e prendersi cura delle mucose nasali dopo il consumo. Soluzione per il risciacquo: sciogliere un cucchiaino di sale marino in 1/4 di litro d’acqua tiepida, spruzzare in una narice e lasciare uscire dall'altra.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-1">!</span>
                <span>Se le mucose sono gravemente danneggiate (es. sangue dal naso frequente) o il naso fa male, occorre consultare un medico.</span>
              </li>
            </ul>
          </div>
        </>
      )
    },
    'sostanze-psicoattive-e-patologie': {
      title: 'Sostanze psicoattive e patologie',
      content: (
        <>
          <p className="mb-6 text-lg font-bold text-red-400">
            Le persone che soffrono di problemi di salute fisica e salute mentale dovrebbero rinunciare al consumo di sostanze psicoattive.
          </p>
          <p className="mb-8 text-white/80">
            Chi ha problemi di salute è più vulnerabile rispetto ai rischi, i sintomi delle malattie possono aggravarsi così come le conseguenze per la salute. Il consumo dovrebbe essere discusso anticipatamente con il proprio medico (che è tenuto al segreto professionale).
          </p>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h4 className="font-bold text-blue-400 mb-2">Ansia e Depressione</h4>
              <p className="text-sm text-white/80">Gli stimolanti aumentano i sintomi dell'ansia. Cocaina e ecstasy provocano forti sentimenti depressivi nel down. I downer (alcol) hanno un'alta propensione all'abuso come automedicazione. Gli psichedelici aumentano drasticamente la probabilità di bad trip. La canapa può scatenare attacchi di panico.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h4 className="font-bold text-purple-400 mb-2">Problemi Cardiaci</h4>
              <p className="text-sm text-white/80">Gli stimolanti (cocaina, speed) aumentano pericolosamente la pressione, il rischio di infarto e le aritmie. La canapa aumenta la probabilità di angina pectoris. La cocaina provoca vasocostrizione e può causare arresto cardiaco improvviso.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h4 className="font-bold text-green-400 mb-2">Epilessia & Diabete</h4>
              <p className="text-sm text-white/80"><strong>Epilessia:</strong> Rischio elevato di convulsioni. Gli stimolanti abbassano la soglia epilettica. <strong>Diabete:</strong> L'alcol aumenta la glicemia in modo imprevedibile. La canapa abbassa la pressione. Gli stimolanti riducono la fame sballando i calcoli insulinici.</p>
            </div>
          </div>
        </>
      )
    },
    'too-much-consumo-problematico': {
      title: 'Too much? Consumo problematico',
      content: (
        <>
          <p className="mb-6 text-lg">
            In caso di sovradosaggio, di consumo regolare e di policonsumo, gli effetti collaterali aumentano e diventano più frequenti.
          </p>
          <p className="mb-8 text-white/80">
            Se sei un consumatore abituale e consumi anche durante la settimana, se ti senti a disagio perché non riesci a far fronte ai tuoi impegni, sarebbe utile prendere una pausa di consumo.
          </p>

          <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl mb-8">
            <h3 className="font-bold text-xl mb-4 text-red-200">Campanelli d'allarme</h3>
            <p className="text-sm mb-4">Si può parlare di consumo problematico se si notano:</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-white/80">
              <li>Sintomi fisici (disturbi cardiaci, problemi respiratori, stanchezza cronica)</li>
              <li>Sintomi psichici acuti o a lungo termine (depressione, ansia, paranoia, craving)</li>
              <li>Problemi nella vita di tutti i giorni (sul lavoro, a scuola, conflitti relazionali)</li>
              <li>Problemi finanziari o problemi con la legge</li>
              <li>Comportamenti aggressivi verso sé stessi o verso gli altri</li>
            </ul>
          </div>

          <p className="text-white/80">
            Se hai l’impressione di aver perso il controllo, non esitare a chiedere una consulenza anonima su SafeZone.ch o a rivolgerti ad un servizio per le dipendenze. Oggi, i trattamenti non sono per forza sinonimo di astinenza totale: la riduzione del danno e il consumo controllato sono obiettivi validi.
          </p>
        </>
      )
    },
    'tracce-del-consumo-nell-organismo': {
      title: 'Tracce del consumo nell\'organismo',
      content: (
        <>
          <p className="mb-6 text-lg">
            Le sostanze psicoattive influenzano le percezioni e la capacità di reazione per molto più tempo di quanto durino gli effetti percepiti soggettivamente.
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-4 px-4 font-bold text-blue-400">Sostanza</th>
                  <th className="py-4 px-4 font-bold text-purple-400">Tracce nel sangue</th>
                  <th className="py-4 px-4 font-bold text-green-400">Tracce nelle urine</th>
                </tr>
              </thead>
              <tbody className="text-sm text-white/80">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-bold">Canapa</td>
                  <td className="py-3 px-4">Fino a 12 ore (metaboliti fino a 3 settimane)</td>
                  <td className="py-3 px-4">3-30 giorni (fino a 3 mesi se uso cronico)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-bold">Cocaina</td>
                  <td className="py-3 px-4">Fino a 2 ore (metaboliti fino a 24 ore)</td>
                  <td className="py-3 px-4">2 - 3 giorni</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-bold">MDMA / Ecstasy</td>
                  <td className="py-3 px-4">Fino a 24 ore</td>
                  <td className="py-3 px-4">2 - 4 giorni</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-bold">Speed / Anfetamina</td>
                  <td className="py-3 px-4">8 - 30 ore</td>
                  <td className="py-3 px-4">2 - 4 giorni</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-bold">LSD</td>
                  <td className="py-3 px-4">Fino a 12 ore</td>
                  <td className="py-3 px-4">2 - 4 giorni</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-bold">GHB</td>
                  <td className="py-3 px-4">Fino a 8 ore</td>
                  <td className="py-3 px-4">Fino a 12 ore</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <h4 className="font-bold text-yellow-400 mb-2">Test del capello</h4>
            <p className="text-sm text-white/80">È possibile rilevare l’uso di sostanze psicoattive anche dopo diversi mesi dall’ultimo consumo. Poiché i capelli crescono di circa 1 cm al mese, un capello lungo 12 cm può rivelare i consumi di un intero anno.</p>
          </div>
        </>
      )
    },
    'modalita-di-consumo': {
      title: 'Modalità di consumo',
      content: (
        <>
          <p className="mb-6 text-lg">
            La modalità di consumo è il modo attraverso il quale una sostanza psicoattiva entra nell’organismo. Influenza il dosaggio, la salita, la durata degli effetti e i rischi.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h4 className="font-bold text-blue-400 mb-2">Orale (Ingerire)</h4>
              <p className="text-sm text-white/80 mb-2"><strong>Salita:</strong> Lenta (30-120 min).</p>
              <p className="text-sm text-white/80"><strong>Rischi:</strong> Sovradosaggio involontario perché si pensa che "non faccia effetto" e si ridosa troppo presto.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h4 className="font-bold text-purple-400 mb-2">Nasale (Sniffare)</h4>
              <p className="text-sm text-white/80 mb-2"><strong>Salita:</strong> Rapida (pochi secondi/minuti).</p>
              <p className="text-sm text-white/80"><strong>Rischi:</strong> Danni alle mucose, trasmissione di Epatite C tramite cannucce condivise.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h4 className="font-bold text-orange-400 mb-2">Fumare / Inalare</h4>
              <p className="text-sm text-white/80 mb-2"><strong>Salita:</strong> Immediata, flash intenso ma breve.</p>
              <p className="text-sm text-white/80"><strong>Rischi:</strong> Danni ai polmoni, altissimo potenziale di dipendenza psicologica per il craving immediato.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h4 className="font-bold text-red-400 mb-2">Endovena (IV)</h4>
              <p className="text-sm text-white/80 mb-2"><strong>Salita:</strong> Istantanea.</p>
              <p className="text-sm text-white/80"><strong>Rischi:</strong> Altissimo rischio di overdose, trasmissione di HIV/Epatite se si condividono siringhe, ascessi.</p>
            </div>
          </div>
        </>
      )
    },
    'policonsumo': {
      title: 'Policonsumo',
      content: (
        <>
          <p className="mb-6 text-lg font-bold text-red-400">
            1 + 1 ≠ 2 !
          </p>
          <p className="mb-6 text-white/80">
            Il consumo combinato di due o più sostanze in poco tempo sovraccarica il corpo e la mente. Gli effetti della combinazione sono difficili da prevedere e generalmente non corrispondono alla somma dei rispettivi effetti.
          </p>

          <div className="space-y-4 mb-8">
            <div className="p-4 bg-black/40 rounded-xl border border-red-500/30">
              <h4 className="font-bold text-red-200 mb-1">Ecstasy + Speed / Cocaina</h4>
              <p className="text-sm mt-1 font-bold text-red-400">Rischio: Sovradosaggio, danni cerebrali, hangover estremo.</p>
            </div>
            <div className="p-4 bg-black/40 rounded-xl border border-orange-500/30">
              <h4 className="font-bold text-orange-200 mb-1">Cocaina + Alcol</h4>
              <p className="text-sm mt-1 font-bold text-orange-400">Rischio: Creazione di Cocaetilene nel fegato (altamente tossico). Aumento aggressività e rischio infarto.</p>
            </div>
            <div className="p-4 bg-black/40 rounded-xl border border-yellow-500/30">
              <h4 className="font-bold text-yellow-200 mb-1">GHB + Alcol / Ketamina</h4>
              <p className="text-sm mt-1 font-bold text-yellow-400">Rischio Letale: Arresto respiratorio, coma, soffocamento da vomito.</p>
            </div>
            <div className="p-4 bg-black/40 rounded-xl border border-purple-500/30">
              <h4 className="font-bold text-purple-200 mb-1">Popper + Viagra / Cialis</h4>
              <p className="text-sm mt-1 font-bold text-purple-400">Rischio Letale: Improvviso e fatale calo della pressione sanguigna.</p>
            </div>
          </div>

          <p className="text-sm text-white/80 italic">
            Per ridurre il sovraccarico del fegato e dei reni, bisogna bere molta acqua (5 dl ogni ora), ma niente alcol!
          </p>
        </>
      )
    },
    'safer-sex': {
      title: 'Safer Sex',
      content: (
        <>
          <p className="mb-6 text-lg">
            Le sostanze psicoattive possono aumentare la propensione al rischio e il desiderio sessuale. Fare l'amore è fonte di piacere, ma sotto l'effetto di sostanze si corrono rischi maggiori.
          </p>
          <p className="mb-8 text-white/80">
            «Safer sex» non significa solamente contraccezione ma proteggersi dalle infezioni sessualmente trasmissibili (HIV, epatite, sifilide, gonorrea, clamidia). Anche sotto l’effetto di sostanze, bisogna <strong>sempre usare il preservativo</strong>.
          </p>

          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl mb-8">
            <h3 className="font-bold text-xl mb-6 text-pink-400">Sostanze a rischio nel sesso:</h3>
            <ul className="space-y-4 text-white/80">
              <li><strong>Alcol & Cocaina:</strong> Disinibizione totale, eccessiva fiducia in se stessi, si dimentica il preservativo.</li>
              <li><strong>GHB / GBL:</strong> Aumento del desiderio ma forte rischio di perdita di coscienza (usato come "droga da stupro").</li>
              <li><strong>Popper & Metanfetamina:</strong> Forti afrodisiaci, spingono a pratiche estreme e prolungate che causano micro-lacerazioni.</li>
            </ul>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl">
            <h3 className="font-bold uppercase tracking-widest mb-2 text-red-200">Sex Trip Rules</h3>
            <ul className="list-disc list-inside text-sm space-y-2 text-white/80">
              <li>Consumare solo di comune accordo e chiarire prima i limiti (tabù).</li>
              <li>Concordare un «segnale di stop» (safe word).</li>
              <li>Ecstasy, speed e cocaina disidratano le mucose: usare molto lubrificante per evitare la rottura del preservativo.</li>
              <li>In caso di rapporti non protetti a rischio HIV, recarsi in ospedale entro 72 ore per la PEP (Profilassi Post Esposizione).</li>
            </ul>
          </div>
        </>
      )
    },
    'sostanze-psicoattive-e-farmaci': {
      title: 'Sostanze psicoattive e farmaci',
      content: (
        <>
          <p className="mb-6 text-lg font-bold text-red-400">
            L’uso combinato di farmaci e sostanze psicoattive è pericoloso per la salute.
          </p>
          <p className="mb-8 text-white/80">
            I farmaci e le sostanze psicoattive sono entrambi scomposti nel fegato. Se assunti contemporaneamente, il fegato è sovraccaricato: questo può rallentare l’assorbimento o accelerare la metabolizzazione dei farmaci, compromettendo le terapie o causando overdose.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h4 className="font-bold text-blue-400 mb-2">Antidepressivi (SSRI / MAO)</h4>
              <p className="text-sm text-white/80">La combinazione di MDMA con antidepressivi MAO-inibitori è letale (Sindrome Serotoninergica). Gli SSRI (es. Prozac) bloccano gli effetti dell'MDMA, spingendo l'utente a ridosare pericolosamente.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h4 className="font-bold text-purple-400 mb-2">Pillola Anticoncezionale</h4>
              <p className="text-sm text-white/80">Vomito e diarrea (effetti collaterali comuni di molte droghe) annullano l'effetto della pillola. Il consumo regolare di stimolanti sballa il ciclo mestruale.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h4 className="font-bold text-yellow-400 mb-2">Antibiotici</h4>
              <p className="text-sm text-white/80">L'alcol e le droghe sovraccaricano il fegato e il sistema immunitario, annullando l'efficacia dell'antibiotico e prolungando l'infezione.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <h4 className="font-bold text-red-400 mb-2">Viagra / Cialis</h4>
              <p className="text-sm text-white/80">Il mix con Popper causa un crollo fatale della pressione. Il mix con stimolanti (Cocaina, Speed) causa un sovraccarico cardiaco estremo.</p>
            </div>
          </div>
        </>
      )
    },
    'safer-use': {
      title: 'Safer Use',
      content: (
        <>
          <p className="mb-6 text-lg">
            Non c’è consumo senza rischi! Se tuttavia si decide di consumare, occorre rispettare le raccomandazioni di safer use.
          </p>
          
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl mb-8">
            <h3 className="font-bold text-2xl mb-6 text-green-400">Le Regole d'Oro</h3>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold mt-1">1.</span>
                <span><strong>Informati:</strong> Conosci la sostanza (Drug), valuta come ti senti (Set) e dove sei (Setting).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold mt-1">2.</span>
                <span><strong>H2O vs KO:</strong> Bevi acqua o bibite isotoniche (max 5 dl all'ora se balli). L'alcol e gli energy drink disidratano!</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold mt-1">3.</span>
                <span><strong>No Policonsumo:</strong> Evita di mischiare sostanze diverse, specialmente alcol con altre droghe.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold mt-1">4.</span>
                <span><strong>Start Low, Go Slow:</strong> Inizia con una dose minima e aspetta che salga. Non ridosare per impazienza.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold mt-1">5.</span>
                <span><strong>Pausa:</strong> Fai pause regolari in zone fresche (chill out). Non indossare cappelli pesanti mentre balli.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold mt-1">6.</span>
                <span><strong>Materiale Personale:</strong> Non condividere MAI cannucce o siringhe.</span>
              </li>
            </ul>
          </div>

          <p className="text-white/80 italic">
            Fai una «quaresima» almeno due volte all’anno, rinunciando al consumo di sostanze psicoattive per alcune settimane per permettere al corpo e al cervello di resettarsi.
          </p>
        </>
      )
    }
  };

  const data = db[id as string] || { 
    title: 'Approfondimento non trovato', 
    content: <p>Il contenuto richiesto non è al momento disponibile o è in fase di aggiornamento.</p> 
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto pointer-events-auto"
    >
      <Link to="/rischi" className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:opacity-50 transition-opacity w-fit mb-12 mix-blend-difference">
        <ArrowLeft className="w-4 h-4" /> Torna a Rischi
      </Link>

      <div className="mb-12 mix-blend-difference">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
          {data.title}
        </h1>
      </div>

      <div className="prose prose-invert prose-lg max-w-none bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-2xl">
        {data.content}
      </div>
    </motion.div>
  );
}
