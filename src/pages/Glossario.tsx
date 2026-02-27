import { motion } from 'motion/react';
import { BookOpenText, ArrowRight, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { glossarioTerms, GLOSSARIO_CATEGORIES } from '../data/glossario';

export function Glossario() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filtered = glossarioTerms
        .filter(t => {
            const query = search.toLowerCase();
            const matchesSearch = !query ||
                t.term.toLowerCase().includes(query) ||
                t.definition.toLowerCase().includes(query);
            const matchesCategory = !activeCategory || t.category === activeCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => a.term.localeCompare(b.term));

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
                    Glossario
                </h1>
            </div>

            <p className="text-lg md:text-xl font-light max-w-3xl text-white/80 mb-12 mix-blend-difference">
                Terminologia farmacologica e di riduzione del danno. Conosci il significato delle parole per comprendere meglio i rischi e le interazioni.
            </p>

            {/* Search + Filters */}
            <div className="w-full mb-10">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                        <input
                            type="text"
                            placeholder="Cerca un termine... (es. serotonina, overdose...)"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-black/40 border border-white/20 rounded-full py-3 pl-10 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors font-mono text-sm"
                        />
                    </div>
                </div>

                {/* Category filter pills */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${!activeCategory
                            ? 'bg-white text-black'
                            : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30'
                            }`}
                    >
                        <Filter className="inline w-3 h-3 mr-1.5 -mt-0.5" />
                        Tutti ({glossarioTerms.length})
                    </button>
                    {Object.entries(GLOSSARIO_CATEGORIES).map(([key, { label, color }]) => {
                        const count = glossarioTerms.filter(t => t.category === key).length;
                        return (
                            <button
                                key={key}
                                onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${activeCategory === key
                                    ? 'text-black'
                                    : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30'
                                    }`}
                                style={activeCategory === key ? { backgroundColor: color } : {}}
                            >
                                {label} ({count})
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Terms grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {filtered.map((term, i) => {
                    const catInfo = GLOSSARIO_CATEGORIES[term.category];
                    return (
                        <motion.div
                            key={term.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i < 12 ? i * 0.02 : 0 }}
                        >
                            <Link to={`/glossario/${term.id}`}>
                                <div className="group p-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all h-full flex flex-col">
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <h3 className="font-bold text-lg leading-tight group-hover:text-white transition-colors">
                                            {term.term}
                                        </h3>
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                                    </div>
                                    <p className="text-white/50 text-sm leading-relaxed flex-1 line-clamp-3">
                                        {term.definition}
                                    </p>
                                    <div className="mt-3 pt-3 border-t border-white/5">
                                        <span
                                            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                                            style={{ backgroundColor: catInfo.color + '20', color: catInfo.color }}
                                        >
                                            {catInfo.label}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
                {filtered.length === 0 && (
                    <div className="col-span-full py-12 text-center opacity-50 font-mono text-sm">
                        Nessun termine trovato per "{search}". Prova con altre parole chiave.
                    </div>
                )}
            </div>
        </motion.div>
    );
}
