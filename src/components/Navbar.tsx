import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Home, User, Briefcase, Code, Mail, History } from 'lucide-react';
import { scrollToSection } from './SmoothScroll';

const NAV_LINKS = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Skills', href: '#skills', icon: Code },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'Experience', href: '#experience', icon: History },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  const toggleTheme = () => {
    setIsLight(!isLight);
    document.documentElement.classList.toggle('light');
  };

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Floating Sidebar (Dock Style) */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center py-8 z-50 glass rounded-full border border-primary/10 shadow-[0_0_40px_rgba(0,0,0,0.3)] gap-6 px-3">
        <div className="pb-4 border-b border-primary/5 mb-2">
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-accent text-white font-display font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:scale-110 transition-transform"
          >
            L
          </a>
        </div>

        <div className="flex flex-col items-center gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="group relative p-4 rounded-full text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-300"
              title={link.name}
            >
              <link.icon size={20} className="group-hover:scale-125 transition-transform" />
              
              {/* Tooltip */}
              <div className="absolute left-[calc(100%+1.5rem)] px-3 py-1.5 bg-primary text-bg text-[11px] uppercase tracking-widest font-bold rounded-lg opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-[60] shadow-xl">
                 <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-primary" />
                {link.name}
              </div>
            </a>
          ))}
        </div>

        <div className="pt-4 border-t border-primary/5 mt-2">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full hover:bg-primary/10 text-primary transition-colors"
            title="Toggle theme"
          >
            {isLight ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 w-full lg:hidden z-50 flex justify-between items-center px-6 py-4 bg-bg/80 backdrop-blur-lg border-b border-primary/5">
        <a href="#home" className="text-xl font-display font-bold">Lyhour<span className="text-accent">.</span></a>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full glass border border-primary/10 text-primary"
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className="text-primary p-2" onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-bg border-r border-primary/10 z-[70] p-8 flex flex-col lg:hidden shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-2xl font-display font-bold tracking-tighter">Navigation</span>
                <button onClick={() => setIsOpen(false)} className="p-2 text-secondary hover:text-primary">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="flex items-center gap-5 text-3xl font-display font-medium text-secondary hover:text-accent transition-all hover:translate-x-2"
                  >
                    <div className="p-3 rounded-2xl bg-primary/5">
                      <link.icon size={24} />
                    </div>
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-primary/5">
                <p className="text-xs text-secondary/40 font-mono uppercase tracking-[0.3em]">© 2025 CHANN LYHOUR</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

