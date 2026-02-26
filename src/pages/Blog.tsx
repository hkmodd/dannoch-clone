import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Blog() {
  const posts = [
    { id: '565-ketamina-ieri-e-oggi', title: 'Ketamina, ieri e oggi', date: '15 Dicembre 2025', category: 'Sostanze', excerpt: 'Un\'analisi storica e farmacologica sull\'evoluzione dell\'uso ricreativo della ketamina, dai club underground alle nuove tendenze.' },
    { id: '563-sai-cosa-compri', title: 'Sai cosa compri?', date: '24 Dicembre 2021', category: 'Drug Checking', excerpt: 'I risultati delle ultime analisi di laboratorio rivelano un aumento di adulteranti pericolosi nel mercato nero svizzero.' },
    { id: '562-covid-19-lockdown-2020-consumo-sostanze', title: 'COVID 19, Lockdown 2020 e il Consumo', date: '21 Marzo 2021', category: 'Ricerca', excerpt: 'Come la pandemia ha modificato le abitudini di consumo, spostando l\'uso dalle discoteche agli ambienti domestici.' },
    { id: '561-uso-di-sostanze-a-scopo-ricreativo-in-svizzera-2019', title: 'Uso di sostanze a scopo ricreativo in Svizzera', date: '29 Settembre 2020', category: 'Statistiche', excerpt: 'I dati ufficiali del 2019 mostrano un cambiamento nei pattern di consumo tra i giovani adulti.' },
    { id: '558-qual-e-il-limite', title: 'Qual è il limite?', date: '23 Maggio 2019', category: 'Prevenzione', excerpt: 'Riflessioni sulla linea sottile tra uso ricreativo, abuso e dipendenza. Come riconoscere i segnali d\'allarme.' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto pointer-events-auto"
    >
      <div className="overflow-hidden mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 mix-blend-difference">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
          News &<br/>Blog
        </h1>
        <p className="font-mono text-sm opacity-70 max-w-xs uppercase tracking-widest">
          Approfondimenti, allerte pillole e report dal mondo della riduzione del danno.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <Link key={post.id} to={`/news-blog/${post.id}`}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group h-full flex flex-col justify-between border border-white/10 bg-black/20 backdrop-blur-md p-8 hover:bg-white hover:text-black transition-all duration-500 cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest border border-current px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="font-mono text-[10px] opacity-50 group-hover:opacity-100">{post.date}</span>
                </div>
                <h2 className="text-2xl font-bold leading-tight mb-4 group-hover:translate-x-2 transition-transform">{post.title}</h2>
                <p className="font-light text-sm opacity-80 line-clamp-3">{post.excerpt}</p>
              </div>
              <div className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
                Leggi articolo <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
