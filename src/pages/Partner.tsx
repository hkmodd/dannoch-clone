import { motion } from 'motion/react';

export function Partner() {
  const partners = [
    { name: 'DIZ - Drogeninformationszentrum', location: 'Zurigo', type: 'Drug Checking' },
    { name: 'DIB - Drug Checking Bern', location: 'Berna', type: 'Drug Checking' },
    { name: 'Nuit Blanche', location: 'Ginevra', type: 'Prevenzione' },
    { name: 'Radix Svizzera Italiana', location: 'Ticino', type: 'Promozione Salute' },
    { name: 'Infodrog', location: 'Nazionale', type: 'Centrale di Coordinamento' },
    { name: 'Streetwork', location: 'Zurigo', type: 'Lavoro di Strada' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto pointer-events-auto"
    >
      <div className="overflow-hidden mb-16 mix-blend-difference">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
          I Nostri<br/>Partner
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((partner, i) => (
          <motion.div 
            key={partner.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="border border-white/10 bg-white/5 p-8 backdrop-blur-sm flex flex-col justify-center items-center text-center aspect-square hover:bg-white hover:text-black transition-colors group"
          >
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 group-hover:scale-110 transition-transform">{partner.name}</h3>
            <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4">{partner.type}</p>
            <span className="text-sm font-light border-t border-current pt-4 w-12 group-hover:w-24 transition-all">{partner.location}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
