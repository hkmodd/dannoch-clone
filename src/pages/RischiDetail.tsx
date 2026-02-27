import { motion, AnimatePresence } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowLeft, AlertTriangle, BookOpen, Table,
  ChevronDown, Hash, Shield, Zap, Eye, Heart
} from 'lucide-react';
import { rischiDb } from '../data/rischi';

/* ─── Policonsumo table headers (embedded in intro text) ─── */
const TABLE_HEADERS = ['Sostanza 1', 'Sostanza 2', 'Effetti', 'Pericoli'];

/**
 * Detect if a sequence of paragraphs encodes a table:
 * When we see "Sostanza 1" standalone, the next paragraphs are row cells.
 */
function extractEmbeddedTable(paragraphs: string[]): {
  before: string[];
  table: string[][] | null;
  after: string[];
} {
  const headerIdx = paragraphs.findIndex(p => p.trim() === 'Sostanza 1');
  if (headerIdx === -1) return { before: paragraphs, table: null, after: [] };

  // Verify next line is "Sostanza 2", etc
  const nextLines = paragraphs.slice(headerIdx);
  if (nextLines[1]?.trim() !== 'Sostanza 2') return { before: paragraphs, table: null, after: [] };

  const before = paragraphs.slice(0, headerIdx);

  // Parse 4-column table from sequential paragraphs after headers
  // Headers occupy 4 lines: "Sostanza 1", "Sostanza 2", "Effetti", "Pericoli"
  const dataLines = nextLines.slice(4); // skip 4 headers
  const rows: string[][] = [];
  let rowBuf: string[] = [];

  for (const line of dataLines) {
    rowBuf.push(line.trim());
    if (rowBuf.length === 4) {
      rows.push([...rowBuf]);
      rowBuf = [];
    }
  }
  // Handle remaining lines as "after" text
  const after = rowBuf;

  return {
    before,
    table: rows.length > 0 ? [TABLE_HEADERS, ...rows] : null,
    after: after.length > 0 ? after : [],
  };
}

/**
 * Interactive RischiDetail — fully data-driven with:
 * - Reading progress bar
 * - Sticky sidebar ToC with scroll-spy
 * - Collapsible accordion sections
 * - Numbered step cards for list items
 * - Color-coded tables (red=lethal, amber=warning)
 * - ATTENZIONE alert cards
 * - Scroll-reveal animations
 */
