import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, ChevronUp, Sparkles, Zap, Brain, ChevronRight, FlaskConical, ArrowDown } from 'lucide-react';
import { sostanzeList, CATEGORY_COLORS } from '../data/sostanze';

// Category icons & Tailwind text colors derived from CATEGORY_COLORS hex
const CATEGORY_META: Record<string, { icon: typeof Sparkles; tw: string; twBg: string; twBorder: string }> = {
  'Psichedelici': { icon: Sparkles, tw: 'text-violet-400', twBg: 'bg-violet-500/20', twBorder: 'border-violet-500/40' },
  'Empatogeni / Entactogeni': { icon: Brain, tw: 'text-pink-400', twBg: 'bg-pink-500/20', twBorder: 'border-pink-500/40' },
  'Stimolanti': { icon: Zap, tw: 'text-amber-400', twBg: 'bg-amber-500/20', twBorder: 'border-amber-500/40' },
  'Dissociativi': { icon: FlaskConical, tw: 'text-cyan-400', twBg: 'bg-cyan-500/20', twBorder: 'border-cyan-500/40' },
  'Downer': { icon: ArrowDown, tw: 'text-indigo-400', twBg: 'bg-indigo-500/20', twBorder: 'border-indigo-500/40' },
  'Nuove Sostanze Psicoattive (NSP)': { icon: ChevronRight, tw: 'text-red-400', twBg: 'bg-red-500/20', twBorder: 'border-red-500/40' },
};

// Scroll position persistence key
const SCROLL_KEY = 'sostanze_scroll';

