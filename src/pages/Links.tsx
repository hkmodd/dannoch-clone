import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

export function Links() {
  const links = [
    { category: 'Internazionali', items: [
      { name: 'Erowid', url: 'https://erowid.org', desc: 'Il più grande database indipendente sulle sostanze psicoattive.' },
      { name: 'PsychonautWiki', url: 'https://psychonautwiki.org', desc: 'Enciclopedia wiki guidata dalla community.' },
      { name: 'DanceSafe', url: 'https://dancesafe.org', desc: 'Organizzazione USA per la salute pubblica nella vita notturna.' }
    ]},
    { category: 'Svizzera', items: [
      { name: 'Saferparty.ch', url: 'https://saferparty.ch', desc: 'Informazioni, allerte pillole e drug checking a Zurigo.' },
      { name: 'Infodrog', url: 'https://infodrog.ch', desc: 'Centrale svizzera di coordinamento delle dipendenze.' },
      { name: 'Rave It Safe', url: 'https://raveitsafe.ch', desc: 'Progetto di riduzione del danno a Berna.' }
    ]}
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto pointer-events-auto"
    >
      <div className="overflow-hidden mb-16 mix-blend-difference">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
          Links<br/>Utili
        </h1>
      </div>

      <div className="flex flex-col gap-16">
        {links.map((section, idx) => (
          <div key={section.category}>
            <h2 className="text-3xl font-bold uppercase tracking-tighter mb-8 border-b border-white/20 pb-4 mix-blend-difference">
              {section.category}
            </h2>
            <div className="flex flex-col gap-4">
              {section.items.map((link, i) => (
                <motion.a 
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (idx * 0.3) + (i * 0.1) }}
                  className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white hover:text-black transition-all group"
                >
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {link.name} <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="font-light text-sm opacity-70 mt-1">{link.desc}</p>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest opacity-50 mt-4 md:mt-0 group-hover:opacity-100">
                    {link.url.replace('https://', '')}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
