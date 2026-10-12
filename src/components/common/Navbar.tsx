import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenInquiry: (service?: string) => void;
  currentRoute?: 'home' | 'projects';
  onNavigate?: (route: 'home' | 'projects' | 'about') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInquiry,
  currentRoute = 'home',
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'projects' | 'about'>(
    currentRoute === 'projects' ? 'projects' : 'home'
  );

  useEffect(() => {
    setActiveTab(currentRoute === 'projects' ? 'projects' : 'home');
  }, [currentRoute]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab: 'home' | 'projects' | 'about') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(tab);
    } else {
      if (tab === 'projects') {
        window.location.hash = '#/projects';
      } else if (tab === 'about') {
        if (window.location.hash.includes('projects')) {
          window.location.hash = '';
          setTimeout(() => {
            document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-white/85 backdrop-blur-md border-b border-neutral-200/80 shadow-xs'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center space-x-2.5 group select-none"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
          >
            <img
              src="/Capure.svg"
              alt="Capture Creatives"
              className="w-8 h-8 object-contain transition-transform group-hover:scale-105"
            />
            <span
              className="text-base text-neutral-900 tracking-tight"
              style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}
            >
              capture creatives
            </span>
          </a>

          {/* Desktop Middle Navigation: Home, Project, About Us */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('home')}
              className={`relative py-1 text-sm font-semibold text-neutral-950 transition-colors ${
                activeTab === 'home' ? 'font-bold' : 'hover:opacity-75'
              }`}
            >
              <span>Home</span>
              {activeTab === 'home' && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-neutral-950 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <button
              onClick={() => handleNavClick('projects')}
              className={`relative py-1 text-sm font-semibold text-neutral-950 transition-colors ${
                activeTab === 'projects' ? 'font-bold' : 'hover:opacity-75'
              }`}
            >
              <span>Project</span>
              {activeTab === 'projects' && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-neutral-950 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`relative py-1 text-sm font-semibold text-neutral-950 transition-colors ${
                activeTab === 'about' ? 'font-bold' : 'hover:opacity-75'
              }`}
            >
              <span>About Us</span>
              {activeTab === 'about' && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-neutral-950 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </nav>

          {/* Right Action CTA: Start a Project */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={() => onOpenInquiry()}
              className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold tracking-wide transition-all shadow-xs hover:shadow flex items-center space-x-1.5"
            >
              <span>Start Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => onOpenInquiry()}
              className="px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold sm:hidden"
            >
              Inquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 pt-24 pb-8 px-6 bg-white/98 backdrop-blur-xl flex flex-col justify-between lg:hidden"
          >
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Navigation</p>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleNavClick('home')}
                  className={`text-left py-3 px-4 rounded-xl text-lg font-bold font-display flex items-center justify-between ${
                    activeTab === 'home'
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <span>Home</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </button>

                <button
                  onClick={() => handleNavClick('projects')}
                  className={`text-left py-3 px-4 rounded-xl text-lg font-bold font-display flex items-center justify-between ${
                    activeTab === 'projects'
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <span>Project</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </button>

                <button
                  onClick={() => handleNavClick('about')}
                  className={`text-left py-3 px-4 rounded-xl text-lg font-bold font-display flex items-center justify-between ${
                    activeTab === 'about'
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <span>About Us</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3 bg-neutral-900 text-white rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center space-x-2"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
