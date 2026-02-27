import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

export function Partner() {
  const partners = [
    { name: 'Infodrog', url: 'https://www.infodrog.ch', location: 'Nazionale', type: 'Coordinamento Dipendenze', desc: 'Centrale svizzera di coordinamento delle dipendenze. Finanzia e coordina i servizi di Drug Checking.' },
    { name: 'Radix', url: 'https://www.radix.ch', location: 'Nazionale', type: 'Fondazione Salute', desc: 'Fondazione svizzera per la promozione della salute. Gestisce i progetti di riduzione del danno.' },
    { name: 'DIZ Zürich', url: 'https://saferparty.ch', location: 'Zurigo', type: 'Drug Checking', desc: 'Drogeninformationszentrum — servizio di analisi sostanze e informazione nel Canton Zurigo.' },
    { name: 'DIB Bern', url: 'https://raveitsafe.ch', location: 'Berna', type: 'Drug Checking', desc: 'Drug Checking Bern — analisi e riduzione del danno nel Canton Berna.' },
    { name: 'Nuit Blanche', url: 'https://nfrfrared.ch', location: 'Ginevra', type: 'Prevenzione', desc: 'Riduzione del danno in ambito festivo e vita notturna a Ginevra e Romandia.' },
    { name: 'SafeZone.ch', url: 'https://www.safezone.ch/it', location: 'Nazionale', type: 'Consulenza Online', desc: 'Piattaforma svizzera di consulenza online gratuita e anonima sulle dipendenze.' },
    { name: 'Dipendenze Svizzera', url: 'https://www.suchtschweiz.ch/it/', location: 'Nazionale', type: 'Competenze', desc: 'Centro nazionale di competenze nel campo delle dipendenze — ricerca, prevenzione, consulenza.' },
    { name: 'GREA', url: 'https://www.grea.ch', location: 'Romandia', type: 'Studi Dipendenze', desc: 'Groupement Romand d\'Études des Addictions — coordinamento romando.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full min-h-screen pt-24 md:pt-32 pb-24 px-4 md:px-12 max-w-6xl mx-auto pointer-events-auto"
    >
      <div className="overflow-hidden mb-12 mix-blend-difference">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
          I Nostri<br />Partner
        </h1>
        <p className="mt-4 text-lg font-light max-w-2xl opacity-80">
          Organizzazioni svizzere con cui collaboriamo per la riduzione del danno.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {partners.map((partner, i) => (
          <motion.a
            href={partner.url}
            target="_blank"
            rel="noreferrer"
            key={partner.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.05, 0.3) }}
            className="border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:bg-white hover:text-black transition-all group rounded-xl"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                  {partner.name}
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">{partner.type}</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-40 shrink-0 mt-1">{partner.location}</span>
            </div>
            <p className="font-light text-sm opacity-70 leading-relaxed">{partner.desc}</p>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
