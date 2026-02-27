import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Info, ShieldCheck, Clock, Zap, Eye, Pill, Beaker, TriangleAlert } from 'lucide-react';
import { sostanzeDb, CATEGORY_COLORS, type Sostanza } from '../data/sostanze';

export function SostanzaDetail() {
  const { id } = useParams();

  const data: Sostanza | undefined = sostanzeDb[id as string];

  if (!data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center pointer-events-auto"
      >
        <Link to="/sostanze" className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:opacity-50 transition-opacity w-fit mb-8">
          <ArrowLeft className="w-4 h-4" /> Torna all'elenco
        </Link>
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Sostanza non trovata</h1>
        <p className="font-mono text-sm opacity-60">L'ID "{id}" non corrisponde a nessuna sostanza nel database.</p>
      </motion.div>
    );
  }

  const categoryColor = CATEGORY_COLORS[data.category] || '#888';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 pointer-events-auto"
    >
      {/* Sidebar / Sticky Info */}
      <div className="w-full md:w-1/3 flex flex-col gap-8 md:sticky md:top-32 h-fit">
        <Link to="/sostanze" className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:opacity-50 transition-opacity w-fit">
          <ArrowLeft className="w-4 h-4" /> Torna all'elenco
        </Link>

        <div>
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] mix-blend-difference"
          >
            {data.name}
          </motion.h1>
          <div className="flex items-center gap-3 mt-4">
            <span
              className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border"
              style={{ borderColor: categoryColor, color: categoryColor }}
            >
              {data.category}
            </span>
          </div>
          <p className="font-mono text-sm opacity-60 mt-3 uppercase tracking-widest">{data.aka}</p>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-8">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="font-mono text-xs opacity-50 uppercase">Classe</span>
            <span className="font-mono text-xs text-right max-w-[60%]">{data.class}</span>
          </div>
          {data.onset && (
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="font-mono text-xs opacity-50 uppercase flex items-center gap-1"><Zap className="w-3 h-3" /> Salita</span>
              <span className="font-mono text-xs text-right max-w-[60%]">{data.onset}</span>
            </div>
          )}
          {data.duration && (
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="font-mono text-xs opacity-50 uppercase flex items-center gap-1"><Clock className="w-3 h-3" /> Durata</span>
              <span className="font-mono text-xs text-right max-w-[60%]">{data.duration}</span>
            </div>
          )}
          {data.dosage && (
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="font-mono text-xs opacity-50 uppercase flex items-center gap-1"><Beaker className="w-3 h-3" /> Dosaggio</span>
              <span className="font-mono text-xs text-right max-w-[60%]">{data.dosage}</span>
            </div>
          )}
        </div>

        {/* Mix Warnings */}
        {data.mixWarnings && (
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TriangleAlert className="w-4 h-4 text-orange-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-orange-300 font-bold">Attenzione ai mix</span>
            </div>
            <p className="text-sm font-light text-orange-200/80">{data.mixWarnings}</p>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="w-full md:w-2/3 flex flex-col gap-8">

        {/* Intro */}
        {data.intro && (
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl"
          >
            <p className="text-lg font-light leading-relaxed text-white/90">{data.intro}</p>
          </motion.section>
        )}

        {/* Appearance & Consumption */}
        {(data.appearance || data.consumption) && (
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {data.appearance && (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-5 h-5 text-purple-400" />
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-purple-300">Aspetto</h3>
                </div>
                <p className="text-sm font-light text-white/70 leading-relaxed">{data.appearance}</p>
              </div>
            )}
            {data.consumption && (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Pill className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-cyan-300">Modalità di consumo</h3>
                </div>
                <p className="text-sm font-light text-white/70 leading-relaxed">{data.consumption}</p>
              </div>
            )}
          </motion.section>
        )}

        {/* Effects */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold uppercase tracking-tighter">Effetti</h2>
          </div>
          <p className="font-light leading-relaxed text-white/80">
            {data.effects}
          </p>
        </motion.section>

        {/* Risks */}
        {data.risks && (
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-red-500/10 backdrop-blur-md border border-red-500/20 p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold uppercase tracking-tighter text-red-100">Rischi & Effetti collaterali</h2>
            </div>
            <p className="font-light leading-relaxed text-white/80">
              {data.risks}
            </p>
          </motion.section>
        )}

        {/* Long-term Risks */}
        {data.longTermRisks && (
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="bg-amber-500/10 backdrop-blur-md border border-amber-500/20 p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-bold uppercase tracking-tighter text-amber-100">Rischi a lungo termine</h2>
            </div>
            <p className="font-light leading-relaxed text-white/80">
              {data.longTermRisks}
            </p>
          </motion.section>
        )}

        {/* Safer Use */}
        {data.saferUse.length > 0 && (
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-green-500/10 backdrop-blur-md border border-green-500/20 p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold uppercase tracking-tighter text-green-100">Safer Use (Regole d'oro)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.saferUse.map((rule: string, index: number) => (
                <div key={index} className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="flex gap-3">
                    <span className="font-mono text-xs text-green-400 font-bold mt-0.5 shrink-0">{String(index + 1).padStart(2, '0')}</span>
                    <p className="text-sm font-light opacity-90">{rule}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </motion.div>
  );
}
