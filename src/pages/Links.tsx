import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

export function Links() {
  const links = [
    {
      category: 'Svizzera — Riduzione del Danno', items: [
        { name: 'Saferparty.ch', url: 'https://saferparty.ch', desc: 'Drug Checking, allerte pillole e informazioni — Zurigo.' },
        { name: 'Rave it Safe', url: 'https://raveitsafe.ch', desc: 'Progetto di riduzione del danno del Canton Berna.' },
        { name: 'Nuit Blanche', url: 'https://nfrfrared.ch', desc: 'Riduzione del danno in ambito festivo — Ginevra.' },
        { name: 'Infodrog', url: 'https://www.infodrog.ch', desc: 'Centrale svizzera di coordinamento delle dipendenze.' },
        { name: 'SafeZone.ch', url: 'https://www.safezone.ch/it', desc: 'Consulenza online sulle dipendenze — gratuita e anonima.' },
        { name: 'Radix', url: 'https://www.radix.ch', desc: 'Fondazione svizzera per la promozione della salute.' },
        { name: 'Dipendenze Svizzera', url: 'https://www.suchtschweiz.ch/it/', desc: 'Centro nazionale di competenza per le dipendenze.' },
        { name: 'Streetwork Zürich', url: 'https://www.stadt-zuerich.ch/sd/de/index/unterstuetzung/sucht.html', desc: 'Servizi comunali di riduzione del danno — Zurigo.' },
        { name: 'GREA', url: 'https://www.grea.ch', desc: 'Groupement Romand d\'Études des Addictions.' },
        { name: 'Ticino Addiction', url: 'https://www.ti.ch/dss/dsp/us/dipendenze', desc: 'Servizio dipendenze del Canton Ticino.' },
      ]
    },
    {
      category: 'Internazionali', items: [
        { name: 'Erowid', url: 'https://erowid.org', desc: 'Il più grande database indipendente su sostanze psicoattive.' },
        { name: 'PsychonautWiki', url: 'https://psychonautwiki.org', desc: 'Enciclopedia collaborativa su sostanze e farmacologia.' },
        { name: 'DanceSafe', url: 'https://dancesafe.org', desc: 'Organizzazione USA per la salute nei contesti di vita notturna.' },
        { name: 'TripSit', url: 'https://tripsit.me', desc: 'Comunità di riduzione del danno con matrice di interazioni.' },
        { name: 'The Loop', url: 'https://wearetheloop.org', desc: 'Drug Checking ai festival — UK.' },
        { name: 'Drug Science', url: 'https://www.drugscience.org.uk', desc: 'Ricerca indipendente guidata dal Prof. David Nutt — UK.' },
        { name: 'EMCDDA', url: 'https://www.emcdda.europa.eu', desc: 'Osservatorio europeo delle droghe e tossicodipendenze.' },
        { name: 'Harm Reduction International', url: 'https://hri.global', desc: 'Organizzazione leader mondiale nella riduzione del danno.' },
      ]
    },
    {
      category: 'Database Scientifici', items: [
        { name: 'PubChem (NCBI)', url: 'https://pubchem.ncbi.nlm.nih.gov', desc: 'Database chimico — strutture molecolari, proprietà, sicurezza.' },
        { name: 'DrugBank', url: 'https://go.drugbank.com', desc: 'Database farmacologico con interazioni e meccanismi d\'azione.' },
        { name: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov', desc: 'Letteratura medica e scientifica peer-reviewed.' },
        { name: 'TIHKAL / PIHKAL', url: 'https://isomerdesign.com/PiHKAL/', desc: 'Opere di Alexander Shulgin su feniletilammine e triptamine.' },
      ]
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full min-h-screen pt-24 md:pt-32 pb-24 px-4 md:px-12 max-w-5xl mx-auto pointer-events-auto"
    >
      <div className="overflow-hidden mb-12 mix-blend-difference">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
          Links<br />Utili
        </h1>
      </div>

      <div className="flex flex-col gap-12">
        {links.map((section, idx) => (
          <div key={section.category}>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-6 border-b border-white/20 pb-4 mix-blend-difference">
              {section.category}
            </h2>
            <div className="flex flex-col gap-3">
              {section.items.map((link, i) => (
                <motion.a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(i * 0.05, 0.3) }}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white hover:text-black transition-all group rounded-lg"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      {link.name} <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </h3>
                    <p className="font-light text-sm opacity-70 mt-0.5 line-clamp-1">{link.desc}</p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-40 mt-2 md:mt-0 group-hover:opacity-100 shrink-0">
                    {link.url.replace('https://', '').replace('http://', '').split('/')[0]}
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
