import { motion } from 'motion/react';
import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { CATEGORY_COLORS } from '../data/sostanze';
import type { Mesh, Group } from 'three';

// Category-specific 3D shapes
function CategoryMolecule({ category, color }: { category: string; color: string }) {
    const ref = useRef<Group>(null);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.3;
            ref.current.rotation.x += delta * 0.1;
        }
    });

    const shapes: Record<string, React.ReactNode> = {
        'Psichedelici': (
            <group ref={ref}>
                <mesh><icosahedronGeometry args={[1.2, 0]} /><meshStandardMaterial color={color} wireframe transparent opacity={0.7} /></mesh>
                <mesh><icosahedronGeometry args={[0.8, 1]} /><meshStandardMaterial color={color} wireframe transparent opacity={0.4} /></mesh>
                <mesh><sphereGeometry args={[0.3, 8, 8]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} /></mesh>
            </group>
        ),
        'Empatogeni / Entactogeni': (
            <group ref={ref}>
                <mesh><torusGeometry args={[1, 0.3, 8, 12]} /><meshStandardMaterial color={color} wireframe transparent opacity={0.7} /></mesh>
                <mesh><sphereGeometry args={[0.5, 12, 12]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.6} /></mesh>
            </group>
        ),
        'Stimolanti': (
            <group ref={ref}>
                <mesh><octahedronGeometry args={[1.2, 0]} /><meshStandardMaterial color={color} wireframe transparent opacity={0.7} /></mesh>
                <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}><octahedronGeometry args={[0.9, 0]} /><meshStandardMaterial color={color} wireframe transparent opacity={0.4} /></mesh>
                <mesh><dodecahedronGeometry args={[0.4, 0]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} /></mesh>
            </group>
        ),
        'Dissociativi': (
            <group ref={ref}>
                <mesh><torusKnotGeometry args={[0.8, 0.25, 48, 8]} /><meshStandardMaterial color={color} wireframe transparent opacity={0.6} /></mesh>
                <mesh><sphereGeometry args={[0.2, 6, 6]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} /></mesh>
            </group>
        ),
        'Downer': (
            <group ref={ref}>
                <mesh><sphereGeometry args={[1, 16, 16]} /><meshStandardMaterial color={color} wireframe transparent opacity={0.4} /></mesh>
                <mesh><sphereGeometry args={[0.7, 12, 12]} /><meshStandardMaterial color={color} wireframe transparent opacity={0.3} /></mesh>
                <mesh><sphereGeometry args={[0.3, 8, 8]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.7} /></mesh>
            </group>
        ),
        'Nuove Sostanze Psicoattive (NSP)': (
            <group ref={ref}>
                <mesh><dodecahedronGeometry args={[1, 0]} /><meshStandardMaterial color={color} wireframe transparent opacity={0.6} /></mesh>
                <mesh rotation={[0, Math.PI / 5, 0]}><dodecahedronGeometry args={[0.7, 0]} /><meshStandardMaterial color={color} wireframe transparent opacity={0.3} /></mesh>
                <mesh><tetrahedronGeometry args={[0.3, 0]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} /></mesh>
            </group>
        ),
    };

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            {shapes[category] || shapes['Psichedelici']}
        </Float>
    );
}

const categories = [
    { name: 'Psichedelici', desc: 'Strutture frattali e simmetrie — riflettono l\'espansione percettiva e la dissoluzione dei confini dell\'io.' },
    { name: 'Empatogeni / Entactogeni', desc: 'Forme toroidali che simboleggiano connessione e apertura emotiva — il flusso di empatia tra le persone.' },
    { name: 'Stimolanti', desc: 'Geometrie angolari ed energiche — rappresentano l\'accelerazione, la vigilanza e l\'intensità dell\'esperienza.' },
    { name: 'Dissociativi', desc: 'Nodi e intrecci topologici — la separazione tra mente e corpo, la dissociazione tra sé e ambiente.' },
    { name: 'Downer', desc: 'Sfere concentriche e morbide — la sedazione, il rilassamento progressivo e il rallentamento delle funzioni.' },
    { name: 'Nuove Sostanze Psicoattive (NSP)', desc: 'Poliedri complessi e stratificati — la struttura chimica sconosciuta e i rischi imprevedibili.' },
];

export function Molecole() {
    const [activeCategory, setActiveCategory] = useState(categories[0].name);
    const active = categories.find(c => c.name === activeCategory) || categories[0];
    const color = CATEGORY_COLORS[activeCategory] || '#fff';

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
                Ogni categoria di sostanze ha una geometria unica che ne riflette la natura farmacologica.
                Esplora le strutture tridimensionali interattive.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 3D Viewer */}
                <div className="aspect-square max-h-[500px] bg-black/40 border border-white/10 rounded-2xl overflow-hidden relative">
                    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 1.5]}>
                        <ambientLight intensity={0.3} />
                        <pointLight position={[5, 5, 5]} intensity={1} color={color} />
                        <pointLight position={[-5, -5, 3]} intensity={0.5} />
                        <Suspense fallback={null}>
                            <CategoryMolecule category={activeCategory} color={color} />
                        </Suspense>
                        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                    </Canvas>
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">Ruota per esplorare</span>
                    </div>
                </div>

                {/* Category selector */}
                <div className="flex flex-col gap-3">
                    {categories.map(cat => {
                        const catColor = CATEGORY_COLORS[cat.name] || '#888';
                        const isActive = activeCategory === cat.name;
                        return (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`text-left p-4 rounded-xl border transition-all ${isActive
                                    ? 'border-opacity-60'
                                    : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                                    }`}
                                style={isActive ? { borderColor: catColor + '60', backgroundColor: catColor + '15' } : {}}
                            >
                                <h3 className="font-bold text-sm uppercase tracking-wider mb-1" style={isActive ? { color: catColor } : {}}>
                                    {cat.name}
                                </h3>
                                {isActive && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="text-white/60 text-xs leading-relaxed mt-2"
                                    >
                                        {cat.desc}
                                    </motion.p>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
