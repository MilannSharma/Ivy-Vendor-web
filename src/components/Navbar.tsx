/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Lang, translations } from '../lib/translations';
import { 
  Menu, 
  X, 
  ArrowRight,
  Globe
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export default function Navbar({ currentPage, onPageChange, lang, onLangChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId: PageId) => {
    onPageChange(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      id="main-navigation-bar"
      className={`fixed top-0 left-0 w-full z-45 transition-all duration-300 ${
        isScrolled 
          ? 'bg-brand-bg/90 backdrop-blur-xl border-b border-brand-border py-2.5 shadow-sm' 
          : 'bg-brand-bg/40 backdrop-blur-md border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-purple flex items-center justify-center text-white font-display font-black text-xl shadow-md shadow-brand-purple/20">
              I
            </div>
            <span className="font-display font-black text-xl tracking-tight text-brand-text">
              IVY <span className="text-brand-orange">PRINTS</span>
            </span>
          </div>

          {/* DESKTOP NAV LINKS REMOVED FOR MINIMALIST FOCUS */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8" />

          {/* RIGHT CTAS & CONTROLS */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">

            {/* Language Selector Pill */}
            <div className="flex items-center bg-brand-border/80 border border-brand-border rounded-full p-0.5 shadow-inner mr-1">
              <button 
                type="button"
                onClick={() => onLangChange('en')}
                className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold transition duration-200 ${
                  lang === 'en' 
                    ? 'bg-brand-purple text-white shadow-sm' 
                    : 'text-brand-muted hover:text-brand-text'
                }`}
              >
                ENG
              </button>
              <button 
                type="button"
                onClick={() => onLangChange('hi')}
                className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold transition duration-200 ${
                  lang === 'hi' 
                    ? 'bg-brand-purple text-white shadow-sm' 
                    : 'text-brand-muted hover:text-brand-text'
                }`}
              >
                हिंदी
              </button>
            </div>

            <button 
              type="button"
              id="signin-btn-desktop"
              onClick={() => handleNavClick('signin')}
              className="px-4 py-2 border border-brand-text/20 rounded-xl text-xs text-brand-text font-sans font-bold hover:border-brand-text hover:bg-brand-alt transition active:scale-95 duration-100 cursor-pointer"
            >
              {t.navSignIn}
            </button>

            <button 
              type="button"
              id="signup-btn-desktop"
              onClick={() => handleNavClick('contact')}
              className="px-4.5 py-2 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-xl text-xs font-sans font-black flex items-center gap-1 shadow-md shadow-brand-orange/15 active:scale-95 duration-100 overflow-hidden cursor-pointer"
            >
              <span>{t.navStartTrial}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <div className="flex md:hidden items-center gap-2">
            
            {/* Mobile Lang Button Toggle */}
            <button 
              onClick={() => onLangChange(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-brand-border bg-brand-alt text-[10px] font-bold text-brand-purple transition active:scale-95 cursor-pointer"
            >
              <Globe className="w-3 h-3" />
              <span>{lang === 'en' ? 'हिंदी' : 'ENG'}</span>
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-xl bg-brand-alt text-brand-text hover:bg-brand-border/60 transition cursor-pointer"
              id="mobile-menu-burger"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE FULL SCREEN DRAWER */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu-drawer"
          className="fixed inset-x-0 bottom-0 top-[60px] bg-brand-bg/95 backdrop-blur-xl z-40 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 border-t border-brand-border shadow-lg"
        >
          <div className="space-y-4 text-left">
            <span className="font-mono text-[9px] text-brand-muted tracking-wider block">MENU</span>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => handleNavClick('home')}
                className={`text-left py-2 px-3 rounded-xl font-display font-black text-lg ${
                  currentPage === 'home' ? 'text-brand-purple bg-brand-alt' : 'text-brand-text'
                }`}
              >
                {lang === 'en' ? 'Home' : 'मुख्य पृष्ठ'}
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-brand-border">
            {/* Lang switcher inside drawer */}
            <div className="flex items-center justify-between bg-brand-alt p-3 rounded-xl mb-2">
              <span className="text-xs font-bold text-brand-muted">Language / भाषा</span>
              <div className="flex bg-white rounded-lg p-0.5 border border-brand-border">
                <button 
                  onClick={() => { onLangChange('en'); }}
                  className={`px-3 py-1 rounded text-xs font-bold ${lang === 'en' ? 'bg-brand-purple text-white' : 'text-brand-muted'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => { onLangChange('hi'); }}
                  className={`px-3 py-1 rounded text-xs font-bold ${lang === 'hi' ? 'bg-brand-purple text-white' : 'text-brand-muted'}`}
                >
                  हिंदी
                </button>
              </div>
            </div>

            <button 
              type="button"
              id="signin-btn-mobile"
              onClick={() => handleNavClick('signin')}
              className="w-full py-3.5 border border-brand-border bg-white rounded-2xl font-sans font-bold text-center text-brand-text hover:bg-brand-alt transition"
            >
              {t.navSignIn}
            </button>
            
            <button 
              type="button"
              id="signup-btn-mobile"
              onClick={() => handleNavClick('contact')}
              className="w-full py-4 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-2xl font-sans font-black text-center flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/15"
            >
              <span>{t.navStartTrial}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] font-mono text-brand-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
              <span>{t.navSmeBadge}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
