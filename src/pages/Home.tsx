import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MoleculeIcon, ShieldCrossIcon, FlaskBubblesIcon, HeartPulseIcon, GlossaryIcon } from '../components/icons/SectionIcons';
import type { ComponentType } from 'react';

const MAIN_CARDS: Array<{ title: string; path: string; desc: string; Icon: ComponentType<{ className?: string; size?: number }>; color: string }> = [
  { title: 'Sostanze', path: '/sostanze', desc: 'Enciclopedia chimica e dosaggi', Icon: MoleculeIcon, color: 'text-emerald-400' },
  { title: 'Rischi', path: '/rischi', desc: 'Riduzione del danno', Icon: ShieldCrossIcon, color: 'text-red-400' },
  { title: 'Drug Checking', path: '/drugchecking', desc: 'Analizza le tue sostanze', Icon: FlaskBubblesIcon, color: 'text-blue-400' },
  { title: 'Consulenza', path: '/consulenza', desc: 'Supporto anonimo', Icon: HeartPulseIcon, color: 'text-pink-400' },
  { title: 'Glossario', path: '/glossario', desc: 'Definizioni e termini', Icon: GlossaryIcon, color: 'text-amber-400' },
];

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
      transition={{ duration: 0.25 }}
      className="w-full min-h-screen pt-20 md:pt-32 pb-12 px-4 md:px-12 max-w-7xl mx-auto flex flex-col gap-6 md:gap-12"
    >
      {/* Marquee Header */}
      <div className="w-full overflow-hidden border-y border-white/10 py-3 md:py-4 mix-blend-difference">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="whitespace-nowrap font-mono text-xs md:text-sm uppercase tracking-widest"
        >
          Informazioni sul consumo ricreativo di sostanze psicoattive &nbsp; &nbsp; Informazioni sul consumo ricreativo di sostanze psicoattive &nbsp; &nbsp; Informazioni sul consumo ricreativo di sostanze psicoattive
        </motion.div>
      </div>

      {/* Main Bento Grid — 5 cards
           Mobile: 2-col, last card full-width centered
           Desktop: 5-col row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {MAIN_CARDS.map((item, i) => (
          <Link
            key={item.title}
            to={item.path}
            className={i === MAIN_CARDS.length - 1 ? 'col-span-2 md:col-span-1 max-w-[50%] mx-auto md:max-w-none' : ''}
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.25 }}
              className="group relative h-44 md:h-56 lg:h-64 border border-white/10 bg-black/30 backdrop-blur-md p-4 md:p-5 flex flex-col items-center justify-center text-center overflow-hidden hover:bg-white/5 transition-colors rounded-xl md:rounded-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-0" />
              <div className="relative z-10 flex flex-col items-center">
                <item.Icon className={`${item.color} mb-3 md:mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all`} size={48} />
                <h2 className="text-base md:text-xl lg:text-2xl font-black uppercase tracking-tight leading-tight">{item.title}</h2>
                <p className="font-mono text-[9px] md:text-[11px] opacity-50 mt-1 md:mt-2">{item.desc}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Blog Section — mobile shows 3, desktop shows all 5 */}
      <div className="mt-4 md:mt-8">
        <Link to="/news-blog" className="hover:opacity-70 transition-opacity">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 md:mb-8 mix-blend-difference">News & Blog →</h2>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {blogPosts.map((post, i) => (
            <Link
              key={post.title}
              to={post.link}
              className={i >= 3 ? 'hidden md:block' : ''}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 + (i * 0.04) }}
                className="border border-white/10 p-4 md:p-6 hover:bg-white hover:text-black transition-colors group h-full flex flex-col justify-between rounded-xl md:rounded-lg"
              >
                <h3 className="text-base md:text-xl font-bold leading-tight mb-2 md:mb-4">{post.title}</h3>
                <p className="font-mono text-xs opacity-50 group-hover:opacity-100">{post.date}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Strumenti Interattivi — 4 tool cards */}
      <div className="mt-6 md:mt-10">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 md:mb-6 mix-blend-difference">Strumenti Interattivi</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { title: 'Quiz', path: '/quiz', emoji: '🧠', desc: 'Testa le tue conoscenze' },
            { title: 'Comparatore', path: '/comparatore', emoji: '⚖️', desc: 'Confronta sostanze' },
            { title: 'Mix Checker', path: '/interazioni', emoji: '⚡', desc: 'Controlla le interazioni' },
            { title: 'Molecole 3D', path: '/molecole', emoji: '🔬', desc: 'Esplora le strutture' },
          ].map((tool, i) => (
            <Link key={tool.title} to={tool.path}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.04) }}
                className="group border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 md:p-5 h-28 md:h-32 flex flex-col justify-between hover:bg-white/[0.08] hover:border-white/20 transition-all rounded-xl md:rounded-lg"
              >
                <span className="text-2xl md:text-3xl">{tool.emoji}</span>
                <div>
                  <h3 className="font-black text-sm md:text-base uppercase tracking-tight">{tool.title}</h3>
                  <p className="font-mono text-[8px] md:text-[10px] opacity-50">{tool.desc}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Links — NO Blog duplicate */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-2 md:mt-8">
        {[
          { title: 'Chi siamo', path: '/chi-siamo' },
          { title: 'Sondaggio', path: '/sondaggio-online-sui-consumi' },
          { title: 'Collabora', path: '/collabora' },
          { title: 'Flyers', path: '/flyers' },
          { title: 'Partner', path: '/partner' },
          { title: 'Links', path: '/links' },
          { title: 'Contatti', path: '/contatti' },
        ].map((item, i) => (
          <Link key={item.title} to={item.path} className={i === 6 ? 'col-span-2 md:col-span-1 max-w-[50%] mx-auto md:max-w-none' : ''}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + (i * 0.03) }}
              className="border border-white/10 p-3 md:p-5 text-center hover:bg-white/10 transition-colors rounded-xl md:rounded-lg"
            >
              <h3 className="font-mono text-[10px] md:text-xs uppercase tracking-widest">{item.title}</h3>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Social Links — Facebook & Instagram */}
      <div className="flex justify-center gap-6 mt-2 md:mt-4 mb-4">
        <a href="https://www.facebook.com/Dannoch-125415657538362/" target="_blank" rel="noreferrer" className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          <span className="font-mono text-xs uppercase tracking-widest">Facebook</span>
        </a>
        <a href="https://www.instagram.com/danno.ch/" target="_blank" rel="noreferrer" className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
          <span className="font-mono text-xs uppercase tracking-widest">Instagram</span>
        </a>
      </div>
    </motion.div>
  );
}
