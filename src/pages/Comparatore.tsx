import { motion } from 'motion/react';
import { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { sostanzeDb, CATEGORY_COLORS, type Sostanza } from '../data/sostanze';

const MAX_COMPARE = 3;

export function Comparatore() {
    const [search, setSearch] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const allSostanze = useMemo(() => Object.values(sostanzeDb), []);

    const filtered = useMemo(() =>
        allSostanze.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
        , [search, allSostanze]);

    const selectedSostanze = selectedIds.map(id => sostanzeDb[id]).filter(Boolean) as Sostanza[];

    const toggleSubstance = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : prev.length < MAX_COMPARE ? [...prev, id] : prev
        );
    };

    // Fields to compare
    const fields: Array<{ key: string; label: string }> = [
        { key: 'category', label: 'Categoria' },
        { key: 'class', label: 'Classe' },
        { key: 'onset', label: 'Salita' },
        { key: 'duration', label: 'Durata' },
        { key: 'dosage', label: 'Dosaggio' },
        { key: 'consumption', label: 'Modalità di consumo' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full min-h-screen pt-24 md:pt-32 pb-12 px-4 md:px-12 max-w-6xl mx-auto flex flex-col pointer-events-auto"
        >
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mix-blend-difference mb-2">
                Comparatore
            </h1>
            <p className="text-white/60 mb-8 max-w-2xl">
                Seleziona fino a 3 sostanze per confrontarle fianco a fianco: categoria, salita, durata, dosaggio.
            </p>

            {/* Search + picker */}
            <div className="relative w-full md:w-96 mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                <input
                    type="text"
                    placeholder="Cerca sostanza..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full bg-black/40 border border-white/20 rounded-full py-3 pl-10 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors font-mono text-sm"
                />
            </div>

            {/* Selected pills */}
            {selectedIds.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSostanze.map(s => (
                        <span key={s.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold border" style={{ borderColor: CATEGORY_COLORS[s.category] + '60', backgroundColor: CATEGORY_COLORS[s.category] + '15' }}>
                            {s.name}
                            <button onClick={() => toggleSubstance(s.id)} className="hover:text-red-400"><X className="w-3 h-3" /></button>
                        </span>
                    ))}
                </div>
            )}

            {/* Substance picker grid */}
            {selectedIds.length < MAX_COMPARE && (
                <div className="flex flex-wrap gap-1.5 mb-8 max-h-48 overflow-y-auto p-2 border border-white/5 rounded-xl bg-white/[0.02]">
                    {filtered.map(s => {
                        const isSelected = selectedIds.includes(s.id);
                        const color = CATEGORY_COLORS[s.category] || '#888';
                        return (
                            <button
                                key={s.id}
                                onClick={() => toggleSubstance(s.id)}
                                disabled={isSelected}
                                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${isSelected
                                    ? 'opacity-30 cursor-not-allowed border-white/5'
                                    : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                                    }`}
                                style={!isSelected ? { color } : {}}
                            >
                                {s.name}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Comparison table */}
            {selectedSostanze.length >= 2 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full overflow-x-auto"
                >
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="p-3 text-left font-mono text-xs uppercase tracking-widest text-white/40 border-b border-white/10" />
                                {selectedSostanze.map(s => (
                                    <th key={s.id} className="p-3 text-left border-b border-white/10 min-w-[200px]">
                                        <div className="font-black text-lg uppercase tracking-tight">{s.name}</div>
                                        <span className="text-xs font-mono rounded-full px-2 py-0.5 mt-1 inline-block" style={{ color: CATEGORY_COLORS[s.category], backgroundColor: CATEGORY_COLORS[s.category] + '15' }}>
                                            {s.category}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map(({ key, label }) => (
                                <tr key={key} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <td className="p-3 font-mono text-xs uppercase tracking-widest text-white/40 font-bold whitespace-nowrap">{label}</td>
                                    {selectedSostanze.map(s => {
                                        const val = (s as unknown as Record<string, unknown>)[key];
                                        return (
                                            <td key={s.id} className="p-3 text-sm text-white/80 align-top">
                                                {typeof val === 'string' ? (val || '—') : '—'}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            )}

            {selectedSostanze.length < 2 && (
                <div className="flex flex-col items-center justify-center py-16 text-white/20">
                    <ArrowRight className="w-12 h-12 mb-4 opacity-30" />
                    <p className="font-mono text-sm uppercase tracking-widest">Seleziona almeno 2 sostanze per confrontare</p>
                </div>
            )}
        </motion.div>
    );
}
