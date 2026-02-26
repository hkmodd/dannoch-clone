import { motion } from 'motion/react';
import { MessageSquare, PhoneCall, HeartPulse, Shield } from 'lucide-react';

export function Consulenza() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto pointer-events-auto"
    >
      <div className="overflow-hidden mb-12 mix-blend-difference text-center">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85]">
          Consulenza
        </h1>
      </div>
      
      <div className="flex flex-col items-center gap-6 mix-blend-difference mb-16 text-center">
        <p className="text-lg md:text-xl font-light max-w-3xl text-white/80">
          Il consumo è diventato un problema? Hai vissuto un'esperienza difficile (bad trip) e hai bisogno di parlarne? O semplicemente hai domande sulle sostanze? Siamo qui per ascoltarti, senza giudicare.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Chat Anonima */}
        <div className="bg-white/5 border border-white/10 p-10 backdrop-blur-sm rounded-3xl hover:bg-white/10 transition-colors flex flex-col justify-between">
          <div>
            <MessageSquare className="w-12 h-12 mb-6 text-blue-400" />
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Chat Anonima</h3>
            <p className="font-light text-white/80 mb-8">
              Parla direttamente con un operatore specializzato in riduzione del danno. Il servizio è completamente anonimo, non registriamo IP o dati personali.
            </p>
          </div>
          <button className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-full hover:bg-gray-200 transition-colors">
            Avvia Chat (Lun-Ven 14-18)
          </button>
        </div>

        {/* Emergenze Mediche */}
        <div className="bg-red-500/10 border border-red-500/20 p-10 backdrop-blur-sm rounded-3xl flex flex-col justify-between">
          <div>
            <HeartPulse className="w-12 h-12 mb-6 text-red-400" />
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-red-100">Emergenza Medica</h3>
            <p className="font-light text-white/80 mb-8">
              Se qualcuno sta male, ha perso i sensi, non respira bene o ha convulsioni, non esitare. I paramedici sono lì per salvare vite, non per chiamare la polizia.
            </p>
          </div>
          <a href="tel:144" className="block text-center w-full bg-red-600 text-white font-bold uppercase tracking-widest py-4 rounded-full hover:bg-red-700 transition-colors shadow-[0_0_30px_rgba(220,38,38,0.4)]">
            Chiama Subito il 144
          </a>
        </div>
      </div>

      {/* Altri Servizi */}
      <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 mix-blend-difference">Altri Servizi</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-6 p-6 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl">
          <PhoneCall className="w-8 h-8 text-green-400 shrink-0" />
          <div>
            <h4 className="text-xl font-bold mb-2">Telefono Amico (143)</h4>
            <p className="text-sm font-light text-white/70">
              Servizio di ascolto attivo 24 ore su 24, 7 giorni su 7. Per chiunque abbia bisogno di parlare in un momento di crisi personale.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-6 p-6 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl">
          <Shield className="w-8 h-8 text-purple-400 shrink-0" />
          <div>
            <h4 className="text-xl font-bold mb-2">Consulenza Legale</h4>
            <p className="text-sm font-light text-white/70">
              Hai avuto problemi con la legge legati al consumo? Ti indirizziamo verso avvocati e servizi specializzati in diritto degli stupefacenti.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
