import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Contatti() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto pointer-events-auto"
    >
      <div className="overflow-hidden mb-12">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mix-blend-difference">
          Contatti
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="flex flex-col gap-8">
          <p className="text-xl font-light leading-relaxed text-white/90">
            Hai domande, dubbi o vuoi collaborare con noi? Il nostro team è a tua disposizione. Garantiamo la massima riservatezza.
          </p>
          
          <div className="flex flex-col gap-6 mt-4">
            <a href="mailto:info@danno.ch" className="flex items-center gap-4 p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm group">
              <Mail className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div>
                <h3 className="font-bold uppercase tracking-widest text-sm">Email</h3>
                <p className="font-mono text-lg">info@danno.ch</p>
              </div>
            </a>
            
            <div className="flex items-center gap-4 p-6 border border-white/10 bg-white/5 backdrop-blur-sm">
              <Phone className="w-8 h-8 opacity-50" />
              <div>
                <h3 className="font-bold uppercase tracking-widest text-sm">Emergenze Mediche</h3>
                <p className="font-mono text-lg text-red-400">Chiama il 144</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 border border-white/10 bg-white/5 backdrop-blur-sm">
              <MapPin className="w-8 h-8 opacity-50" />
              <div>
                <h3 className="font-bold uppercase tracking-widest text-sm">Sede</h3>
                <p className="font-mono text-sm opacity-80 mt-1">Svizzera / Canton Ticino<br/>(Indirizzo su appuntamento per consulenza)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-black/40 border border-white/10 p-8 backdrop-blur-md">
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">Scrivici un messaggio</h2>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-widest opacity-50">Nome (o Pseudonimo)</label>
              <input type="text" className="bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-white/50 transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-widest opacity-50">Email</label>
              <input type="email" className="bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-white/50 transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-widest opacity-50">Messaggio</label>
              <textarea rows={5} className="bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-white/50 transition-colors resize-none"></textarea>
            </div>
            <button className="mt-4 bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-gray-200 transition-colors">
              Invia Messaggio
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
