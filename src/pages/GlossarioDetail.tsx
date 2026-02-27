import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpenText, ArrowUpRight } from 'lucide-react';
import { glossarioDb, GLOSSARIO_CATEGORIES } from '../data/glossario';

export function GlossarioDetail() {
    const { id } = useParams();
    const term = id ? glossarioDb[id] : undefined;

    if (!term) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
                <BookOpenText size={64} className="text-purple-400 mb-6" />
                <h1 className="text-3xl font-bold mb-4">Termine non trovato</h1>
                <p className="text-white/60 mb-8">Il termine richiesto non esiste nel glossario.</p>
                <Link to="/glossario" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
                    <ArrowLeft size={20} /> Torna al Glossario
                </Link>
            </div>
        );
    }

    const catInfo = GLOSSARIO_CATEGORIES[term.category];

    // Find related terms that exist in the db
    const relatedTerms = (term.relatedTerms || [])
        .map(rt => glossarioDb[rt])
        .filter(Boolean);

    return (
        <div className="min-h-screen py-24 px-6">
            <div className="max-w-3xl mx-auto">
                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Link
                        to="/glossario"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Torna al Glossario</span>
                    </Link>
                </motion.div>

                {/* Category badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <span
                        className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4"
                        style={{ backgroundColor: catInfo.color + '20', color: catInfo.color }}
                    >
                        {catInfo.label}
                    </span>
                </motion.div>

                {/* Term title */}
                <motion.h1
                    className="text-4xl md:text-6xl font-black mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    {term.term}
                </motion.h1>

                {/* Definition */}
                <motion.div
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <p className="text-white/80 leading-relaxed text-lg">
                        {term.definition}
                    </p>
                </motion.div>

                {/* Related terms */}
                {relatedTerms.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h2 className="text-xl font-bold mb-4 text-white/90 flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full" />
                            Termini correlati
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {relatedTerms.map(rt => {
                                const rtCat = GLOSSARIO_CATEGORIES[rt.category];
                                return (
                                    <Link key={rt.id} to={`/glossario/${rt.id}`}>
                                        <div className="group p-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold text-sm group-hover:text-white transition-colors">
                                                    {rt.term}
                                                </h4>
                                                <span
                                                    className="text-[9px] font-bold uppercase tracking-widest"
                                                    style={{ color: rtCat.color }}
                                                >
                                                    {rtCat.label}
                                                </span>
                                            </div>
                                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
