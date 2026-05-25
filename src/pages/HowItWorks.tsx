/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageId } from '../types';
import { 
  PlusCircle, 
  UploadCloud, 
  Sparkles, 
  Eye, 
  FileText, 
  Printer, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Search,
  Monitor,
  Smartphone,
  Check
} from 'lucide-react';

interface HowItWorksProps {
  onPageChange: (page: PageId) => void;
}

// Live simulated pre-press console matching active steps
function PrePressConsole({ step }: { step: string }) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-white font-mono text-[11px] h-[410px] flex flex-col justify-between shadow-2xl relative overflow-hidden text-left">
      {/* Laser CRT lines sweep effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-1/2 w-full animate-pulse top-0 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-[100px] bg-gradient-to-b from-[#00AEEF]/10 to-transparent pointer-events-none" />

      {/* Console Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[#00AEEF] uppercase tracking-wider text-[10px] font-bold">IVY PRE-PRESS CORE v2.4</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
          <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">STEP {step}</span>
          <span className="text-emerald-400 font-bold">ACTIVE</span>
        </div>
      </div>

      {/* Dynamic Screen Content Based On Step */}
      <div className="flex-1 my-4 flex flex-col justify-center relative z-10 text-left">
        
        {step === '01' && (
          <div className="space-y-3">
            <div className="flex justify-between text-slate-450 pb-1 border-b border-slate-900">
              <span>PROJECT SEED_PROFILE:</span>
              <span className="text-yellow-400 font-bold">INITIATING</span>
            </div>
            
            <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-3.5 space-y-2 relative">
              <span className="text-[10px] text-slate-400">SPEC_CARTSYSTEM: Dual-Sided RFID</span>
              {/* Card visual schematic wireframe */}
              <div className="border border-[#00AEEF]/40 bg-slate-950 rounded-lg p-2.5 text-center mt-2 relative">
                <div className="absolute inset-0 border border-dashed border-red-500/30 m-1 pointer-events-none" />
                <span className="text-[9px] text-cyan-400 block font-bold">PHOTO CROP BOUNDS</span>
                <span className="text-[8px] text-slate-500 block">640px x 480px ISO-380</span>
                <div className="w-8 h-10 border border-[#00AEEF]/20 rounded bg-slate-900 mx-auto my-1.5 flex items-center justify-center">
                  <span className="text-slate-600 text-[8px]">PIC</span>
                </div>
                <div className="w-12 h-1 bg-[#FFB800]/50 rounded mx-auto" />
              </div>
            </div>
            <p className="text-[9px] text-[#00AEEF] animate-pulse">✓ Standard Indian Corporate backplate layouts deployed</p>
          </div>
        )}

        {step === '02' && (
          <div className="space-y-3">
            <div className="flex justify-between text-slate-450 pb-1 border-b border-slate-900">
              <span>CSV_DESK_PARSER:</span>
              <span className="text-[#00AEEF] font-bold">AWAITING FILSTREAM</span>
            </div>
            <div className="border-2 border-dashed border-slate-800 rounded-xl p-6 text-center bg-slate-900/50 hover:bg-slate-900 transition-colors">
              <UploadCloud className="w-8 h-8 mx-auto text-slate-500 mb-2 animate-bounce" />
              <span className="text-[10px] text-white block font-black">Drag CSV/Excel and photos.zip</span>
              <span className="text-[8px] text-slate-550 block mt-1">Automatic columns parser & photo pairing ready</span>
            </div>
            <div className="flex justify-between text-[9px] text-slate-500 pt-1">
              <span>PARSING_FORMATS: XLS, XLSX, CSV, ZIP</span>
              <span>BUFFER: 4.2GB FREE</span>
            </div>
          </div>
        )}

        {step === '03' && (
          <div className="space-y-3">
            <div className="flex justify-between text-slate-455 pb-1 border-b border-slate-900">
              <span>AUTO_CROP_MESH:</span>
              <span className="text-emerald-400 font-bold">PROCESSING PORTRAITS</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex gap-3 items-center">
              <div className="relative w-16 h-20 bg-slate-950 rounded border border-[#00AEEF]/30 flex items-center justify-center overflow-hidden shrink-0">
                {/* Simulated portrait cropping boxes overlays */}
                <div className="absolute top-2 left-2 right-2 bottom-6 border border-emerald-500 animate-pulse text-center" />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border border-[#FFB800]" />
                <span className="text-[8px] text-emerald-400 z-10 font-bold block bg-black/55 px-0.5 rounded">98.4% OK</span>
              </div>
              <div className="flex-1 space-y-1.5">
                <span className="text-slate-400 block text-[9px]">EYES: COORD (120, 240) FOUND</span>
                <span className="text-slate-400 block text-[9px]">CHIN: COORD (120, 310) FOUND</span>
                <span className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 px-1.5 py-0.5 text-[8px] rounded inline-block">
                  ✓ STUDIO-WHITE BACKDROP REPLACEMENT OK
                </span>
              </div>
            </div>
            <p className="text-[9px] text-amber-500 font-sans">Processing speed: 120 portraits per second flat.</p>
          </div>
        )}

        {step === '04' && (
          <div className="space-y-2">
            <div className="flex justify-between text-slate-455 pb-1 border-b border-slate-900">
              <span>PRE-DRAFT_AUDIT:</span>
              <span className="text-red-400 font-bold">2 ERROR ALERTS</span>
            </div>
            <div className="space-y-1.5 max-h-[170px] overflow-auto">
              {/* Alert item */}
              <div className="bg-red-950/30 border border-red-500/20 text-red-100 p-2 rounded-lg flex justify-between items-center">
                <div>
                  <span className="text-[#FFB800] block text-[8px] font-bold">ROLL ID DUPLICATE FIND</span>
                  <span className="text-slate-400 text-[8px]">Ref: Rahul Sharma - Delhi high</span>
                </div>
                <span className="bg-slate-900 px-1.5 py-0.5 rounded text-[8px] text-slate-300">AUTO-MERGE</span>
              </div>
              {/* Alert item 2 */}
              <div className="bg-yellow-950/30 border border-yellow-500/20 text-yellow-100 p-2 rounded-lg flex justify-between items-center">
                <div>
                  <span className="text-[#00AEEF] block text-[8px] font-bold">MISSING PINCODE</span>
                  <span className="text-slate-400 text-[8px]">Ref: Preeti Verma - Section B</span>
                </div>
                <span className="bg-slate-900 px-1.5 py-0.5 rounded text-[8px] text-slate-300">SEND SMSEXPRESS LINK</span>
              </div>
            </div>
            <p className="text-[9px] text-emerald-400">Parents feedback link instantly repairs databases.</p>
          </div>
        )}

        {step === '05' && (
          <div className="space-y-3">
            <div className="flex justify-between text-slate-455 pb-1 border-b border-slate-900">
              <span>PDF_COMPILER_DENSITY:</span>
              <span className="text-purple-400 font-bold">A4 10-UP GRID</span>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
              <span className="text-[8px] text-slate-450 uppercase tracking-wider block mb-2">Dual Side Aligned Layout Bleeds</span>
              <div className="grid grid-cols-5 gap-1.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4.5] bg-slate-950 border border-[#00AEEF]/20 rounded p-0.5 relative flex items-center justify-center">
                    <span className="text-[7px] text-[#00AEEF]">{i+1}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[9px] text-emerald-400 font-bold">✓ PDF compilation finishes in less than 30 seconds.</p>
          </div>
        )}

        {step === '06' && (
          <div className="space-y-3">
            <div className="flex justify-between text-slate-455 pb-1 border-b border-slate-900">
              <span>THERMAL_LAMINATOR_FEED:</span>
              <span className="text-emerald-400 font-bold">99.8% READY</span>
            </div>
            <div className="bg-gradient-to-r from-emerald-950/30 to-slate-900 border border-emerald-500/20 rounded-xl p-4 flex justify-between items-center shadow-inner">
              <div className="space-y-1">
                <span className="text-xs font-bold text-white block">DELIVERY DISPATCH STREAM</span>
                <span className="text-[9px] text-[#00AEEF] block">Operator terminal: Lanyard speed level 4</span>
              </div>
              <Printer className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>
            <div className="flex justify-between items-center font-mono text-[9px] text-slate-400">
              <span>WASTED SHEET STOCK: 0%</span>
              <span>MERCHANT LOGS: UPDATED</span>
            </div>
          </div>
        )}

      </div>

      {/* Terminal Stats Footer */}
      <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between text-[10px] text-slate-500">
        <span>SECURITY CIPHER SHA-250 OK</span>
        <span>LATENCY: 14MS</span>
      </div>
    </div>
  );
}

