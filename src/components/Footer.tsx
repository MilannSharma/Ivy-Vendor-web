/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageId } from '../types';
import { Lang, translations } from '../lib/translations';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: PageId) => void;
  lang: Lang;
}

export default function Footer({ onPageChange, lang }: FooterProps) {
  const t = translations[lang];

  const handleNavClick = (pageId: PageId) => {
    onPageChange(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="main-applet-footer"
      className="bg-brand-text text-white border-t border-brand-border/20 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Row */}
        <div className="py-12 flex flex-col md:flex-row items-start justify-between gap-10">
          
          {/* Left: Logo card + tagline */}
          <div className="space-y-4 max-w-xs text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center text-white font-display font-black text-lg">
                I
              </div>
              <span className="font-display font-black text-lg tracking-tight text-white">
                IVY <span className="text-brand-orange">PRINTS</span>
              </span>
            </div>

            <p className="text-slate-350 text-xs leading-relaxed font-sans">
              {t.footerDesc}
            </p>
            {/* Visit website button */}
            <a
              href="https://ivyprints.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-purple hover:bg-brand-purple-dark text-white text-xs font-sans font-black uppercase rounded-xl transition-all duration-100"
            >
              <span>ivyprints.in</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Center: Nav Links */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 text-left">
            <div className="space-y-3">
              <h5 className="font-display font-black text-xs text-white uppercase tracking-wider">{t.footerQuickLinks}</h5>
              <ul className="space-y-2 text-xs font-sans text-slate-300">
                <li>
                  <button onClick={() => handleNavClick('home')} className="hover:text-brand-orange transition duration-100 cursor-pointer">
                    {lang === 'en' ? 'Home' : 'होमपेज'}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('features')} className="hover:text-brand-orange transition duration-100 cursor-pointer">
                    {t.navFeatures}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('how-it-works')} className="hover:text-brand-orange transition duration-100 cursor-pointer">
                    {t.navHowItWorks}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('contact')} className="hover:text-brand-orange transition duration-100 cursor-pointer">
                    {t.navContactUs}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Contact info */}
          <div className="space-y-3 text-left">
            <h5 className="font-display font-black text-xs text-white uppercase tracking-wider">{t.footerOffice}</h5>
            <div className="space-y-2 text-xs text-slate-300 font-sans">
              <p>📍 Plot No SC-20 B(D), O Block,<br />Narayan Vihar, Jaipur – 302020</p>
              <p>📞 <a href="tel:+918588816148" className="hover:text-brand-orange transition duration-100">+91 8588816148</a></p>
              <p>✉️ <a href="mailto:sales@ivyprints.in" className="hover:text-brand-orange transition duration-100">sales@ivyprints.in</a></p>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] text-slate-400">
          <span>© 2026 {t.footerRights}</span>
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-slate-300">
            <span>Made with precision in India</span>
            <span className="text-[13px] leading-none">🇮🇳</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
