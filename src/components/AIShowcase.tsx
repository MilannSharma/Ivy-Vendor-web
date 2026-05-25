/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AIShowcase — Rebuilt 4-stage demo using user assets:
 * Stage 0: Original photo imported ("/import image.avif")
 * Stage 1: Auto-crop — face bounding box animates in, corners pulse ("/Crop image.jpg")
 * Stage 2: BG removed — checkerboard transparency, clean cutout ("/Bg remove image.png")
 * Stage 3: Completed ID card — renders a fully laid-out ID Card using the BG-removed asset
 */

import { useState, useEffect, useRef } from 'react';
import { applyDynamicStyles, cn } from '../lib/utils';

const STAGES = [
  { id: 'import',   label: 'IMPORTING PHOTO',  color: '#94a3b8', dot: '#64748b' },
  { id: 'crop',     label: 'AUTO CROP ACTIVE',  color: '#00AEEF', dot: '#00AEEF' },
  { id: 'bgremove', label: 'BG REMOVED ✓',      color: '#10b981', dot: '#10b981' },
  { id: 'idcard',   label: 'COMPLETED CARD',    color: '#a855f7', dot: '#a855f7' },
];

const getStageColorClass = (i: number) => {
  if (i === 0) return 'text-[#94a3b8]';
  if (i === 1) return 'text-[#00AEEF]';
  if (i === 2) return 'text-[#10b981]';
  return 'text-[#a855f7]';
};

const getStageBgClass = (i: number) => {
  if (i === 0) return 'bg-[#94a3b8]';
  if (i === 1) return 'bg-[#00AEEF]';
  if (i === 2) return 'bg-[#10b981]';
  return 'bg-[#a855f7]';
};

const getStageDotClass = (i: number) => {
  if (i === 0) return 'bg-[#64748b]';
  if (i === 1) return 'bg-[#00AEEF]';
  if (i === 2) return 'bg-[#10b981]';
  return 'bg-[#a855f7]';
};

const getStageBtnClasses = (i: number, isActive: boolean) => {
  if (!isActive) return 'bg-transparent border-white/8 text-[#475569]';
  if (i === 0) return 'bg-[#94a3b8]/10 border-[#94a3b8]/25 text-[#94a3b8]';
  if (i === 1) return 'bg-[#00AEEF]/10 border-[#00AEEF]/25 text-[#00AEEF]';
  if (i === 2) return 'bg-[#10b981]/10 border-[#10b981]/25 text-[#10b981]';
  return 'bg-[#a855f7]/10 border-[#a855f7]/25 text-[#a855f7]';
};

const getStageDotBgClass = (i: number, isActive: boolean) => {
  if (!isActive) return 'bg-[#334155]';
  if (i === 0) return 'bg-[#94a3b8]';
  if (i === 1) return 'bg-[#00AEEF]';
  if (i === 2) return 'bg-[#10b981]';
  return 'bg-[#a855f7]';
};

const getBarcodeWidthClass = (w: number) => {
  if (w === 1) return 'w-[1px]';
  if (w === 2.5) return 'w-[2.5px]';
  if (w === 0.8) return 'w-[0.8px]';
  if (w === 2) return 'w-[2px]';
  if (w === 1.5) return 'w-[1.5px]';
  return 'w-[1px]';
};

