import { motion } from 'motion/react';
import { Download, ExternalLink } from 'lucide-react';

const FLYERS = [
  { title: 'Drugs? Just Say Know!', url: 'https://it.know-drugs.ch/ordinazioni', category: 'Opuscolo', isExternal: true },
  { title: 'Prima di consumare, informati.', url: 'https://danno.ch/images/pdf/flyer/prima_di_consumare.pdf', category: 'Generale' },
  { title: 'Safer Use (Sostanze, Rischi, Consigli)', url: 'https://danno.ch/images/pdf/flyer/safer_use.pdf', category: 'Safer Use' },
  { title: 'Alcol', url: 'https://danno.ch/images/pdf/flyer/alcol.pdf', category: 'Sostanze' },
  { title: 'Canapa', url: 'https://danno.ch/images/pdf/flyer/canapa.pdf', category: 'Sostanze' },
  { title: 'Ecstasy', url: 'https://danno.ch/images/pdf/flyer/ecstasy.pdf', category: 'Sostanze' },
  { title: 'Cocaina', url: 'https://danno.ch/images/pdf/flyer/coca.pdf', category: 'Sostanze' },
  { title: 'Anfetamina', url: 'https://danno.ch/images/pdf/flyer/anfetamina.pdf', category: 'Sostanze' },
  { title: 'Allucinogeni', url: 'https://danno.ch/images/pdf/flyer/allucinogeni.pdf', category: 'Sostanze' },
  { title: 'Safer Sniffing', url: 'https://danno.ch/images/pdf/flyer/prima_di_consumare.pdf', category: 'Safer Use' },
];

export function Flyers() {
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
          Scarica, stampa e distribuisci. La conoscenza deve essere libera e accessibile a tutti.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FLYERS.map((flyer, i) => (
          <motion.a
            href={flyer.url}
            target="_blank"
            rel="noreferrer"
            key={flyer.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.05, 0.3) }}
            className="border border-white/10 bg-white/5 p-6 h-44 flex flex-col justify-between group cursor-pointer backdrop-blur-sm hover:bg-white hover:text-black transition-all rounded-xl"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest border border-current px-2 py-1 rounded-full">
                {flyer.category}
              </span>
              <h3 className="text-lg font-bold mt-3 leading-tight">{flyer.title}</h3>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 group-hover:opacity-100">
                {flyer.isExternal ? 'Ordina online' : 'PDF — danno.ch'}
              </span>
              {flyer.isExternal
                ? <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-all" />
                : <Download className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 transition-all" />
              }
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
