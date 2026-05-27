/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Lang, translations } from '../lib/translations';
import { 
  PlusCircle, 
  UploadCloud, 
  Sparkles, 
  Eye, 
  FileText, 
  Printer, 
  ShieldCheck
} from 'lucide-react';

interface HowItWorksProps {
  onPageChange: (page: PageId) => void;
  lang: Lang;
}

// Live simulated console on the side
function PrePressConsole({ step, lang }: { step: string; lang: Lang }) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 text-white font-mono text-[11px] h-[410px] flex flex-col justify-between shadow-2xl relative overflow-hidden text-left">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent h-1/2 w-full animate-pulse top-0 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-brand-orange animate-ping" />
          <span className="text-brand-orange uppercase tracking-wider text-[10px] font-bold">IVY AUTOMATION CORE v3.1</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
          <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">STEP {step}</span>
          <span className="text-green-400 font-bold">READY</span>
        </div>
      </div>

      {/* Screen */}
      <div className="flex-1 my-4 flex flex-col justify-center relative z-10 text-left">
        
        {step === '01' && (
          <div className="space-y-3">
            <span className="text-slate-400 block">[INIT_PROJECT]: School ID Card Setup</span>
            <div className="border border-brand-purple/40 bg-slate-900 rounded-xl p-3 text-center space-y-1.5">
              <span className="text-xs text-brand-orange block font-bold">LAYOUT STANDARD A4 / 12x18</span>
              <div className="w-8 h-10 border border-slate-700 bg-slate-950 mx-auto rounded flex items-center justify-center text-[7px] text-slate-500">CARD</div>
            </div>
            <span className="text-green-400 block text-[10px]">✓ Project settings saved in cloud database</span>
          </div>
        )}

        {step === '02' && (
          <div className="space-y-3">
            <span className="text-slate-400 block">[CSV_EXCEL_PARSER]: Loading list</span>
            <div className="border border-dashed border-slate-700 bg-slate-900 rounded-xl p-6 text-center space-y-2">
              <UploadCloud className="w-8 h-8 mx-auto text-brand-purple animate-bounce" />
              <span className="text-[10px] text-slate-200 block font-bold">Drag spreadsheet & ZIP of photos</span>
            </div>
          </div>
        )}

        {step === '03' && (
          <div className="space-y-3">
            <span className="text-slate-400 block">[AI_FACE_CROP]: Standard Passport Sizing</span>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex gap-3 items-center">
              <div className="relative w-14 h-16 bg-slate-950 border border-brand-orange rounded flex items-center justify-center overflow-hidden shrink-0">
                <div className="absolute top-1 left-1 right-1 bottom-4 border border-green-500" />
                <span className="text-[8px] text-green-400 z-10 block bg-black/60 px-0.5 rounded">99.2% OK</span>
              </div>
              <div className="space-y-1 text-slate-400 text-[10px]">
                <span>✓ Eyes found at center coordinates</span>
                <span className="block text-green-400">✓ BG Replaced: White</span>
              </div>
            </div>
          </div>
        )}

        {step === '04' && (
          <div className="space-y-3">
            <span className="text-slate-400 block">[DATABASE_AUDIT]: Finding typos</span>
            <div className="bg-red-950/40 border border-red-500/20 text-red-200 p-3 rounded-xl space-y-1">
              <span className="text-[9px] text-brand-orange block font-bold">ALERT: DUPLICATE ADMISSION ID</span>
              <span className="text-xs text-slate-400 block">Class 6-B: Rahul Verma (Delhi Campus)</span>
            </div>
          </div>
        )}

        {step === '05' && (
          <div className="space-y-3">
            <span className="text-slate-400 block">[IMPOSITION_ENGINE]: Arranging Grid</span>
            <div className="bg-slate-900 rounded-xl p-3">
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4.5] bg-slate-950 border border-brand-purple/40 rounded flex items-center justify-center text-[7px] text-brand-purple">{i+1}</div>
                ))}
              </div>
            </div>
            <span className="text-green-400 block">✓ A4 (10-up) sheets aligned perfectly</span>
          </div>
        )}

        {step === '06' && (
          <div className="space-y-3">
            <span className="text-slate-400 block">[PRINT_BATCH_DISPATCH]: Exporting</span>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 flex justify-between items-center">
              <div>
                <span className="text-xs text-white block font-bold">PDF EXPORT COMPLETED</span>
                <span className="text-[9px] text-slate-500 block">Download size: 45.2 MB (600 DPI)</span>
              </div>
              <Printer className="w-8 h-8 text-green-400 animate-pulse" />
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-[10px] text-slate-500">
        <span>ENCRYPTION ACTIVE</span>
        <span>LATENCY: 12ms</span>
      </div>
    </div>
  );
}