export function RischiDetail() {
  const { id } = useParams();
  const article = id ? rischiDb[id] : undefined;
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());
  const [activeSection, setActiveSection] = useState(0);
  const [readProgress, setReadProgress] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Expand all sections by default
  useEffect(() => {
    if (article) {
      setOpenSections(new Set(article.sections.map((_, i) => i)));
    }
  }, [article]);

  // Scroll spy + reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);

      for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
        const ref = sectionRefs.current[i];
        if (ref && ref.getBoundingClientRect().top < 200) {
          setActiveSection(i);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parse intro paragraphs with embedded table detection
  const introData = useMemo(() => {
    if (!article?.intro) return { paragraphs: [], table: null, afterTable: [] };
    const all = article.intro.split('\n\n').filter((p: string) => p.trim());
    const { before, table, after } = extractEmbeddedTable(all);
    return { paragraphs: before, table, afterTable: after };
  }, [article]);

  const toggleSection = (idx: number) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const scrollToSection = (idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpenSections(prev => new Set([...prev, idx]));
  };

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <AlertTriangle size={64} className="text-red-400 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Articolo non trovato</h1>
        <p className="text-white/60 mb-8">L'articolo richiesto non esiste o è stato rimosso.</p>
        <Link to="/rischi" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
          <ArrowLeft size={20} /> Torna a Rischi
        </Link>
      </div>
    );
  }

  const sectionIcons = [Shield, Zap, Eye, Heart, BookOpen, AlertTriangle];

  return (
    <div className="min-h-screen py-24 px-6">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          style={{ width: `${readProgress * 100}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Sticky sidebar ToC */}
        {article.sections.length > 1 && (
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-4 font-semibold">Indice</p>
              <nav className="space-y-1 border-l border-white/10">
                {article.sections.map((section, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSection(i)}
                    className={`block w-full text-left pl-4 py-1.5 text-xs transition-all border-l-2 -ml-px ${activeSection === i
                      ? 'border-blue-400 text-white font-semibold'
                      : 'border-transparent text-white/40 hover:text-white/70 hover:border-white/20'
                      }`}
                  >
                    {section.heading || `Sezione ${i + 1}`}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Main content */}
        <div className="flex-1 max-w-4xl">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/rischi" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
              <ArrowLeft size={20} /> <span>Torna a Rischi</span>
            </Link>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-black mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {article.title}
          </motion.h1>

          {/* Intro block — smart paragraph grouping */}
          {introData.paragraphs.length > 0 && (
            <IntroRenderer paragraphs={introData.paragraphs} />
          )}

          {/* Embedded table (from intro — e.g. policonsumo interactions) */}
          {introData.table && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <InteractionTable table={introData.table} />
            </motion.div>
          )}

          {/* After-table text */}
          {introData.afterTable.length > 0 && (
            <div className="mb-8">
              {introData.afterTable.map((p, i) => (
                <RenderParagraph key={i} text={p} />
              ))}
            </div>
          )}

          {/* ═══ SPECIAL: Drug, Set & Setting — 3-color cards ═══ */}
          {article.id === 'drug-set-setting' && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {article.sections.map((section, sIndex) => {
                const colorConfigs = [
                  { label: 'DRUG', subtitle: 'La sostanza', gradient: 'from-cyan-500/15 to-blue-500/10', border: 'border-cyan-400/30', accent: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/20', dot: 'bg-cyan-400' },
                  { label: 'SET', subtitle: 'Lo stato interiore', gradient: 'from-emerald-500/15 to-green-500/10', border: 'border-emerald-400/30', accent: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/20', dot: 'bg-emerald-400' },
                  { label: 'SETTING', subtitle: 'L\'ambiente', gradient: 'from-purple-500/15 to-pink-500/10', border: 'border-purple-400/30', accent: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/20', dot: 'bg-purple-400' },
                ];
                const config = colorConfigs[sIndex] || colorConfigs[0];
                return (
                  <motion.div
                    key={sIndex}
                    className={`bg-gradient-to-br ${config.gradient} border ${config.border} rounded-2xl p-6 backdrop-blur-sm`}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${config.badge} border mb-3`}>
                      {config.label}
                    </span>
                    <h3 className={`text-lg font-bold mb-1 ${config.accent}`}>
                      {section.heading || config.label}
                    </h3>
                    <p className="text-white/40 text-xs mb-4">{config.subtitle}</p>
                    <ul className="space-y-2">
                      {section.items.map((item: string, ii: number) => (
                        <li key={ii} className="flex items-start gap-2 text-white/70 text-xs leading-relaxed">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${config.dot} flex-shrink-0`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Sections — accordion (skip for drug-set-setting as it uses 3-color cards above) */}
          {article.id !== 'drug-set-setting' && article.sections.map((section, sIndex) => {
            const isOpen = openSections.has(sIndex);
            const IconComponent = sectionIcons[sIndex % sectionIcons.length];

            return (
              <motion.div
                key={sIndex}
                ref={(el) => { sectionRefs.current[sIndex] = el; }}
                className="mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Section header */}
                {section.heading && (
                  <button
                    onClick={() => toggleSection(sIndex)}
                    className="w-full flex items-center gap-4 py-4 group text-left"
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${isOpen
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-white/5 text-white/40 group-hover:bg-white/10'
                      }`}>
                      <IconComponent size={18} />
                    </div>
                    <h2 className="flex-1 text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {section.heading}
                    </h2>
                    <ChevronDown
                      className={`w-5 h-5 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}

                {/* Collapsible content */}
                <AnimatePresence initial={false}>
                  {(isOpen || !section.heading) && (
                    <motion.div
                      initial={section.heading ? { height: 0, opacity: 0 } : false}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className={`${section.heading ? 'pl-14' : ''} pb-4`}>
                        {/* Section content paragraphs */}
                        {section.content && (
                          <div className="mb-6">
                            {section.content.split('\n\n').filter((p: string) => p.trim()).map((p: string, pi: number) => (
                              <RenderParagraph key={pi} text={p} />
                            ))}
                          </div>
                        )}

                        {/* List items — numbered step cards */}
                        {section.items.length > 0 && (
                          <div className="space-y-3 mb-6">
                            {section.items.map((item: string, ii: number) => (
                              <motion.div
                                key={ii}
                                className="group flex gap-4 p-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10 rounded-xl transition-all"
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 font-bold text-sm border border-blue-500/10">
                                  {ii + 1}
                                </div>
                                <p className="text-white/75 text-sm leading-relaxed pt-1">{item}</p>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Section table */}
                        {section.table && section.table.length > 0 && (
                          <div className="mt-4">
                            <InteractionTable table={section.table} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {sIndex < article.sections.length - 1 && section.heading && (
                  <div className="border-b border-white/5 ml-14" />
                )}
              </motion.div>
            );
          })}

          {/* Keywords footer */}
          {article.keywords.length > 0 && (
            <motion.div
              className="mt-16 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3 font-semibold flex items-center gap-2">
                <Hash size={12} /> Tag correlati
              </p>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((kw: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs hover:bg-white/10 hover:text-white/70 transition-all cursor-default"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ────────────── Sub-components ────────────── */

const CARD_THEMES = [
  { gradient: 'from-blue-500/10 to-indigo-500/8', border: 'border-blue-400/20', icon: 'text-blue-400/20' },
  { gradient: 'from-purple-500/10 to-violet-500/8', border: 'border-purple-400/20', icon: 'text-purple-400/20' },
  { gradient: 'from-teal-500/10 to-cyan-500/8', border: 'border-teal-400/20', icon: 'text-teal-400/20' },
  { gradient: 'from-amber-500/10 to-orange-500/8', border: 'border-amber-400/20', icon: 'text-amber-400/20' },
  { gradient: 'from-rose-500/10 to-pink-500/8', border: 'border-rose-400/20', icon: 'text-rose-400/20' },
];

/** Splits long intro paragraphs into visually distinct card groups */
function IntroRenderer({ paragraphs }: { paragraphs: string[] }) {
  // Separate ATTENZIONE blocks from regular paragraphs
  const regular: string[] = [];
  const alerts: string[] = [];
  for (const p of paragraphs) {
    if (p.trim().startsWith('ATTENZIONE')) {
      alerts.push(p);
    } else {
      regular.push(p);
    }
  }

  // Short intros: single card
  if (regular.length <= 3) {
    return (
      <div className="mb-12 space-y-4">
        <motion.div
          className={`relative bg-gradient-to-br ${CARD_THEMES[0].gradient} ${CARD_THEMES[0].border} border rounded-2xl p-8 backdrop-blur-sm overflow-hidden`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <BookOpen className={`absolute top-6 right-6 ${CARD_THEMES[0].icon}`} size={40} />
          {regular.map((p, i) => (
            <RenderParagraph key={i} text={p} isIntro={true} />
          ))}
        </motion.div>
        {alerts.map((p, i) => (
          <motion.div key={`alert-${i}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
            <RenderParagraph text={p} />
          </motion.div>
        ))}
      </div>
    );
  }

  // Long intros: chunk into groups of 2-3 paragraphs with alternating themes
  const groups: string[][] = [];
  for (let i = 0; i < regular.length; i += 3) {
    // If only 1 paragraph left after this group, include it here (avoid orphan)
    const remaining = regular.length - i;
    const take = remaining === 4 ? 2 : Math.min(3, remaining);
    groups.push(regular.slice(i, i + take));
  }

  return (
    <div className="mb-12 space-y-4">
      {groups.map((group, gi) => {
        const theme = CARD_THEMES[gi % CARD_THEMES.length];
        return (
          <motion.div
            key={gi}
            className={`relative bg-gradient-to-br ${theme.gradient} ${theme.border} border rounded-2xl p-6 md:p-8 backdrop-blur-sm overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: 0.1 + gi * 0.08 }}
          >
            {gi === 0 && <BookOpen className={`absolute top-6 right-6 ${theme.icon}`} size={36} />}
            {group.map((p, pi) => (
              <RenderParagraph key={pi} text={p} isIntro={true} />
            ))}
          </motion.div>
        );
      })}
      {alerts.map((p, i) => (
        <motion.div key={`alert-${i}`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <RenderParagraph text={p} />
        </motion.div>
      ))}
    </div>
  );
}

/** Renders a paragraph with ATTENZIONE detection */
function RenderParagraph({ text, isIntro = false }: { text: string; isIntro?: boolean }) {
  if (text.startsWith('ATTENZIONE')) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 my-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
            <AlertTriangle className="text-red-400" size={16} />
          </div>
          <div>
            <p className="text-red-300 font-bold text-sm mb-1 uppercase tracking-wide">Attenzione</p>
            <p className="text-red-200/80 text-sm leading-relaxed">
              {text.replace(/^ATTENZIONE[!:.]?\s*/i, '').trim()}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <p className={`leading-relaxed mb-4 last:mb-0 ${isIntro ? 'text-white/80 text-base' : 'text-white/65 text-sm'
      }`}>
      {text}
    </p>
  );
}

/** Color-coded interaction table with 3-tier danger levels */
function InteractionTable({ table }: { table: string[][] }) {
  if (!table || table.length < 2) return null;

  const headers = table[0];
  const rows = table.slice(1);

  // Determine table type for title
  const title = headers[0] === 'Sostanza 1'
    ? 'Tabella interazioni pericolose'
    : headers[0] === 'Sostanze'
      ? 'Tracce nell\'organismo'
      : 'Scheda comparativa';

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 border-b border-white/10">
        <Table size={18} className="text-purple-400" />
        <span className="text-sm font-semibold uppercase tracking-wider text-purple-300">{title}</span>
        <span className="ml-auto text-[10px] text-white/30 uppercase tracking-wider">{rows.length} combinazioni</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {headers.map((header, hi) => (
                <th
                  key={hi}
                  className="text-left p-4 bg-white/[0.04] text-blue-300 font-semibold border-b border-white/10 text-xs uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => {
              const cellText = row.join(' ').toLowerCase();
              const isDangerous = cellText.includes('morte') || cellText.includes('pericolo di morte');
              const isWarning = !isDangerous && (
                cellText.includes('pericoloso') || cellText.includes('sconsigliato') ||
                cellText.includes('sovraccarico') || cellText.includes('rischio') ||
                cellText.includes('arresto')
              );
              return (
                <tr
                  key={ri}
                  className={`border-b border-white/5 transition-colors ${isDangerous
                    ? 'bg-red-500/10 hover:bg-red-500/20'
                    : isWarning
                      ? 'bg-amber-500/5 hover:bg-amber-500/10'
                      : ri % 2 === 0
                        ? 'bg-white/[0.01] hover:bg-white/[0.04]'
                        : 'hover:bg-white/[0.03]'
                    }`}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`p-4 text-white/70 ${ci === 0 ? 'font-semibold text-white/90' : ''
                        } ${isDangerous && ci >= 2 ? 'text-red-300 font-medium' : ''
                        } ${isWarning && ci >= 2 ? 'text-amber-300/80' : ''}`}
                    >
                      {isDangerous && ci === 0 && (
                        <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse" />
                      )}
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Table legend */}
      <div className="px-6 py-3 bg-white/[0.02] border-t border-white/5 flex gap-6 text-[10px] text-white/30 uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500" /> Pericolo di morte
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" /> Alto rischio
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white/20" /> Rischio moderato
        </span>
      </div>
    </div>
  );
}
