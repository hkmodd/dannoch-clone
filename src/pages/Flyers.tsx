import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

export function Flyers() {
  const flyers = [
    { title: 'Informazioni sui rischi del consumo di sostanze', url: 'https://www.danno.ch/flyers', category: 'Generale' },
    { title: 'Safer Use: Regole fondamentali', url: 'https://www.danno.ch/flyers', category: 'Prevenzione' },
    { title: 'Drug Checking: Come funziona', url: 'https://www.danno.ch/flyers', category: 'Servizi' },
    { title: 'Mix pericolosi: Cosa non mischiare', url: 'https://www.danno.ch/flyers', category: 'Interazioni' },
    { title: 'Primo soccorso in caso di emergenza', url: 'https://www.danno.ch/flyers', category: 'Emergenze' },
    { title: 'Safer Sniffing', url: 'https://www.danno.ch/flyers', category: 'Safer Use' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full min-h-screen pt-24 md:pt-32 pb-24 px-4 md:px-12 max-w-7xl mx-auto pointer-events-auto"
    >
      <div className="overflow-hidden mb-12 mix-blend-difference">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
          Flyers &<br />Materiale
        </h1>
        <p className="mt-4 text-lg font-light max-w-2xl opacity-80">
          Materiale informativo disponibile su danno.ch. Visita il sito originale per scaricare i PDF.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {flyers.map((flyer, i) => (
          <motion.a
            href={flyer.url}
            target="_blank"
            rel="noreferrer"
            key={flyer.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.05, 0.25) }}
            className="border border-white/10 bg-white/5 p-6 h-48 flex flex-col justify-between group cursor-pointer backdrop-blur-sm hover:bg-white hover:text-black transition-all rounded-xl"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest border border-current px-2 py-1 rounded-full">
                {flyer.category}
              </span>
              <h3 className="text-lg font-bold mt-3 leading-tight">{flyer.title}</h3>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 group-hover:opacity-100">danno.ch</span>
              <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-all" />
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-xl text-center">
        <p className="text-sm opacity-60">
          I PDF originali sono disponibili su{' '}
          <a href="https://www.danno.ch/flyers" target="_blank" rel="noreferrer" className="underline hover:opacity-100 transition-opacity">
            danno.ch/flyers
          </a>
        </p>
      </div>
    </motion.div>
  );
}
