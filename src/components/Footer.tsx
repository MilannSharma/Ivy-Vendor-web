/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageId } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: PageId) => void;
}

export default function Footer({ onPageChange }: FooterProps) {

  const handleNavClick = (pageId: PageId) => {
    onPageChange(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="main-applet-footer"
      className="bg-[#0A1628] text-white border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Row */}
        <div className="py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          
          {/* Left: 3D Logo card + tagline */}
          <div className="space-y-4 max-w-xs">
            {/* 3D white logo card */}
            <div className="inline-block footer-logo-container">
              <div className="bg-white rounded-2xl px-5 py-3 border border-slate-100 footer-logo-card">
                <img src="/logo.png" alt="IVY Prints" className="h-10 w-auto object-contain" />
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              India's leading B2B pre-press automation platform for bulk ID card production.
            </p>
            {/* Visit website button */}
            <a
              href="https://ivyprints.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00AEEF] hover:bg-[#0096ce] text-white text-xs font-mono font-black uppercase tracking-wider rounded-xl shadow-md shadow-[#00AEEF]/20 active:scale-95 transition-all duration-150 mt-1"
            >
              Visit ivyprints.in
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Center: Nav Links */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            
            <div className="space-y-3">
              <h5 className="font-display font-black text-xs text-white uppercase tracking-wider">Navigate</h5>
              <ul className="space-y-2 text-xs font-sans text-slate-400">
                <li>
                  <button onClick={() => handleNavClick('home')} className="hover:text-[#00AEEF] transition duration-150">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('features')} className="hover:text-[#00AEEF] transition duration-150">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('how-it-works')} className="hover:text-[#00AEEF] transition duration-150">
                    How It Works
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('contact')} className="hover:text-[#00AEEF] transition duration-150">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Right: Contact info */}
          <div className="space-y-3">
            <h5 className="font-display font-black text-xs text-white uppercase tracking-wider">Contact</h5>
            <div className="space-y-2 text-xs text-slate-400 font-sans">
              <p>📍 Plot No SC-20 B(D), O Block,<br />Narayan Vihar, Jaipur – 302020</p>
              <p>📞 <a href="tel:+918588816148" className="hover:text-[#00AEEF] transition duration-150">+91 8588816148</a></p>
              <p>✉️ <a href="mailto:sales@ivyprints.in" className="hover:text-[#00AEEF] transition duration-150">sales@ivyprints.in</a></p>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="py-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-slate-500">
          <span>© 2026 IVY Prints. All rights reserved.</span>
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-400">
            <span>Made with precision in India</span>
            <span className="text-[13px] leading-none">🇮🇳</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
