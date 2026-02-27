import { motion } from 'motion/react';
import { useState } from 'react';
import { X, AlertTriangle, Shield, Info } from 'lucide-react';
import { INTERACTION_SUBSTANCES, SAFETY_COLORS, getInteraction, type SubstanceName, type SafetyLevel } from '../data/interazioni';

export function Interazioni() {
    const [selected, setSelected] = useState<SubstanceName[]>([]);
    const [viewMode, setViewMode] = useState<'picker' | 'matrix'>('picker');

    const toggleSubstance = (s: SubstanceName) => {
        setSelected(prev =>
            prev.includes(s) ? prev.filter(x => x !== s) : prev.length < 5 ? [...prev, s] : prev
        );
    };

    // Get all interactions for selected substances
    const interactions = selected.length >= 2
        ? selected.flatMap((a, i) =>
            selected.slice(i + 1).map(b => ({
                a, b, interaction: getInteraction(a, b)
            }))
        ).filter(x => x.interaction)
        : [];

    const worstLevel = interactions.reduce<SafetyLevel | null>((worst, { interaction }) => {
        if (!interaction) return worst;
        const order: SafetyLevel[] = ['safe', 'low_risk', 'caution', 'unsafe', 'dangerous', 'deadly'];
        const cur = order.indexOf(interaction.level);
        const wst = worst ? order.indexOf(worst) : -1;
        return cur > wst ? interaction.level : worst;
    }, null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full min-h-screen pt-24 md:pt-32 pb-12 px-4 md:px-12 max-w-5xl mx-auto flex flex-col pointer-events-auto"
        >
            <div className="mb-8">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mix-blend-difference mb-4">
                    Mix Checker
                </h1>
                <p className="text-white/60 max-w-2xl">
                    Seleziona le sostanze che hai consumato o intendi consumare. Il calcolatore mostra il livello di rischio di ogni combinazione.
                </p>
            </div>

            {/* View toggle */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setViewMode('picker')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${viewMode === 'picker' ? 'bg-white text-black' : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'}`}
                >
                    Seleziona Sostanze
                </button>
                <button
                    onClick={() => setViewMode('matrix')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${viewMode === 'matrix' ? 'bg-white text-black' : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'}`}
                >
                    Matrice Completa
                </button>
            </div>

            {viewMode === 'picker' && (
                <>
                    {/* Substance picker */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {INTERACTION_SUBSTANCES.map(s => {
                            const isSelected = selected.includes(s);
                            return (
                                <button
                                    key={s}
                                    onClick={() => toggleSubstance(s)}
                                    className={`px-4 py-2 rounded-full text-sm font-mono uppercase tracking-wider transition-all border ${isSelected
                                            ? 'bg-white text-black border-white'
                                            : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/30'
                                        }`}
                                >
                                    {isSelected && '✓ '}{s}
                                </button>
                            );
                        })}
                    </div>

                    {/* Selected substances */}
                    {selected.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {selected.map(s => (
                                <span key={s} className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-sm font-bold">
                                    {s}
                                    <button onClick={() => toggleSubstance(s)} className="hover:text-red-400 transition-colors"><X className="w-3 h-3" /></button>
                                </span>
                            ))}
                            {selected.length < 2 && (
                                <span className="text-white/30 text-sm font-mono py-1.5">← seleziona almeno 2 sostanze</span>
                            )}
                        </div>
                    )}

                    {/* Overall risk indicator */}
                    {worstLevel && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-5 rounded-xl border mb-6"
                            style={{
                                backgroundColor: SAFETY_COLORS[worstLevel].bg + '20',
                                borderColor: SAFETY_COLORS[worstLevel].bg + '50',
                            }}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                {['dangerous', 'deadly'].includes(worstLevel)
                                    ? <AlertTriangle className="w-6 h-6" style={{ color: SAFETY_COLORS[worstLevel].bg }} />
                                    : <Shield className="w-6 h-6" style={{ color: SAFETY_COLORS[worstLevel].bg }} />
                                }
                                <span className="font-black text-xl uppercase" style={{ color: SAFETY_COLORS[worstLevel].bg }}>
                                    {SAFETY_COLORS[worstLevel].emoji} Rischio: {SAFETY_COLORS[worstLevel].label}
                                </span>
                            </div>
                        </motion.div>
                    )}

                    {/* Interaction details */}
                    {interactions.length > 0 && (
                        <div className="flex flex-col gap-3">
                            {interactions.map(({ a, b, interaction }) => {
                                if (!interaction) return null;
                                const safety = SAFETY_COLORS[interaction.level];
                                return (
                                    <motion.div
                                        key={`${a}-${b}`}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="p-4 rounded-xl border"
                                        style={{
                                            backgroundColor: safety.bg + '15',
                                            borderColor: safety.bg + '40',
                                        }}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-1 rounded" style={{ backgroundColor: safety.bg, color: safety.text }}>
                                                {safety.emoji} {safety.label}
                                            </span>
                                            <span className="font-bold text-sm">{a} + {b}</span>
                                        </div>
                                        <p className="text-white/70 text-sm">{interaction.note}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </>
            )}

            {viewMode === 'matrix' && (
                <div className="overflow-x-auto -mx-4 px-4">
                    <table className="border-collapse text-[10px] md:text-xs">
                        <thead>
                            <tr>
                                <th className="p-2 text-left font-mono uppercase tracking-wider sticky left-0 bg-black z-10" />
                                {INTERACTION_SUBSTANCES.map(s => (
                                    <th key={s} className="p-1 md:p-2 font-mono uppercase tracking-wider text-center whitespace-nowrap" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>
                                        {s}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {INTERACTION_SUBSTANCES.map(a => (
                                <tr key={a}>
                                    <td className="p-1 md:p-2 font-mono uppercase tracking-wider font-bold whitespace-nowrap sticky left-0 bg-black z-10">{a}</td>
                                    {INTERACTION_SUBSTANCES.map(b => {
                                        if (a === b) return <td key={b} className="p-1 md:p-2 bg-white/5 text-center">—</td>;
                                        const interaction = getInteraction(a as SubstanceName, b as SubstanceName);
                                        if (!interaction) return <td key={b} className="p-1 md:p-2 bg-white/[0.02] text-center text-white/20">?</td>;
                                        const safety = SAFETY_COLORS[interaction.level];
                                        return (
                                            <td
                                                key={b}
                                                className="p-1 md:p-2 text-center cursor-help transition-all hover:scale-125"
                                                title={`${a} + ${b}: ${safety.label} — ${interaction.note}`}
                                                style={{ backgroundColor: safety.bg + '30' }}
                                            >
                                                <span>{safety.emoji}</span>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Legend */}
            <div className="mt-8 p-4 border border-white/10 rounded-xl bg-white/[0.02]">
                <div className="flex items-center gap-2 mb-3">
                    <Info className="w-4 h-4 text-white/40" />
                    <span className="font-mono text-xs uppercase tracking-widest text-white/40">Legenda</span>
                </div>
                <div className="flex flex-wrap gap-3">
                    {Object.entries(SAFETY_COLORS).map(([level, info]) => (
                        <span key={level} className="flex items-center gap-1 text-xs font-mono" style={{ color: info.bg }}>
                            {info.emoji} {info.label}
                        </span>
                    ))}
                </div>
                <p className="text-[10px] text-white/30 mt-3 font-mono">
                    Fonte: dati basati su TripSit Combo Chart, DanceSafe e letteratura scientifica. Non sostituisce il parere medico.
                </p>
            </div>
        </motion.div>
    );
}
