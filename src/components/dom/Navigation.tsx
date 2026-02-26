import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

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
      <header className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-start z-50 mix-blend-difference pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(true)}
            className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <Link to="/" className="text-2xl font-black tracking-tighter uppercase">danno.ch</Link>
            <p className="text-xs font-mono mt-1 opacity-70 uppercase tracking-widest hidden sm:block">
              Informazioni sul consumo ricreativo
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-8 pointer-events-auto">
          <nav className="hidden md:flex gap-8 font-mono text-xs uppercase tracking-widest">
            <Link to="/sostanze" className="hover:opacity-50 transition-opacity">Sostanze</Link>
            <Link to="/rischi" className="hover:opacity-50 transition-opacity">Rischi</Link>
            <Link to="/drugchecking" className="hover:opacity-50 transition-opacity">Drugchecking</Link>
            <Link to="/consulenza" className="hover:opacity-50 transition-opacity">Consulenza</Link>
          </nav>
          <button 
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors hidden md:block"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 z-[70] p-8 md:p-12 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-xl font-black uppercase tracking-tighter">Menu</h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6 overflow-y-auto flex-grow">
                <div className="flex flex-col gap-4 md:hidden mb-8 pb-8 border-b border-white/10">
                  <Link onClick={() => setIsOpen(false)} to="/sostanze" className="text-2xl font-bold uppercase tracking-tighter hover:text-white/50 transition-colors">Sostanze</Link>
                  <Link onClick={() => setIsOpen(false)} to="/rischi" className="text-2xl font-bold uppercase tracking-tighter hover:text-white/50 transition-colors">Rischi</Link>
                  <Link onClick={() => setIsOpen(false)} to="/drugchecking" className="text-2xl font-bold uppercase tracking-tighter hover:text-white/50 transition-colors">Drugchecking</Link>
                  <Link onClick={() => setIsOpen(false)} to="/consulenza" className="text-2xl font-bold uppercase tracking-tighter hover:text-white/50 transition-colors">Consulenza</Link>
                </div>

                <div className="flex flex-col gap-4">
                  {secondaryLinks.map((link) => (
                    <Link 
                      key={link.path} 
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="font-mono text-sm uppercase tracking-widest hover:text-white/50 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-white/10 flex gap-6">
                <a href="https://www.facebook.com/Dannoch-125415657538362/" target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-widest hover:text-white/50">Facebook</a>
                <a href="https://www.instagram.com/danno.ch/" target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-widest hover:text-white/50">Instagram</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
