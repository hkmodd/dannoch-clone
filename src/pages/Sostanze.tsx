import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

export function Sostanze() {
  const [search, setSearch] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const sostanze = [
    { id: '2-fa-3-fa-4-fa', name: '2-FA / 3-FA / 4-FA', category: 'Stimolanti' },
    { id: '2cb', name: '2C-B / 2C-X', category: 'Psichedelici' },
    { id: 'alcol', name: 'Alcol', category: 'Downer' },
    { id: 'speed', name: 'Anfetamina-Speed', category: 'Stimolanti' },
    { id: 'benzodiazepine', name: 'Benzodiazepine', category: 'Downer' },
    { id: 'caffeina', name: 'Caffeina', category: 'Stimolanti' },
    { id: 'cannabis', name: 'Canapa', category: 'Downer' },
    { id: 'canapa-cbd', name: 'Canapa CBD', category: 'Downer' },
    { id: 'cannabinoidi-sintetici', name: 'Cannabinoidi sintetici', category: 'Nuove Sostanze Psicoattive (NSP)' },
    { id: 'cocaina', name: 'Cocaina', category: 'Stimolanti' },
    { id: 'codeina', name: 'Codeina', category: 'Downer' },
    { id: 'dmt', name: 'DMT / 5-MeO-DMT', category: 'Psichedelici' },
    { id: 'dom-doi-dob-doc', name: 'DOM / DOI / DOB / DOC', category: 'Psichedelici' },
    { id: 'dxm', name: 'DXM', category: 'Dissociativi' },
    { id: 'mdma', name: 'Ecstasy-MDMA', category: 'Empatogeni / Entactogeni' },
    { id: 'efedrina', name: 'Efedrina', category: 'Stimolanti' },
    { id: 'eroina', name: 'Eroina', category: 'Downer' },
    { id: 'gas-esilarante', name: 'Gas esilarante', category: 'Dissociativi' },
    { id: 'ghb', name: 'GHB-GBL', category: 'Downer' },
    { id: 'ketamina', name: 'Ketamina', category: 'Dissociativi' },
    { id: 'khat', name: 'Khat', category: 'Stimolanti' },
    { id: 'lsd', name: 'LSD', category: 'Psichedelici' },
    { id: 'm-cpp', name: 'm-CPP', category: 'Stimolanti' },
    { id: 'mda', name: 'MDA', category: 'Empatogeni / Entactogeni' },
    { id: 'mdai', name: 'MDAI', category: 'Empatogeni / Entactogeni' },
    { id: 'mdea', name: 'MDEA', category: 'Empatogeni / Entactogeni' },
    { id: 'mdpv', name: 'MDPV', category: 'Stimolanti' },
    { id: 'mefedrone', name: 'Mefedrone', category: 'Stimolanti' },
    { id: 'mescalina', name: 'Mescalina', category: 'Psichedelici' },
    { id: 'metanfetamina', name: 'Metanfetamina', category: 'Stimolanti' },
    { id: 'metilone', name: 'Metilone', category: 'Stimolanti' },
    { id: 'metoxetamina', name: 'Metoxetamina', category: 'Dissociativi' },
    { id: 'nbome', name: 'NBOMe', category: 'Psichedelici' },
    { id: 'neurolettici', name: 'Neurolettici', category: 'Downer' },
    { id: 'nsp', name: 'Nuove Sostanze Psicoattive (NSP)', category: 'Nuove Sostanze Psicoattive (NSP)' },
    { id: 'oppiacei', name: 'Oppiacei', category: 'Downer' },
    { id: 'oppio', name: 'Oppio', category: 'Downer' },
    { id: 'pcp', name: 'PCP', category: 'Dissociativi' },
    { id: 'pma-pmma', name: 'PMA / PMMA', category: 'Stimolanti' },
    { id: 'popper', name: 'Popper', category: 'Stimolanti' }, // Often classed as inhalants, but keeping to main categories
    { id: 'funghi', name: 'Psilocibina-funghi allucinogeni', category: 'Psichedelici' },
    { id: 'ritalin-concerta', name: 'Ritalin - Concerta', category: 'Stimolanti' },
    { id: 'salvia-divinorum', name: 'Salvia divinorum', category: 'Psichedelici' },
    { id: 'solanacee-psicoattive', name: 'Solanacee psicoattive', category: 'Psichedelici' },
    { id: 'tabacco-nicotina', name: 'Tabacco-Nicotina', category: 'Stimolanti' },
    { id: 'tfmpp', name: 'TFMPP', category: 'Stimolanti' },
    { id: 'viagra-levitra-cialis', name: 'Viagra / Levitra / Cialis', category: 'Stimolanti' }
  ];

  const categories = [
    {
      name: 'Psichedelici',
      examples: 'LSD, funghi allucinogeni…',
      description: (
        <>
          <p className="mb-2">Gli psichedelici sono sostanze psicoattive con effetti allucinogeni.</p>
          <p className="mb-2">Il consumo di psichedelici riduce il funzionamento del talamo che nel cervello ha la funzione di filtro. Quando l’azione del talamo è ridotta le percezioni sensoriali cambiano. In questi casi si parla comunemente di «trip».</p>
          <p>Poiché un trip può essere un’esperienza vissuta con grande intensità, gli psichedelici dovrebbero essere consumati solo raramente e non con regolarità.</p>
        </>
      )
    },
    {
      name: 'Empatogeni / Entactogeni',
      examples: 'MDMA, 2C-X, GBL…',
      description: (
        <>
          <p className="mb-2">Entactogeni e empatogeni sono sostanze psicoattive che influenzano principalmente l’umore e suscitano sensazioni di apertura verso gli altri. Generalmente le emozioni sono percepite più intensamente e si avverte un senso di empatia e di comunione nei confronti delle persone.</p>
          <p className="mb-2">Entactogeni e empatogeni favoriscono il rilascio e/o inibiscono la ricaptazione della serotonina e, in parte, anche della dopamina e della noradrenalina, agendo così anche come stimolanti.</p>
          <p>Poiché il corpo rilascia lentamente la serotonina, occorre rinunciare al consumo per almeno 3 – 4 settimane.</p>
        </>
      )
    },
    {
      name: 'Stimolanti',
      examples: 'caffeina, cocaina, anfetamina, nicotina…',
      description: (
        <>
          <p className="mb-2">Gli stimolanti sono sostanze psicoattive con effetti eccitanti, euforizzanti che influenzano l’umore, aumentano la resistenza fisica e sollecitano la mente.</p>
          <p className="mb-2">Le sostanze stimolanti favoriscono il rilascio e/o inibiscono la ricaptazione di neurotrasmettitori come noradrenalina, adrenalina e dopamina. Questi neurotrasmettitori possono essere considerati come gli ormoni dello stress e possono portare a una riduzione della sete, della fame, del dolore e del bisogno di dormire.</p>
          <p>Poiché gli stimolanti logorano l’organismo, dopo il consumo dovrebbero seguire alcune settimane pausa per permettere al corpo di recuperare.</p>
        </>
      )
    },
    {
      name: 'Dissociativi',
      examples: 'ketamina, gas esilarante, DXM…',
      description: (
        <>
          <p className="mb-2">Gli allucinogeni dissociativi sono sostanze psicoattive che provocano effetti dissociativi fra l’ambiente e se stessi, nonché tra mente e corpo.</p>
          <p className="mb-2">Il consumo di sostanze dissociative scombussola il funzionamento del cervello provocando stati catalettici, analgesia e anestesia (insensibilità al dolore) anche quando non si perde conoscenza. A dosi elevate, i dissociativi sono usati come anestetici nella medicina d’urgenza. A bassi dosaggi, gli effetti sono prevalentemente psichedelici e trascendentali. Lo stato di coscienza, la memoria, le capacità motorie sono scomposte provocando pseudoallucinazioni vissute come di percezioni sensoriali sovrapposte.</p>
          <p>I dissociativi devono essere consumati solo in ambienti protetti perché le capacità motorie sono compromesse. Poiché l’esperienza con i dissociativi può essere vissuta in modo molto intenso, occorre prepararsi e consumare solo raramente e non con regolarità.</p>
        </>
      )
    },
    {
      name: 'Downer',
      examples: 'alcol, canapa, eroina',
      description: (
        <>
          <p className="mb-2">I downer sono sostanze psicoattive che distendono i muscoli, hanno un effetto rilassante, riducono il coordinamento motorio, l’euforia e l’ansia, rallentando le attività corporee (riduzione della capacità di reazione). I downer possono stordire fino a indurre sonnolenza e provocare stati onirici.</p>
          <p className="mb-2">I downer agiscono sulle parti centrali del cervello, in particolare sui ricettori GABA che svolgono un ruolo chiave sul controllo del sonno. Rilassando la muscolatura e inducendo effetti soporiferi, consumo di downer aumenta il rischio d’incidenti.</p>
          <p>I downer hanno un potenziale di dipendenza elevato e dovrebbero essere consumati solo occasionalmente. La canapa è considerata un downer perché, oltre ad un effetto calmante, ha anche un effetto sedativo.</p>
        </>
      )
    },
    {
      name: 'Nuove Sostanze Psicoattive (NSP)',
      examples: 'feniletilammine, catinoni sintentici, piperazine, triptamine, cannabinoidi sintentici, oppiodi',
      description: (
        <>
          <p className="mb-2">La categoria delle nuove sostanze psicoattive (NSP) raggruppa tutte quelle sostanze sintetiche con effetti psicoattivi paragonabili a quelli delle sostanze illegali più conosciute.</p>
          <p className="mb-2">Da un punto di vista chimico, si tratta in particolare di triptamine, fenetilamine, catinoni sintetici, cannabinoidi sintetici, piperazine e oppiodi. Attraverso la modifica delle strutture chimiche delle principali sostanze illegali, vengono «progettate» delle nuove sostanze che non rientrano nell'elenco degli stupefacenti e, per questa ragione, sono chiamati «legal highs» (euforizzanti legali).</p>
          <p>Alcune NSP sono spacciate per anfetamine, ketamina, ecstasy o aggiunte come prodotti di taglio. Le miscele da fumare come gli «spice» sono un composto di erbe a cui sono aggiunti dei cannabinoidi sintetici che producono effetti psicoattivi.</p>
        </>
      )
    }
  ];

  const filtered = sostanze.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-start pointer-events-auto"
    >
      <div className="overflow-hidden w-full flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85] mix-blend-difference">
          Sostanze
        </h1>
        
        <div className="relative w-full md:w-72 mix-blend-difference">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
          <input 
            type="text" 
            placeholder="Cerca sostanza..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border border-white/30 rounded-full py-3 pl-12 pr-6 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors font-mono text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full mb-16">
        <div className="col-span-1 lg:col-span-2">
          <p className="text-lg md:text-xl font-light text-white/80 mix-blend-difference mb-6">
            Le droghe sono sostanze naturali o create artificialmente che alterano la percezione della realtà, modificano lo stato di coscienza, incidono sulle prestazioni e le capacità psicofisiche, e possono portare a sviluppare una dipendenza.
          </p>
          <p className="font-light text-white/60 mix-blend-difference">
            Nell'immaginario collettivo il termine «droga» è spesso assimilato alle sostanze illegali, ma anche alcol, tabacco, caffeina, ecc. sono sostanze psicoattive. Il concetto di "sostanze psicoattive" è meno stigmatizzante e permette di includere, al di là del loro statuto legale, tutte le sostanze che hanno degli effetti sulla mente e sul corpo.
          </p>
        </div>
        
        <div className="col-span-1 flex flex-col gap-4">
          <h3 className="font-bold uppercase tracking-widest text-sm mb-4 mix-blend-difference">Categorie Principali</h3>
          <div className="space-y-2">
            {categories.map(cat => (
              <div key={cat.name} className="border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                  className="w-full p-4 flex items-center justify-between hover:bg-white/10 transition-colors text-left"
                >
                  <span className="font-mono text-xs uppercase tracking-widest font-bold">{cat.name}</span>
                  {expandedCategory === cat.name ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <AnimatePresence>
                  {expandedCategory === cat.name && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-xs font-mono text-blue-400 mb-4">{cat.examples}</p>
                      <div className="text-sm font-light text-white/80">
                        {cat.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {filtered.map((sostanza, i) => (
          <Link key={sostanza.id} to={`/sostanze/${sostanza.id}`}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 20) * 0.05 }}
              className="border border-white/10 bg-black/20 backdrop-blur-sm p-6 h-40 flex flex-col justify-between hover:bg-white hover:text-black transition-all duration-300 group cursor-pointer"
            >
              <span className="font-mono text-[9px] uppercase tracking-widest opacity-50 group-hover:opacity-100 border border-current w-fit px-2 py-1 rounded-full">
                {sostanza.category}
              </span>
              <div>
                <h3 className="font-black text-xl tracking-tighter group-hover:translate-x-2 transition-transform leading-tight">{sostanza.name}</h3>
              </div>
            </motion.div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center opacity-50 font-mono uppercase tracking-widest">
            Nessuna sostanza trovata.
          </div>
        )}
      </div>
    </motion.div>
  );
}
