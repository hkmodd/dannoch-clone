import { motion } from 'motion/react';
import { FlaskConical, Microscope, ShieldAlert } from 'lucide-react';

export function Drugchecking() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto pointer-events-auto"
    >
      <div className="overflow-hidden mb-12 mix-blend-difference text-center">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85]">
          Drug<br/>Checking
        </h1>
      </div>
      
      <div className="flex flex-col items-center gap-6 mix-blend-difference mb-16 text-center">
        <p className="text-lg md:text-xl font-light max-w-3xl text-white/80">
          Sai cosa compri? Il mercato nero non ha controlli di qualità. Fai analizzare le tue sostanze chimicamente in laboratorio. Il servizio è anonimo, gratuito e legale in Svizzera.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm rounded-2xl">
          <FlaskConical className="w-10 h-10 mb-6 text-blue-400" />
          <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Cos'è?</h3>
          <p className="font-light text-sm text-white/80 leading-relaxed">
            Il Drug Checking permette di far analizzare le sostanze psicoattive in modo anonimo per conoscerne l'esatta composizione chimica, il dosaggio del principio attivo e la presenza di adulteranti tossici.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm rounded-2xl">
          <Microscope className="w-10 h-10 mb-6 text-purple-400" />
          <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Come Funziona?</h3>
          <p className="font-light text-sm text-white/80 leading-relaxed">
            Consegni un piccolo campione (es. mezza pillola o pochi milligrammi di polvere) presso un centro autorizzato. Il campione viene analizzato tramite HPLC o GC-MS. I risultati ti vengono comunicati di persona o telefonicamente.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm rounded-2xl">
          <ShieldAlert className="w-10 h-10 mb-6 text-yellow-400" />
          <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Attenzione</h3>
          <p className="font-light text-sm text-white/80 leading-relaxed">
            Un risultato "puro" non significa "sicuro". Il consumo comporta sempre dei rischi. Il Drug Checking serve a prevenire le overdose accidentali da sostanze inaspettate o da dosaggi estremi, non a certificare la sicurezza.
          </p>
        </div>
      </div>
        
      <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 text-center mix-blend-difference">Centri di Analisi</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto text-left">
        <div className="bg-white text-black p-10 rounded-3xl hover:scale-[1.02] transition-transform">
          <h3 className="font-black text-4xl uppercase tracking-tighter mb-2">Zurigo</h3>
          <h4 className="font-bold text-xl mb-6 text-gray-600">DIZ - Drogeninformationszentrum</h4>
          <p className="text-sm mb-2 font-mono">📍 Neumühlequai 10, 8001 Zürich</p>
          <p className="text-sm mb-8 font-mono">🕒 Mar & Ven: 17:30 - 20:30 (su appuntamento)</p>
          <a href="https://saferparty.ch" target="_blank" rel="noreferrer" className="block text-center w-full bg-black text-white font-mono text-xs uppercase tracking-widest py-4 rounded-full hover:bg-gray-800 transition-colors">
            Visita Saferparty.ch
          </a>
        </div>
        <div className="bg-white text-black p-10 rounded-3xl hover:scale-[1.02] transition-transform">
          <h3 className="font-black text-4xl uppercase tracking-tighter mb-2">Berna</h3>
          <h4 className="font-bold text-xl mb-6 text-gray-600">DIB - Drug Checking Bern</h4>
          <p className="text-sm mb-2 font-mono">📍 Hodlerstrasse 8, 3011 Bern</p>
          <p className="text-sm mb-8 font-mono">🕒 Mer: 18:00 - 21:00 (su appuntamento)</p>
          <a href="https://raveitsafe.ch" target="_blank" rel="noreferrer" className="block text-center w-full bg-black text-white font-mono text-xs uppercase tracking-widest py-4 rounded-full hover:bg-gray-800 transition-colors">
            Visita Rave It Safe
          </a>
        </div>
      </div>
    </motion.div>
  );
}