export default function HowItWorks({ onPageChange }: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState<string>('01');

  useEffect(() => {
    // Scroll monitor to detect active viewport step if needed
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
      title: 'Set up your project profile',
      sub: 'Initiate client configurations instantly',
      icon: PlusCircle,
      desc: 'Define the project type (Lanyard, standard dual-sided cards, or vertical identification passes). Select a standard school layout or upload a custom backplate with dynamic fields.',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200'
    },
    {
      num: '02',
      title: 'Import client data & raw photos',
      sub: 'Drag-and-drop file systems',
      icon: UploadCloud,
      desc: 'Dump your spreadsheet list (Excel/CSV) along with any unorganized folder or ZIP file containing student photos. The database instantly recognizes common filenames (e.g., student names or roll numbers).',
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200'
    },
    {
      num: '03',
      title: 'AI processes and groups',
      sub: 'Automatic face alignment & cropping',
      icon: Sparkles,
      desc: 'Our semantic pre-press software auto-detects face proportions on 120 portraits per second. No Photoshop required. The background replacement tool turns noisy living rooms into clean, official, studio-white backdrops.',
      color: 'text-amber-600 bg-amber-50 border-amber-200'
    },
    {
      num: '04',
      title: 'Review status and verify',
      sub: 'Real-time spelling & duplicate flags',
      icon: Eye,
      desc: 'Inspect flagged entry errors (e.g., incomplete addresses or duplicate roll IDs) on an elegant data check panel. Or send a whitelabel verification link to parents for real-time mobile revisions.',
      color: 'text-green-600 bg-green-50 border-green-200'
    },
    {
      num: '05',
      title: 'Compile print-ready sheet PDFs',
      sub: 'Generate high-res 600 DPI output',
      icon: FileText,
      desc: 'Configure card layout density (e.g., standard single cards, 5-up, or 10-up A4 cards grids with bleed limits). Click export, and download over 10,000 dual-aligned records in under 30 seconds.',
      color: 'text-purple-600 bg-purple-50 border-purple-200'
    },
    {
      num: '06',
      title: 'Send to printing deck & deliver',
      sub: 'Track physical print batches via logs',
      icon: Printer,
      desc: 'Feed standard dual-sided thermal sheets or manual sheet laminators. Flag broken cards for quick rerun generation with a single click. Keep track of customer orders via active audit logs.',
      color: 'text-[#00AEEF] bg-blue-50 border-blue-200'
    }
  ];

  return (
    <div id="how-it-works-page" className="pt-20 bg-white min-h-screen text-left pb-20">
      
      {/* Header Segment */}
      <section className="bg-slate-50 border-b border-slate-150 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-[#00AEEF] font-mono text-xs font-black uppercase tracking-widest block">OPERATIONAL TIMELINE</span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[#0A1628] tracking-tight">
            From Raw Data to Delivered — In 2 Days Flat
          </h1>
          <p className="font-sans text-xs sm:text-sm text-slate-505 max-w-xl mx-auto leading-relaxed">
            See how the IVY Prints pipeline handles bulk B2B pre-press workflows. We convert traditional 10-day manual projects into clean 6-hour operations.
          </p>
        </div>
      </section>

      {/* Two-Column Dual-Screen Interactive Timeline Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Timeline Column */}
          <div className="lg:col-span-7 relative pl-4 md:pl-8">
            {/* Long connecting continuous bar */}
            <div className="absolute top-10 bottom-10 left-8 md:pointer-events-none md:left-12 w-[3px] bg-slate-100 pointer-events-none rounded-full" />
            
            <div className="space-y-12">
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
                    {/* Timeline center bubble node descriptor */}
                    <div 
                      className={`absolute left-8 md:left-12 top-4 w-9 h-9 rounded-full border-2 -translate-x-1/2 z-10 flex items-center justify-center font-display font-black text-xs transition-colors duration-300 ${
                        isActive
                          ? 'bg-[#00AEEF] text-white border-[#00AEEF] scale-110 shadow-lg shadow-[#00AEEF]/20'
                          : 'bg-white text-slate-400 border-slate-200 group-hover:border-[#00AEEF]/60'
                      }`}
                    >
                      {st.num}
                    </div>

                    <div 
                      className={`p-6 rounded-2xl border transition-all duration-300 space-y-3 text-left ${
                        isActive
                          ? 'bg-white border-[#00AEEF]/35 shadow-xl shadow-slate-100/50 scale-[1.01]'
                          : 'bg-slate-50/50 border-slate-200/60 group-hover:bg-white group-hover:border-slate-300/80 group-hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-xl border shrink-0 transition-colors ${st.color}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-display font-black text-sm text-[#0A1628] uppercase">{st.title}</h3>
                          <p className="font-mono text-[9px] text-[#00AEEF] tracking-wider uppercase font-extrabold">{st.sub}</p>
                        </div>
                      </div>

                      <p className="font-sans text-xs text-slate-500 leading-relaxed">
                        {st.desc}
                      </p>

                      <div className="pt-3 border-t border-slate-100/70 flex items-center justify-between font-mono text-[9px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Security audit logs active
                        </span>
                        {isActive && <span className="text-[#00AEEF] font-bold uppercase tracking-widest text-[8px] animate-pulse">● FOCUS VIEW</span>}
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
              <PrePressConsole step={activeStep} />
              
              <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl text-left space-y-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block font-bold">INTERACTIVE PLAYGROUND</span>
                <span className="font-sans text-xs text-[#0A1628] font-bold block">Interactive Pre-Press Workspace Simulation</span>
                <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
                  Hover or scroll over any step on the timeline directory. Our integrated console translates process phases instantly into realistic database, layout, and printing diagnostics.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Quality Check Credentials */}
      <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 justify-between text-left">
          <div className="space-y-2 text-left">
            <h3 className="font-display font-black text-base text-[#0A1628]">Ready to Print Your First Batch?</h3>
            <p className="font-sans text-xs text-slate-500 max-w-md">Create a free merchant project workspace. No credit card required. Import an old Excel list to scan errors in under 2 minutes.</p>
          </div>
          <button 
            type="button"
            onClick={() => onPageChange('signup')}
            className="w-full md:w-auto px-6 py-3.5 bg-[#00AEEF] hover:bg-[#0096ce] text-white font-sans font-bold text-xs rounded-xl shadow-md cursor-pointer shrink-0"
          >
            Create My Free Project →
          </button>
        </div>
      </section>

    </div>
  );
}
