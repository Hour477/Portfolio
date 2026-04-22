import { useState, useEffect, MouseEvent } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'py-4' : 'py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <nav 
            className={`flex items-center justify-between glass rounded-[2rem] px-6 transition-all duration-500 border border-white/5 ${
              isScrolled ? 'py-3 shadow-2xl bg-bg/80' : 'py-5 bg-transparent border-transparent'
            }`}
          >
            {/* Logo */}
            <motion.a 
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="text-2xl font-display font-bold tracking-tighter group"
            >
              Lyhour<span className="text-accent group-hover:animate-pulse">.</span>
            </motion.a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-5 py-2 rounded-full text-sm font-display font-medium text-secondary hover:text-primary transition-all relative group"
                >
                  <span className="relative z-10">{link.name}</span>
                  <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform -z-0" />
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full hover:bg-white/5 text-primary transition-colors relative group overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isLight ? 'moon' : 'sun'}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isLight ? <Moon size={20} /> : <Sun size={20} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              <button 
                className="lg:hidden p-2.5 rounded-full glass border border-white/10 text-primary"
                onClick={() => setIsOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-bg/60 z-[60] lg:hidden flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-10 right-10 p-4 rounded-full glass text-primary hover:scale-110 transition-transform"
            >
              <X size={32} />
            </button>

            <div className="flex flex-col items-center gap-12">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-5xl font-display font-bold text-secondary hover:text-accent transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

