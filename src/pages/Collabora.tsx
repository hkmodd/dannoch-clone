import { motion } from 'motion/react';
import { Users, HeartHandshake, Megaphone } from 'lucide-react';

export function Collabora() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto pointer-events-auto"
    >
      <div className="overflow-hidden mb-16 mix-blend-difference">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
          Collabora<br/>Con Noi
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
          <Users className="w-12 h-12 mb-6 opacity-80" />
          <h2 className="text-2xl font-bold uppercase tracking-tighter mb-4">Diventa Volontario</h2>
          <p className="font-light text-white/80 text-sm leading-relaxed mb-8">
            Unisciti ai nostri team mobili durante i festival e gli eventi. Riceverai una formazione specifica sulla riduzione del danno e sul primo soccorso psicologico.
          </p>
          <button className="font-mono text-xs uppercase tracking-widest border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors w-full">
            Candidati
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
          <HeartHandshake className="w-12 h-12 mb-6 opacity-80" />
          <h2 className="text-2xl font-bold uppercase tracking-tighter mb-4">Supporto Professionale</h2>
          <p className="font-light text-white/80 text-sm leading-relaxed mb-8">
            Sei un medico, psicologo, chimico o operatore sociale? Metti a disposizione le tue competenze per espandere i nostri servizi di consulenza e analisi.
          </p>
          <button className="font-mono text-xs uppercase tracking-widest border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors w-full">
            Contattaci
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
          <Megaphone className="w-12 h-12 mb-6 opacity-80" />
          <h2 className="text-2xl font-bold uppercase tracking-tighter mb-4">Diffondi il Messaggio</h2>
          <p className="font-light text-white/80 text-sm leading-relaxed mb-8">
            Aiutaci a distribuire materiale informativo, flyers e kit di riduzione del danno nei locali, nei bar e nei centri giovanili della tua zona.
          </p>
          <button className="font-mono text-xs uppercase tracking-widest border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors w-full">
            Richiedi Materiale
          </button>
        </div>
      </div>
    </motion.div>
  );
}
