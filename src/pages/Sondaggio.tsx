import { motion } from 'motion/react';

export function Sondaggio() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto pointer-events-auto flex flex-col items-center text-center"
    >
      <div className="overflow-hidden mb-8 mix-blend-difference">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
          Sondaggio<br/>Sui Consumi
        </h1>
      </div>
      
      <p className="text-lg md:text-xl font-light max-w-2xl text-white/80 mb-16 mix-blend-difference">
        Partecipa al nostro sondaggio anonimo annuale. I tuoi dati ci aiutano a comprendere le nuove tendenze, calibrare i servizi di Drug Checking e migliorare le strategie di riduzione del danno in Svizzera.
      </p>

      <div className="w-full bg-white/5 border border-white/10 backdrop-blur-md p-8 md:p-16 rounded-3xl text-left">
        <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
          <h2 className="text-2xl font-bold uppercase tracking-tighter">Questionario 2026</h2>
          <span className="font-mono text-xs uppercase tracking-widest bg-white text-black px-4 py-2 rounded-full">100% Anonimo</span>
        </div>

        <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-4">
            <label className="text-xl font-light">1. Qual è la tua fascia d'età?</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['< 18', '18-24', '25-34', '35+'].map(age => (
                <button key={age} className="border border-white/20 py-4 hover:bg-white hover:text-black transition-colors font-mono text-lg">
                  {age}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <label className="text-xl font-light">2. Con quale frequenza frequenti club o festival?</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Ogni weekend', '1-2 volte al mese', 'Raramente'].map(freq => (
                <button key={freq} className="border border-white/20 py-4 hover:bg-white hover:text-black transition-colors font-mono text-sm uppercase tracking-widest">
                  {freq}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex justify-end">
            <button className="bg-white text-black font-bold uppercase tracking-widest px-12 py-4 hover:bg-gray-200 transition-colors rounded-full">
              Inizia Sondaggio Completo &rarr;
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
