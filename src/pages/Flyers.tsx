import { motion } from 'motion/react';
import { Download } from 'lucide-react';

export function Flyers() {
  const flyers = [
    { title: 'Guida al Safer Use', category: 'Generale', color: 'bg-blue-500/20' },
    { title: 'MDMA & Ecstasy', category: 'Sostanze', color: 'bg-purple-500/20' },
    { title: 'Cocaina: Riduzione del Danno', category: 'Sostanze', color: 'bg-red-500/20' },
    { title: 'Mix Pericolosi (Tabella)', category: 'Interazioni', color: 'bg-orange-500/20' },
    { title: 'Ketamina: Dosaggi e Rischi', category: 'Sostanze', color: 'bg-teal-500/20' },
    { title: 'Primo Soccorso nei Club', category: 'Emergenze', color: 'bg-green-500/20' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto pointer-events-auto"
    >
      <div className="overflow-hidden mb-12 mix-blend-difference">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
          Flyers &<br/>Materiale
        </h1>
        <p className="mt-6 text-lg font-light max-w-2xl opacity-80">
          Scarica, stampa e distribuisci il nostro materiale informativo. La conoscenza deve essere libera e accessibile a tutti.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {flyers.map((flyer, i) => (
          <motion.div 
            key={flyer.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`border border-white/10 p-8 h-64 flex flex-col justify-between group cursor-pointer backdrop-blur-md hover:bg-white hover:text-black transition-all ${flyer.color}`}
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest border border-current px-2 py-1 rounded-full">
                {flyer.category}
              </span>
              <h3 className="text-2xl font-bold mt-4 leading-tight">{flyer.title}</h3>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest opacity-50 group-hover:opacity-100">PDF / 2MB</span>
              <Download className="w-6 h-6 opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
