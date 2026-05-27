/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { PageId } from '../types';
import { Lang, translations } from '../lib/translations';
import { 
  UploadCloud, 
  Sparkles, 
  FileText, 
  Check, 
  CheckCircle,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Zap,
  Building,
  UserCheck,
  Smartphone,
  Layers,
  Users,
  Calendar,
  Lock,
  ListTodo,
  FileCheck,
  FolderOpen,
  Sliders,
  Play,
  Apple
} from 'lucide-react';

interface HomeProps {
  onPageChange: (page: PageId) => void;
  lang: Lang;
}

export default function Home({ onPageChange, lang }: HomeProps) {
  const t = translations[lang];

  // Lead capture form state
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    phone: '',
    printerName: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Mobile app slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const mobileSlides = [
    '/app screenshot/slide 1.jpeg',
    '/app screenshot/slide 2.jpeg',
    '/app screenshot/slide 3.jpeg',
    '/app screenshot/slide 4.jpeg',
    '/app screenshot/slide 5.jpeg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mobileSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg(lang === 'en' ? 'Please enter your Full Name' : 'कृपया अपना नाम भरें');
      return;
    }
    if (!formData.businessName.trim()) {
      setErrorMsg(lang === 'en' ? 'Please enter your Business Name' : 'कृपया अपनी दुकान/फैक्ट्री का नाम भरें');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg(lang === 'en' ? 'Please enter a valid 10-digit Mobile Number' : 'कृपया सही १०-अंकीय मोबाइल नंबर भरें');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(t.formSuccess);
      setFormData({ fullName: '', businessName: '', phone: '', printerName: '' });
    }, 1200);
  };

  const faqs = [
    { q: t.faqQ1, a: t.faqA1 },
    { q: t.faqQ2, a: t.faqA2 },
    { q: t.faqQ3, a: t.faqA3 },
    { q: t.faqQ4, a: t.faqA4 },
    { q: t.faqQ5, a: t.faqA5 }
  ];

  // Map 15 core features to icons
  const featuresList = [
    { title: t.feat1Title, desc: t.feat1Desc, icon: Layers },
    { title: t.feat2Title, desc: t.feat2Desc, icon: Smartphone },
    { title: t.feat3Title, desc: t.feat3Desc, icon: Sparkles },
    { title: t.feat4Title, desc: t.feat4Desc, icon: FileText },
    { title: t.feat5Title, desc: t.feat5Desc, icon: FileCheck },
    { title: t.feat6Title, desc: t.feat6Desc, icon: Building },
    { title: t.feat7Title, desc: t.feat7Desc, icon: Users },
    { title: t.feat8Title, desc: t.feat8Desc, icon: Layers },
    { title: t.feat9Title, desc: t.feat9Desc, icon: ListTodo },
    { title: t.feat10Title, desc: t.feat10Desc, icon: UserCheck },
    { title: t.feat11Title, desc: t.feat11Desc, icon: Zap },
    { title: t.feat12Title, desc: t.feat12Desc, icon: Calendar },
    { title: t.feat13Title, desc: t.feat13Desc, icon: FolderOpen },
    { title: t.feat14Title, desc: t.feat14Desc, icon: Sliders },
    { title: t.feat15Title, desc: t.feat15Desc, icon: Lock },
  ];

  return (
    <div id="home-page" className="pt-20 bg-brand-bg text-brand-text min-h-screen overflow-x-hidden pb-12 select-none">

      {/* ── LIMITED TIME OFFER ANNOUNCEMENT BAR ── */}
      <div className="w-full bg-gradient-to-r from-brand-orange via-orange-500 to-amber-500 text-white py-2.5 px-4 text-center relative overflow-hidden">
        {/* Shimmer animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 relative z-10">
          <span className="text-xs font-mono font-black tracking-wider animate-pulse">⚡ LIMITED TIME OFFER</span>
          <span className="text-sm font-sans font-black">
            {lang === 'en'
              ? '🎁 Claim ₹5,000 FREE Print Credits — Don\'t Miss It!'
              : '🎁 ₹५,००० मुफ़्त प्रिंट क्रेडिट पाएं — सीमित समय के लिए!'}
          </span>
          <button
            onClick={() => onPageChange('contact')}
            className="bg-white text-brand-orange font-sans font-black text-[10px] px-3 py-1 rounded-full hover:bg-orange-50 transition active:scale-95 cursor-pointer shadow-md"
          >
            {lang === 'en' ? 'CLAIM NOW →' : 'अभी पाएं →'}
          </button>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-6 md:py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-sans font-extrabold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span>{t.heroBadge}</span>
            </div>
            
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-brand-text tracking-tight leading-tight uppercase">
              {t.heroTitleLine1} <br />
              <span className="text-brand-purple">{t.heroTitleLine2}</span>
            </h1>
            
            <p className="font-sans text-xs sm:text-sm text-brand-muted max-w-xl leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[t.heroCheck1, t.heroCheck2, t.heroCheck3, t.heroCheck4].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-4.5 h-4.5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-xs font-sans font-bold text-brand-text/90 leading-snug">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button 
                onClick={() => onPageChange('contact')}
                className="px-6 py-3.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-sans font-black text-xs rounded-xl shadow-lg shadow-brand-orange/25 transition active:scale-95 duration-100 flex items-center gap-2 cursor-pointer animate-bounce"
              >
                <span>{t.ctaStartFree}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('contact-lead-form');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3.5 bg-white border border-brand-border text-brand-text font-sans font-bold text-xs rounded-xl hover:bg-brand-alt transition active:scale-95 duration-100 cursor-pointer"
              >
                {t.ctaContactSales}
              </button>
            </div>

            {/* Platform links */}
            <div className="pt-3 border-t border-brand-border max-w-md flex flex-wrap gap-x-6 gap-y-2 text-[9px] font-mono text-brand-muted">
              <span>PLATFORM: <a href="https://projects-ivy.pages.dev" target="_blank" rel="noreferrer" className="text-brand-purple font-bold hover:underline">projects-ivy.pages.dev</a></span>
              <span>WEBSITE: <a href="https://ivyprints.in" target="_blank" rel="noreferrer" className="text-brand-purple font-bold hover:underline">ivyprints.in</a></span>
            </div>

          </div>

          {/* Hero Right Visual: Premium Browser Showcase */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-[500px] bg-white border border-brand-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Browser Bar */}
              <div className="bg-brand-alt border-b border-brand-border px-4 py-2 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <span className="text-[9px] font-mono text-brand-muted bg-white border border-brand-border px-8 py-0.5 rounded-md">projects-ivy.pages.dev</span>
                <span className="w-4" />
              </div>
              {/* Dashboard Screen */}
              <div className="bg-brand-bg relative group overflow-hidden">
                <img 
                  src="/screenshots/projects.png" 
                  alt="IVY Projects Dashboard" 
                  className="w-full h-auto object-cover hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── B2B KEY STATS SECTION ── */}
      <section className="bg-brand-alt border-y border-brand-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="space-y-1 p-4 bg-white rounded-2xl border border-brand-border/40">
              <span className="font-display font-black text-3xl text-brand-purple block">50+</span>
              <span className="font-sans text-[11px] sm:text-xs font-bold text-brand-muted uppercase block">{t.statCities}</span>
            </div>

            <div className="space-y-1 p-4 bg-white rounded-2xl border border-brand-border/40">
              <span className="font-display font-black text-3xl text-brand-purple block">99%</span>
              <span className="font-sans text-[11px] sm:text-xs font-bold text-brand-muted uppercase block">{t.statAccuracy}</span>
            </div>

            <div className="space-y-1 p-4 bg-white rounded-2xl border border-brand-border/40">
              <span className="font-display font-black text-3xl text-brand-purple block">10,000+</span>
              <span className="font-sans text-[11px] sm:text-xs font-bold text-brand-muted uppercase block">{t.statVolume}</span>
            </div>

            <div className="space-y-1 p-4 bg-white rounded-2xl border border-brand-border/40">
              <span className="font-display font-black text-3xl text-brand-purple block">2x</span>
              <span className="font-sans text-[11px] sm:text-xs font-bold text-brand-muted uppercase block">{t.statProfit}</span>
            </div>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-6">
            
            <div className="space-y-1 p-4 bg-white rounded-2xl border border-brand-orange/10 border-2">
              <span className="font-display font-black text-3xl text-brand-orange block">50+</span>
              <span className="font-sans text-[11px] sm:text-xs font-bold text-brand-muted uppercase block">{t.statVendors}</span>
            </div>

            <div className="space-y-1 p-4 bg-white rounded-2xl border border-brand-border/40">
              <span className="font-display font-black text-3xl text-brand-orange block">50+</span>
              <span className="font-sans text-[11px] sm:text-xs font-bold text-brand-muted uppercase block">{lang === 'en' ? 'Auto-Created Classes' : 'ऑटो-क्रिएटेड क्लासेस'}</span>
            </div>

            <div className="space-y-1 p-4 bg-white rounded-2xl border border-brand-border/40">
              <span className="font-display font-black text-2xl text-brand-orange block">Any Type</span>
              <span className="font-sans text-[11px] sm:text-xs font-bold text-brand-muted uppercase block">{lang === 'en' ? 'Any Custom Print You Want' : 'कोई भी कस्टम प्रिंट बनाएं'}</span>
            </div>

            <div className="space-y-1 p-4 bg-white rounded-2xl border border-brand-border/40">
              <span className="font-display font-black text-2xl text-brand-purple block">ZERO</span>
              <span className="font-sans text-[11px] sm:text-xs font-bold text-brand-muted uppercase block">{t.statWastage}</span>
            </div>

          </div>
        </div>
      </section>

      {/* ── MOBILE APP DEDICATED SECTION ── */}
      <section className="bg-white border-b border-brand-border py-16 md:py-24 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Premium High-Fidelity Mobile App Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-[280px] h-[560px] bg-zinc-900 rounded-[50px] border-[12px] border-zinc-800 shadow-2xl overflow-hidden ring-1 ring-white/10">
                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 bg-zinc-900 rounded-full absolute left-2 border border-zinc-800" />
                  <div className="w-1.5 h-1.5 bg-blue-900/40 rounded-full absolute right-6" />
                </div>
                
                {/* Screen Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 pointer-events-none z-20" />
                
                {/* Screen Content Wrapper */}
                <div className="w-full h-full relative overflow-hidden bg-slate-950">
                  {/* Dynamic slide transitions */}
                  {mobileSlides.map((slide, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                    >
                      <img 
                        src={slide} 
                        alt={`App Slide ${idx + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  
                  {/* Progress dots overlay */}
                  <div className="absolute bottom-6 inset-x-0 flex justify-center gap-2 z-20">
                    {mobileSlides.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentSlide === idx ? 'bg-brand-orange w-5 animate-pulse' : 'bg-white/40 hover:bg-white/60'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Features */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono font-bold text-brand-purple uppercase tracking-wider block">{t.clientAppSub}</span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-text tracking-tight uppercase">
                {t.clientAppTitle}
              </h2>
              <p className="font-sans text-sm sm:text-base text-brand-muted leading-relaxed">
                {t.clientAppDesc}
              </p>

              {/* Standard feature checks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  t.clientAppCheck1,
                  t.clientAppCheck2,
                  t.clientAppCheck3,
                  t.clientAppCheck4,
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-sans font-bold text-brand-text/90 leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              {/* AI-Powered Feature Highlight Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  { label: t.clientAppCheck5, icon: '✂️' },
                  { label: t.clientAppCheck6, icon: '🪄' },
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-brand-purple/5 border border-brand-purple/15 rounded-xl px-3 py-2.5">
                    <span className="text-base shrink-0">{feat.icon}</span>
                    <div>
                      <span className="text-[9px] font-mono font-bold text-brand-purple uppercase tracking-wider block">AI Powered</span>
                      <span className="text-xs font-sans font-bold text-brand-text/90 leading-snug">{feat.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* App store downloads */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-brand-border">
                <button 
                  type="button"
                  onClick={() => alert('Download link for Apple App Store will be sent to your registered mobile.')}
                  className="bg-brand-text text-white hover:bg-neutral-800 transition rounded-xl px-5 py-2.5 flex items-center gap-3 cursor-pointer"
                >
                  <Apple className="w-5 h-5 text-white" />
                  <div className="text-left leading-tight">
                    <span className="text-[8px] font-mono block text-neutral-400">Download on the</span>
                    <span className="text-[11px] font-sans font-bold block">App Store</span>
                  </div>
                </button>
                
                <button 
                  type="button"
                  onClick={() => alert('Download link for Google Play Store will be sent to your registered mobile.')}
                  className="bg-brand-text text-white hover:bg-neutral-800 transition rounded-xl px-5 py-2.5 flex items-center gap-3 cursor-pointer"
                >
                  <Play className="w-5 h-5 text-white" />
                  <div className="text-left leading-tight">
                    <span className="text-[8px] font-mono block text-neutral-400">GET IT ON</span>
                    <span className="text-[11px] font-sans font-bold block">Google Play</span>
                  </div>
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── 15 CORE FEATURES LIST SECTION ── */}
      <section className="bg-brand-alt border-b border-brand-border py-16 md:py-24 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-brand-orange uppercase tracking-wider block">Comprehensive Capabilities</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-text tracking-tight">
              {t.featuresTitle}
            </h2>
            <p className="font-sans text-sm text-brand-muted">
              {t.featuresSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresList.map((feat, idx) => {
              const IconComponent = feat.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-brand-border/80 hover:border-brand-purple rounded-3xl p-6 space-y-3 transition duration-150 hover:shadow-sm"
                >
                  <div className="w-10 h-10 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-black text-base uppercase text-brand-text tracking-wide">{feat.title}</h3>
                  <p className="font-sans text-xs text-brand-muted leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Software Features Redirect Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => onPageChange('features')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-purple hover:bg-brand-purple-dark text-white font-sans font-black text-sm rounded-2xl shadow-lg shadow-brand-purple/20 transition active:scale-95 duration-100 cursor-pointer"
            >
              <span>{lang === 'en' ? 'View Detailed Features Brochure' : 'सॉफ्टवेयर के सभी फीचर्स देखें'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ── DETAILED B2B COMPARISON TABLE SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-left">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold text-brand-purple uppercase tracking-wider block">Workflow Comparison</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-text tracking-tight uppercase">
            {t.compareTitle}
          </h2>
          <p className="font-sans text-sm text-brand-muted">
            {t.compareSubtitle}
          </p>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="bg-white border border-brand-border rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-xs sm:text-sm font-sans border-collapse">
              <thead>
                <tr className="bg-brand-alt border-b border-brand-border text-[10px] font-mono font-bold uppercase">
                  <th className="p-4 pl-6 w-1/4 text-brand-muted">Workflow Metric</th>
                  <th className="p-4 w-3/8 text-brand-purple">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      IVY Vendor Platform
                    </span>
                  </th>
                  <th className="p-4 w-3/8 text-red-400">Traditional Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-xs">
                {[
                  {
                    metric: 'Time per Project',
                    ivy: '2 Days Flat',
                    old: '7+ Days',
                  },
                  {
                    metric: 'Photo Processing',
                    ivy: 'AI Auto-Crop in seconds',
                    old: 'Manual Photoshop editing — hours of work',
                  },
                  {
                    metric: 'Data Accuracy',
                    ivy: 'AI Spell Check + Duplicate Detect',
                    old: 'Manual — high error rate',
                  },
                  {
                    metric: 'Bulk Printing Capacity',
                    ivy: '10,000+ records in one PDF batch',
                    old: 'Small batches, multiple layout files',
                  },
                  {
                    metric: 'Mobile Access',
                    ivy: 'iOS & Android App Included',
                    old: 'Desktop only (CorelDraw, Photoshop)',
                  },
                  {
                    metric: 'Watermarks on Output',
                    ivy: 'ZERO — Client branding only',
                    old: 'Supplier watermarks everywhere',
                  },
                  {
                    metric: 'Client Portal Upload',
                    ivy: 'Self-verification portal included',
                    old: 'Vendor collects photos manually',
                  },
                  {
                    metric: 'Cost Structure',
                    ivy: 'Pay per project, scale freely',
                    old: 'High fixed costs, designer salaries',
                  },
                  {
                    metric: 'Class Management',
                    ivy: 'Auto-group 50+ classes in seconds',
                    old: 'Manual sorting and folder separation',
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-brand-bg/40'}>
                    <td className="p-4 pl-6 font-bold text-brand-text">{row.metric}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="font-black text-green-700">{row.ivy}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                          <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                        <span className="text-red-500 font-bold">{row.old}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Growth/Profit list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-brand-alt border border-brand-purple/20 p-5 rounded-2xl space-y-2">
            <span className="text-[10px] font-mono font-bold text-brand-purple block uppercase">B2B Margin Angle</span>
            <h4 className="font-sans font-bold text-xs sm:text-sm text-brand-text">Finish Projects 70% Faster</h4>
            <p className="text-[11px] sm:text-xs text-brand-muted leading-relaxed">
              Cuts data collection and photo design effort down by 70%, allowing you to take on 3x more school/college batches simultaneously without growing your team.
            </p>
          </div>

          <div className="bg-brand-alt border border-brand-purple/20 p-5 rounded-2xl space-y-2">
            <span className="text-[10px] font-mono font-bold text-brand-orange block uppercase">Wastage Prevention</span>
            <h4 className="font-sans font-bold text-xs sm:text-sm text-brand-text">Eliminate Rework and Lost Stock</h4>
            <p className="text-[11px] sm:text-xs text-brand-muted leading-relaxed">
              AI checks all names, addresses, and parent contact details for spelling errors and duplicate roll numbers before printing, saving expensive card stocks.
            </p>
          </div>
        </div>

        {/* How It Works Redirect CTA block */}
        <div className="mt-10 bg-brand-purple/5 border border-brand-purple/10 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <h4 className="font-display font-black text-sm uppercase text-brand-text">
              {lang === 'en' ? 'Want to see the platform in action?' : 'क्या आप सॉफ्टवेयर का काम लाइव देखना चाहते हैं?'}
            </h4>
            <p className="text-xs text-brand-muted">
              {lang === 'en' 
                ? 'Check out our step-by-step layout builder, auto-imposition features and cloud compiler logs.' 
                : 'स्टेप-बाय-स्टेप लेआउट मेकर, ऑटो-इम्पोजिशन और कंपाइलर का काम देखें।'}
            </p>
          </div>
          <button
            onClick={() => onPageChange('how-it-works')}
            className="px-6 py-3 bg-brand-purple hover:bg-brand-purple-dark text-white font-sans font-black text-xs rounded-xl shadow-md transition active:scale-95 duration-100 shrink-0 cursor-pointer"
          >
            {t.navHowItWorks}
          </button>
        </div>

      </section>

      {/* ── ACCORDION FAQS ── */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-left">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-mono font-bold text-brand-purple uppercase tracking-wider block">FAQ</span>
          <h2 className="font-display font-black text-3xl text-brand-text uppercase">
            {t.faqTitle}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-white border border-brand-border rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between font-sans font-bold text-brand-text hover:bg-brand-alt text-left text-sm sm:text-base cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-brand-purple shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 font-sans text-xs sm:text-sm text-brand-muted leading-relaxed border-t border-brand-border bg-brand-bg/25">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── B2B LEAD CAPTURE FORM SECTION ── */}
      <section 
        id="contact-lead-form"
        className="max-w-4xl mx-auto px-4 py-12 scroll-mt-24"
      >
        <div className="bg-white border border-brand-border rounded-3xl p-6 md:p-10 shadow-lg relative overflow-hidden text-left">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-brand-purple" />
          
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h3 className="font-display font-black text-2xl text-brand-text uppercase">
              {t.formHeader}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-brand-muted">
              {lang === 'en' 
                ? 'Fill details to register your printing plant. Our expert will contact you to set up your account.'
                : 'जानकारी भरें और सॉफ्टवेयर का डेमो आज़माएं। हमारी टीम आपका अकाउंट सेटअप करने के लिए संपर्क करेगी।'}
            </p>
          </div>

          {successMsg ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 border border-green-200 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-display font-extrabold text-xl text-brand-text">
                {lang === 'en' ? 'Submission Received' : 'जानकारी प्राप्त हुई'}
              </h4>
              <p className="font-sans text-sm text-brand-muted max-w-md mx-auto leading-relaxed">{successMsg}</p>
              <button 
                type="button"
                onClick={() => setSuccessMsg('')}
                className="px-6 py-2 bg-brand-purple text-white text-xs font-bold rounded-xl hover:bg-brand-purple-dark transition cursor-pointer"
              >
                {lang === 'en' ? 'Submit New Inquiry' : 'नया फॉर्म भरें'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-650 text-xs rounded-xl font-sans font-bold flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-[10px] font-mono font-bold text-brand-muted mb-1.5 uppercase">
                    {t.formName} *
                  </label>
                  <input 
                    type="text" 
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-purple text-xs"
                  />
                </div>
                <div>
                  <label htmlFor="businessName" className="block text-[10px] font-mono font-bold text-brand-muted mb-1.5 uppercase">
                    {t.formBusiness} *
                  </label>
                  <input 
                    type="text" 
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleFormChange}
                    placeholder="e.g. Patel Digital Prints"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-purple text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-[10px] font-mono font-bold text-brand-muted mb-1.5 uppercase">
                    {t.formPhone} *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-brand-muted text-xs font-mono font-bold">+91</span>
                    <input 
                      type="text" 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="85888 16148"
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-purple text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="printerName" className="block text-[10px] font-mono font-bold text-brand-muted mb-1.5 uppercase">
                    {t.formHardware}
                  </label>
                  <input 
                    type="text" 
                    id="printerName"
                    name="printerName"
                    value={formData.printerName}
                    onChange={handleFormChange}
                    placeholder="e.g. Fargo HDP5000, Epson L805"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-purple text-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-2xl text-xs font-sans font-black flex items-center justify-center gap-2 shadow-lg shadow-brand-purple/20 active:scale-95 duration-100 transition cursor-pointer"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>{lang === 'en' ? 'Submitting...' : 'भेजा जा रहा है...'}</span>
                    </span>
                  ) : (
                    <>
                      <span>{t.ctaSubmit}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>
      </section>

    </div>
  );
}
