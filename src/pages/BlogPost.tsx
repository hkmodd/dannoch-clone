import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function BlogPost() {
  const { id } = useParams();

  // Mock content for demonstration
  const title = id?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Articolo';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto pointer-events-auto"
    >
      <Link to="/news-blog" className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:opacity-50 transition-opacity w-fit mb-12">
        <ArrowLeft className="w-4 h-4" /> Torna al Blog
      </Link>

      <div className="mb-16 mix-blend-difference">
        <div className="flex gap-4 font-mono text-xs uppercase tracking-widest opacity-70 mb-6">
          <span>15 Dicembre 2025</span>
          <span>&mdash;</span>
          <span>Redazione danno.ch</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
          {title}
        </h1>
      </div>

      <div className="prose prose-invert prose-lg max-w-none bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-2xl">
        <p className="lead text-xl font-light text-white/90">
          Questo è un articolo di approfondimento. La riduzione del danno passa attraverso l'informazione corretta e tempestiva. In questo spazio analizziamo i trend di consumo, pubblichiamo le allerte sulle pillole ad alto dosaggio e discutiamo le politiche sulle droghe.
        </p>
        <h2 className="text-3xl font-bold mt-12 mb-6">Il Contesto Attuale</h2>
        <p className="font-light text-white/80 leading-relaxed mb-6">
          Negli ultimi anni abbiamo assistito a una trasformazione radicale del mercato delle sostanze psicoattive. L'accessibilità tramite darknet e l'introduzione di nuove sostanze psicoattive (NPS) richiedono un aggiornamento costante delle strategie di prevenzione.
        </p>
        <blockquote className="border-l-4 border-white/50 pl-6 my-8 italic font-light text-xl">
          "Non possiamo fermare il consumo, ma possiamo renderlo più sicuro. La conoscenza salva la vita."
        </blockquote>
        <h2 className="text-3xl font-bold mt-12 mb-6">Risultati delle Analisi</h2>
        <p className="font-light text-white/80 leading-relaxed mb-6">
          I laboratori di Zurigo (DIZ) e Berna (DIB) continuano a rilevare pillole di MDMA con dosaggi estremamente elevati (oltre 200mg), che aumentano esponenzialmente il rischio di neurotossicità e ipertermia. È fondamentale utilizzare i servizi di drug checking.
        </p>
      </div>
    </motion.div>
  );
}
