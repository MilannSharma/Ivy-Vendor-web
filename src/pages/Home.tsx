/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../types';
import { TESTIMONIALS } from '../data';
import ThreeDCard, { IDCardData } from '../components/ThreeDCard';
import AIShowcase from '../components/AIShowcase';
import TiltCard from '../components/TiltCard';
import { GlowCard } from '../components/ui/spotlight-card';
import { applyDynamicStyles } from '../lib/utils';

interface DynamicSwipeCardProps {
  tx: number;
  scale: number;
  rotateY: number;
  opacity: number;
  zIndex: number;
  pointerEvents: 'auto' | 'none';
  blur: number;
  children: React.ReactNode;
  key?: React.Key;
}

function DynamicSwipeCard({ tx, scale, rotateY, opacity, zIndex, pointerEvents, blur, children }: DynamicSwipeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    applyDynamicStyles(cardRef.current, {
      transform: `translateX(${tx}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      pointerEvents,
      filter: blur ? `blur(${blur}px)` : 'none',
      transition: 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.45s ease, filter 0.45s ease',
      willChange: 'transform, opacity',
    });
  }, [tx, scale, rotateY, opacity, zIndex, pointerEvents, blur]);
  
  return (
    <div ref={cardRef} className="absolute">
      {children}
    </div>
  );
}

interface DynamicTestimonialCardProps {
  translateX: number;
  scale: number;
  opacity: number;
  zIndex: number;
  blur: number;
  pointerEvents: 'none' | 'auto';
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  key?: React.Key;
}

function DynamicTestimonialCard({ translateX, scale, opacity, zIndex, blur, pointerEvents, onClick, className, children }: DynamicTestimonialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    applyDynamicStyles(cardRef.current, {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      zIndex,
      filter: blur ? `blur(${blur}px)` : 'none',
      pointerEvents,
    });
  }, [translateX, scale, opacity, zIndex, blur, pointerEvents]);
  
  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      className={className}
    >
      {children}
    </div>
  );
}

import { 
  DownloadDoneIcon,
  EyeToggleIcon,
  SendIcon,
  LockUnlockIcon,
  CopiedIcon,
  ToggleIcon
} from '../components/ui/animated-state-icons';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { 
  Printer, 
  Sparkles, 
  Smartphone, 
  Users, 
  Layout, 
  Database, 
  ArrowRight, 
  TrendingUp, 
  XCircle, 
  CheckCircle2, 
  Zap, 
  ChevronRight, 
  ChevronLeft, 
  Layers, 
  Search, 
  Play, 
  Monitor, 
  Clock, 
  FileText,
  Star,
  Folder,
  Globe,
  Camera,
  QrCode,
  UserCheck
} from 'lucide-react';

interface HomeProps {
  onPageChange: (page: PageId) => void;
}

// Interactive Scroll Counter with dynamic intersection observer
function ScrollCounter({ end, suffix, duration = 1500 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    let active = true;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && active) {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          if (active) {
            setCount(Math.floor(progress * end));
          }
          if (progress < 1 && active) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (elementRef.current) observer.observe(elementRef.current);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [end, duration]);
  
  return <span ref={elementRef} className="tabular-nums font-black">{count}{suffix}</span>;
}

const cardDesigns: IDCardData[] = [
  {
    variant: 'wave' as const,
    orgName: "IVY High School", orgSub: "JAIPUR, RAJASTHAN", logoLetter: "IVY",
    logoBg: "bg-gradient-to-br from-[#00AEEF] to-[#0A1628]",
    badgeText: "STUDENT ID CARD", badgeBg: "bg-blue-50 text-[#00AEEF] border-blue-200/50",
    name: "Aarav Singhania", field1Label: "Class", field1Value: "10th — Section B",
    field2Label: "Student ID", field2Value: "IVY-2026-904",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    themeGradient: "from-[#00AEEF] to-[#0A1628]", accentColor: "#00AEEF",
    bloodGroup: "O+", validStatus: "2026–27", address: "42-B, Sector 11, Jaipur",
    emergencyPhone: "+91-9876543210", barcodeVal: "*IVY2026904*", studentId: "IVY-2026-904", session: "2026–2027"
  },
  {
    variant: 'diagonal' as const,
    orgName: "ABC School", orgSub: "DELHI NCR CAMPUS", logoLetter: "ABC",
    logoBg: "bg-gradient-to-br from-indigo-600 to-slate-900",
    badgeText: "STUDENT PASS", badgeBg: "bg-indigo-50 text-indigo-600 border-indigo-200/50",
    name: "Priya Sharma", field1Label: "Class", field1Value: "12th — Science",
    field2Label: "Roll No", field2Value: "2026-1234",
    avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=300",
    themeGradient: "from-indigo-600 to-slate-900", accentColor: "#3730a3",
    bloodGroup: "A+", validStatus: "2026–27", address: "Vasant Kunj, New Delhi",
    emergencyPhone: "+91-9988776655", barcodeVal: "*ABC2026*", studentId: "2026-1234", session: "2026–2027"
  },
  {
    variant: 'corporate' as const,
    orgName: "Nexa Tech Industries", orgSub: "BANGALORE HQ", logoLetter: "NEX",
    logoBg: "bg-gradient-to-br from-teal-400 to-slate-900",
    badgeText: "EMPLOYEE PASS", badgeBg: "bg-teal-50 text-teal-600 border-teal-200/60",
    name: "Shreya Verma", field1Label: "Dept", field1Value: "AI Systems Engineer",
    field2Label: "Emp ID", field2Value: "NX-2026-809",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    themeGradient: "from-teal-500 to-[#0A1628]", accentColor: "#14b8a6",
    bloodGroup: "A+", validStatus: "Permanent", address: "Tech Park, Whitefield, Bangalore",
    emergencyPhone: "+91-88888 77777", barcodeVal: "*809NX2026*", studentId: "NX-2026-809", session: "FY 2026–27"
  },
  {
    variant: 'diagonal' as const,
    orgName: "Delhi Sentinel News", orgSub: "PRESS & MEDIA HUB", logoLetter: "DSN",
    logoBg: "bg-gradient-to-br from-red-500 to-slate-900",
    badgeText: "PRESS ACCESS", badgeBg: "bg-red-50 text-red-500 border-red-200/60",
    name: "Amit Sharma", field1Label: "Role", field1Value: "Chief Photojournalist",
    field2Label: "Press ID", field2Value: "DS-MEDIA-901",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    themeGradient: "from-red-600 to-slate-900", accentColor: "#ef4444",
    bloodGroup: "B+", validStatus: "Dec 2027", address: "Bahadur Shah Zafar Marg, Delhi",
    emergencyPhone: "+91-99999 88888", barcodeVal: "*901DSMEDIA*", studentId: "DS-MEDIA-901", session: "2026–2027"
  },
  {
    variant: 'sidebar' as const,
    orgName: "Global Tech Summit", orgSub: "NEW DELHI CONVENTION", logoLetter: "GTS",
    logoBg: "bg-gradient-to-br from-purple-500 to-indigo-900",
    badgeText: "ALL-ACCESS VIP", badgeBg: "bg-purple-50 text-purple-600 border-purple-200",
    name: "Preeti Patel", field1Label: "Access", field1Value: "VIP Speaker",
    field2Label: "Pass ID", field2Value: "GTS-VIP-054",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
    themeGradient: "from-purple-600 to-indigo-900", accentColor: "#7c3aed",
    bloodGroup: "AB+", validStatus: "Event Only", address: "Pragati Maidan, New Delhi",
    emergencyPhone: "+91-77777 66666", barcodeVal: "*054GTSVIP*", studentId: "GTS-VIP-054", session: "Summit 2026"
  },
  {
    variant: 'dark' as const,
    orgName: "Rajasthan Police", orgSub: "JAIPUR DISTRICT", logoLetter: "RPD",
    logoBg: "bg-gradient-to-br from-slate-600 to-slate-900",
    badgeText: "GOVT. SERVICE ID", badgeBg: "bg-slate-700 text-slate-200 border-slate-600",
    name: "Vikram Singh", field1Label: "Rank", field1Value: "Sub-Inspector",
    field2Label: "Badge No", field2Value: "RJP-2026-077",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    themeGradient: "from-slate-600 to-slate-900", accentColor: "#f59e0b",
    bloodGroup: "B+", validStatus: "Lifetime", address: "Police HQ, Jaipur, Rajasthan",
    emergencyPhone: "+91-1412220100", barcodeVal: "*RJP2026077*", studentId: "RJP-2026-077", session: "Permanent"
  }
];

const TABS_ORDER = ['projects', 'records', 'batches', 'templates', 'ai_insights'] as const;

const APP_SLIDES = [
  {
    badge: "SMART CAMERA",
    title: "AI Auto Crop & Face Guidance",
    description: "Align face inside the guiding box. The AI tracks head posture and dynamically auto-crops standard biometric frames instantly.",
    image: "/app screenshot/slide 3.jpeg"
  },
  {
    badge: "AI BACKDROP",
    title: "Real-Time BG Remove & Replace",
    description: "Automatically remove background clutter and replace it with clean studio colors (blue, white, transparent) with zero watermarks.",
    image: "/app screenshot/slide 4.jpeg"
  }
];

export default function Home({ onPageChange }: HomeProps) {
  const [activePreviewTab, setActivePreviewTab] = useState<'projects' | 'records' | 'batches' | 'templates' | 'ai_insights'>('projects');
  const [showDemoModal, setShowDemoModal] = useState(false);
  
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeTestiIndex, setActiveTestiIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [autoplayActive, setAutoplayActive] = useState(true);
  const [activeAppSlide, setActiveAppSlide] = useState(0);

  // Screen size detection for card translations
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay smooth interval
  useEffect(() => {
    if (!autoplayActive) return;
    const timer = setInterval(() => {
      setActiveCardIndex(prev => (prev + 1) % cardDesigns.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [autoplayActive]);

  // Mobile App Slideshow Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAppSlide(prev => (prev + 1) % APP_SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handlePrevCard = () => {
    setActiveCardIndex(prev => (prev - 1 + cardDesigns.length) % cardDesigns.length);
  };

  const handleNextCard = () => {
    setActiveCardIndex(prev => (prev + 1) % cardDesigns.length);
  };

  const handlePrevTab = () => {
    const currentIndex = TABS_ORDER.indexOf(activePreviewTab);
    const prevIndex = (currentIndex - 1 + TABS_ORDER.length) % TABS_ORDER.length;
    setActivePreviewTab(TABS_ORDER[prevIndex]);
  };

  const handleNextTab = () => {
    const currentIndex = TABS_ORDER.indexOf(activePreviewTab);
    const nextIndex = (currentIndex + 1) % TABS_ORDER.length;
    setActivePreviewTab(TABS_ORDER[nextIndex]);
  };
  
  const showcaseRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (progressLineRef.current) {
        const widthVal = Math.min(100, Math.max(0, ((window.scrollY - 700) / 450) * 100));
        progressLineRef.current.style.width = `${widthVal}%`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    if (progressLineRef.current) {
      const widthVal = Math.min(100, Math.max(0, ((window.scrollY - 700) / 450) * 100));
      progressLineRef.current.style.width = `${widthVal}%`;
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // GSAP ScrollTrigger to coordinate the 3D card shrinking and layout transition
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero-view',
          start: 'top top',
          end: 'bottom 10%',
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      });

      // Animate the 3D card stage to smoothly rotate flat, shrink and slide down into the slot
      tl.to('#hero-3d-card-stage', {
        scale: 0.52,
        x: 0,
        y: 45, // moves it perfectly to override the crop slot
        rotateY: 0,
        rotateX: 0,
        rotateZ: -1.5,
        ease: 'power1.inOut',
      }, 0);

      // Animate the Dashboard mockup to scale in and fade to 100% opacity
      tl.to('#hero-dashboard-mockup', {
        opacity: 1,
        scale: 1,
        y: 10,
        rotateX: 0,
        ease: 'power1.inOut',
      }, 0);

      // Fade out non-active peeking cards on scroll
      tl.to('.carousel-non-active', {
        opacity: 0,
        scale: 0.8,
        pointerEvents: 'none',
        duration: 0.15,
        ease: 'power1.inOut',
      }, 0);

    }, showcaseRef);

    return () => ctx.revert();
  }, []);


  return (
    <div id="home-page-container" className="pt-16">
      
      {/* SECTION 1.1: HERO SECTION */}
      <section 
        className="relative bg-gradient-to-br from-[#EAF6FF] via-[#FFFFFF] 60% to-[#FFF8E7] min-h-[90vh] lg:min-h-[calc(100vh-64px)] flex items-center pt-10 pb-20 lg:py-0 overflow-hidden"
        id="hero-view"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center py-6 lg:py-10">
            
            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00AEEF]/10 border border-[#00AEEF]/20 text-[#00AEEF] text-xs font-mono font-bold uppercase tracking-wider">
                <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
                <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> India's #1 Vendor ID Card Platform</span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-[52px] xl:text-[62px] text-[#0A1628] tracking-tight leading-[1.1]">
                Double Your Profit.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#0A1628]">Print Smarter.</span>
              </h1>

              <p className="font-sans text-sm sm:text-base lg:text-[17px] text-[#4A5568] max-w-xl leading-relaxed">
                Cloud-Based. AI-Powered. Mobile-Ready. Speed up your pre-press throughput by 92% and manage over 10,000+ ID cards from one unified, sleek dashboard.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3 relative z-30">
                <button 
                  type="button"
                  id="btn-hero-start"
                  onClick={() => onPageChange('signup')}
                  className="px-7 py-4 bg-[#00AEEF] text-white hover:bg-[#0096ce] rounded-xl font-sans font-black flex items-center justify-center gap-2 shadow-lg shadow-[#00AEEF]/20 active:scale-95 duration-100 cursor-pointer text-base shrink-0"
                >
                  <span>Start Free Trial Today</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button 
                  type="button"
                  id="btn-hero-demo"
                  onClick={() => setShowDemoModal(true)}
                  className="px-7 py-4 bg-white hover:bg-slate-50 border border-slate-200/85 rounded-xl font-sans font-bold flex items-center justify-center gap-2 text-[#0A1628] transition text-base cursor-pointer shadow-sm active:scale-95 duration-100 shrink-0"
                >
                  <Play className="w-4 h-4 text-[#00AEEF] fill-[#00AEEF]" />
                  <span>Watch 2-Min Demo</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-slate-200/60 max-w-md">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 font-mono text-[10px] sm:text-[11px] text-[#0A1628]">
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-[#FFB800] flex items-center gap-1 text-sm sm:text-base leading-none mb-1">
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFB800] fill-[#FFB800] shrink-0" />
                      50+
                    </span>
                    <span className="text-slate-500 uppercase text-[7px] xs:text-[8px] sm:text-[9px] tracking-wider">Cities Covered</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-[#00AEEF] flex items-center gap-1 text-sm sm:text-base leading-none mb-1">
                      <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00AEEF] fill-[#00AEEF] shrink-0" />
                      99%
                    </span>
                    <span className="text-slate-500 uppercase text-[7px] xs:text-[8px] sm:text-[9px] tracking-wider">On-Time Drafts</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-[#0A1628] flex items-center gap-1 text-sm sm:text-base leading-none mb-1">
                      <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00AEEF] shrink-0" />
                      10K+
                    </span>
                    <span className="text-slate-500 uppercase text-[7px] xs:text-[8px] sm:text-[9px] tracking-wider">Records/Batch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Interactive Card Showcase Stage */}
            <div 
              ref={showcaseRef}
              className="lg:col-span-5 flex justify-center lg:justify-center lg:pr-6 xl:pr-10 select-none relative"
              id="hero-scroll-showcase-trigger"
            >
              {/* Outer wrapper — wider than the card so peeking cards aren't clipped */}
              <div 
                id="hero-showcase-stage"
                className="relative flex items-center justify-center shrink-0 w-[480px] max-w-[100vw] h-[440px]"
              >
                {/* Visual ambient glow backdrop */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-[#00AEEF] to-[#FFB800] rounded-full filter blur-3xl opacity-15 pointer-events-none" />

                {/* Dashboard Mockup (appears as card shrinks) */}
                <div 
                  id="hero-dashboard-mockup" 
                  className="absolute inset-0 bg-white border border-slate-200/80 rounded-2xl shadow-xl overflow-hidden flex flex-col opacity-0 scale-85 pointer-events-none transform-style-3d perspective-1000 left-[100px] right-[100px]"
                >
                  {/* Top Browser Bar */}
                  <div className="bg-slate-100 px-3 py-2 border-b border-slate-200/80 flex items-center justify-between">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-400 block" />
                      <span className="w-2 h-2 rounded-full bg-yellow-400 block" />
                      <span className="w-2 h-2 rounded-full bg-green-400 block" />
                    </div>
                    <div className="bg-white/90 border border-slate-200 text-[#0A1628]/60 text-[8px] font-mono px-3 py-0.5 rounded-md text-center max-w-[150px] font-bold">
                      ivyprints.in/projects/103
                    </div>
                    <div className="text-slate-500 text-[8px] font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse block" />
                      <span className="text-[7px] uppercase tracking-wider text-emerald-500">Active</span>
                    </div>
                  </div>

                  {/* Mock Interface Content */}
                  <div className="p-3 bg-slate-50 flex-grow flex flex-col justify-between text-left">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-1">
                      <div>
                        <h4 className="font-display font-black text-[9px] text-[#0A1628] leading-none uppercase">ID CARD PRE-PRESS</h4>
                        <p className="font-mono text-[6.5px] text-[#00AEEF] mt-0.5">PROCESSOR STAGE: READY</p>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 text-[7px] font-mono font-bold px-1.5 py-0.5 rounded border border-emerald-100 uppercase">
                        AI PASSED
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 my-1.5 text-[8px]">
                      <div className="bg-white px-2 py-1 rounded border border-slate-200/50 flex items-center justify-between">
                        <span className="text-slate-400 font-mono text-[7px]">TOTAL CARDS</span>
                        <span className="font-bold text-[#0A1628] font-mono">10,000+</span>
                      </div>
                      <div className="bg-white px-2 py-1 rounded border border-slate-200/50 flex items-center justify-between">
                        <span className="text-slate-400 font-mono text-[7px]">TIME / BATCH</span>
                        <span className="font-bold text-emerald-600 font-mono">2 Min</span>
                      </div>
                    </div>

                    <div className="border border-dashed border-[#00AEEF]/40 bg-[#EAF6FF]/30 rounded-xl relative flex-grow flex items-center justify-center p-2 mb-1">
                      <div className="absolute top-1 left-1.5 leading-none font-mono text-[6px] text-[#00AEEF]">[ALIGN_AXIS]</div>
                      <div className="absolute top-1 right-1.5 leading-none font-mono text-[6px] text-slate-400">92% SPEEDUP</div>
                      <div id="hero-mini-card-slot" className="w-[145px] h-[195px] border-2 border-dashed border-[#00AEEF]/30 rounded-xl bg-white/70 flex flex-col items-center justify-center">
                        <span className="text-[7.5px] text-slate-400 font-mono font-semibold tracking-wider text-center px-4 leading-normal">
                          DROP PORTABLE<br />CARD SLOT
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-white p-1 rounded-lg border border-slate-200/80 text-[7.5px]">
                      <span className="font-mono font-bold text-slate-500 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#00AEEF] animate-ping" />
                        PREVIEW ENGINE ONLINE
                      </span>
                      <span className="font-mono font-bold text-[#00AEEF]">1080P RENDER</span>
                    </div>
                  </div>
                </div>

                {/* 3D Card Carousel — full-width stage prevents clipping of peeking cards */}
                <div 
                  id="hero-3d-card-stage"
                  className="absolute inset-0 flex items-center justify-center pointer-events-auto overflow-visible"
                  onMouseEnter={() => setAutoplayActive(false)}
                  onMouseLeave={() => setAutoplayActive(true)}
                  onTouchStart={(e) => {
                    const x = e.touches[0].clientX;
                    const onEnd = (ev: TouchEvent) => {
                      const dx = ev.changedTouches[0].clientX - x;
                      if (Math.abs(dx) > 40) dx < 0 ? handleNextCard() : handlePrevCard();
                      window.removeEventListener('touchend', onEnd);
                    };
                    window.addEventListener('touchend', onEnd);
                  }}
                >
                  <div className="relative w-full h-full flex items-center justify-center overflow-visible perspective-3d-stage">
                    {cardDesigns.map((card, idx) => {
                      const diff = (idx - activeCardIndex + cardDesigns.length) % cardDesigns.length;
                      
                      let tx = 0;
                      let scale = 1;
                      let rotateY = 0;
                      let opacity = 1;
                      let zIndex = 30;
                      let pointerEvents: "auto" | "none" = "auto";
                      let blur = 0;

                      if (diff === 0) {
                        // Active card — centred
                        tx = 0; scale = 1; rotateY = 0; opacity = 1; zIndex = 30; blur = 0;
                        pointerEvents = "auto";
                      } else if (diff === 1) {
                        // Next card — peeks right
                        tx = isMobile ? 150 : 195; scale = 0.72; rotateY = -28; opacity = 0.42; zIndex = 20; blur = 1.5;
                        pointerEvents = "none";
                      } else if (diff === cardDesigns.length - 1) {
                        // Previous card — peeks left
                        tx = isMobile ? -150 : -195; scale = 0.72; rotateY = 28; opacity = 0.42; zIndex = 20; blur = 1.5;
                        pointerEvents = "none";
                      } else {
                        // Hidden cards — centred and invisible
                        tx = 0; scale = 0.5; rotateY = 0; opacity = 0; zIndex = 10; blur = 0;
                        pointerEvents = "none";
                      }

                      return (
                        <DynamicSwipeCard
                          key={idx}
                          tx={tx}
                          scale={scale}
                          rotateY={rotateY}
                          opacity={opacity}
                          zIndex={zIndex}
                          pointerEvents={pointerEvents}
                          blur={blur}
                        >
                          <ThreeDCard card={card} />
                        </DynamicSwipeCard>
                      );
                    })}
                  </div>
                </div>

                {/* Tap to flip hint */}
                <div className="absolute -bottom-8 left-0 right-0 text-center font-mono text-[9px] text-slate-400 uppercase tracking-wider font-bold select-none pointer-events-none">
                  Tap to flip card
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* SECTION 1.3: PROBLEM VS SOLUTION CARDS */}
      <section id="problem-solution-view" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono font-bold text-[#FFB800] uppercase tracking-wider block">PRE-PRESS OPTIMIZATION</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0A1628] tracking-tight">
              The Old Way is Costing Your Business
            </h2>
            <p className="font-sans text-sm text-[#4A5568]">
              Traditional ID card printing involves endless hours of Photoshop cropping, manually aligning spreadsheet names, and expensive correction reruns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch overflow-hidden">
            
            {/* The Old Bad Way */}
            <motion.div 
              initial={{ opacity: 0, x: -60, rotateY: 7 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6 flex flex-col justify-between"
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <div>
                <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[#0A1628] text-lg">Manual Old Workflows</h3>
                    <p className="font-mono text-[10px] text-red-500 font-semibold uppercase">UNSKILLED & SLOW METRIC</p>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-sans text-xs text-[#0A1628] block">7+ Days per Project:</strong>
                      <span className="font-sans text-xs text-slate-500">Manual cropping takes days for 2,000+ school admissions.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-sans text-xs text-[#0A1628] block">WhatsApp Image Chaos:</strong>
                      <span className="font-sans text-xs text-slate-500">Parents send dark, weird, vertical crops via random chat lines.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-sans text-xs text-[#0A1628] block">Excel Typo Waste:</strong>
                      <span className="font-sans text-xs text-slate-500">Every batch has 4% address mistakes resulting in physical thermal print wastage.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex justify-between text-xs text-[#4A5568] font-mono">
                <span>Wasted Stock: <strong className="text-red-600">High</strong></span>
                <span>Margin Gaps: <strong className="text-red-600">Tight</strong></span>
              </div>
            </motion.div>

            {/* The IVY Prints Smart Way */}
            <motion.div 
              initial={{ opacity: 0, x: 60, rotateY: -7 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-[#0A1628] text-white rounded-2xl border border-slate-800 p-6 md:p-8 space-y-6 flex flex-col justify-between relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#00AEEF]/20 to-transparent pointer-events-none" />
              
              <div>
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="w-10 h-10 rounded-full bg-[#00AEEF]/10 flex items-center justify-center text-[#00AEEF]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-lg">The IVY Prints Standard</h3>
                    <p className="font-mono text-[10px] text-[#00AEEF] font-semibold uppercase">AUTOMATED & HIGH MARGIN</p>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-sans text-xs text-white block">2 Days Flat Turnover:</strong>
                      <span className="font-sans text-xs text-slate-300">Asynchronous cropping handles thousands of portraits in seconds.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-sans text-xs text-white block">Intelligent WhatsApp Forms:</strong>
                      <span className="font-sans text-xs text-slate-300">Clean whitelabel link for directly uploading standard biometric portraits.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-sans text-xs text-white block">Automatic Validation Scanning:</strong>
                      <span className="font-sans text-xs text-slate-300">AI spell checks name spellings and prevents duplicate record print costs.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between text-xs text-slate-400 font-mono">
                <span>Wasted Stock: <strong className="text-emerald-400">0%</strong></span>
                <span>Margins: <strong className="text-emerald-400">2.5x Booster</strong></span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 1.4: FEATURE TEASER GRID (6 CARDS) */}
      <section className="bg-slate-50 py-20 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="text-left space-y-2">
              <h2 className="font-display font-black text-3xl text-[#0A1628]">Accelerate All ID Cards &amp; Printing Logistics</h2>
            </div>
            <button 
              onClick={() => onPageChange('features')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00AEEF] hover:bg-[#0096ce] text-white text-xs font-mono font-black uppercase tracking-wider rounded-xl shadow-md shadow-[#00AEEF]/20 active:scale-95 transition-all duration-150 shrink-0 cursor-pointer"
            >
              Explore All Features
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
            >
              <GlowCard light={true} customSize={true} className="bg-white p-6 flex flex-col justify-between h-full border-none">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <DownloadDoneIcon size={24} />
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#0A1628]">Bulk Print PDF Compiler</h4>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed">
                    Generate print-ready, high-resolution dual-sided layout sheets for over 10,000 students in less than 30 seconds.
                  </p>
                </div>
                <button onClick={() => onPageChange('features')} className="text-[11px] font-mono font-bold text-[#00AEEF] mt-4 flex items-center gap-0.5 hover:underline text-left">
                  LEARN SPECS →
                </button>
              </GlowCard>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <GlowCard light={true} customSize={true} className="bg-white p-6 flex flex-col justify-between h-full border-none">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600">
                    <EyeToggleIcon size={24} />
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#0A1628]">AI Auto-Crop & Align</h4>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed">
                    Identify eyes and face geometry coordinates instantly, auto-scaling and framing pictures perfectly.
                  </p>
                </div>
                <button onClick={() => onPageChange('features')} className="text-[11px] font-mono font-bold text-[#00AEEF] mt-4 flex items-center gap-0.5 hover:underline text-left">
                  LEARN SPECS →
                </button>
              </GlowCard>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            >
              <GlowCard light={true} customSize={true} className="bg-white p-6 flex flex-col justify-between h-full border-none">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <SendIcon size={24} />
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#0A1628]">Photo Capture Portal</h4>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed">
                    QR and custom SMS portals let schools/students upload or capture real-time selfies directly into the database.
                  </p>
                </div>
                <button onClick={() => onPageChange('features')} className="text-[11px] font-mono font-bold text-[#00AEEF] mt-4 flex items-center gap-0.5 hover:underline text-left">
                  LEARN SPECS →
                </button>
              </GlowCard>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <GlowCard light={true} customSize={true} className="bg-white p-6 flex flex-col justify-between h-full border-none">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                    <LockUnlockIcon size={24} />
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#0A1628]">Team & Operator Permissions</h4>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed">
                    Add checking operators, data entrants, and print desk operators to speed up parallel draft reviews.
                  </p>
                </div>
                <button onClick={() => onPageChange('features')} className="text-[11px] font-mono font-bold text-[#00AEEF] mt-4 flex items-center gap-0.5 hover:underline text-left">
                  LEARN SPECS →
                </button>
              </GlowCard>
            </motion.div>

            {/* Card 5 */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            >
              <GlowCard light={true} customSize={true} className="bg-white p-6 flex flex-col justify-between h-full border-none">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                    <CopiedIcon size={24} />
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#0A1628]">250+ Global Templates</h4>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed">
                    Ready-to-print student, corporate, government, and lanyard badge formats with standard bleeds.
                  </p>
                </div>
                <button onClick={() => onPageChange('features')} className="text-[11px] font-mono font-bold text-[#00AEEF] mt-4 flex items-center gap-0.5 hover:underline text-left">
                  LEARN SPECS →
                </button>
              </GlowCard>
            </motion.div>

            {/* Card 6 */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <GlowCard light={true} customSize={true} className="bg-white p-6 flex flex-col justify-between h-full border-none">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FFB800]/10 flex items-center justify-center text-yellow-600">
                    <ToggleIcon size={24} />
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#0A1628]">Dynamic Entity Directories</h4>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed">
                    No layout rigidities. Group and segment by standards, branches, sections, roll hierarchies, and custom fields.
                  </p>
                </div>
                <button onClick={() => onPageChange('features')} className="text-[11px] font-mono font-bold text-[#00AEEF] mt-4 flex items-center gap-0.5 hover:underline text-left">
                  LEARN SPECS →
                </button>
              </GlowCard>
            </motion.div>

          </div>

          <div className="mt-10 text-center">
            <button 
              onClick={() => onPageChange('features')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A1628] hover:bg-slate-800 text-white font-sans font-bold text-xs rounded-full transition shadow-md"
            >
              <span>Explore All Features</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 1.5: THE STATS COUNTER */}
      <section className="bg-white py-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-150/40 border border-slate-200/85 rounded-2xl py-10 px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative">
            
            {/* Grid 1 */}
            <div className="space-y-1">
              <span className="font-display font-black text-3xl sm:text-4xl text-[#0A1628] block">
                <ScrollCounter end={50} suffix="+" />
              </span>
              <span className="font-mono text-[9px] text-[#00AEEF] uppercase font-bold block">Cities in India</span>
              <p className="font-sans text-[11px] text-slate-500">Active merchant networks</p>
            </div>

            {/* Grid 2 */}
            <div className="space-y-1">
              <span className="font-display font-black text-3xl sm:text-4xl text-[#FFB800] block">
                <ScrollCounter end={99} suffix=".8%" />
              </span>
              <span className="font-mono text-[9px] text-[#0A1628] uppercase font-bold block">On-Time Drafts</span>
              <p className="font-sans text-[11px] text-slate-500">Zero school delivery delays</p>
            </div>

            {/* Grid 3 */}
            <div className="space-y-1">
              <span className="font-display font-black text-3xl sm:text-4xl text-[#0A1628] block">
                <ScrollCounter end={10000} suffix="+" />
              </span>
              <span className="font-mono text-[9px] text-[#00AEEF] uppercase font-bold block">Records Processed</span>
              <p className="font-sans text-[11px] text-slate-500">In single batch drafts</p>
            </div>

            {/* Grid 4 */}
            <div className="space-y-1">
              <span className="font-display font-black text-3xl sm:text-4xl text-emerald-600 block">
                <ScrollCounter end={2} suffix=".5X+" />
              </span>
              <span className="font-mono text-[9px] text-[0A1628] uppercase font-bold block">Merchant Profit</span>
              <p className="font-sans text-[11px] text-slate-500">Documented in 90 days</p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1.6: HOW IT WORKS TIMELINE (3 STEPS) */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-mono font-bold text-[#00AEEF] uppercase tracking-wider block">LOGISTIC WALKTHROUGH</span>
            <h2 className="font-display font-black text-3xl text-[#0A1628]">Straightforward Production Pipeline</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Dotted connecting line for desktop - scroll driven */}
            <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[4px] bg-slate-100 rounded-full overflow-hidden">
              <div 
                ref={progressLineRef}
                className="h-full bg-gradient-to-r from-[#00AEEF] via-[#FFB800] to-emerald-500 transition-width duration-200 ease-out"
              />
            </div>

            {/* Step 1 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/50 space-y-4 relative z-10 text-left transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 font-display font-extrabold text-[#00AEEF] text-lg flex items-center justify-center shadow-inner">
                01
              </div>
              <h3 className="font-display font-bold text-base text-[#0A1628]">Upload Excel & ZIP</h3>
              <p className="font-sans text-xs text-slate-500 leading-relaxed">
                Import client data directly from an Excel sheet, and dump uncropped student portrait photos into a simple ZIP upload box.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/50 space-y-4 relative z-10 text-left transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-50 font-display font-extrabold text-[#FFB800] text-lg flex items-center justify-center shadow-inner">
                02
              </div>
              <h3 className="font-display font-bold text-base text-[#0A1628]">AI Autocrop & Match</h3>
              <p className="font-sans text-xs text-slate-500 leading-relaxed">
                Our semantic system immediately handles background replacement, scales face coordinates, and pairs pictures instantly using Roll ID keywords.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/50 space-y-4 relative z-10 text-left transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 font-display font-extrabold text-emerald-600 text-lg flex items-center justify-center shadow-inner">
                03
              </div>
              <h3 className="font-display font-bold text-base text-[#0A1628]">Download Bulk PDF</h3>
              <p className="font-sans text-xs text-slate-500 leading-relaxed">
                Generate high-resolution dual-sided sheets formatted for high-speed laser/thermal card printers with active crop guides.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center text-xs">
            <button 
              onClick={() => onPageChange('how-it-works')}
              className="font-mono font-bold text-[#00AEEF] hover:underline inline-flex items-center gap-1"
            >
              LEARN STEP-BY-STEP WORKFLOW DETAILS →
            </button>
          </div>

        </div>
      </section>



      {/* SECTION 1.7: PLATFORM PREVIEW - INTERACTIVE MOCKUP */}
      <section className="py-20 bg-[#F4F7FB]/70 border-y border-slate-200/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono font-bold text-[#0A1628] uppercase tracking-wider block">SYSTEM GLIMPSE</span>
            <h2 className="font-display font-black text-3xl text-[#0A1628]">Modern Operator Console</h2>
            <p className="font-sans text-xs text-[#4A5568]">
              We built an interface designed optimized specifically for rapid pre-press sorting. Take a closer look below.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onPageChange('how-it-works')}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0A1628] hover:bg-slate-800 text-white text-xs font-bold rounded-full transition shadow-md"
              >
                See How It Works
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Navigation Control inside mock */}
          <div className="relative flex items-center justify-between max-w-4xl mx-auto mb-8 bg-slate-100/60 p-1.5 rounded-full border border-slate-200/80 shadow-inner">
            {/* Left Nav Arrow */}
            <button
              type="button"
              onClick={handlePrevTab}
              className="p-2 text-slate-500 hover:text-[#00AEEF] hover:bg-white rounded-full transition-all duration-150 shrink-0 cursor-pointer shadow-sm border border-transparent hover:border-slate-200 active:scale-90 bg-white/70"
              title="Previous Tab"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Hidden Scrollbar Container for Tab List */}
            <div 
              className="flex-1 flex justify-start sm:justify-center gap-1 md:gap-3 overflow-x-auto px-2 select-none scrollbar-none"
            >
              {(['projects', 'records', 'batches', 'templates', 'ai_insights'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActivePreviewTab(tab)}
                  className={`px-3 py-1.5 border-b-2 font-display text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activePreviewTab === tab 
                      ? 'border-[#00AEEF] text-[#00AEEF] font-black' 
                      : 'border-transparent text-slate-400 hover:text-slate-800'
                  }`}
                >
                  {tab === 'projects' && <><Folder className="w-3 h-3" /> Projects View</>}
                  {tab === 'records' && <><Users className="w-3 h-3" /> Records Manager</>}
                  {tab === 'batches' && <><Printer className="w-3 h-3" /> Batch PDF Printer</>}
                  {tab === 'templates' && <><Layout className="w-3 h-3" /> Templates Gallery</>}
                  {tab === 'ai_insights' && <><Sparkles className="w-3 h-3 text-cyan-500 animate-pulse" /> AI Insights</>}
                </button>
              ))}
            </div>

            {/* Right Nav Arrow */}
            <button
              type="button"
              onClick={handleNextTab}
              className="p-2 text-slate-500 hover:text-[#00AEEF] hover:bg-white rounded-full transition-all duration-150 shrink-0 cursor-pointer shadow-sm border border-transparent hover:border-slate-200 active:scale-90 bg-white/70"
              title="Next Tab"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mock Dashboard Window Frame with Cinematic 3D entrance */}
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95, rotateX: 3 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl overflow-hidden max-w-4xl mx-auto"
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
          >
            {/* Top Browser Bar */}
            <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400 block" />
                <span className="w-3 h-3 rounded-full bg-yellow-400 block" />
                <span className="w-3 h-3 rounded-full bg-green-400 block" />
              </div>
              <div className="bg-white/80 border border-slate-200 text-[#0A1628]/60 text-[10px] font-mono px-6 py-1 rounded-md w-72 text-center font-bold">
                https://ivyprints.in/portal/dashboard
              </div>
              <div className="text-slate-500 text-[10px] font-mono flex items-center gap-1">
                <Monitor className="w-3.5 h-3.5 text-emerald-500" />
                <span>Cloud Connection Live</span>
              </div>
            </div>

            {/* View Title Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white border-b border-slate-200 px-6 py-3 gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-sans font-bold text-slate-700">
                  {activePreviewTab === 'projects' && "Projects Dashboard — Multi-school portfolio status tracking"}
                  {activePreviewTab === 'records' && "Records Manager — Real-time pre-press grid and portrait approvals"}
                  {activePreviewTab === 'batches' && "Print Batches — A4 thermal plate-sheets compiler queue"}
                  {activePreviewTab === 'templates' && "Global Templates — Ready-to-print laminate & lanyard dimensions"}
                  {activePreviewTab === 'ai_insights' && "AI Auditing Analytics & Facial Alignment Logs"}
                </span>
              </div>
              <div className="hidden sm:block text-[10px] font-mono text-slate-400">
                Resolution: 1920x1080 (High-DPI)
              </div>
            </div>

            {/* Mock Dashboard Window Payload */}
            <div className="p-6 bg-slate-50 min-h-[350px] relative">
              <div className="animate-in fade-in duration-300">
                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
                  {/* The Image Section */}
                  <div className="flex-1 bg-slate-100 p-4 flex items-center justify-center min-h-[380px] lg:min-h-[440px] relative group select-none">
                    <img 
                      src={
                        activePreviewTab === 'projects' ? '/screenshots/projects.png' :
                        activePreviewTab === 'records' ? '/screenshots/records.png' :
                        activePreviewTab === 'batches' ? '/screenshots/batches.png' :
                        activePreviewTab === 'templates' ? '/screenshots/templates.png' :
                        '/screenshots/ai_insights.png'
                      } 
                      alt={`${activePreviewTab} console application screenshot`} 
                      className="max-w-full max-h-[440px] w-auto h-auto rounded-lg shadow-md border border-slate-200 transition-all duration-300 group-hover:scale-[1.015]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-[#0A1628]/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] text-[#00AEEF] font-mono flex items-center gap-1.5 shadow-md border border-cyan-500/25">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-bold tracking-wider uppercase">Console Screen Capture</span>
                    </div>
                  </div>

                  {/* Explanatory Sidebar */}
                  <div className="w-full lg:w-72 bg-slate-50 p-5 flex flex-col justify-between shrink-0">
                    <div className="space-y-4 text-left">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono font-bold text-[#00AEEF] tracking-widest uppercase block">
                          {activePreviewTab === 'projects' && 'Overview & Entity Sync'}
                          {activePreviewTab === 'records' && 'Inline Prepress Control'}
                          {activePreviewTab === 'batches' && 'Output Automation'}
                          {activePreviewTab === 'templates' && 'Visual Layouts Grid'}
                          {activePreviewTab === 'ai_insights' && 'Intelligent Quality Guard'}
                        </span>
                        <h4 className="font-display font-black text-sm text-[#0A1628] leading-tight flex items-center gap-1.5">
                          {activePreviewTab === 'projects' && <>Projects Dashboard</>}
                          {activePreviewTab === 'records' && <>Records Manager</>}
                          {activePreviewTab === 'batches' && <>Print Batches Hub</>}
                          {activePreviewTab === 'templates' && <>Global Templates Gallery</>}
                          {activePreviewTab === 'ai_insights' && <>AI Processing Insights</>}
                        </h4>
                        <p className="font-sans text-[11px] text-[#4A5568] leading-relaxed pt-1.5">
                          {activePreviewTab === 'projects' && 'Track core milestones across multiple schools simultaneously. Watch live data import, approval stages, and physical lamination logs in a consolidated hub.'}
                          {activePreviewTab === 'records' && 'Complete row-by-row pre-press grids with instant filters. Inspect real student portraits, correct address spelling, and check RFID lanyards fields.'}
                          {activePreviewTab === 'batches' && 'Automate layout sheets creation. Compile massive card databases into 8-up or 10-up layouts with high-precision front-to-back duplex alignment.'}
                          {activePreviewTab === 'templates' && 'Access direct printer-friendly lamination dimensions (CR-80 standards) with barcode structures, magnetic stripes, and RFID support.'}
                          {activePreviewTab === 'ai_insights' && 'Ensure face posture optimization, automated studio-white replacements, and robust typos validation to save margins and sheets cost.'}
                        </p>
                      </div>

                      <div className="space-y-2.5 pt-4 border-t border-slate-200">
                        <h5 className="font-display font-bold text-[10px] text-slate-800 uppercase tracking-wider">Highlighted Specs:</h5>
                        <ul className="space-y-2 text-[10px] font-sans text-slate-600">
                          {activePreviewTab === 'projects' && (
                            <>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[#00AEEF] font-bold mt-0.5">✓</span>
                                <span>Unified tracking for 14+ active, initialized, and archived school jobs.</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[#00AEEF] font-bold mt-0.5">✓</span>
                                <span>Automated progress chips representing state (e.g. data_imported).</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[#00AEEF] font-bold mt-0.5">✓</span>
                                <span>One-click addition controls to construct brand-new portfolios instantly.</span>
                              </li>
                            </>
                          )}
                          {activePreviewTab === 'records' && (
                            <>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[#00AEEF] font-bold mt-0.5">✓</span>
                                <span>Live search filter inputs parsing thousands of database rows.</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[#00AEEF] font-bold mt-0.5">✓</span>
                                <span>Instant columns for Photos, Names, Father details, DOB, and Roll Numbers.</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[#00AEEF] font-bold mt-0.5">✓</span>
                                <span>Excel uploads, ZIP photo imports, and bulk-approval toolsets.</span>
                              </li>
                            </>
                          )}
                          {activePreviewTab === 'batches' && (
                            <>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[#00AEEF] font-bold mt-0.5">✓</span>
                                <span>Duplex-aligned compiling ensuring perfect front-back lamination cards.</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[#00AEEF] font-bold mt-0.5">✓</span>
                                <span>Batch indexing (BCH-12, BCH-11, BCH-10) with execution completion logs.</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[#00AEEF] font-bold mt-0.5">✓</span>
                                <span>High-speed compilations processing over 4,500 records in 28 seconds.</span>
                              </li>
                            </>
                          )}
                          {activePreviewTab === 'templates' && (
                            <>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[#00AEEF] font-bold mt-0.5">✓</span>
                                <span>Horizontal and vertical layouts optimized for CBSE and RFID standards.</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[#00AEEF] font-bold mt-0.5">✓</span>
                                <span>Fast-cloning system to duplicate and tweak baseline student templates.</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[#00AEEF] font-bold mt-0.5">✓</span>
                                <span>Dual-sided template specifications indicating crop lines.</span>
                              </li>
                            </>
                          )}
                          {activePreviewTab === 'ai_insights' && (
                            <>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[#00AEEF] font-bold mt-0.5">✓</span>
                                <span>Deep face posture normalization scoring with low-confidence notifications.</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[#00AEEF] font-bold mt-0.5">✓</span>
                                <span>Studio-white replacement verification filters detecting shadow errors.</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[#00AEEF] font-bold mt-0.5">✓</span>
                                <span>100% automated parsing showing zero manual intervention for approved paths.</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 1.8: AI FEATURE SPOTLIGHT - HIGH-PERFORMANCE ANIMATED DEMO */}
      <AIShowcase />

      {/* SECTION 1.6.5: DEDICATED MOBILE APP EXPERIENCE */}
      <section className="py-24 bg-gradient-to-br from-[#060D1F] via-[#0A1628] to-[#040812] text-white border-t border-slate-900 relative overflow-hidden">
        {/* Ambient glowing backdrops */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00AEEF]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Content & Action Selectors */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00AEEF]/10 border border-[#00AEEF]/20 text-[#00AEEF] font-mono text-[10px] font-bold uppercase tracking-wider">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>On-Field Mobile Toolkit</span>
                </div>
                <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
                  Dedicated B2B Mobile App <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#FFB800]">For Smart On-Field Collection.</span>
                </h2>
                <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
                  We have a dedicated B2B mobile app for seamless on-site operations.<br />
                  Vendors and school staff can log in, capture photos, and update details on the go.
                </p>
              </div>

              {/* Quick Highlight Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-slate-800/80 py-5 text-left">
                <div className="flex items-start gap-2.5">
                  <span className="text-[#00AEEF] text-xs mt-0.5">👤</span>
                  <div>
                    <h5 className="font-sans font-bold text-xs text-white">Vendor Portal & Capture</h5>
                    <p className="font-sans text-[10px] text-slate-400 mt-0.5 leading-snug">Log in as a vendor to assign tasks, shoot photos, and sync databases.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-yellow-400 text-xs mt-0.5">🏫</span>
                  <div>
                    <h5 className="font-sans font-bold text-xs text-white">Staff Login & Roster Updates</h5>
                    <p className="font-sans text-[10px] text-slate-400 mt-0.5 leading-snug">School staff log in directly to edit student details, upload, or capture missing data.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 text-xs mt-0.5">✨</span>
                  <div>
                    <h5 className="font-sans font-bold text-xs text-white">No Watermarks</h5>
                    <p className="font-sans text-[10px] text-slate-400 mt-0.5 leading-snug">100% clean and watermark-free B2B photo exports for printing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-purple-400 text-xs mt-0.5">⚡</span>
                  <div>
                    <h5 className="font-sans font-bold text-xs text-white">Auto BG Remove & Capture</h5>
                    <p className="font-sans text-[10px] text-slate-400 mt-0.5 leading-snug">Instant face alignment autofocus capture with automatic studio backdrop replacement.</p>
                  </div>
                </div>
              </div>

              {/* Interactive Slide Controls */}
              <div className="space-y-3.5">
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block font-bold">SELECT INTERACTIVE DEMO SLIDES:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {APP_SLIDES.map((slide, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveAppSlide(index)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden flex items-start gap-3.5 ${
                        activeAppSlide === index
                          ? 'bg-[#0F1D38] border-[#00AEEF] shadow-lg shadow-[#00AEEF]/5 text-white ring-1 ring-[#00AEEF]/30'
                          : 'bg-slate-900/40 border-slate-800/70 text-slate-400 hover:bg-slate-900/80 hover:text-slate-200'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-display font-black text-xs ${
                        activeAppSlide === index ? 'bg-[#00AEEF] text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {index === 0 ? <Camera className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[7.5px] font-mono uppercase font-bold tracking-wider text-slate-400 block">{slide.badge}</span>
                        <h4 className="font-sans font-bold text-xs leading-none">{slide.title}</h4>
                        <p className="font-sans text-[10px] leading-snug line-clamp-1 opacity-80">
                          {slide.badge === 'VENDOR ACCESS' && 'Vendor dashboard portal'}
                          {slide.badge === 'STAFF ACCESS' && 'Client coordinator portal'}
                          {slide.badge === 'SMART CAMERA' && 'Face crop capture guidance'}
                          {slide.badge === 'AI BG REMOVE' && 'Instant studio backdrops'}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Interactive Smart Phone Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative lg:translate-y-16 lg:mt-8">
              
              {/* Faded background text */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none text-[8rem] lg:text-[10rem] font-black text-white/[0.01] tracking-widest font-display rotate-90 uppercase">
                APP VIEW
              </div>

              <div className="relative w-full max-w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col z-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border border-slate-800">
                {/* Physical Hardware Buttons */}
                <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] bg-slate-800 rounded-l-md" />
                <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] bg-slate-800 rounded-l-md" />
                <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] bg-slate-800 rounded-l-md" />
                <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] bg-slate-800 rounded-r-md" />

                {/* Inner Screen Container */}
                <div className="absolute inset-[6px] bg-[#070D19] rounded-[2.5rem] overflow-hidden text-white z-10">
                  
                  {/* Screen Top Status bar */}
                  <div className="absolute top-0 inset-x-0 h-10 px-6 flex items-center justify-between text-[8px] font-mono text-slate-350 z-30 pointer-events-none">
                    <span>9:41</span>
                    {/* Dynamic Island */}
                    <div className="w-[85px] h-[20px] bg-black rounded-full shadow-inner flex items-center justify-end px-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] animate-pulse" />
                    </div>
                    <div className="flex items-center gap-1">
                      <span>📶</span>
                      <span>🔋</span>
                    </div>
                  </div>

                  {/* App Screen Screenshot Image */}
                  <div className="w-full h-full relative overflow-hidden bg-[#070D19]">
                    <img 
                      key={activeAppSlide}
                      src={APP_SLIDES[activeAppSlide].image} 
                      alt={APP_SLIDES[activeAppSlide].title} 
                      className="w-full h-full object-contain animate-fade-in animate-duration-300"
                    />
                  </div>

                  {/* Screen bottom bar */}
                  <div className="absolute bottom-0 inset-x-0 h-6 flex items-center justify-center bg-gradient-to-t from-black/80 to-transparent z-25 pointer-events-none">
                    <div className="w-24 h-1 bg-white/40 rounded-full" />
                  </div>

                </div>
              </div>

              {/* Active slide description details bubble underneath phone */}
              <div className="mt-6 p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl max-w-sm text-center lg:text-left shadow-md">
                <span className="font-mono text-[8px] text-[#00AEEF] uppercase font-black tracking-widest block mb-1">Active Slide Description</span>
                <p className="font-sans text-[11px] text-slate-350 leading-relaxed">{APP_SLIDES[activeAppSlide].description}</p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1.9: TESTIMONIAL CAROUSEL */}
      <section className="bg-slate-50/50 py-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-mono font-bold text-[#00AEEF] uppercase tracking-wider block">TESTIMONIAL STORIES</span>
            <h2 className="font-display font-black text-3xl text-[#0A1628]">What Smarter Printing Merchants Say</h2>
            <p className="text-slate-500 text-xs font-sans">Swipe left or right, or tap on the side cards to browse</p>
          </div>

          {/* Carousel Stage Wrapper */}
          <div 
            className="relative w-full max-w-5xl mx-auto h-[320px] flex items-center justify-center overflow-visible select-none cursor-grab active:cursor-grabbing"
            onTouchStart={(e) => {
              const startX = e.touches[0].clientX;
              const onTouchEnd = (ev: TouchEvent) => {
                const diff = ev.changedTouches[0].clientX - startX;
                if (Math.abs(diff) > 40) {
                  if (diff > 0) {
                    setActiveTestiIndex(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
                  } else {
                    setActiveTestiIndex(prev => (prev + 1) % TESTIMONIALS.length);
                  }
                }
                window.removeEventListener('touchend', onTouchEnd);
              };
              window.addEventListener('touchend', onTouchEnd);
            }}
            onMouseDown={(e) => {
              const startX = e.clientX;
              const onMouseUp = (ev: MouseEvent) => {
                const diff = ev.clientX - startX;
                if (Math.abs(diff) > 40) {
                  if (diff > 0) {
                    setActiveTestiIndex(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
                  } else {
                    setActiveTestiIndex(prev => (prev + 1) % TESTIMONIALS.length);
                  }
                }
                window.removeEventListener('mouseup', onMouseUp);
              };
              window.addEventListener('mouseup', onMouseUp);
            }}
          >
            {TESTIMONIALS.map((testi, idx) => {
              let diff = idx - activeTestiIndex;
              // Handle loop wrapping
              if (diff < -1) diff += TESTIMONIALS.length;
              if (diff > 1) diff -= TESTIMONIALS.length;

              const isActive = diff === 0;
              const isPrev = diff === -1;
              const isNext = diff === 1;
              const isHidden = !isActive && !isPrev && !isNext;

              // Translate and styling logic
              let translateX = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 10;
              let blur = 0;

              if (isActive) {
                translateX = 0;
                scale = 1;
                opacity = 1;
                zIndex = 30;
                blur = 0;
              } else if (isPrev) {
                translateX = isMobile ? -140 : -320;
                scale = 0.85;
                opacity = 0.5;
                zIndex = 20;
                blur = 3;
              } else if (isNext) {
                translateX = isMobile ? 140 : 320;
                scale = 0.85;
                opacity = 0.5;
                zIndex = 20;
                blur = 3;
              } else {
                translateX = isMobile ? 240 : 500;
                scale = 0.7;
                opacity = 0;
                zIndex = 10;
                blur = 6;
              }

              return (
                <DynamicTestimonialCard
                  key={testi.id}
                  onClick={() => {
                    if (!isActive) {
                      setActiveTestiIndex(idx);
                    }
                  }}
                  className="absolute w-[280px] sm:w-[350px] h-[240px] bg-white border border-slate-200/80 p-6 rounded-2xl flex flex-col justify-between shadow-lg shadow-slate-100/50 transition-all duration-500 ease-out cursor-pointer origin-center"
                  translateX={translateX}
                  scale={scale}
                  opacity={opacity}
                  zIndex={zIndex}
                  blur={blur}
                  pointerEvents={isHidden ? 'none' : 'auto'}
                >
                  <div className="space-y-3">
                    {/* Rating Stars */}
                    <div className="flex gap-1 text-[#FFB800] text-sm">
                      {Array.from({ length: testi.rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    
                    <p className="font-sans text-xs sm:text-[13px] text-slate-650 italic leading-relaxed">
                      "{testi.quote}"
                    </p>
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00AEEF] to-[#0A1628] flex items-center justify-center font-display font-black text-white text-xs shrink-0">
                      {testi.avatarText}
                    </div>
                    <div className="text-left font-sans min-w-0">
                      <h5 className="font-bold text-xs sm:text-sm text-[#0A1628] truncate">{testi.name}</h5>
                      <p className="text-[10px] text-slate-400 truncate">{testi.businessName} ({testi.city})</p>
                    </div>
                  </div>
                </DynamicTestimonialCard>
              );
            })}

            {/* Next/Prev Navigation Buttons */}
            {!isMobile && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTestiIndex(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-[#00AEEF] transition-all hover:scale-105 active:scale-95 z-40"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTestiIndex(prev => (prev + 1) % TESTIMONIALS.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-[#00AEEF] transition-all hover:scale-105 active:scale-95 z-40"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestiIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeTestiIndex === i ? 'bg-[#00AEEF] w-6' : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </section>



      {/* SECTION 1.11: FINAL CTA */}
      <section className="relative bg-gradient-to-br from-[#0A1628] to-[#001D38] text-white py-16 md:py-24 text-center overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#00AEEF]/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFB800]/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <span className="text-[#00AEEF] font-mono text-xs font-bold uppercase tracking-widest block">SECURE FREE TRIAL</span>
          
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight leading-tight max-w-2xl mx-auto">
            Your First Project is Just One Click Away.
          </h2>

          <p className="sans-serif text-sm text-slate-350 max-w-lg mx-auto leading-relaxed">
            Join hundreds of trusted printing vendors scaling from Dwarka to Hyderabad. Upload details, crop, and run batches free with no risk.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button 
              type="button"
              onClick={() => onPageChange('signup')}
              className="w-full sm:w-auto px-8 py-4 bg-[#00AEEF] text-white hover:bg-[#0096ce] rounded-xl font-sans font-black flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition"
            >
              <span>Start For Free →</span>
            </button>
            <button 
              type="button"
              onClick={() => onPageChange('contact')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-slate-700 hover:border-slate-500 rounded-xl font-sans font-bold flex items-center justify-center gap-1.5 transition text-slate-300"
            >
              <span>Enquire Sales & Support</span>
            </button>
          </div>

          <div className="pt-4 text-[10px] font-mono text-slate-500 flex items-center justify-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#00AEEF] shrink-0" />
            <span>Made under Indian digital service sovereignty mandates.</span>
          </div>
        </div>
      </section>

      {/* DEMO INSTRUCTION VIDEO MODAL (ACCESSIBLE GHOST WINDOW) */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden border border-slate-200">
            <div className="bg-[#0A1628] text-white p-4.5 flex justify-between items-center">
              <span className="font-display font-bold text-sm">IVY Prints Operation Demo</span>
              <button 
                onClick={() => setShowDemoModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕ Close
              </button>
            </div>
            <div className="p-8 text-center space-y-4">
              <div className="w-20 h-20 bg-cyan-50 border border-cyan-200 text-[#00AEEF] rounded-full mx-auto flex items-center justify-center animate-pulse">
                <Play className="w-8 h-8 fill-current" />
              </div>
              <h3 className="font-display font-extrabold text-[#0A1628] text-lg">Simulation Demonstration Video</h3>
              <p className="font-sans text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                This is a mock representation of our 2-minute merchant walkthrough. Our dashboard handles high speed matching of student names with cropped portrait data files seamlessly in real-time.
              </p>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-left text-xs font-mono text-slate-700 space-y-1">
                <div>[SOURCE_STAGE] production-ivy-prints.pages.dev</div>
                <div>[RESOLUTION] 1080p Web Stream ready</div>
                <div>[BUFFER_STATUS] Active Dual Sided PDF Buffer</div>
              </div>
              <button 
                type="button"
                onClick={() => setShowDemoModal(false)}
                className="px-6 py-2.5 bg-[#00AEEF] text-white rounded-lg text-xs font-sans font-bold hover:bg-[#0096ce]"
              >
                Got It, Let me Try Dashboard Features
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