export function Sostanze() {
  const [search, setSearch] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const sostanze = sostanzeList;

  // Restore scroll position when returning from a detail page
  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved) {
      // Find the scroll container (overflow-y-auto parent)
      const scrollEl = document.querySelector('[data-scroll-container]') as HTMLElement;
      if (scrollEl) {
        requestAnimationFrame(() => {
          scrollEl.scrollTop = parseInt(saved, 10);
        });
      }
      sessionStorage.removeItem(SCROLL_KEY);
    }
  }, []);

  // Save scroll position before navigating to detail
  const handleSubstanceClick = () => {
    const scrollEl = document.querySelector('[data-scroll-container]') as HTMLElement;
    if (scrollEl) {
      sessionStorage.setItem(SCROLL_KEY, String(scrollEl.scrollTop));
    }
  };

  const categories = [
    {
      name: 'Psichedelici',
      examples: 'LSD, funghi allucinogeni…',
      description: (
        <>
          <p className="mb-2">Gli psichedelici sono sostanze psicoattive con effetti allucinogeni.</p>
          <p className="mb-2">Il consumo di psichedelici riduce il funzionamento del talamo che nel cervello ha la funzione di filtro. Quando l'azione del talamo è ridotta le percezioni sensoriali cambiano. In questi casi si parla comunemente di «trip».</p>
          <p>Poiché un trip può essere un'esperienza vissuta con grande intensità, gli psichedelici dovrebbero essere consumati solo raramente e non con regolarità.</p>
        </>
      )
    },
    {
      name: 'Empatogeni / Entactogeni',
      examples: 'MDMA, 2C-X, GBL…',
      description: (
        <>
          <p className="mb-2">Entactogeni e empatogeni sono sostanze psicoattive che influenzano principalmente l'umore e suscitano sensazioni di apertura verso gli altri.</p>
          <p className="mb-2">Entactogeni e empatogeni favoriscono il rilascio e/o inibiscono la ricaptazione della serotonina e, in parte, anche della dopamina e della noradrenalina.</p>
          <p>Poiché il corpo rilascia lentamente la serotonina, occorre rinunciare al consumo per almeno 3 – 4 settimane.</p>
        </>
      )
    },
    {
      name: 'Stimolanti',
      examples: 'caffeina, cocaina, anfetamina, nicotina…',
      description: (
        <>
          <p className="mb-2">Gli stimolanti sono sostanze psicoattive con effetti eccitanti, euforizzanti che influenzano l'umore, aumentano la resistenza fisica e sollecitano la mente.</p>
          <p className="mb-2">Le sostanze stimolanti favoriscono il rilascio e/o inibiscono la ricaptazione di neurotrasmettitori come noradrenalina, adrenalina e dopamina.</p>
          <p>Poiché gli stimolanti logorano l'organismo, dopo il consumo dovrebbero seguire alcune settimane pausa per permettere al corpo di recuperare.</p>
        </>
      )
    },
    {
      name: 'Dissociativi',
      examples: 'ketamina, gas esilarante, DXM…',
      description: (
        <>
          <p className="mb-2">Gli allucinogeni dissociativi sono sostanze psicoattive che provocano effetti dissociativi fra l'ambiente e se stessi, nonché tra mente e corpo.</p>
          <p className="mb-2">Il consumo di sostanze dissociative scombussola il funzionamento del cervello provocando stati catalettici, analgesia e anestesia.</p>
          <p>I dissociativi devono essere consumati solo in ambienti protetti perché le capacità motorie sono compromesse.</p>
        </>
      )
    },
    {
      name: 'Downer',
      examples: 'alcol, canapa, eroina',
      description: (
        <>
          <p className="mb-2">I downer sono sostanze psicoattive che distendono i muscoli, hanno un effetto rilassante, riducono il coordinamento motorio, l'euforia e l'ansia.</p>
          <p className="mb-2">I downer agiscono sulle parti centrali del cervello, in particolare sui ricettori GABA che svolgono un ruolo chiave sul controllo del sonno.</p>
          <p>I downer hanno un potenziale di dipendenza elevato e dovrebbero essere consumati solo occasionalmente.</p>
        </>
      )
    },
    {
      name: 'Nuove Sostanze Psicoattive (NSP)',
      examples: 'feniletilammine, catinoni sintetici, piperazine, triptamine, cannabinoidi sintetici, oppiodi',
      description: (
        <>
          <p className="mb-2">La categoria delle nuove sostanze psicoattive (NSP) raggruppa tutte quelle sostanze sintetiche con effetti psicoattivi paragonabili a quelli delle sostanze illegali più conosciute.</p>
          <p className="mb-2">Da un punto di vista chimico, si tratta in particolare di triptamine, fenetilamine, catinoni sintetici, cannabinoidi sintetici, piperazine e oppiodi.</p>
          <p>Alcune NSP sono spacciate per anfetamine, ketamina, ecstasy o aggiunte come prodotti di taglio.</p>
        </>
      )
    }
  ];

  const filtered = sostanze.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      ref={scrollContainerRef}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
            {categories.map(cat => {
              const meta = CATEGORY_META[cat.name];
              const CatIcon = meta?.icon || Sparkles;
              const isActive = categoryFilter === cat.name;
              return (
                <div key={cat.name} className={`border ${isActive ? meta?.twBorder || 'border-white/30' : 'border-white/10'} ${isActive ? meta?.twBg || 'bg-white/10' : 'bg-black/40'} backdrop-blur-md overflow-hidden transition-all duration-300 rounded-lg`}>
                  <button
                    onClick={() => {
                      if (categoryFilter === cat.name) {
                        setCategoryFilter(null);
                      } else {
                        setCategoryFilter(cat.name);
                      }
                      setExpandedCategory(expandedCategory === cat.name ? null : cat.name);
                    }}
                    className={`w-full p-4 flex items-center gap-3 justify-between transition-colors text-left`}
                  >
                    <div className="flex items-center gap-3">
                      <CatIcon className={`w-5 h-5 ${meta?.tw || 'text-white/50'}`} />
                      <span className={`font-mono text-xs uppercase tracking-widest font-bold ${isActive ? meta?.tw || '' : ''}`}>
                        {cat.name}
                        {isActive && <span className="ml-2">✕</span>}
                      </span>
                    </div>
                    {expandedCategory === cat.name ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {expandedCategory === cat.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4"
                      >
                        <p className={`text-xs font-mono ${meta?.tw || 'text-blue-400'} mb-4`}>{cat.examples}</p>
                        <div className="text-sm font-light text-white/80">
                          {cat.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {filtered.map((sostanza, i) => {
          const meta = CATEGORY_META[sostanza.category];
          const color = CATEGORY_COLORS[sostanza.category] || '#888';
          return (
            <Link key={sostanza.id} to={`/sostanze/${sostanza.id}`} onClick={handleSubstanceClick}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i < 12 ? i * 0.02 : 0 }}
                className="border border-white/10 bg-black/20 backdrop-blur-sm p-6 h-40 flex flex-col justify-between hover:bg-white hover:text-black transition-all duration-300 group cursor-pointer rounded-lg"
              >
                <span
                  className="font-mono text-[9px] uppercase tracking-widest w-fit px-2 py-1 rounded-full border"
                  style={{ color, borderColor: color + '66', backgroundColor: color + '15' }}
                >
                  {sostanza.category}
                </span>
                <div>
                  <h3 className="font-black text-xl tracking-tighter group-hover:translate-x-2 transition-transform leading-tight">{sostanza.name}</h3>
                </div>
              </motion.div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center opacity-50 font-mono uppercase tracking-widest">
            Nessuna sostanza trovata.
          </div>
        )}
      </div>
    </motion.div>
  );
}
