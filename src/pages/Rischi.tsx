import { motion } from 'motion/react';
import { AlertTriangle, Activity, BrainCircuit, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Rischi() {
  const [search, setSearch] = useState('');

  const argomentiData = [
    { title: "Al momento dell'acquisto", path: "al-momento-dell-acquisto", keywords: ["comprare", "spacciatore", "mercato nero", "internet", "legal highs", "riconoscere", "fregatura"] },
    { title: "Chill out & cool down", path: "chill-out-cool-down", keywords: ["riposo", "pausa", "caldo", "bere", "hangover", "down", "recupero", "dormire", "stanchezza"] },
    { title: "Composizione delle sostanze", path: "composizione-delle-sostanze", keywords: ["taglio", "purezza", "analisi", "drug checking", "cosa c'è dentro", "principio attivo"] },
    { title: "Consumo e circolazione stradale", path: "consumo-e-circolazione-stradale", keywords: ["guidare", "macchina", "auto", "patente", "ritiro", "polizia", "incidente", "assicurazione", "etilometro"] },
    { title: "Cosa dice la legge?", path: "cosa-dice-la-legge", keywords: ["polizia", "arresto", "multa", "legale", "illegale", "prigione", "avvocato", "10 grammi", "LStup", "reato", "controllo"] },
    { title: "Cosa fare in caso di emergenza?", path: "cosa-fare-in-caso-di-emergenza", keywords: ["144", "ambulanza", "bad trip", "panico", "collasso", "ospedale", "svenimento", "cuore", "respirazione", "aiuto", "soccorso", "morte"] },
    { title: "Cosa succede nel cervello?", path: "cosa-succede-nel-cervello", keywords: ["serotonina", "dopamina", "neuroni", "danni", "memoria", "recettori", "sinapsi", "neurotrasmettitori"] },
    { title: "Drug, Set & Setting", path: "drug-set-setting", keywords: ["ambiente", "stato d'animo", "umore", "compagnia", "preparazione", "regole", "viaggio", "trip"] },
    { title: "Informazioni per gli uomini", path: "informazioni-per-gli-uomini", keywords: ["uomo", "maschio", "sesso", "erezione", "impotenza", "spermatozoi", "fertilità", "testosterone"] },
    { title: "Informazioni per le donne", path: "informazioni-per-le-donne", keywords: ["donna", "ragazza", "ciclo", "mestruazioni", "gravidanza", "incinta", "allattamento", "pillola", "peso"] },
    { title: "Modalità di consumo", path: "modalita-di-consumo", keywords: ["sniffare", "fumare", "iniettare", "vena", "orale", "mangiare", "naso", "siringa", "pippare", "calare"] },
    { title: "Policonsumo", path: "policonsumo", keywords: ["mischiare", "mix", "insieme", "alcol e", "cocktail", "interazioni", "pericolo"] },
    { title: "Safer sex", path: "safer-sex", keywords: ["sesso", "preservativo", "malattie", "HIV", "MST", "gravidanza", "infezioni", "rapporto", "consenso"] },
    { title: "Safer sniffing", path: "safer-sniffing", keywords: ["naso", "pippare", "cannuccia", "banconota", "sangue", "mucose", "pulizia", "epatite"] },
    { title: "Safer Use", path: "safer-use", keywords: ["regole", "sicurezza", "riduzione del danno", "consigli", "bere acqua", "dosaggio", "start low"] },
    { title: "Sostanze psicoattive e farmaci", path: "sostanze-psicoattive-e-farmaci", keywords: ["medicine", "antibiotici", "pillola", "viagra", "antidepressivi", "interazioni", "medico", "cura"] },
    { title: "Sostanze psicoattive e patologie", path: "sostanze-psicoattive-e-patologie", keywords: ["malattie", "cuore", "epilessia", "diabete", "ansia", "depressione", "asma", "respiro"] },
    { title: "Too much? Consumo problematico", path: "too-much-consumo-problematico", keywords: ["dipendenza", "smettere", "aiuto", "problemi", "psichiatra", "esagerare", "controllo", "astinenza"] },
    { title: "Tracce del consumo nell'organismo", path: "tracce-del-consumo-nell-organismo", keywords: ["test", "sangue", "urine", "capello", "patente", "quanto dura", "smaltimento", "rilevabilità"] }
  ];

  // Sort alphabetically and filter based on intelligent search
  const filteredArgomenti = argomentiData
    .sort((a, b) => a.title.localeCompare(b.title))
    .filter(a => {
      const query = search.toLowerCase();
      return a.title.toLowerCase().includes(query) || a.keywords.some(k => k.toLowerCase().includes(query));
    });

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-start pointer-events-auto"
    >
      <div className="overflow-hidden mb-12 mix-blend-difference">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85]">
          Rischi &<br/>Riduzione
        </h1>
      </div>
      
      <p className="text-lg md:text-xl font-light max-w-3xl text-white/80 mb-16 mix-blend-difference">
        Non c’è consumo senza rischi! Se non vuoi correre nessun rischio allora rinuncia al consumo. Se tuttavia decidi di consumare, informati in anticipo sugli effetti, i rischi e le conseguenze in modo da poter gestire i pericoli e ridurre i possibili danni.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        {/* Main Content Area */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h2 className="text-3xl font-bold uppercase tracking-tighter">Approfondimenti</h2>
              
              {/* Intelligent Search Bar */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                <input 
                  type="text" 
                  placeholder="Cosa stai cercando? (es. patente, mix...)" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-full py-2 pl-10 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors font-mono text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredArgomenti.map((argomento, i) => (
                <Link key={i} to={`/rischi/${argomento.path}`}>
                  <div className="p-4 border border-white/10 hover:bg-white hover:text-black transition-colors group flex justify-between items-center h-full">
                    <span className="font-bold text-sm leading-tight">{argomento.title}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                  </div>
                </Link>
              ))}
              {filteredArgomenti.length === 0 && (
                <div className="col-span-full py-8 text-center opacity-50 font-mono text-sm">
                  Nessun risultato trovato per "{search}". Prova con altre parole chiave.
                </div>
              )}
            </div>
          </div>

          {/* Set & Setting */}
          <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm rounded-2xl">
            <div className="flex items-center gap-4 mb-6">
              <BrainCircuit className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl font-bold uppercase tracking-tighter">Set & Setting</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-light text-white/80">
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">SET (Stato Interiore)</h3>
                <p>
                  Riguarda il tuo stato d'animo, le tue aspettative, la tua salute fisica e mentale. Non consumare se sei triste, ansioso o stai attraversando un periodo difficile: le sostanze amplificano lo stato d'animo preesistente.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">SETTING (Ambiente)</h3>
                <p>
                  Riguarda il luogo fisico e le persone con cui ti trovi. Consuma solo in ambienti in cui ti senti a tuo agio e al sicuro. Circondati di persone di fiducia e assicurati che almeno uno del gruppo sia sobrio (Trip Sitter).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mix Pericolosi Sidebar */}
        <div className="col-span-1 flex flex-col gap-6">
          <div className="bg-red-500/10 border border-red-500/20 p-8 backdrop-blur-sm rounded-2xl h-full">
            <div className="flex items-center gap-4 mb-6">
              <Activity className="w-8 h-8 text-red-400" />
              <h2 className="text-3xl font-bold uppercase tracking-tighter text-red-100">Mix Pericolosi</h2>
            </div>
            <p className="font-light text-white/80 mb-6">
              Il poli-consumo (assumere più sostanze contemporaneamente) moltiplica i rischi in modo imprevedibile. Il fegato e i reni vengono sovraccaricati.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-black/40 rounded-xl border border-red-500/30">
                <h4 className="font-bold text-red-200 mb-1">Depressori + Depressori</h4>
                <p className="text-xs font-light opacity-80">Es: Alcol + GHB, Alcol + Ketamina, Alcol + Benzo.</p>
                <p className="text-sm mt-2 font-bold text-red-400">Rischio Letale: Arresto respiratorio, coma, soffocamento da vomito.</p>
              </div>
              
              <div className="p-4 bg-black/40 rounded-xl border border-orange-500/30">
                <h4 className="font-bold text-orange-200 mb-1">Stimolanti + Stimolanti</h4>
                <p className="text-xs font-light opacity-80">Es: Cocaina + Speed, MDMA + Cocaina.</p>
                <p className="text-sm mt-2 font-bold text-orange-400">Rischio Alto: Sovraccarico cardiovascolare, infarto, psicosi, ipertermia.</p>
              </div>

              <div className="p-4 bg-black/40 rounded-xl border border-yellow-500/30">
                <h4 className="font-bold text-yellow-200 mb-1">Stimolanti + Depressori</h4>
                <p className="text-xs font-light opacity-80">Es: Cocaina + Alcol.</p>
                <p className="text-sm mt-2 font-bold text-yellow-400">Rischio Alto: Creano il Cocaetilene (molto tossico per il fegato). Mascherano gli effetti reciproci portando a sovradosaggio.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
