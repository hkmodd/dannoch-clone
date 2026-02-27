import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import { MoleculeIcon, ShieldCrossIcon, FlaskBubblesIcon, HeartPulseIcon, GlossaryIcon } from '../icons/SectionIcons';
import { useTheme } from '../ThemeProvider';

const MAIN_NAV = [
  { name: 'Sostanze', path: '/sostanze', Icon: MoleculeIcon, color: 'text-emerald-400' },
  { name: 'Rischi', path: '/rischi', Icon: ShieldCrossIcon, color: 'text-red-400' },
  { name: 'Glossario', path: '/glossario', Icon: GlossaryIcon, color: 'text-amber-400' },
  { name: 'Drug Checking', path: '/drugchecking', Icon: FlaskBubblesIcon, color: 'text-blue-400' },
  { name: 'Consulenza', path: '/consulenza', Icon: HeartPulseIcon, color: 'text-pink-400' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const { theme, resolved, toggleTheme } = useTheme();
  const ThemeIcon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;
  const isLight = resolved === 'light';

  const secondaryLinks = [
    { name: 'Home', path: '/' },
    { name: 'Chi siamo', path: '/chi-siamo' },
    { name: 'Blog', path: '/news-blog' },
    { name: 'Sondaggio', path: '/sondaggio-online-sui-consumi' },
    { name: 'Collabora', path: '/collabora' },
    { name: 'Flyers', path: '/flyers' },
    { name: 'Partner', path: '/partner' },
    { name: 'Links', path: '/links' },
    { name: 'Contatti', path: '/contatti' },
  ];

  return (
    <>
      {/* Header */}
      <header className={`fixed top-0 left-0 w-full p-4 md:p-12 flex justify-between items-center z-50 pointer-events-none transition-colors duration-500 ${isLight
        ? 'bg-[#F0EBE3]/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none'
        : 'bg-black/20 backdrop-blur-[2px] md:bg-transparent md:backdrop-blur-none mix-blend-difference'
        }`}>
        <div className="pointer-events-auto">
          <Link to="/" className="text-2xl font-black tracking-tighter uppercase">danno.ch</Link>
          <p className="text-xs font-mono mt-1 opacity-70 uppercase tracking-widest hidden sm:block">
            Informazioni sul consumo ricreativo
          </p>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${isLight ? 'hover:bg-black/10' : 'hover:bg-white/10'}`}
            title={`Tema: ${theme === 'auto' ? 'Automatico' : theme === 'light' ? 'Chiaro' : 'Scuro'}`}
          >
            <ThemeIcon className="w-5 h-5" />
          </button>

          {/* Hamburger — hidden on homepage */}
          {!isHomepage && (
            <button
              onClick={() => setIsOpen(true)}
              className={`p-2 rounded-full transition-colors ${isLight ? 'hover:bg-black/10' : 'hover:bg-white/10'}`}
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
        </div>
      </header>

      {/* Sidebar — always slides from RIGHT */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsOpen(false)}
              className={`fixed inset-0 backdrop-blur-sm z-[60] ${isLight ? 'bg-black/30' : 'bg-black/60'}`}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`fixed top-0 right-0 w-full max-w-md h-full border-l z-[70] p-8 md:p-12 flex flex-col transition-colors ${isLight
                ? 'bg-[#F0EBE3] border-black/10'
                : 'bg-[#0a0a0a] border-white/10'
                }`}
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-black uppercase tracking-tighter">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-full transition-colors ${isLight ? 'hover:bg-black/10' : 'hover:bg-white/10'}`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto flex-grow">
                {/* Main navigation with icons */}
                <div className={`flex flex-col gap-3 mb-6 pb-6 border-b ${isLight ? 'border-black/10' : 'border-white/10'}`}>
                  {MAIN_NAV.map((item) => {
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                      <Link
                        key={item.path}
                        onClick={() => setIsOpen(false)}
                        to={item.path}
                        className={`flex items-center gap-4 p-3 rounded-xl transition-all ${isActive
                          ? (isLight ? 'bg-black/5 border border-black/10' : 'bg-white/10 border border-white/10')
                          : (isLight ? 'hover:bg-black/5 border border-transparent' : 'hover:bg-white/5 border border-transparent')
                          }`}
                      >
                        <item.Icon className={`${item.color} shrink-0`} size={28} />
                        <span className="text-lg font-bold uppercase tracking-tight">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Secondary links */}
                <div className="flex flex-col gap-3">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="font-mono text-sm uppercase tracking-widest hover:text-white/50 transition-colors py-1"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* Strumenti Interattivi */}
                <div className={`flex flex-col gap-3 mt-6 pt-6 border-t ${isLight ? 'border-black/10' : 'border-white/10'}`}>
                  <h3 className={`font-mono text-[10px] uppercase tracking-widest mb-1 ${isLight ? 'text-black/30' : 'text-white/30'}`}>Strumenti</h3>
                  {[
                    { name: '🧠 Quiz', path: '/quiz' },
                    { name: '⚖️ Comparatore', path: '/comparatore' },
                    { name: '⚡ Mix Checker', path: '/interazioni' },
                    { name: '🔬 Molecole 3D', path: '/molecole' },
                  ].map(tool => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      onClick={() => setIsOpen(false)}
                      className="font-mono text-sm uppercase tracking-widest hover:text-white/50 transition-colors py-1"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Social links with SVG icons */}
              <div className={`mt-auto pt-8 border-t flex gap-6 items-center ${isLight ? 'border-black/10' : 'border-white/10'}`}>
                <a href="https://www.facebook.com/Dannoch-125415657538362/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white/50 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  <span className="font-mono text-xs uppercase tracking-widest">Facebook</span>
                </a>
                <a href="https://www.instagram.com/danno.ch/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white/50 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  <span className="font-mono text-xs uppercase tracking-widest">Instagram</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
