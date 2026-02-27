import { motion } from 'motion/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Loader2, RotateCcw, AlertTriangle } from 'lucide-react';

// Molecules we can fetch from PubChem with their CIDs
const MOLECULES = [
    { name: 'Caffeina', cid: 2519, formula: 'C₈H₁₀N₄O₂', category: 'Stimolanti', color: '#F59E0B' },
    { name: 'THC', cid: 16078, formula: 'C₂₁H₃₀O₂', category: 'Downer', color: '#10B981' },
    { name: 'MDMA', cid: 1615, formula: 'C₁₁H₁₅NO₂', category: 'Empatogeni', color: '#EC4899' },
    { name: 'LSD', cid: 5761, formula: 'C₂₀H₂₅N₃O', category: 'Psichedelici', color: '#8B5CF6' },
    { name: 'Cocaina', cid: 446220, formula: 'C₁₇H₂₁NO₄', category: 'Stimolanti', color: '#EF4444' },
    { name: 'Ketamina', cid: 3821, formula: 'C₁₃H₁₆ClNO', category: 'Dissociativi', color: '#06B6D4' },
    { name: 'Psilocibina', cid: 10624, formula: 'C₁₂H₁₇N₂O₄P', category: 'Psichedelici', color: '#A855F7' },
    { name: 'Etanolo', cid: 702, formula: 'C₂H₅OH', category: 'Downer', color: '#F97316' },
    { name: 'Nicotina', cid: 89594, formula: 'C₁₀H₁₄N₂', category: 'Stimolanti', color: '#84CC16' },
    { name: 'Anfetamina', cid: 3007, formula: 'C₉H₁₃N', category: 'Stimolanti', color: '#FB923C' },
    { name: 'Diazepam', cid: 3016, formula: 'C₁₆H₁₃ClN₂O', category: 'Downer', color: '#38BDF8' },
    { name: 'Mescalina', cid: 4076, formula: 'C₁₁H₁₇NO₃', category: 'Psichedelici', color: '#C084FC' },
    { name: 'DMT', cid: 6089, formula: 'C₁₂H₁₆N₂', category: 'Psichedelici', color: '#D946EF' },
    { name: 'Morfina', cid: 5288826, formula: 'C₁₇H₁₉NO₃', category: 'Downer', color: '#94A3B8' },
    { name: 'GHB', cid: 10413, formula: 'C₄H₈O₃', category: 'Downer', color: '#FCD34D' },
];

declare global {
    interface Window {
        $3Dmol: any;
    }
}

function load3Dmol(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (window.$3Dmol) { resolve(); return; }
        const script = document.createElement('script');
        script.src = 'https://3Dmol.org/build/3Dmol-min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load 3Dmol.js'));
        document.head.appendChild(script);
    });
}

function MoleculeViewer({ cid, color }: { cid: number; color: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const initViewer = useCallback(async () => {
        if (!containerRef.current) return;
        setLoading(true);
        setError(null);

        try {
            await load3Dmol();

            // Fetch SDF from PubChem
            const res = await fetch(
                `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/SDF?record_type=3d`
            );
            if (!res.ok) throw new Error('Struttura 3D non disponibile');
            const sdf = await res.text();

            // Clear previous
            if (viewerRef.current) {
                viewerRef.current.clear();
            }

            containerRef.current.innerHTML = '';
            const viewer = window.$3Dmol.createViewer(containerRef.current, {
                backgroundColor: 'transparent',
                antialias: true,
            });
            viewerRef.current = viewer;

            viewer.addModel(sdf, 'sdf');
            viewer.setStyle({}, {
                stick: { radius: 0.12, colorscheme: 'Jmol' },
                sphere: { scale: 0.25, colorscheme: 'Jmol' },
            });
            viewer.zoomTo();
            viewer.spin('y', 0.5);
            viewer.render();
            setLoading(false);
        } catch (err: any) {
            setError(err.message || 'Errore nel caricamento');
            setLoading(false);
        }
    }, [cid]);

    useEffect(() => {
        initViewer();
        return () => {
            if (viewerRef.current) {
                try { viewerRef.current.clear(); } catch { /* */ }
            }
        };
    }, [initViewer]);

    return (
        <div className="relative w-full aspect-square bg-black/60 rounded-2xl border border-white/10 overflow-hidden">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Loader2 className="w-8 h-8 animate-spin" style={{ color }} />
                </div>
            )}
            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center">
                    <AlertTriangle className="w-8 h-8 text-amber-400 mb-2" />
                    <p className="text-sm text-white/60">{error}</p>
                    <button onClick={initViewer} className="mt-3 text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1">
                        <RotateCcw className="w-3 h-3" /> Riprova
                    </button>
                </div>
            )}
            <div ref={containerRef} className="w-full h-full" style={{ minHeight: 300 }} />
        </div>
    );
}

export function Molecole() {
    const [selected, setSelected] = useState(0);
    const mol = MOLECULES[selected];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full min-h-screen pt-24 md:pt-32 pb-12 px-4 md:px-12 max-w-6xl mx-auto flex flex-col pointer-events-auto"
        >
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mix-blend-difference mb-2">
                Molecole 3D
            </h1>
            <p className="text-white/60 mb-8 max-w-2xl">
                Strutture molecolari reali da PubChem. Trascina per ruotare, scroll per zoom.
                Dati scientifici dal National Center for Biotechnology Information (NCBI).
            </p>

            {/* Molecule selector */}
            <div className="flex flex-wrap gap-2 mb-6">
                {MOLECULES.map((m, i) => (
                    <button
                        key={m.cid}
                        onClick={() => setSelected(i)}
                        className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${i === selected
                                ? 'border-white/40 bg-white/10'
                                : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                            }`}
                        style={i === selected ? { color: m.color } : {}}
                    >
                        {m.name}
                    </button>
                ))}
            </div>

            {/* Selected molecule info + viewer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <MoleculeViewer key={mol.cid} cid={mol.cid} color={mol.color} />
                    <p className="text-[10px] font-mono text-white/30 mt-2 text-center">
                        Fonte: PubChem CID {mol.cid} — NCBI/NLM/NIH
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <h2 className="text-3xl font-black uppercase tracking-tight" style={{ color: mol.color }}>
                            {mol.name}
                        </h2>
                        <p className="font-mono text-lg text-white/70 mt-1">{mol.formula}</p>
                    </div>

                    <div className="border border-white/10 rounded-xl p-4 bg-white/[0.02]">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-2">Categoria</h3>
                        <span className="px-3 py-1 rounded-full text-sm font-bold border" style={{ color: mol.color, borderColor: mol.color + '40' }}>
                            {mol.category}
                        </span>
                    </div>

                    <div className="border border-white/10 rounded-xl p-4 bg-white/[0.02]">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-2">Visualizzazione</h3>
                        <ul className="text-sm text-white/60 space-y-1">
                            <li>🔵 Azoto (N)</li>
                            <li>🔴 Ossigeno (O)</li>
                            <li>⚪ Carbonio (C)</li>
                            <li>🟢 Cloro (Cl)</li>
                            <li>🟡 Fosforo (P) / Zolfo (S)</li>
                        </ul>
                    </div>

                    <div className="border border-white/10 rounded-xl p-4 bg-white/[0.02]">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-2">Controlli</h3>
                        <ul className="text-sm text-white/60 space-y-1">
                            <li>🖱️ Trascina per ruotare</li>
                            <li>🔍 Scroll per zoom</li>
                            <li>📱 Pizzica per zoom (mobile)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
