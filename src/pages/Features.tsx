/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PageId } from '../types';
import { FEATURES } from '../data';
import ThreeDCard, { IDCardData } from '../components/ThreeDCard';
import { GlowCard } from '../components/ui/spotlight-card';
import { 
  CheckCircle2, 
  Sparkles, 
  Printer, 
  Smartphone, 
  ShieldCheck, 
  LayoutGrid, 
  Database, 
  FileText, 
  Bot, 
  HelpCircle,
  MessageCircle,
  Clock,
  ArrowRight,
  Zap,
  Cpu,
  Palette,
  Users,
  Lightbulb,
  Camera
} from 'lucide-react';

interface FeaturesProps {
  onPageChange: (page: PageId) => void;
}

export default function Features({ onPageChange }: FeaturesProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'print' | 'ai' | 'design' | 'team'>('all');

  const categories = [
    { id: 'all', label: 'All Modules', icon: Zap },
    { id: 'print', label: 'Printing & Layout', icon: Printer },
    { id: 'ai', label: 'Intelligence Automation', icon: Cpu },
    { id: 'design', label: 'Templates & Capture', icon: Palette },
    { id: 'team', label: 'Team Access Roles', icon: Users }
  ];

  const filteredFeatures = activeTab === 'all' 
    ? FEATURES 
    : FEATURES.filter(f => f.category === activeTab);

  const featureCardsData: IDCardData[] = [
    {
      variant: 'wave' as const,
      accentColor: '#00AEEF',
      session: '2026-27',
      studentId: '2026-904',
      orgName: "IVY High School",
      orgSub: "DELHI NCR CAMPUS",
      logoLetter: "IVY",
      logoBg: "bg-gradient-to-br from-[#00AEEF] to-[#FFB800]",
      badgeText: "STUDENT PASS",
      badgeBg: "bg-yellow-50 text-[#FFB800] border-yellow-200/50",
      name: "Aarav Singhania",
      field1Label: "Class",
      field1Value: "10th (Section B)",
      field2Label: "Roll ID",
      field2Value: "#2026-904",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      themeGradient: "from-[#00AEEF] to-[#0A1628]",
      bloodGroup: "O+",
      validStatus: "Academic 2026-27",
      address: "42-B, Pocket 4, sector 11, Dwarka, New Delhi - 110075",
      emergencyPhone: "+91-9876543210",
      barcodeVal: "*2026904991*"
    },
    {
      variant: 'corporate' as const,
      accentColor: '#14b8a6',
      session: '2026-27',
      studentId: 'NX-2026-809',
      orgName: "Nexa Tech Industries",
      orgSub: "BANGALORE HQ",
      logoLetter: "NEX",
      logoBg: "bg-gradient-to-br from-teal-400 to-slate-900",
      badgeText: "EMPLOYEE PASS",
      badgeBg: "bg-teal-50 text-teal-600 border-teal-200/60",
      name: "Shreya Verma",
      field1Label: "Dept",
      field1Value: "AI Systems Engineer",
      field2Label: "Emp ID",
      field2Value: "#NX-2026-809",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
      themeGradient: "from-teal-500 to-[#0A1628]",
      bloodGroup: "A+",
      validStatus: "Permanent Employee",
      address: "Block C, 5th Floor, Tech Park, Whitefield, Bangalore - 560066",
      emergencyPhone: "+91-88888 77777",
      barcodeVal: "*809NX2026*"
    }
  ];

  return (
    <div id="features-page" className="pt-20 bg-white min-h-screen pb-20">
      
      {/* Cinematic Hero Section */}
      <section className="relative bg-[#060D1F] overflow-hidden pt-20 pb-28 border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00AEEF]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00AEEF]/10 border border-[#00AEEF]/20 text-[#00AEEF] font-mono text-[10px] font-bold uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                Complete Feature Suite
              </span>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Run a High-Profit <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#FFB800]">
                  Printing Agency
                </span>
              </h1>
              <p className="font-sans text-sm text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Every module was custom-built with advice from B2B vendors across Delhi, Jaipur, and Hyderabad. No pointless visual noise—just tools that cut production times by 90% or more.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button onClick={() => onPageChange('signup')} className="px-6 py-3 bg-[#00AEEF] hover:bg-[#0096ce] text-white rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition shadow-[0_0_20px_rgba(0,174,239,0.3)] hover:shadow-[0_0_30px_rgba(0,174,239,0.5)]">
                  Start Free Trial
                </button>
                <button onClick={() => {
                  document.getElementById('feature-list-start')?.scrollIntoView({ behavior: 'smooth' });
                }} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-mono font-bold tracking-wider uppercase border border-white/10 transition">
                  Explore Modules
                </button>
              </div>
            </div>

            {/* Right 3D Cards Showcase */}
            <div className="relative h-[450px] hidden md:block">
              {/* Card 1 - Background */}
              <div className="absolute top-[20px] left-[50px] scale-[0.85] opacity-60 rotate-[-12deg] blur-[2px]">
                <ThreeDCard card={featureCardsData[1]} />
              </div>
              {/* Card 2 - Foreground */}
              <div className="absolute top-[40px] right-[50px] z-10 rotate-[5deg] hover:rotate-0 transition-transform duration-500 hover:scale-105 hover:z-20">
                <ThreeDCard card={featureCardsData[0]} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Feature Exploration Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT SIDEBAR - CATEGORIES SELECTOR */}
          <div className="lg:col-span-1 space-y-4">
            <div className="sticky top-28 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left">
              <h4 className="font-display font-black text-xs text-[#0A1628] uppercase tracking-wider mb-3 leading-none pb-2 border-b">
                FEATURE CATEGORIES
              </h4>
              <nav className="flex flex-col gap-1.5 relative">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab(cat.id as any)}
                      className={`w-full text-left py-2.5 px-4 rounded-xl text-[11px] font-sans font-bold transition-all duration-300 flex items-center gap-3 relative overflow-hidden ${
                        isActive 
                          ? 'bg-white text-[#00AEEF] shadow-sm ring-1 ring-slate-200/50' 
                          : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-900'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00AEEF] rounded-r-full"></div>
                      )}
                      <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#00AEEF]' : 'text-slate-400'}`} />
                      <span className="relative z-10">{cat.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-4 border-t border-slate-200">
                <div className="bg-[#0A1628] p-4 text-white rounded-xl text-center flex flex-col items-center space-y-3">
                  <Lightbulb className="w-5 h-5 text-yellow-300 shrink-0" />
                  <h5 className="font-display font-bold text-[11px] leading-tight text-cyan-300">Need Custom Sheet Formats?</h5>
                  <p className="font-sans text-[10px] text-slate-300">We configure server presets for major printer layouts (Evolis, Fargo, etc).</p>
                  <button 
                    onClick={() => onPageChange('contact')}
                    className="w-full py-1.5 bg-[#00AEEF] text-white font-mono font-bold text-[9px] rounded uppercase hover:bg-cyan-600 transition"
                  >
                    CONTACT PRESSHUB
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT GRID - LISTING */}
          <div id="feature-list-start" className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFeatures.map((feat) => {
                let badgeColor = 'bg-slate-100 text-slate-700';
                let glowTheme: 'cyan' | 'amber' | 'blue' = 'blue';
                if (feat.category === 'ai') {
                  badgeColor = 'bg-cyan-50 text-[#00AEEF] border border-cyan-150';
                  glowTheme = 'cyan';
                }
                if (feat.category === 'print') {
                  badgeColor = 'bg-amber-50 text-[#FFB800] border border-amber-150';
                  glowTheme = 'amber';
                }

                return (
                  <GlowCard 
                    key={feat.id}
                    light={true}
                    customSize={true}
                    glowColor={glowTheme}
                    className="bg-white border-none h-full"
                  >
                    <div id={`feature-node-${feat.id}`} className="flex flex-col justify-between h-full relative z-10">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold ${badgeColor}`}>
                            {feat.category} Module
                          </span>
                          <span className="text-slate-350 text-[10px] font-mono">CODE: IVY-{feat.id.toUpperCase()}</span>
                        </div>

                        <h3 className="font-display font-black text-[#0A1628] text-base leading-tight uppercase">
                          {feat.name}
                        </h3>

                        <p className="font-sans text-xs text-slate-500 leading-relaxed">
                          {feat.description}
                        </p>

                        <div className="space-y-2 pt-4">
                          <span className="font-mono text-[9px] text-[#0A1628] uppercase font-bold block">LOGISTIC RESOLUTIONS:</span>
                          <div className="flex items-center gap-2 text-xs text-[#4A5568] bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="text-[10px] font-medium leading-tight">Supports multi-batch imports with 0% data lag</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[#4A5568] bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="text-[10px] font-medium leading-tight">Compatible with low-overhead smart devices</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-5 mt-5 border-t border-slate-100/60 flex items-center justify-between">
                        <span className="font-mono text-[10px] text-slate-400">99.9% Cloud Uptime Logs</span>
                        <button 
                          onClick={() => onPageChange('signup')}
                          className="text-[11px] font-sans font-bold text-[#00AEEF] hover:text-[#0096ce] flex items-center gap-1 transition-colors"
                        >
                          Try Module Free →
                        </button>
                      </div>
                    </div>
                  </GlowCard>
                );
              })}
            </div>

            {/* In-depth Alternate Illustration sections to satisfy the exact Layout requested */}
            <div className="mt-16 space-y-12 border-t border-slate-200 pt-16 text-left">
              
              <GlowCard light={true} customSize={true} className="bg-white p-0 border-none overflow-hidden">
                <div id="alternating-feature-1" className="flex flex-col md:flex-row items-stretch bg-slate-50/40 relative z-10">
                  <div className="flex-1 p-8 md:p-12 space-y-5">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center border border-orange-100">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-black text-2xl text-[#0A1628] leading-tight">The B2B Self-Capture Mobile Portal</h3>
                    <p className="font-sans text-[13px] text-slate-500 leading-relaxed max-w-md">
                      Rather than paying on-field photography crews to travel to school campuses or colleges, vendors can supply a secure, white-labeled QR code or link. 
                    </p>
                    <ul className="space-y-3 text-[13px] font-sans text-slate-600 pt-2">
                      <li className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#00AEEF]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF]" />
                        </div>
                        <span className="leading-snug">Parents snap profile portraits at home under standard lighting suggestions.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#00AEEF]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF]" />
                        </div>
                        <span className="leading-snug">Roll ID matching prevents photo pairing mix-ups completely.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#00AEEF]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF]" />
                        </div>
                        <span className="leading-snug">Operators approve uploads directly from their laptop desk dashboard.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex-1 shrink-0 w-full md:w-1/2 border-t md:border-t-0 md:border-l border-slate-200/50 bg-slate-100/50 p-8 md:p-12 flex items-center justify-center">
                    <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-slate-200/60 bg-white shadow-xl shadow-slate-200/50 space-y-0 relative group">
                      <div className="bg-slate-50 border-b border-slate-100 p-3 flex items-center justify-between font-mono text-[9px] text-slate-400">
                        <span className="flex items-center gap-1.5 font-bold text-slate-600">
                          <Smartphone className="w-3.5 h-3.5 text-[#00AEEF]" />
                          CUSTOMER MOBILE LIVE
                        </span>
                        <span className="bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded">3G/4G OPTIMIZED</span>
                      </div>
                      <div className="h-56 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[#0A1628] flex flex-col justify-center items-center p-6 text-center relative overflow-hidden">
                        {/* Fake camera scanner overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00AEEF]/10 to-transparent translate-y-[-100%] animate-[scan_3s_ease-in-out_infinite]" />
                        
                        <Camera className="w-8 h-8 text-[#00AEEF] mb-3 relative z-10" />
                        <h5 className="font-display font-extrabold text-sm text-white mt-1 relative z-10">IVY Self-Capture</h5>
                        <p className="font-sans text-[10px] text-slate-400 max-w-44 leading-relaxed mt-1 relative z-10">Please align your shoulders inside the green guidelines.</p>
                        
                        <div className="mt-4 h-32 w-24 rounded-[30px] border-2 border-dashed border-[#00AEEF]/70 flex items-center justify-center font-mono text-[9px] text-[#00AEEF] font-bold relative z-10 bg-[#00AEEF]/5 backdrop-blur-sm shadow-[0_0_15px_rgba(0,174,239,0.2)]">
                          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00AEEF] -translate-x-1 -translate-y-1" />
                          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00AEEF] translate-x-1 -translate-y-1" />
                          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00AEEF] -translate-x-1 translate-y-1" />
                          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00AEEF] translate-x-1 translate-y-1" />
                          CROP ZONE
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlowCard>

              <GlowCard light={true} customSize={true} className="bg-white p-0 border-none overflow-hidden">
                <div id="alternating-feature-2" className="flex flex-col md:flex-row-reverse items-stretch bg-slate-50/40 relative z-10">
                  <div className="flex-1 p-8 md:p-12 space-y-5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                      <Bot className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-black text-2xl text-[#0A1628] leading-tight">Bilingual Regional Spelling Scanners</h3>
                    <p className="font-sans text-[13px] text-slate-500 leading-relaxed max-w-md">
                      We know that school datasheets contain complex transliterations in regional scripts starting with Hindi, Marathi, Telugu, and more. 
                    </p>
                    <ul className="space-y-3 text-[13px] font-sans text-slate-600 pt-2">
                      <li className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#FFB800]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
                        </div>
                        <span className="leading-snug">Auto scan flags spelling anomalies so you don't waste sheets.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#FFB800]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
                        </div>
                        <span className="leading-snug">Bespoke Indian dictionary validation targets names like "Manoj", "Prasad", "Swaminathan" easily.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#FFB800]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
                        </div>
                        <span className="leading-snug">Re-renders addresses accurately to match local pin codes format.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex-1 shrink-0 w-full md:w-1/2 border-t md:border-t-0 md:border-r border-slate-200/50 bg-slate-100/50 p-8 md:p-12 flex items-center justify-center">
                    <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-slate-200/60 bg-white shadow-xl shadow-slate-200/50 p-5 space-y-4 text-left">
                      <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-3">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
                        </span>
                        <span className="font-mono text-[10px] text-yellow-600 font-bold uppercase tracking-wider">AI DISCREPANCY DETECTED</span>
                      </div>
                      
                      <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-[13px] leading-relaxed space-y-3 relative overflow-hidden">
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-red-400"></div>
                        <div>
                          <span className="font-mono text-[9px] text-red-500 font-bold block mb-0.5">RAW SUBMITTED ADDRESS:</span>
                          <strong className="text-red-900 line-through decoration-red-300 decoration-2">Dwarkha Sejtor-11, New Delhli - 1100075</strong>
                        </div>
                      </div>

                      <div className="flex justify-center my-[-8px] relative z-10">
                        <div className="bg-white p-1 rounded-full border border-slate-200 shadow-sm text-slate-400">
                          <ArrowRight className="w-4 h-4 rotate-90" />
                        </div>
                      </div>

                      <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-[13px] leading-relaxed space-y-3 relative overflow-hidden">
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-emerald-400"></div>
                        <div>
                          <span className="font-mono text-[9px] text-emerald-600 font-bold block mb-0.5 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            SUGGESTED CORRECTION SCAN:
                          </span>
                          <strong className="text-emerald-800">Dwarka Sector-11, New Delhi - 110075</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlowCard>

            </div>

          </div>

        </div>
      </div>

      {/* Footer Final Action CTA */}
      <section className="mt-20 max-w-5xl mx-auto px-4 text-center bg-slate-50 border border-slate-200 p-8 rounded-2xl">
        <h3 className="font-display font-bold text-lg text-[#0A1628]">Compare All Pricing Plans & Form Scopes</h3>
        <p className="font-sans text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">See how cheap it is to process student batches with our dynamic pay-per-project models.</p>
        <button 
          onClick={() => onPageChange('home')}
          className="px-6 py-2.5 bg-[#00AEEF] hover:bg-[#0096ce] text-white font-sans font-bold text-xs rounded-lg shadow transition"
        >
          Get Started Now →
        </button>
      </section>

    </div>
  );
}
