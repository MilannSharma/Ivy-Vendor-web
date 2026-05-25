"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  @keyframes hero-fade-in {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .hero-text-animate {
    opacity: 0;
    animation: hero-fade-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .hero-text-clip {
    opacity: 1;
  }

  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* -------------------------------------------------------------------
     PHYSICAL SKEUOMORPHIC MATERIALS (Restored 3D Depth)
  ---------------------------------------------------------------------- */
  
  /* OUTSIDE THE CARD: Theme-aware text (Shadow in Light Mode, Glow in Dark Mode) */
  .text-3d-matte {
      color: #FFFFFF;
      text-shadow: 
          0 10px 30px rgba(255, 255, 255, 0.2), 
          0 2px 4px rgba(255, 255, 255, 0.1);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.6) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0); /* Hardware acceleration to prevent WebKit clipping bug */
      filter: 
          drop-shadow(0px 10px 20px rgba(255, 255, 255, 0.15)) 
          drop-shadow(0px 2px 4px rgba(255, 255, 255, 0.1));
  }

  /* INSIDE THE CARD: Hardcoded Silver/White for the dark background, deep rich shadows */
  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  /* Deep Physical Card with Dynamic Mouse Lighting */
  .premium-depth-card {
      background: linear-gradient(145deg, #162C6D 0%, #0A101D 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  /* Realistic iPhone Mockup Hardware */
  .iphone-bezel {
      background-color: #111;
      box-shadow: 
          inset 0 0 0 2px #52525B, 
          inset 0 0 0 7px #000, 
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow: 
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow: 
          0 10px 20px rgba(0,0,0,0.3),
          inset 0 1px 1px rgba(255,255,255,0.05),
          inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  /* Physical Tactile Buttons */
  .btn-modern-light, .btn-modern-dark {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
      color: #0F172A;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:active {
      transform: translateY(1px);
      background: linear-gradient(180deg, #F1F5F9 0%, #E2E8F0 100%);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1), inset 0 3px 6px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.02);
  }
  .btn-modern-dark {
      background: linear-gradient(180deg, #27272A 0%, #18181B 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #3F3F46 0%, #27272A 100%);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:active {
      transform: translateY(1px);
      background: #18181B;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.05), inset 0 3px 8px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(0,0,0,0.5);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  subtitle?: string;
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  className?: string;
}

export function CinematicHero({ 
  subtitle,
  brandName = "Sobers",
  tagline1 = "Track the journey,",
  tagline2 = "not just the days.",
  cardHeading = "Accountability, redefined.",
  cardDescription = <><span className="text-white font-semibold">Sobers</span> empowers sponsors and sponsees in 12-step recovery programs with structured accountability, precise sobriety tracking, and beautiful visual timelines.</>,
  metricValue = 365,
  metricLabel = "Days Sober",
  ctaHeading = "Start your recovery.",
  ctaDescription = "Join thousands of others in the 12-step program and take control of your timeline today.",
  className, 
  ...props 
}: CinematicHeroProps) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // 1. High-Performance Mouse Interaction Logic (Using requestAnimationFrame)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);
      
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          
          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  },[]);

  // 3. Complex Cinematic Scroll Timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Hero texts revealed by CSS — GSAP handles scroll-driven animations only
      gsap.set(".main-card", { y: window.innerHeight + 300, autoAlpha: 1, scale: 1, borderRadius: isMobile ? "32px" : "40px" });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, y: 60, scale: 0.92, filter: "blur(20px)" });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3200",        // more scroll = slower, more cinematic feel
          pin: true,
          scrub: 2,             // higher = more inertia/lag behind scroll (buttery)
          anticipatePin: 1,
          snap: {               // subtle snap points between phases
            snapTo: "labels",
            duration: { min: 0.3, max: 0.8 },
            ease: "power3.inOut",
          },
        },
      });

      scrollTl
        // ── PHASE 1: Card rises from below (hero text stays visible, card covers it) ──
        .addLabel("rise")
        .to(".bg-grid-theme", {
          scale: 1.08, opacity: 0.06,
          ease: "none", duration: 3
        }, "rise")
        .to(".main-card", {
          y: 0,
          ease: "power4.out", duration: 3
        }, "rise")

        // ── PHASE 2: Card expands to fill screen ──
        .addLabel("expand", "+=0.2")
        .to(".main-card", {
          width: "100%", height: "100%", borderRadius: "0px",
          ease: "expo.inOut", duration: 2.5
        }, "expand")

        // ── PHASE 3: Mockup emerges from depth ──
        .addLabel("reveal", "+=0.3")
        .fromTo(".mockup-scroll-wrapper",
          { y: 280, z: -400, rotationX: 45, rotationY: -20, autoAlpha: 0, scale: 0.6 },
          { y: 0,   z: 0,    rotationX: 0,  rotationY: 0,   autoAlpha: 1, scale: 0.85,
            ease: "expo.out", duration: 3 }, "reveal"
        )
        .fromTo(".phone-widget",
          { y: 40, autoAlpha: 0, scale: 0.88 },
          { y: 0,  autoAlpha: 1, scale: 1,
            stagger: 0.12, ease: "back.out(1.4)", duration: 1.6 }, "reveal+=1"
        )
        .to(".progress-ring", {
          strokeDashoffset: 60,
          ease: "power3.inOut", duration: 2.5
        }, "reveal+=1.2")
        .to(".counter-val", {
          innerHTML: metricValue, snap: { innerHTML: 1 },
          ease: "power3.out", duration: 2.5
        }, "reveal+=1.2")
        .fromTo(".floating-badge",
          { y: 80, autoAlpha: 0, scale: 0.65, rotationZ: -6 },
          { y: 0,  autoAlpha: 1, scale: 0.85, rotationZ: 0,
            ease: "back.out(1.5)", duration: 1.8, stagger: 0.18 }, "reveal+=1.4"
        )
        .fromTo(".card-left-text",
          { x: -40, autoAlpha: 0 },
          { x: 0,   autoAlpha: 1, ease: "expo.out", duration: 1.6 }, "reveal+=1.6"
        )
        .fromTo(".card-right-text",
          { x: 40, autoAlpha: 0, scale: 0.88 },
          { x: 0,  autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.6 }, "reveal+=1.6"
        )

        // ── PHASE 4: Hold / breathe moment ──
        .addLabel("hold", "+=0.5")
        .to({}, { duration: 2 }, "hold")

        // ── PHASE 5: Contents exit, CTA fades in ──
        .addLabel("exit", "+=0.2")
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.75, y: -80, z: -200, autoAlpha: 0,
          ease: "power4.in", duration: 1.5, stagger: 0.04
        }, "exit")
        .to(".cta-wrapper", {
          autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)",
          ease: "expo.out", duration: 2
        }, "exit+=0.6")
        .to(".hero-text-wrapper", { autoAlpha: 0, duration: 0.4 }, "exit")

        // ── PHASE 6: Card pulls back to reveal full CTA ──
        .addLabel("pullback", "+=0.4")
        .to(".main-card", {
          width: isMobile ? "90vw" : "82vw",
          height: isMobile ? "90vh" : "82vh",
          borderRadius: isMobile ? "28px" : "36px",
          ease: "expo.inOut", duration: 2.5
        }, "pullback")

        // ── PHASE 7: Card exits upward ──
        .addLabel("exit-card", "+=0.5")
        .to(".main-card", {
          y: -(window.innerHeight + 400),
          ease: "expo.in", duration: 2
        }, "exit-card")
        .set(".main-card", { pointerEvents: "none" });

    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]); 

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-[#0A1628] font-sans antialiased perspective-1500", className)}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* BACKGROUND LAYER: Hero Texts — always visible via CSS animation */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform transform-style-3d">
        {subtitle && (
          <p className="hero-text-animate mb-4 text-[11px] md:text-xs font-black tracking-[0.35em] uppercase text-[#00AEEF] delay-[50ms]">
            {subtitle}
          </p>
        )}
        <h1 className={`hero-text-animate text-3d-matte text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2 ${subtitle ? 'delay-[250ms]' : 'delay-[50ms]'}`}>
          {tagline1}
        </h1>
        <h1 className={`hero-text-animate text-silver-matte text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter ${subtitle ? 'delay-[450ms]' : 'delay-[250ms]'}`}>
          {tagline2}
        </h1>
      </div>

      {/* BACKGROUND LAYER 2: Tactile CTA Buttons */}
      <div className="cta-wrapper absolute inset-0 z-10 flex flex-col items-center justify-center text-center w-screen h-screen bg-gradient-to-b from-[#0C1B3A] to-[#060D1F] px-4 pointer-events-auto will-change-transform overflow-hidden invisible">
        
        {/* Background Faded Text */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none">
          <span className="text-[14rem] md:text-[20rem] font-black text-white/[0.03] tracking-widest uppercase whitespace-nowrap drop-shadow-2xl">
            {brandName}
          </span>
        </div>

        <div className="relative z-10 mb-20 mt-10">
          <h3 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4 drop-shadow-lg">
            {brandName}
          </h3>
          <p className="text-[8px] md:text-[10px] font-bold text-slate-400 tracking-[0.35em] uppercase">
            THE NEXT-GEN B2B ID CARD PRE-PRESS & AUTOMATION PLATFORM
          </p>
        </div>

        <h2 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white max-w-4xl drop-shadow-md">
          {ctaHeading}
        </h2>
        
        <p className="relative z-10 text-slate-400 text-base md:text-lg mb-12 max-w-2xl mx-auto font-medium leading-relaxed px-4">
          {ctaDescription}
        </p>

        <div className="relative z-10 flex items-center justify-center w-full max-w-[280px] mb-8">
          <div className="h-[1px] bg-slate-700 flex-grow"></div>
          <span className="px-4 text-[9px] font-black tracking-[0.2em] text-slate-500 uppercase">DOWNLOAD NOW</span>
          <div className="h-[1px] bg-slate-700 flex-grow"></div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4 pb-12">
          <a href="#" aria-label="Download on the App Store" className="bg-[#F2F2F7] text-black flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg border border-white/50">
            {/* Authentic Apple App Store Logo SVG */}
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 384 512" aria-hidden="true">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
            <div className="text-left leading-none">
              <div className="text-[8px] md:text-[9px] font-bold tracking-wider text-slate-600 uppercase mb-0.5">Download on the</div>
              <div className="text-lg md:text-xl font-bold tracking-tight">App Store</div>
            </div>
          </a>
          <a href="#" aria-label="Get it on Google Play" className="bg-[#1C1C1E] text-white flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl hover:bg-[#2C2C2E] hover:scale-105 transition-all duration-300 shadow-lg shadow-black/40 border border-white/5">
            {/* Authentic Google Play Store Solid Logo SVG */}
            <svg className="w-6 h-6 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 512 512" aria-hidden="true">
               <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
            </svg>
            <div className="text-left leading-none">
              <div className="text-[8px] md:text-[9px] font-bold tracking-wider text-slate-400 uppercase mb-0.5">Get it on</div>
              <div className="text-lg md:text-xl font-bold tracking-tight">Google Play</div>
            </div>
          </a>
        </div>
      </div>

      {/* FOREGROUND LAYER: The Physical Deep Blue Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none perspective-1500">
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* DYNAMIC RESPONSIVE GRID: Flex-col on mobile to force order, Grid on desktop */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
            
            {/* 1. TOP (Mobile) / RIGHT (Desktop): BRAND NAME */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-6xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-card-silver-matte lg:mt-0">
                {brandName}
              </h2>
            </div>

            {/* 2. MIDDLE (Mobile) / CENTER (Desktop): IPHONE MOCKUP */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10 perspective-1000">
              
              {/* Inner wrapper for safe CSS scaling that doesn't conflict with GSAP */}
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">
                
                {/* The iPhone Bezel */}
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform transform-style-3d"
                >
                  {/* Physical Hardware Buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  {/* Inner Screen Container */}
                  <div className="absolute inset-[7px] bg-[#050914] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic Island Notch */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
                    </div>

                    {/* App Interface */}
                    <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
                      <div className="phone-widget flex justify-between items-center mb-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-1">Today</span>
                          <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">Journey</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/5 text-neutral-200 flex items-center justify-center font-bold text-sm border border-white/10 shadow-lg shadow-black/50">IVY</div>
                      </div>

                      <div className="phone-widget relative w-44 h-44 mx-auto flex items-center justify-center mb-8 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                          <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                          <circle className="progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#00AEEF" strokeWidth="12" />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="counter-val text-4xl font-extrabold tracking-tighter text-white">0</span>
                          <span className="text-[8px] text-blue-200/50 uppercase tracking-[0.1em] font-bold mt-0.5">{metricLabel}</span>
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        {/* Row 1: Auto Cropping */}
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-500/10 flex items-center justify-center border border-emerald-500/30 shadow-inner shrink-0">
                            <svg className="w-4 h-4 text-emerald-400 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-white/90 leading-none mb-0.5">Auto Cropping Done</p>
                            <p className="text-[8px] text-emerald-400/70 font-medium">Face-aligned &amp; framed</p>
                          </div>
                          <span className="text-[8px] font-black text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20 shrink-0">✓</span>
                        </div>

                        {/* Row 2: Auto BG Remove */}
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-500/10 flex items-center justify-center border border-emerald-500/30 shadow-inner shrink-0">
                            <svg className="w-4 h-4 text-emerald-400 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-white/90 leading-none mb-0.5">Auto BG Remove</p>
                            <p className="text-[8px] text-emerald-400/70 font-medium">Background cleared</p>
                          </div>
                          <span className="text-[8px] font-black text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20 shrink-0">✓</span>
                        </div>

                        {/* Row 3: Grammar & Spell Check */}
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-500/10 flex items-center justify-center border border-emerald-500/30 shadow-inner shrink-0">
                            <svg className="w-4 h-4 text-emerald-400 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-white/90 leading-none mb-0.5">Grammar &amp; Spell Check</p>
                            <p className="text-[8px] text-emerald-400/70 font-medium">No typos detected</p>
                          </div>
                          <span className="text-[8px] font-black text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20 shrink-0">✓</span>
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    </div>
                  </div>
                </div>

                {/* Floating Glass Badges */}
                <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-[#00AEEF]/20 to-[#00AEEF]/10 flex items-center justify-center border border-[#00AEEF]/30 shadow-inner">
                    <span className="text-base lg:text-xl drop-shadow-lg" aria-hidden="true">🚀</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">System Ready</p>
                    <p className="text-[#00AEEF]/50 text-[10px] lg:text-xs font-medium">Auto-cropping</p>
                  </div>
                </div>

                <div className="floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-[#FFB800]/20 to-[#FFB800]/10 flex items-center justify-center border border-[#FFB800]/30 shadow-inner">
                    <span className="text-base lg:text-lg drop-shadow-lg" aria-hidden="true">✓</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Records Merged</p>
                    <p className="text-[#FFB800]/50 text-[10px] lg:text-xs font-medium">Background Processed</p>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. BOTTOM (Mobile) / LEFT (Desktop): ACCOUNTABILITY TEXT */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                {cardHeading}
              </h3>
              {/* HIDDEN ON MOBILE (added hidden md:block) */}
              <p className="hidden md:block text-blue-100/70 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
