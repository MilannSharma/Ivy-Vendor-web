/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageId } from '../types';
import { 
  Printer, 
  Smartphone, 
  Sparkles, 
  ShieldCheck, 
  Layout, 
  Database, 
  Layers, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  Globe,
  Award
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
}

export default function Navbar({ currentPage, onPageChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

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
    setIsMegaMenuOpen(false);
  };

  // Mega Menu Features config
  const megaMenuFeatures = [
    { icon: Printer, name: 'Bulk Print PDF', desc: 'Generate 10k+ cards', id: 'bulk-print' },
    { icon: Smartphone, name: 'Capturing Photo App', desc: 'Secure B2B captures', id: 'capture-app' },
    { icon: Sparkles, name: 'AI Insights Pro', desc: 'Auto checks & auto crop', id: 'ai-crop' },
    { icon: ShieldCheck, name: 'Team Permissions', desc: 'Assign precise roles', id: 'permissions' },
    { icon: Layout, name: 'ID Card Templates', desc: '250+ standard cards', id: 'templates' },
    { icon: Database, name: 'Entity Directory', desc: 'Segment classrooms easily', id: 'auto-group' },
    { icon: Layers, name: 'ERP Connections', desc: 'Standard data sync links', id: 'erp-integration' },
    { icon: Award, name: 'Secure Audit Log', desc: 'Audit state tracking logs', id: 'text-audit' },
  ];

  return (
    <nav 
      id="main-navigation-bar"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/75 backdrop-blur-xl border-b border-slate-200/50 py-2.5 shadow-sm' 
          : 'bg-white/30 backdrop-blur-md border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group hover:opacity-90 transition-opacity"
          >
            <img src="/logo.png" alt="IVY Prints" className="h-10 sm:h-12 w-auto object-contain" />
          </div>


          {/* No nav links — Features accessible via Explore All Features button only */}

          
          {/* RIGHT CTAS & CONTROLS */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">

            <button 
              type="button"
              id="signin-btn-desktop"
              onClick={() => handleNavClick('signin')}
              className="px-4 py-2 border border-[#0A1628]/25 rounded-lg text-sm text-[#0A1628] font-sans font-semibold hover:border-[#0A1628] hover:bg-slate-50 transition active:scale-95 duration-100 cursor-pointer"
            >
              Sign In
            </button>

            <button 
              type="button"
              id="signup-btn-desktop"
              onClick={() => handleNavClick('contact')}
              className="px-4.5 py-2 bg-[#00AEEF] text-white hover:bg-[#0096ce] rounded-lg text-sm font-sans font-black flex items-center gap-1 shadow-md shadow-[#00AEEF]/10 active:scale-95 duration-100 overflow-hidden cursor-pointer"
            >
              <span>Start Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <div className="flex md:hidden items-center gap-2">

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-50 text-[#0A1628] hover:bg-slate-100 transition"
              id="mobile-menu-burger"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE FULL SCREEN DRAWER */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu-drawer"
          className="fixed inset-x-0 bottom-0 top-[60px] bg-white/90 backdrop-blur-xl z-50 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 border-t border-slate-100/60 shadow-lg"
        >
          <div className="space-y-2">
            <span className="font-mono text-[9px] text-slate-400 tracking-wider">NAVIGATION</span>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-100">
            <button 
              type="button"
              id="signin-btn-mobile"
              onClick={() => handleNavClick('signin')}
              className="w-full py-3.5 border border-slate-300 rounded-xl font-sans font-bold text-center text-[#0A1628] hover:bg-slate-50 transition"
            >
              Sign In to Dashboard
            </button>
            
            <button 
              type="button"
              id="signup-btn-mobile"
              onClick={() => handleNavClick('contact')}
              className="w-full py-4 bg-[#00AEEF] text-white rounded-xl font-sans font-black text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Start For Free Today</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] font-mono text-slate-400">
              <Globe className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span>Supported Under Indian Digital SME Program</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
