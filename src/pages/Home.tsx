import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function Home() {
  const blogPosts = [
    { title: 'Ketamina, ieri e oggi', date: '2025-12-15', link: '/news-blog/565-ketamina-ieri-e-oggi' },
    { title: 'Sai cosa compri?', date: '2021-12-24', link: '/news-blog/563-sai-cosa-compri' },
    { title: 'COVID 19, Lockdown 2020 e il Consumo', date: '2021-03-21', link: '/news-blog/562-covid-19-lockdown-2020-consumo-sostanze' },
    { title: 'Uso di sostanze a scopo ricreativo', date: '2020-09-29', link: '/news-blog/561-uso-di-sostanze-a-scopo-ricreativo-in-svizzera-2019' },
    { title: 'Qual è il limite?', date: '2019-05-23', link: '/news-blog/558-qual-e-il-limite' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full min-h-screen pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-12"
    >
      {/* Marquee Header */}
      <div className="w-full overflow-hidden border-y border-white/10 py-4 mix-blend-difference">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="whitespace-nowrap font-mono text-sm uppercase tracking-widest"
        >
          Informazioni sul consumo ricreativo di sostanze psicoattive &nbsp; &nbsp; Informazioni sul consumo ricreativo di sostanze psicoattive &nbsp; &nbsp; Informazioni sul consumo ricreativo di sostanze psicoattive
        </motion.div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Sostanze', path: '/sostanze', desc: 'Enciclopedia chimica e dosaggi' },
          { title: 'Rischi', path: '/rischi', desc: 'Riduzione del danno e interazioni' },
          { title: 'Drug Checking', path: '/drugchecking', desc: 'Fai analizzare le tue sostanze' },
          { title: 'Consulenza', path: '/consulenza', desc: 'Supporto anonimo e professionale' }
        ].map((item, i) => (
          <Link key={item.title} to={item.path}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-64 border border-white/10 bg-black/20 backdrop-blur-md p-6 flex flex-col justify-end overflow-hidden hover:bg-white/5 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0" />
              <div className="relative z-10">
                <h2 className="text-3xl font-black uppercase tracking-tighter group-hover:translate-x-2 transition-transform">{item.title}</h2>
                <p className="font-mono text-xs opacity-60 mt-2">{item.desc}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Blog Section */}
      <div className="mt-12">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 mix-blend-difference">News & Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogPosts.map((post, i) => (
            <Link key={post.title} to={post.link}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="border border-white/10 p-6 hover:bg-white hover:text-black transition-colors group h-full flex flex-col justify-between"
              >
                <h3 className="text-xl font-bold leading-tight mb-4">{post.title}</h3>
                <p className="font-mono text-xs opacity-50 group-hover:opacity-100">{post.date}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Secondary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {[
          { title: 'Chi siamo', path: '/chi-siamo' },
          { title: 'Sondaggio sui consumi', path: '/sondaggio-online-sui-consumi' },
          { title: 'Links', path: '/links' },
          { title: 'Collabora', path: '/collabora' }
        ].map((item, i) => (
          <Link key={item.title} to={item.path}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + (i * 0.1) }}
              className="border border-white/10 p-6 text-center hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest">{item.title}</h3>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
