import { motion, AnimatePresence } from 'motion/react';
import { Activity, ArrowRight, Search, ShieldAlert, Brain, Pill, Beaker, Syringe, HeartPulse, AlertTriangle, Scale, Car, BadgeAlert, Shield, Eye, Users, Zap, ChevronDown, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { rischiList, rischiDb } from '../data/rischi';

/* ─── Card metadata for each article ─── */
const CARD_META: Record<string, { icon: LucideIcon; accent: string; highlight: string }> = {
  'al-momento-dell-acquisto': { icon: ShieldAlert, accent: 'text-amber-400', highlight: 'Informati prima di comprare. Analisi, purezza e drug checking.' },
  'chill-out-cool-down': { icon: HeartPulse, accent: 'text-cyan-400', highlight: 'Pause, recupero e gestione dell\'hangover dopo il consumo.' },
  'composizione-delle-sostanze': { icon: Beaker, accent: 'text-emerald-400', highlight: 'Taglio, purezza e analisi chimica. Collegamento al Drug Checking.' },
  'cosa-dice-la-legge': { icon: Scale, accent: 'text-blue-400', highlight: 'LStup, multe, arresto e conseguenze legali del possesso.' },
  'cosa-fare-in-caso-di-emergenza': { icon: AlertTriangle, accent: 'text-red-400', highlight: 'Bad trip, quando chiamare il 144 e primi soccorsi.' },
  'cosa-succede-nel-cervello': { icon: Brain, accent: 'text-purple-400', highlight: 'Serotonina, dopamina e come le sostanze alterano il cervello.' },
  'drug-set-setting': { icon: Eye, accent: 'text-violet-400', highlight: 'I 3 fattori che determinano gli effetti: Drug, Set e Setting.' },
  'informazioni-per-gli-uomini': { icon: Users, accent: 'text-sky-400', highlight: 'Fertilità, testosterone e rischi specifici per gli uomini.' },
  'informazioni-per-le-donne': { icon: Users, accent: 'text-pink-400', highlight: 'Gravidanza, allattamento, ciclo e dosaggi per le donne.' },
  'modalita-di-consumo': { icon: Syringe, accent: 'text-orange-400', highlight: 'Orale, nasale, fumare, IV, IM, rettale — rischi e safer use.' },
  'safer-sex': { icon: Shield, accent: 'text-pink-400', highlight: 'Preservativo, consenso, PEP e protezione sotto l\'effetto.' },
  'safer-sniffing': { icon: Shield, accent: 'text-teal-400', highlight: 'Cannucce, mucose nasali, epatite e materiale di safer use.' },
  'safer-use': { icon: Shield, accent: 'text-green-400', highlight: 'Start low, go slow — le regole d\'oro della riduzione del danno.' },
  'sostanze-psicoattive-e-farmaci': { icon: Pill, accent: 'text-indigo-400', highlight: 'Antidepressivi, pillola, Viagra, antibiotici e interazioni.' },
  'sostanze-psicoattive-e-patologie': { icon: HeartPulse, accent: 'text-rose-400', highlight: 'Cuore, epilessia, diabete, asma — rischi con patologie preesistenti.' },
  'too-much-consumo-problematico': { icon: BadgeAlert, accent: 'text-yellow-400', highlight: 'Dipendenza, perdita di controllo e dove chiedere aiuto.' },
  'tracce-del-consumo-nell-organismo': { icon: Car, accent: 'text-slate-300', highlight: 'Test sangue, urine, capelli, etilometro e tolleranza zero.' },
};

const DEFAULT_META = { icon: Zap, accent: 'text-white/70', highlight: '' };

/* ─── Article grouping into categories ─── */
interface ArticleGroup {
  name: string;
  color: string;     // border + accent color
  bgGradient: string;
  articles: string[]; // article IDs
}

const ARTICLE_GROUPS: ArticleGroup[] = [
  {
    name: '🛡️ Riduzione del Danno',
    color: 'emerald',
    bgGradient: 'from-emerald-500/8 to-emerald-500/2',
    articles: ['safer-use', 'safer-sniffing', 'modalita-di-consumo', 'chill-out-cool-down', 'drug-set-setting'],
  },
  {
    name: '🧠 Salute e Corpo',
    color: 'purple',
    bgGradient: 'from-purple-500/8 to-purple-500/2',
    articles: ['cosa-succede-nel-cervello', 'sostanze-psicoattive-e-patologie', 'sostanze-psicoattive-e-farmaci', 'too-much-consumo-problematico'],
  },
  {
    name: '⚠️ Emergenze e Acquisto',
    color: 'red',
    bgGradient: 'from-red-500/8 to-red-500/2',
    articles: ['cosa-fare-in-caso-di-emergenza', 'al-momento-dell-acquisto', 'composizione-delle-sostanze'],
  },
  {
    name: '💑 Sessualità e Genere',
    color: 'pink',
    bgGradient: 'from-pink-500/8 to-pink-500/2',
    articles: ['safer-sex', 'informazioni-per-le-donne', 'informazioni-per-gli-uomini'],
  },
  {
    name: '⚖️ Legge e Tracce',
    color: 'blue',
    bgGradient: 'from-blue-500/8 to-blue-500/2',
    articles: ['cosa-dice-la-legge', 'tracce-del-consumo-nell-organismo'],
  },
];

/* Color mapping for dynamic classes */
const COLOR_MAP: Record<string, { border: string; text: string; bg: string }> = {
  emerald: { border: 'border-emerald-500/20', text: 'text-emerald-300', bg: 'bg-emerald-500/10' },
  purple: { border: 'border-purple-500/20', text: 'text-purple-300', bg: 'bg-purple-500/10' },
  red: { border: 'border-red-500/20', text: 'text-red-300', bg: 'bg-red-500/10' },
  pink: { border: 'border-pink-500/20', text: 'text-pink-300', bg: 'bg-pink-500/10' },
  blue: { border: 'border-blue-500/20', text: 'text-blue-300', bg: 'bg-blue-500/10' },
};

export function Rischi() {
  const [search, setSearch] = useState('');
  const [expandedGroup, setExpandedGroup] = useState<string | null>(ARTICLE_GROUPS[0].name);

  /* ─── Smart search: title + keywords + intro + sections content ─── */
  const matchingIds = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return null; // null = show all
    const tokens = query.split(/\s+/).filter(t => t.length > 1);
    return new Set(
      rischiList.filter(r => {
        const title = r.title.toLowerCase();
        const keywordsStr = r.keywords.join(' ').toLowerCase();
        const intro = (rischiDb[r.id]?.intro || '').toLowerCase();
        const sectionsStr = (rischiDb[r.id]?.sections || []).map(s => `${s.heading} ${s.content} ${s.items.join(' ')}`).join(' ').toLowerCase();
        const allText = `${title} ${keywordsStr} ${intro} ${sectionsStr}`;
        return tokens.every(t => allText.includes(t));
      }).map(r => r.id)
    );
  }, [search]);

  const getArticleData = (id: string) => rischiList.find(r => r.id === id);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-start pointer-events-auto"
    >
      <div className="overflow-hidden mb-12 mix-blend-difference">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85]">
          Rischi &<br />Riduzione
        </h1>
      </div>

      <p className="text-lg md:text-xl font-light max-w-3xl text-white/80 mb-16 mix-blend-difference">
        Non c'è consumo senza rischi! Se non vuoi correre nessun rischio allora rinuncia al consumo. Se tuttavia decidi di consumare, informati in anticipo sugli effetti, i rischi e le conseguenze in modo da poter gestire i pericoli e ridurre i possibili danni.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        {/* Main Content Area — Grouped Articles */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-4">
          {/* Search Bar */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm flex items-center gap-4">
            <Search className="w-5 h-5 opacity-50 shrink-0" />
            <input
              type="text"
              placeholder="Cerca: patente, pillola, serotonina, preservativo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none font-mono text-sm"
            />
            {search && (
              <span className="text-[10px] font-mono opacity-50 shrink-0">
                {matchingIds ? matchingIds.size : rischiList.length} risultati
              </span>
            )}
          </div>

          {/* Search Results Mode */}
          {matchingIds !== null ? (
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-4 opacity-60">Risultati per "{search}"</h2>
              <div className="grid grid-cols-1 gap-3">
                {rischiList.filter(r => matchingIds.has(r.id)).sort((a, b) => a.title.localeCompare(b.title)).map(article => {
                  const meta = CARD_META[article.id] || DEFAULT_META;
                  const Icon = meta.icon;
                  return (
                    <Link key={article.id} to={`/rischi/${article.id}`}>
                      <div className="p-4 border border-white/10 bg-white/5 rounded-xl hover:bg-white/10 transition-all group flex items-start gap-4">
                        <div className={`w-9 h-9 rounded-lg bg-black/30 flex items-center justify-center shrink-0 ${meta.accent}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-bold text-sm leading-tight">{article.title}</h3>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          </div>
                          {meta.highlight && <p className="text-xs text-white/40 mt-1 line-clamp-1">{meta.highlight}</p>}
                        </div>
                      </div>
                    </Link>
                  );
                })}
                {matchingIds.size === 0 && (
                  <div className="py-8 text-center opacity-50 font-mono text-sm">
                    Nessun risultato per "{search}".
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Category Groups Mode */
            ARTICLE_GROUPS.map(group => {
              const colors = COLOR_MAP[group.color];
              const isExpanded = expandedGroup === group.name;
              return (
                <div key={group.name} className={`border ${colors.border} bg-gradient-to-br ${group.bgGradient} rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300`}>
                  <button
                    onClick={() => setExpandedGroup(isExpanded ? null : group.name)}
                    className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
                  >
                    <h2 className={`text-xl font-bold tracking-tight ${colors.text}`}>{group.name}</h2>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono opacity-40">{group.articles.length} articoli</span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 grid grid-cols-1 gap-2">
                          {group.articles.map(articleId => {
                            const article = getArticleData(articleId);
                            if (!article) return null;
                            const meta = CARD_META[articleId] || DEFAULT_META;
                            const Icon = meta.icon;
                            return (
                              <Link key={articleId} to={`/rischi/${articleId}`}>
                                <div className="p-4 bg-black/30 border border-white/5 rounded-xl hover:bg-white/10 transition-all group flex items-start gap-4">
                                  <div className={`w-9 h-9 rounded-lg bg-black/40 flex items-center justify-center shrink-0 ${meta.accent}`}>
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                      <h3 className="font-bold text-sm leading-tight">{article.title}</h3>
                                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                    </div>
                                    {meta.highlight && <p className="text-xs text-white/40 mt-1 line-clamp-1">{meta.highlight}</p>}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Mix Pericolosi Sidebar */}
        <div className="col-span-1 flex flex-col gap-6">
          <div className="bg-red-500/10 border border-red-500/20 p-8 backdrop-blur-sm rounded-2xl lg:sticky lg:top-28">
            <div className="flex items-center gap-4 mb-6">
              <Activity className="w-8 h-8 text-red-400" />
              <h2 className="text-3xl font-bold uppercase tracking-tighter text-red-100">Mix Pericolosi</h2>
            </div>
            <p className="font-light text-white/80 mb-6">
              Il poli-consumo (assumere più sostanze contemporaneamente) moltiplica i rischi in modo imprevedibile. Il fegato e i reni vengono sovraccaricati.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-black/40 rounded-xl border border-red-500/30">
                <h4 className="font-bold text-red-200 mb-1">☠️ Depressori + Depressori</h4>
                <p className="text-xs font-light opacity-80">Es: Alcol + GHB, Alcol + Ketamina, Alcol + Benzo.</p>
                <p className="text-sm mt-2 font-bold text-red-400">Rischio Letale: Arresto respiratorio, coma, soffocamento da vomito.</p>
              </div>

              <div className="p-4 bg-black/40 rounded-xl border border-orange-500/30">
                <h4 className="font-bold text-orange-200 mb-1">⚠️ Stimolanti + Stimolanti</h4>
                <p className="text-xs font-light opacity-80">Es: Cocaina + Speed, MDMA + Cocaina.</p>
                <p className="text-sm mt-2 font-bold text-orange-400">Rischio Alto: Sovraccarico cardiovascolare, infarto, psicosi, ipertermia.</p>
              </div>

              <div className="p-4 bg-black/40 rounded-xl border border-yellow-500/30">
                <h4 className="font-bold text-yellow-200 mb-1">⚠️ Stimolanti + Depressori</h4>
                <p className="text-xs font-light opacity-80">Es: Cocaina + Alcol.</p>
                <p className="text-sm mt-2 font-bold text-yellow-400">Rischio Alto: Creano il Cocaetilene (molto tossico per il fegato). Mascherano gli effetti reciproci portando a sovradosaggio.</p>
              </div>

              <div className="p-4 bg-black/40 rounded-xl border border-purple-500/30">
                <h4 className="font-bold text-purple-200 mb-1">🧠 MDMA + Antidepressivi</h4>
                <p className="text-xs font-light opacity-80">MAO-inibitori, SSRI.</p>
                <p className="text-sm mt-2 font-bold text-purple-400">Rischio Letale: Sindrome serotoninergica, convulsioni, collassi.</p>
              </div>

              <div className="p-4 bg-black/40 rounded-xl border border-rose-500/30">
                <h4 className="font-bold text-rose-200 mb-1">💊 Popper + Viagra</h4>
                <p className="text-xs font-light opacity-80">Crollo della pressione sanguigna.</p>
                <p className="text-sm mt-2 font-bold text-rose-400">Rischio Letale: Insufficienza respiratoria, svenimento, morte.</p>
              </div>

              <Link to="/rischi/policonsumo" className="block mt-4 text-center py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-200 text-sm font-bold transition-all hover:scale-[1.02]">
                Vedi tabella completa delle interazioni →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