export default function AIShowcase() {
  const [stage, setStage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [boxVisible, setBoxVisible] = useState(false);
  const [boxAnimated, setBoxAnimated] = useState(false);
  const [bgDone, setBgDone] = useState(false);

  const glowRingRef = useRef<HTMLDivElement>(null);
  const cropBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applyDynamicStyles(glowRingRef.current, {
      background: `linear-gradient(135deg, ${STAGES[stage].color}40, transparent)`
    });
  }, [stage]);

  useEffect(() => {
    if (stage === 1) {
      applyDynamicStyles(cropBoxRef.current, {
        top: boxAnimated ? '6%' : '50%',
        left: boxAnimated ? '21%' : '50%',
        width: boxAnimated ? '58%' : '0%',
        height: boxAnimated ? '76%' : '0%',
        border: '2px solid #00AEEF',
        boxShadow: '0 0 0 9999px rgba(0,0,0,0.3)',
      });
    }
  }, [stage, boxAnimated]);

  useEffect(() => {
    // Auto-cycle stages (0, 1, 2, 3)
    const cycle = () => {
      setAnimating(true);
      setTimeout(() => {
        setStage(s => {
          const next = (s + 1) % 4;
          if (next === 0) { setBoxVisible(false); setBoxAnimated(false); setBgDone(false); }
          if (next === 1) { setBoxVisible(true); setTimeout(() => setBoxAnimated(true), 300); }
          if (next === 2) { setBgDone(true); }
          return next;
        });
        setAnimating(false);
      }, 400);
    };
    const t = setInterval(cycle, 3600);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number) => {
    if (i === stage) return;
    setStage(i);
    setBoxVisible(i === 1);
    setBoxAnimated(i === 1);
    setBgDone(i >= 2);
  };

  return (
    <section className="bg-[#060D1F] py-20 overflow-hidden relative border-t border-white/5">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#00AEEF]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* LEFT: Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ai-badge">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] animate-pulse" />
              AI Pre-Press Automation Engine
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
              AI That Works<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#10b981]">
                While You Sleep.
              </span>
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Rather than hiring expensive graphic operators during peak Indian school renewal season
              (June–August), let our localized intelligence suite handle routine cropping, alignment,
              and background removal automatically.
            </p>

            {/* Step list */}
            <div className="space-y-3">
              {[
                { n: '1', t: 'Photo Import', d: 'Raw input photo received directly from user list' },
                { n: '2', t: 'Face Auto-Crop & Align', d: 'Detects face proportions and applies precise cropping guidelines' },
                { n: '3', t: 'Background Removal', d: 'Separates subject and produces transparent studio-ready cutouts' },
                { n: '4', t: 'Finished ID Card Layout', d: 'Fuses verified portraits into your finalized custom layout card' },
              ].map((s, i) => (
                <div
                  key={i}
                  onClick={() => goTo(i)}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-350 border",
                    stage === i ? "bg-[#00AEEF]/8 border-[#00AEEF]/20" : "bg-transparent border-transparent"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-mono font-black shrink-0 mt-0.5 transition-colors duration-300 text-white",
                    stage === i ? getStageBgClass(i) : "bg-white/6 text-slate-500"
                  )}>
                    {s.n}
                  </div>
                  <div>
                    <p className={cn(
                      "font-sans font-bold text-sm transition-colors duration-300",
                      stage === i ? "text-white" : "text-slate-500"
                    )}>{s.t}</p>
                    <p className="font-sans text-xs text-slate-500 mt-0.5">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
              {[['0.14s','Per Photo'],['99.8%','Accuracy'],['10K+','Cards/Batch']].map(([v,l])=>(
                <div key={l}>
                  <p className="font-display font-black text-xl text-white">{v}</p>
                  <p className="font-mono text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Animated showcase */}
          <div className="flex flex-col items-center gap-6">

            {/* Main image frame */}
            <div className="relative w-full max-w-[420px]">
              {/* Outer glow ring */}
              <div ref={glowRingRef} className="absolute -inset-1 rounded-2xl opacity-50 blur-md transition-all duration-700" />

              {/* Card */}
              <div className="relative bg-[#0D1829] rounded-2xl border border-white/8 overflow-hidden shadow-2xl">

                {/* Top HUD bar */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-black/20">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full animate-pulse", getStageDotClass(stage))} />
                    <span className={cn("font-mono text-[10px] font-bold tracking-widest transition-colors duration-500", getStageColorClass(stage))}>
                      {STAGES[stage].label}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-slate-500">RESOLUTION: 300×360</span>
                </div>

                {/* Image area */}
                <div className="relative overflow-hidden h-[320px]">

                  {/* Stage 0 & 1: Real photo using user assets */}
                  {stage === 0 && (
                    <img
                      src="/import image.avif"
                      alt="Imported Subject"
                      className={cn(
                        "absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 brightness-75 saturate-80",
                        animating ? 'scale-[1.04]' : 'scale-100'
                      )}
                    />
                  )}

                  {stage === 1 && (
                    <img
                      src="/Crop image.jpg"
                      alt="Crop In Progress"
                      className={cn(
                        "absolute inset-0 w-full h-full object-cover object-top transition-all duration-700",
                        animating ? 'scale-[1.04]' : 'scale-100'
                      )}
                    />
                  )}

                  {/* Stage 0: Import scan line */}
                  {stage === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00AEEF] to-transparent animate-scan-line opacity-80" />
                      <div className="bg-black/60 backdrop-blur-sm rounded-xl px-5 py-3 text-center border border-white/10">
                        <p className="font-mono text-xs text-slate-300 mb-1 font-bold">FILE IMPORT</p>
                        <p className="font-display font-bold text-white text-xs">import_source.avif</p>
                        <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden w-32 mx-auto">
                          <div className="h-full bg-[#00AEEF] rounded-full animate-progress-bar" />
                        </div>
                        <p className="font-mono text-[9px] text-slate-500 mt-1.5">LOADING ASSETS...</p>
                      </div>
                    </div>
                  )}

                  {/* Stage 1: Bounding box overlay */}
                  {stage === 1 && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Semi-dark overlay outside crop zone */}
                      <div className="absolute inset-0 bg-black/20" />

                      {/* Crop box */}
                      {/* Crop box */}
                      <div
                        ref={cropBoxRef}
                        className="absolute transition-all duration-700 ease-out"
                      >
                        {/* Corner markers */}
                        {[['top-0 left-0','-top-0.5 -left-0.5'],['top-0 right-0','-top-0.5 -right-0.5'],['bottom-0 left-0','-bottom-0.5 -left-0.5'],['bottom-0 right-0','-bottom-0.5 -right-0.5']].map(([pos], ci) => (
                          <div 
                            key={ci} 
                            className={cn(
                              "absolute w-3 h-3 crop-box-corner", 
                              pos, 
                              boxAnimated ? "opacity-100" : "opacity-0", 
                              `crop-corner-${ci}`
                            )} 
                          />
                        ))}

                        {/* HUD labels */}
                        <div className="absolute -top-6 left-0 font-mono text-[8px] text-[#00AEEF] whitespace-nowrap">
                          EYE COORD LOCATING...
                        </div>
                        <div className="absolute -bottom-5 left-0 font-mono text-[8px] whitespace-nowrap text-[#10b981]">
                          ✓ FACE DETECTED (CONF: 99.8%)
                        </div>
                      </div>

                      {/* Scanning line */}
                      <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00AEEF]/80 to-transparent animate-scan-line" />
                    </div>
                  )}

                  {/* Stage 2: BG removed — checkerboard + clean photo */}
                  <div
                    className={cn(
                      "absolute inset-0 transition-opacity duration-700",
                      stage === 2 ? "opacity-100" : "opacity-0"
                    )}
                  >
                    {/* Checkerboard background (transparency simulation) */}
                    <div className="absolute inset-0 transparency-checkerboard" />
                    
                    {/* Photo with portrait crop (bg removed asset) */}
                    <img
                      src="/Bg remove image.png"
                      alt="BG Removed Cutout"
                      className={cn(
                        "absolute inset-0 w-full h-full object-cover object-top transition-all duration-700",
                        bgDone ? "opacity-100" : "opacity-0"
                      )}
                    />
                    
                    {/* White vignette at bottom to simulate cutout */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent" />

                    {/* BG Removed badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-500/90 backdrop-blur-sm text-white text-[9px] font-mono font-bold px-2.5 py-1 rounded-full shadow-lg">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      BG REMOVED
                    </div>
                  </div>

                  {/* Stage 3: Completed ID card rendering */}
                  {stage === 3 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 transition-all duration-700 animate-in fade-in zoom-in-95">
                      {/* The Mini Card */}
                      <div className="w-[185px] h-[290px] bg-white rounded-xl shadow-2xl border border-slate-200/85 overflow-hidden flex flex-col justify-between relative transform rotate-y-6 rotate-x-2 shadow-black/40">
                        
                        {/* Wave Header Style */}
                        <div className="relative bg-gradient-to-r from-[#00AEEF] to-[#0A1628] text-white pt-2.5 pb-1.5 px-2 text-center shrink-0">
                          {/* Brand label */}
                          <div className="flex items-center justify-center gap-1">
                            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center font-bold text-[8px] tracking-tighter">IVY</div>
                            <div className="text-left">
                              <h4 className="font-display font-bold text-[7px] leading-none uppercase tracking-wider">IVY High School</h4>
                              <span className="font-mono text-[4px] text-cyan-300 block leading-none mt-0.5">JAIPUR CAMPUS</span>
                            </div>
                          </div>
                        </div>

                        {/* Main content body */}
                        <div className="flex-1 flex flex-col items-center justify-between p-2.5">
                          {/* Badge */}
                          <span className="text-[6px] font-mono font-black tracking-widest text-[#00AEEF] bg-blue-50 border border-blue-100 rounded px-1.5 py-0.5 leading-none">
                            STUDENT ACCESS
                          </span>

                          {/* Photo inside frame */}
                          <div className="w-14 h-[72px] rounded border border-slate-200 bg-slate-50 overflow-hidden mt-1 shadow-sm shrink-0">
                            <img
                              src="/Bg remove image.png"
                              alt="Completed Student Avatar"
                              className="w-full h-full object-cover object-top"
                            />
                          </div>

                          {/* Student Details */}
                          <div className="text-center mt-1.5 space-y-0.5 w-full">
                            <h5 className="font-display font-black text-[9px] text-[#0A1628] leading-none">Milan Sharma</h5>
                            <p className="font-mono text-[5px] text-slate-400">Class: 10th — Sec A</p>
                            <p className="font-mono text-[5px] text-slate-400">Roll: IVY-2026-784</p>
                          </div>

                          {/* Barcode / Footer */}
                          <div className="w-full mt-2 flex flex-col items-center gap-1 border-t border-slate-100 pt-1.5">
                            {/* Mock barcode lines */}
                            <div className="h-4 flex items-center gap-[1px]">
                              {[1, 2.5, 0.8, 2, 0.8, 1, 2.5, 0.8, 1.5, 0.8, 2, 1, 0.8, 2.5].map((w, idx) => (
                                <div key={idx} className={cn("h-full bg-[#0A1628]", getBarcodeWidthClass(w))} />
                              ))}
                            </div>
                            <span className="font-mono text-[4px] text-slate-400 leading-none">*IVY-2026-784*</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom stats bar */}
                <div className="px-4 py-3 border-t border-white/5 bg-black/20 grid grid-cols-3 gap-3 text-left">
                  {[
                    { l: 'FILE SINK', v: stage === 0 ? 'Importing...' : 'Excel Rows' },
                    { l: 'CROPPING TIME', v: stage === 0 ? '—' : '0.14 Secs' },
                    { l: 'OUTPUT', v: stage < 2 ? '—' : (stage === 2 ? 'CYMK 600dpi' : 'PRINT READY') },
                  ].map(({l,v}) => (
                    <div key={l}>
                      <p className="font-mono text-[7px] text-slate-500 uppercase tracking-widest">{l}</p>
                      <p className={cn(
                        "font-mono text-[9px] sm:text-[10px] font-bold mt-0.5 transition-colors duration-500",
                        stage >= 2 && l === 'OUTPUT' ? 'text-[#f59e0b]' : 'text-[#e2e8f0]'
                      )}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stage dots */}
            <div className="flex items-center gap-2">
              {STAGES.map((s, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[8px] font-mono font-bold uppercase transition-all duration-300",
                    getStageBtnClasses(i, stage === i)
                  )}
                >
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors duration-300",
                    getStageDotBgClass(i, stage === i)
                  )} />
                  {s.label.replace(' ✓','')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(640px); }
        }
        .animate-scan-line {
          animation: scan-line 2s linear infinite;
        }
        @keyframes progress-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress-bar {
          animation: progress-bar 3.2s linear infinite;
        }
      `}</style>
    </section>
  );
}
