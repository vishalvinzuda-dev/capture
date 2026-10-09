import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../../data/content';

interface NavbarProps {
  onOpenInquiry: (service?: string) => void;
}

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Difference', href: '#difference' },
  { label: 'Case Study', href: '#case-study' },
  { label: 'Work', href: '#work' },
  { label: 'Why CC', href: '#why-us' },
  { label: 'Impact', href: '#impact' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Simple active link spy
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 180 && rect.bottom >= 180;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
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
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-xs tracking-wider transition-transform group-hover:scale-105">
              CC
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-neutral-900 font-display">
                Capture Creatives
              </span>
              <span className="text-[10px] tracking-widest uppercase text-neutral-400 font-medium">
                Design · Tech · 2025
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 p-1 bg-neutral-100/70 border border-neutral-200/60 rounded-full px-3 backdrop-blur-sm">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white text-neutral-950 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hi%20Capture%20Creatives!%20I%20would%20like%20to%20discuss%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-600 hover:text-[#128C7E] hover:bg-green-50 rounded-xl transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              onClick={() => onOpenInquiry()}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold tracking-wide transition-all shadow-xs hover:shadow flex items-center space-x-1.5"
            >
              <span>Start a Project</span>
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
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Navigation</p>
              <div className="flex flex-col space-y-2">
                {NAV_LINKS.map((link, idx) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => handleLinkClick(link.href)}
                    className="text-left py-2.5 px-3 rounded-xl text-lg font-bold font-display text-neutral-900 hover:bg-neutral-100 flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 space-y-3">
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
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#25D366]/10 text-[#128C7E] rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 border border-[#25D366]/30"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Quick WhatsApp Inquiry</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
