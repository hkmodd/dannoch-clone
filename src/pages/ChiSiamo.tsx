import { motion } from 'motion/react';

export function ChiSiamo() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto pointer-events-auto"
    >
      <div className="overflow-hidden mb-12">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mix-blend-difference">
          Chi Siamo
        </h1>
      </div>

      <div className="prose prose-invert prose-lg max-w-none">
        <p className="text-xl font-light leading-relaxed text-white/90 mb-8">
          Siamo un progetto dedicato alla <strong>Riduzione del Danno</strong> (Harm Reduction) legato al consumo ricreativo di sostanze psicoattive in Svizzera e Canton Ticino.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
          <div className="border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">La Nostra Visione</h3>
            <p className="font-light text-sm opacity-80">
              Crediamo che l'informazione oggettiva, scientifica e priva di pregiudizi sia il miglior strumento per proteggere la salute. Non giudichiamo il consumo, ma forniamo gli strumenti per minimizzarne i rischi.
            </p>
          </div>
          <div className="border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">I Nostri Obiettivi</h3>
            <p className="font-light text-sm opacity-80">
              Prevenire le overdose, informare sulle interazioni pericolose, promuovere l'accesso ai servizi di Drug Checking e offrire consulenza anonima a chi ne ha bisogno.
            </p>
          </div>
        </div>

        <h2 className="text-4xl font-black uppercase tracking-tighter mt-16 mb-6">Il Network</h2>
        <p className="font-light leading-relaxed text-white/80 mb-8">
          danno.ch collabora strettamente con i centri di competenza svizzeri, i laboratori di analisi (come il DIZ di Zurigo e il DIB di Berna) e le unità mobili che operano nei festival e nei club.
        </p>
      </div>
    </motion.div>
  );
}