export default function HowItWorks({ onPageChange, lang }: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState<string>('01');
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      const stepIds = ['01', '02', '03', '04', '05', '06'];
      for (const st of stepIds) {
        const el = document.getElementById(`how-it-works-step-${st}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 250) {
            setActiveStep(st);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      num: '01',
      title: lang === 'en' ? "1. Create Your Project" : "1. नया प्रोजेक्ट बनाएं",
      sub: lang === 'en' ? "Set up school or office settings" : "स्कूल या ऑफिस सेटिंग्स चुनें",
      icon: PlusCircle,
      desc: lang === 'en' 
        ? "Enter school/college name, session year, and select card background size (Standard/Lanyard)." 
        : "स्कूल या कॉलेज का नाम, साल भरें और आईडी कार्ड का साइज चुनें (स्टैंडर्ड या लैनयार्ड साइज)।",
      color: 'text-brand-purple bg-brand-purple/10 border-brand-purple/20'
    },
    {
      num: '02',
      title: lang === 'en' ? "2. Upload Excel & Photos" : "2. एक्सेल और फोटो अपलोड करें",
      sub: lang === 'en' ? "Drag and drop client data files" : "स्टूडेंट डेटा की फाइल लोड करें",
      icon: UploadCloud,
      desc: lang === 'en' 
        ? "Upload your Excel spreadsheet of student names along with a zip folder of student photos." 
        : "स्टूडेंट के नामों की एक्सेल शीट और उनकी फोटो का ज़िप फोल्डर सीधे अपलोड करें।",
      color: 'text-brand-orange bg-brand-orange/10 border-brand-orange/20'
    },
    {
      num: '03',
      title: lang === 'en' ? "3. AI Photo Crop" : "3. एआई फोटो क्रॉपिंग",
      sub: lang === 'en' ? "Automatically resize photos" : "फोटो का साइज अपने आप सही करें",
      icon: Sparkles,
      desc: lang === 'en' 
        ? "AI automatically detects faces, crops photos to passport sizes, and replaces noisy background with clean white/blue." 
        : "सॉफ्टवेयर खुद फोटो में चेहरे पहचानकर क्रॉप करता है और खराब बैकग्राउंड को सफेद या नीले रंग में बदल देता है।",
      color: 'text-brand-purple bg-brand-purple/10 border-brand-purple/20'
    },
    {
      num: '04',
      title: lang === 'en' ? "4. Check for Mistakes" : "4. गलतियों की जांच करें",
      sub: lang === 'en' ? "Spell check names and details" : "नाम और स्पेलिंग चेक करें",
      icon: Eye,
      desc: lang === 'en' 
        ? "Review spelling mistakes or duplicate student roll numbers flagged by Ivy database checker." 
        : "सॉफ्टवेयर द्वारा दिखाए गए गलत नाम, अधूरी जानकारी या डुप्लीकेट रोल नंबर की जांच करें।",
      color: 'text-brand-orange bg-brand-orange/10 border-brand-orange/20'
    },
    {
      num: '05',
      title: lang === 'en' ? "5. Arrange on Printing Sheet" : "5. प्रिंटिंग शीट तैयार करें",
      sub: lang === 'en' ? "1-Click imposition setting" : "१-क्लिक में शीट सेटिंग",
      icon: FileText,
      desc: lang === 'en' 
        ? "Configure card layout density (e.g. A4 size sheet, 12x18 size sheet, 10-up/30-up) with crop-mark margins." 
        : "अपने प्रिंटर के अनुसार शीट साइज (ए४ या १२x१८ साइज) चुनें। कार्ड्स अपने आप अलाइन हो जाएंगे।",
      color: 'text-brand-purple bg-brand-purple/10 border-brand-purple/20'
    },
    {
      num: '06',
      title: lang === 'en' ? "6. Download & Print" : "6. पीडीएफ डाउनलोड और प्रिंट",
      sub: lang === 'en' ? "Ready-to-print PDF file" : "हाई-रेसोल्यूशन पीडीएफ फाइल",
      icon: Printer,
      desc: lang === 'en' 
        ? "Export high-resolution PDF and feed sheets to your thermal or offset printer. Zero sheet shifting." 
        : "हाई-क्वालिटी पीडीएफ डाउनलोड करके अपने प्रिंटर में लोड करें। आगे-पीछे का हिस्सा एकदम सटीक बैठेगा।",
      color: 'text-brand-orange bg-brand-orange/10 border-brand-orange/20'
    }
  ];

  return (
    <div id="how-it-works-page" className="pt-20 bg-brand-bg min-h-screen text-left pb-20 select-none">
      
      {/* Header Segment */}
      <section className="bg-brand-alt border-b border-brand-border py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-brand-purple font-mono text-xs font-black uppercase tracking-widest block">Ivy Prints Process</span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-text tracking-tight uppercase">
            {t.navHowItWorks}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-brand-muted max-w-xl mx-auto leading-relaxed">
            {lang === 'en' 
              ? "See how Ivy converts slow Photoshop layout work into a simple 1-click cloud sheet printing pipeline."
              : "देखें कि कैसे आईवी सॉफ्टवेयर कोरल-ड्रॉ या फ़ोटोशॉप की मेहनत को १-क्लिक आसान प्रिंटिंग में बदल देता है।"}
          </p>
        </div>
      </section>

      {/* Two-Column Interactive Timeline Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Timeline Column */}
          <div className="lg:col-span-7 relative pl-4 md:pl-8">
            <div className="absolute top-10 bottom-10 left-8 md:pointer-events-none md:left-12 w-[2px] bg-brand-border pointer-events-none rounded-full" />
            
            <div className="space-y-10">
              {steps.map((st) => {
                const IconComponent = st.icon;
                const isActive = activeStep === st.num;

                return (
                  <div 
                    key={st.num}
                    id={`how-it-works-step-${st.num}`}
                    onMouseEnter={() => setActiveStep(st.num)}
                    className="relative pl-14 md:pl-20 group text-left cursor-pointer"
                  >
                    {/* Circle Node */}
                    <div 
                      className={`absolute left-8 md:left-12 top-4 w-8 h-8 rounded-full border-2 -translate-x-1/2 z-10 flex items-center justify-center font-display font-black text-xs transition-colors duration-200 ${
                        isActive
                          ? 'bg-brand-purple text-white border-brand-purple scale-110 shadow-md shadow-brand-purple/20'
                          : 'bg-white text-brand-muted border-brand-border group-hover:border-brand-purple/60'
                      }`}
                    >
                      {st.num}
                    </div>

                    <div 
                      className={`p-6 rounded-3xl border transition-all duration-200 space-y-3 text-left ${
                        isActive
                          ? 'bg-brand-alt border-brand-purple/30 shadow-md scale-[1.01]'
                          : 'bg-white border-brand-border group-hover:bg-brand-alt group-hover:border-brand-border/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl border shrink-0 transition-colors ${st.color}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-display font-black text-sm uppercase text-brand-text">{st.title}</h3>
                          <p className="font-mono text-[9px] text-brand-purple tracking-wider uppercase font-bold">{st.sub}</p>
                        </div>
                      </div>

                      <p className="font-sans text-xs text-brand-muted leading-relaxed">
                        {st.desc}
                      </p>

                      <div className="pt-2 border-t border-brand-border/60 flex items-center justify-between font-mono text-[9px] text-brand-muted">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Secure Database Link
                        </span>
                        {isActive && <span className="text-brand-orange font-bold uppercase tracking-widest text-[8px] animate-pulse">● ACTIVE VIEW</span>}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky Visual Console Column */}
          <div className="lg:col-span-5 hidden lg:block lg:sticky lg:top-28">
            <div className="space-y-4">
              <PrePressConsole step={activeStep} lang={lang} />
              
              <div className="bg-white border border-brand-border p-5 rounded-3xl text-left space-y-2 shadow-sm">
                <span className="text-[10px] font-mono font-bold text-brand-purple uppercase tracking-widest block">System Diagnostics</span>
                <span className="font-sans text-xs text-brand-text font-black block uppercase">Interactive Live Dashboard</span>
                <p className="font-sans text-[11px] text-brand-muted leading-relaxed">
                  {lang === 'en'
                    ? "Hover over the steps to preview how Ivy core parses student photos, coordinates CSV mappings, flags duplicate rows, and arranges printable PDF sheets in 1 click."
                    : "सॉफ्टवेयर के चरणों पर कर्सर ले जाएं और देखें कि कैसे आईवी फोटो को रीसाइज करता है, एक्सेल फाइलों को जोड़ता है और १-क्लिक में प्रिंट शीट तैयार करता है।"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Quality Check Credentials */}
      <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-alt border border-brand-border p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 justify-between text-left">
          <div className="space-y-2 text-left">
            <h3 className="font-display font-black text-base text-brand-text uppercase">{lang === 'en' ? 'Ready to Print Your First Batch?' : 'क्या आप पहला बैच प्रिंट करने के लिए तैयार हैं?'}</h3>
            <p className="font-sans text-xs text-brand-muted max-w-md">{lang === 'en' ? 'Create a free project. No credit card required. Upload Excel sheet and sample photos to check crop accuracy in under 1 minute.' : 'फ्री प्रोजेक्ट शुरू करें। कोई फीस नहीं। एआई फोटो क्रॉप देखने के लिए एक्सेल शीट अपलोड करें।'}</p>
          </div>
          <button 
            type="button"
            onClick={() => onPageChange('signup')}
            className="w-full md:w-auto px-8 py-3.5 bg-brand-purple hover:bg-brand-purple-dark text-white font-sans font-black text-xs rounded-xl shadow-md transition active:scale-95 duration-100 cursor-pointer shrink-0"
          >
            {t.ctaStartFree}
          </button>
        </div>
      </section>

    </div>
  );
}
