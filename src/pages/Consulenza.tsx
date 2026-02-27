import { motion } from 'motion/react';
import { MessageSquare, PhoneCall, HeartPulse, Shield, ExternalLink, Clock, Globe } from 'lucide-react';

export function Consulenza() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto pointer-events-auto"
    >
      <div className="overflow-hidden mb-12 text-center">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85] mix-blend-difference">
          Consulenza
        </h1>
      </div>

      <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-16 border border-white/10">
        <p className="text-lg md:text-xl font-light max-w-3xl mx-auto text-white/90 text-center leading-relaxed">
          Il consumo è diventato un problema? Hai vissuto un'esperienza difficile (bad trip) e hai bisogno di parlarne? O semplicemente hai domande sulle sostanze? Siamo qui per ascoltarti, senza giudicare.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Chat Anonima */}
        <div className="bg-black/60 backdrop-blur-xl border border-blue-500/20 p-10 rounded-3xl flex flex-col justify-between">
          <div>
            <MessageSquare className="w-12 h-12 mb-6 text-blue-400" />
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Chat Anonima</h3>
            <p className="font-light text-white/80 mb-4">
              Parla direttamente con un operatore specializzato in riduzione del danno. Il servizio è completamente anonimo, non registriamo IP o dati personali.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/60 mb-8">
              <Clock className="w-4 h-4" />
              <span>Lun-Ven 14:00-18:00</span>
            </div>
          </div>
          <a
            href="https://www.safezone.ch/it/consulenza"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest py-4 rounded-full transition-colors text-center flex items-center justify-center gap-3"
          >
            Avvia Chat su SafeZone.ch
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Emergenze Mediche */}
        <div className="bg-black/60 backdrop-blur-xl border border-red-500/20 p-10 rounded-3xl flex flex-col justify-between">
          <div>
            <HeartPulse className="w-12 h-12 mb-6 text-red-400" />
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-red-100">Emergenza Medica</h3>
            <p className="font-light text-white/80 mb-4">
              Se qualcuno sta male, ha perso i sensi, non respira bene o ha convulsioni, non esitare. I paramedici sono lì per salvare vite, non per chiamare la polizia.
            </p>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8">
              <p className="text-sm text-red-200 font-bold">⚠️ Non rischi conseguenze legali chiamando il 144 per un'emergenza!</p>
            </div>
          </div>
          <a href="tel:144" className="block text-center w-full bg-red-600 text-white font-bold uppercase tracking-widest py-4 rounded-full hover:bg-red-700 transition-colors shadow-[0_0_30px_rgba(220,38,38,0.4)]">
            Chiama Subito il 144
          </a>
        </div>
      </div>

      {/* Altri Servizi */}
      <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Altri Servizi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="https://www.safezone.ch/it" target="_blank" rel="noopener noreferrer" className="flex items-start gap-6 p-6 border border-white/10 bg-black/40 rounded-2xl hover:bg-white/5 transition-colors group">
            <Globe className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                SafeZone.ch
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-sm font-light text-white/70">
                Consulenza online anonima e gratuita su questioni legate alle dipendenze. Chat, e-mail o forum.
              </p>
            </div>
          </a>
          <a href="tel:143" className="flex items-start gap-6 p-6 border border-white/10 bg-black/40 rounded-2xl hover:bg-white/5 transition-colors group">
            <PhoneCall className="w-8 h-8 text-green-400 shrink-0" />
            <div>
              <h4 className="text-xl font-bold mb-2">Telefono Amico (143)</h4>
              <p className="text-sm font-light text-white/70">
                Servizio di ascolto attivo 24 ore su 24, 7 giorni su 7. Per chiunque abbia bisogno di parlare in un momento di crisi personale.
              </p>
            </div>
          </a>
          <div className="flex items-start gap-6 p-6 border border-white/10 bg-black/40 rounded-2xl">
            <Shield className="w-8 h-8 text-purple-400 shrink-0" />
            <div>
              <h4 className="text-xl font-bold mb-2">Consulenza Legale</h4>
              <p className="text-sm font-light text-white/70">
                Hai avuto problemi con la legge legati al consumo? Ti indirizziamo verso avvocati e servizi specializzati in diritto degli stupefacenti.
              </p>
            </div>
          </div>
          <a href="https://www.ingrado.ch" target="_blank" rel="noopener noreferrer" className="flex items-start gap-6 p-6 border border-white/10 bg-black/40 rounded-2xl hover:bg-white/5 transition-colors group">
            <HeartPulse className="w-8 h-8 text-rose-400 shrink-0" />
            <div>
              <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                Ingrado (Servizi per le dipendenze)
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-sm font-light text-white/70">
                Servizi terapeutici residenziali e ambulatoriali per le dipendenze nel Canton Ticino.
              </p>
            </div>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
