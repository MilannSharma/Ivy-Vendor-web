import React, { useState, useRef, MouseEvent, useEffect } from 'react';
import { cn, applyDynamicStyles } from '../lib/utils';

export interface IDCardData {
  variant: 'wave' | 'diagonal' | 'sidebar' | 'minimal' | 'corporate' | 'dark';
  orgName: string; orgSub: string; logoLetter: string;
  badgeText: string; name: string;
  field1Label: string; field1Value: string;
  field2Label: string; field2Value: string;
  avatarUrl: string; accentColor: string;
  validStatus: string; session: string;
  emergencyPhone: string; address: string;
  barcodeVal: string; bloodGroup: string;
  themeGradient: string; logoBg: string; badgeBg: string; studentId: string;
}

const BAR = [1.5,3,1,2,4,1.5,2.5,1,3,2,1,4,1.5,2];

const getBarWidthClass = (w: number) => {
  if (w === 1.5) return 'w-[1.5px]';
  if (w === 3) return 'w-[3px]';
  if (w === 1) return 'w-[1px]';
  if (w === 2) return 'w-[2px]';
  if (w === 4) return 'w-[4px]';
  if (w === 2.5) return 'w-[2.5px]';
  return 'w-[1px]';
};

function Barcode({ val, light }: { val: string; light?: boolean }) {
  return (
    <div className="flex flex-col items-start gap-0.5">
      <div className="flex items-end gap-[1.5px] h-5">
        {BAR.map((w,i)=><div key={i} className={cn(light?'bg-white/60':'bg-slate-700', 'h-full rounded-[1px]', getBarWidthClass(w))}/>)}
      </div>
      <span className={`font-mono text-[6px] tracking-widest ${light?'text-white/50':'text-slate-400'}`}>{val}</span>
    </div>
  );
}

function FieldRow({ label, value, light }: { label: string; value: string; light?: boolean }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className={`font-mono text-[8px] uppercase tracking-wide w-[68px] shrink-0 ${light?'text-white/50':'text-slate-400'}`}>{label}</span>
      <span className={`text-[9px] shrink-0 ${light?'text-white/30':'text-slate-300'}`}>—</span>
      <span className={`font-sans text-[9px] font-semibold leading-snug ${light?'text-white':'text-[#0A1628]'}`}>{value}</span>
    </div>
  );
}

function BackFace({ card }: { card: IDCardData }) {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-white flex flex-col three-d-back">
      <div className="px-4 py-2.5 flex-shrink-0 text-center bg-[var(--accent-color)]">
        <p className="font-display font-black text-white text-[10px] uppercase tracking-widest">Terms &amp; Conditions</p>
      </div>
      <div className="px-4 py-3 space-y-2.5 flex-grow border-b border-slate-100">
        {["This card is property of the institution. Return if found.","Carry this ID at all times on campus and show when asked."].map((t,i)=>(
          <div key={i} className="flex items-start gap-2">
            <div className="mt-1 w-1.5 h-1.5 rounded-full shrink-0 bg-[var(--accent-color)]"/>
            <p className="font-sans text-[8.5px] text-slate-500 leading-relaxed">{t}</p>
          </div>
        ))}
      </div>
      <div className="px-4 py-2.5 space-y-1.5">
        {[['Phone',card.emergencyPhone],['Mail','info@ivyprints.in'],['Website','www.ivyprints.in']].map(([l,v])=>(
          <div key={l} className="flex items-center gap-2">
            <span className="font-mono text-[8px] text-slate-400 w-12 shrink-0">{l}</span>
            <span className="text-slate-300 text-[8px]">:</span>
            <span className="font-sans text-[8.5px] font-semibold text-[#0A1628]">{v}</span>
          </div>
        ))}
      </div>
      <div className="px-4 pb-3 flex items-end justify-between">
        <div>
          <div className="font-display italic text-slate-200 text-[20px] leading-none mb-0.5 font-serif">{card.logoLetter}</div>
          <div className="w-14 border-t border-slate-300"/>
          <p className="font-mono text-[7px] text-slate-400 mt-0.5 uppercase tracking-wider">Principal</p>
        </div>
        <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          <svg viewBox="0 0 29 29" className="w-full h-full text-[#0A1628]">
            <path d="M0 0h9v9H0zm1 1h7v7H1zm11 0h5v1h-5zm6 0h5v1h-5zM12 2h3v1h-3zm6 0h3v1h-3zm-12 8h9v9H0zm1 1h7v7H1zm11 0h2v1h-2zm3 0h4v1h-4zm-12 1h2v1h-2zm4 0h1v1h-1z" fill="currentColor"/>
          </svg>
        </div>
      </div>
      <div className="h-2 w-full bg-gradient-to-r from-[var(--accent-color)] to-[#0A1628]"/>
    </div>
  );
}

// ── VARIANT FRONTS ──────────────────────────────────────────────────────────

function WaveFront({ card }: { card: IDCardData }) {
  const ac = card.accentColor;
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-white flex flex-col three-d-front">
      <div className="relative flex-shrink-0 h-[110px] bg-[var(--accent-color)]">
        <svg viewBox="0 0 230 110" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs><linearGradient id="wg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={ac}/><stop offset="100%" stopColor="#0A1628"/></linearGradient></defs>
          <rect width="230" height="110" fill="url(#wg)"/>
          <ellipse cx="190" cy="15" rx="75" ry="55" fill="rgba(255,255,255,0.07)"/>
          <path d="M0 75 Q57.5 50 115 70 Q172.5 90 230 65 L230 110 L0 110 Z" fill="white"/>
        </svg>
        <div className="absolute top-0 inset-x-0 flex flex-col items-center pt-3 z-10">
          <span className="font-display font-black text-white text-[11px] uppercase tracking-widest drop-shadow-sm">{card.orgName}</span>
          <span className="font-mono text-[7px] text-white/70 tracking-[0.2em] uppercase mt-0.5">{card.orgSub}</span>
        </div>
      </div>
      <div className="flex justify-center -mt-9 z-10 relative">
        <div className="w-[66px] h-[66px] rounded-full border-[3px] border-white overflow-hidden bg-slate-100 shadow-lg three-d-avatar-shadow">
          <img src={card.avatarUrl} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover"/>
        </div>
      </div>
      <div className="text-center px-4 mt-1.5 flex-shrink-0">
        <span className="inline-block text-[7px] font-mono font-black uppercase tracking-wider px-3 py-0.5 rounded-full border mb-1 bg-[var(--accent-color)]/15 text-[var(--accent-color)] border-[var(--accent-color)]/30">{card.badgeText}</span>
        <h3 className="font-display font-black text-[#0A1628] text-[14px] tracking-tight uppercase">{card.name}</h3>
      </div>
      <div className="mx-4 mt-2 border-t border-slate-100"/>
      <div className="px-5 py-2 space-y-1.5 flex-grow">
        <FieldRow label="Student ID" value={card.field2Value}/>
        <FieldRow label={card.field1Label} value={card.field1Value}/>
        <FieldRow label="Session" value={card.session}/>
        <FieldRow label="Emergency" value={card.emergencyPhone}/>
        <FieldRow label="Address" value={card.address}/>
      </div>
      <div className="border-t border-slate-100 px-4 py-2 flex items-center justify-between bg-slate-50/70">
        <Barcode val={card.barcodeVal}/>
        <div className="text-right"><p className="font-mono text-[6px] text-slate-400 uppercase">Valid</p><p className="font-bold text-[8px] text-[var(--accent-color)]">{card.validStatus}</p></div>
      </div>
    </div>
  );
}

function DiagonalFront({ card }: { card: IDCardData }) {
  const ac = card.accentColor;
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl flex flex-col three-d-front bg-[#f8fafc]">
      {/* Dark diagonal shape top-left */}
      <svg viewBox="0 0 230 360" className="absolute inset-0 w-full h-full pointer-events-none">
        <path d="M0 0 L140 0 L80 210 L0 210 Z" fill={ac}/>
        <path d="M0 0 L120 0 L60 210 L0 210 Z" fill="#0A1628" opacity="0.85"/>
        <circle cx="52" cy="90" r="38" fill="none" stroke="white" strokeWidth="3"/>
      </svg>
      {/* Photo inside diagonal */}
      <div className="absolute left-[14px] top-[52px] w-[76px] h-[76px] rounded-full overflow-hidden border-[3px] border-white shadow-xl">
        <img src={card.avatarUrl} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover"/>
      </div>
      {/* Org name top-right */}
      <div className="absolute top-4 right-4 text-right">
        <p className="font-display font-black text-[10px] uppercase tracking-wide text-[var(--accent-color)]">{card.orgName}</p>
        <p className="font-mono text-[7px] text-slate-400 tracking-widest uppercase">{card.orgSub}</p>
      </div>
      {/* Content below diagonal */}
      <div className="absolute bottom-0 left-0 right-0 top-[215px]">
        <div className="px-5 pb-2 pt-1">
          <span className="inline-block text-[7px] font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border mb-1 bg-[var(--accent-color)]/15 text-[var(--accent-color)] border-[var(--accent-color)]/30">{card.badgeText}</span>
          <h3 className="font-display font-black text-[#0A1628] text-[14px] tracking-tight uppercase mb-2">{card.name}</h3>
          <div className="space-y-1 text-[9px]">
            {[['Reg No',card.studentId],[card.field1Label,card.field1Value],['Student Name',card.name],['Emergency',card.emergencyPhone]].map(([l,v])=>(
              <div key={l} className="flex gap-2"><span className="text-slate-400 font-mono text-[8px] w-[72px] shrink-0">{l}</span><span className="text-slate-300 text-[8px]">:</span><span className="font-semibold text-[#0A1628] text-[8px]">{v}</span></div>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-100 px-4 py-1.5 flex items-center justify-between bg-white/60 mt-1">
          <Barcode val={card.barcodeVal}/>
          <div className="text-right"><p className="font-mono text-[6px] text-slate-400">VALID</p><p className="font-bold text-[7px] text-[var(--accent-color)]">{card.validStatus}</p></div>
        </div>
      </div>
    </div>
  );
}

function SidebarFront({ card }: { card: IDCardData }) {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-white flex flex-row three-d-front">
      {/* Left sidebar */}
      <div className="w-[72px] flex flex-col items-center py-4 flex-shrink-0 bg-gradient-to-b from-[var(--accent-color)] to-[#0A1628]">
        <div className="w-[54px] h-[54px] rounded-full border-[2px] border-white overflow-hidden bg-white/20 mb-3 shadow-lg">
          <img src={card.avatarUrl} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover"/>
        </div>
        <div className="flex-1 flex items-center">
          <span className="font-display font-black text-white text-[8px] uppercase tracking-[0.2em] whitespace-nowrap vertical-text">
            {card.badgeText}
          </span>
        </div>
        <Barcode val="" light/>
      </div>
      {/* Right content */}
      <div className="flex-1 flex flex-col p-3 overflow-hidden">
        <div className="border-b border-slate-100 pb-2 mb-2">
          <p className="font-display font-black text-[9px] uppercase tracking-wide text-[var(--accent-color)]">{card.orgName}</p>
          <p className="font-mono text-[7px] text-slate-400 tracking-widest">{card.orgSub}</p>
        </div>
        <h3 className="font-display font-black text-[#0A1628] text-[13px] tracking-tight uppercase mb-2 leading-tight">{card.name}</h3>
        <div className="space-y-1.5 flex-grow">
          {[['ID',card.field2Value],[card.field1Label,card.field1Value],['Session',card.session],['Blood',card.bloodGroup],['Emergency',card.emergencyPhone]].map(([l,v])=>(
            <div key={l} className="flex gap-1.5 text-[8px]"><span className="text-slate-400 font-mono w-[50px] shrink-0">{l}</span><span className="text-slate-300 shrink-0">:</span><span className="font-semibold text-[#0A1628] leading-snug truncate">{v}</span></div>
          ))}
        </div>
        <div className="border-t border-slate-100 pt-2 mt-1">
          <p className="font-mono text-[6px] text-slate-400 uppercase">Valid: {card.validStatus}</p>
          <div className="flex items-end gap-[1px] h-3 mt-1">
            {BAR.map((w,i)=><div key={i} className={cn("bg-slate-600 h-full rounded-[1px]", getBarWidthClass(w))}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function MinimalFront({ card }: { card: IDCardData }) {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-white flex flex-col three-d-front">
      <div className="h-1.5 w-full bg-gradient-to-r from-[var(--accent-color)] to-[#0A1628]"/>
      {/* Large photo */}
      <div className="w-full h-[140px] bg-slate-100 overflow-hidden flex-shrink-0 relative">
        <img src={card.avatarUrl} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover object-top"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"/>
      </div>
      {/* Name block */}
      <div className="px-5 pt-3 pb-2 border-b border-slate-100">
        <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-[var(--accent-color)]">{card.badgeText}</span>
        <h3 className="font-display font-black text-[#0A1628] text-[15px] tracking-tight uppercase leading-tight">{card.name}</h3>
        <p className="font-sans text-[9px] text-slate-400">{card.orgName} · {card.orgSub}</p>
      </div>
      {/* Fields */}
      <div className="px-5 py-3 space-y-2 flex-grow">
        {[['ID',card.field2Value],[card.field1Label,card.field1Value],['Session',card.session],['Emergency',card.emergencyPhone]].map(([l,v])=>(
          <div key={l} className="flex items-center gap-2 border-b border-dashed border-slate-100 pb-1.5">
            <span className="font-mono text-[7px] text-slate-400 uppercase w-[55px] shrink-0">{l}</span>
            <span className="font-semibold text-[#0A1628] text-[9px]">{v}</span>
          </div>
        ))}
      </div>
      <div className="px-5 py-2 flex items-center justify-between bg-slate-50">
        <Barcode val={card.barcodeVal}/>
        <span className="font-mono text-[6px] text-slate-400 uppercase">Valid<br/><strong className="text-[var(--accent-color)]">{card.validStatus}</strong></span>
      </div>
    </div>
  );
}

function CorporateFront({ card }: { card: IDCardData }) {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-white flex flex-col three-d-front">
      {/* Bold header band */}
      <div className="px-4 py-3 flex items-center justify-between flex-shrink-0 bg-[var(--accent-color)]">
        <div>
          <p className="font-display font-black text-white text-[10px] uppercase tracking-widest">{card.orgName}</p>
          <p className="font-mono text-[6.5px] text-white/60 tracking-wider uppercase">{card.orgSub}</p>
        </div>
        <span className="font-mono text-[6px] bg-white/10 text-white border border-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider">{card.badgeText}</span>
      </div>
      {/* Photo + name row */}
      <div className="flex items-start gap-3 px-4 py-3 border-b border-slate-100">
        <div className="w-[60px] h-[70px] rounded-xl overflow-hidden border border-slate-200 shadow-md flex-shrink-0">
          <img src={card.avatarUrl} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover"/>
        </div>
        <div className="flex-1 pt-1">
          <h3 className="font-display font-black text-[#0A1628] text-[13px] tracking-tight uppercase leading-tight">{card.name}</h3>
          <span className="font-mono text-[7px] text-[var(--accent-color)]">{card.field1Value}</span>
          <div className="mt-2 flex gap-2">
            <span className="text-[6px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Blood: {card.bloodGroup}</span>
            <span className="text-[6px] font-mono px-1.5 py-0.5 rounded bg-[var(--accent-color)]/15 text-[var(--accent-color)]">Valid: {card.validStatus}</span>
          </div>
        </div>
      </div>
      {/* Data rows */}
      <div className="px-4 py-2.5 space-y-1.5 flex-grow">
        {[['Employee ID',card.field2Value],['Department',card.field1Value],['Session',card.session],['Emergency',card.emergencyPhone],['Address',card.address]].map(([l,v])=>(
          <div key={l} className="flex gap-2 text-[8.5px]">
            <span className="text-slate-400 font-mono text-[7.5px] w-[64px] shrink-0">{l}</span>
            <span className="text-slate-800 font-medium leading-snug">{v}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100 px-4 py-2 flex items-center justify-between bg-slate-50/80">
        <Barcode val={card.barcodeVal}/>
        <div className="w-8 h-8 border border-slate-200 rounded p-0.5 bg-white">
          <svg viewBox="0 0 29 29" className="w-full h-full text-[#0A1628]"><path d="M0 0h9v9H0zm1 1h7v7H1zm11 0h5v1h-5zM12 2h3v1h-3zm-12 8h9v9H0zm1 1h7v7H1zm11 0h2v1h-2zm3 0h4v1h-4z" fill="currentColor"/></svg>
        </div>
      </div>
    </div>
  );
}

function DarkFront({ card }: { card: IDCardData }) {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl flex flex-col three-d-front bg-gradient-to-br from-[#0f172a] to-[#0A1628]">
      {/* Glow blob */}
      <div className="absolute top-8 right-8 w-28 h-28 rounded-full opacity-20 blur-2xl bg-[var(--accent-color)]"/>
      {/* Header */}
      <div className="px-4 pt-4 pb-2 border-b border-white/5 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display font-black text-[10px] uppercase tracking-widest text-[var(--accent-color)]">{card.orgName}</p>
            <p className="font-mono text-[7px] text-white/40 tracking-wider">{card.orgSub}</p>
          </div>
          <span className="font-mono text-[6px] border px-2 py-0.5 rounded-full uppercase tracking-wider text-[var(--accent-color)] border-[var(--accent-color)]/40">{card.badgeText}</span>
        </div>
      </div>
      {/* Photo with glow ring */}
      <div className="flex justify-center mt-3 relative z-10">
        <div className="relative w-[70px] h-[70px]">
          <div className="absolute inset-0 rounded-full animate-pulse opacity-40 three-d-glow-ring"/>
          <div className="w-full h-full rounded-full overflow-hidden border-[2px] border-[var(--accent-color)]">
            <img src={card.avatarUrl} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover"/>
          </div>
        </div>
      </div>
      {/* Name */}
      <div className="text-center px-4 mt-2 relative z-10">
        <h3 className="font-display font-black text-white text-[14px] tracking-tight uppercase">{card.name}</h3>
        <p className="font-mono text-[8px] mt-0.5 text-[var(--accent-color)]">{card.field1Value}</p>
      </div>
      {/* Fields */}
      <div className="px-5 py-3 space-y-1.5 flex-grow relative z-10">
        {[['ID',card.field2Value],[card.field1Label,card.field1Value],['Session',card.session],['Emergency',card.emergencyPhone]].map(([l,v])=>(
          <div key={l} className="flex gap-2 p-1.5 rounded-lg bg-white/4">
            <span className="font-mono text-[7.5px] text-white/40 w-[54px] shrink-0">{l}</span>
            <span className="font-semibold text-white text-[8.5px] leading-snug">{v}</span>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 border-t relative z-10 border-white/5">
        <Barcode val={card.barcodeVal} light/>
      </div>
    </div>
  );
}

export default function ThreeDCard({ card }: { card: IDCardData }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsFlipped(false); setTilt({ x: 0, y: 0 }); }, [card]);

  useEffect(() => {
    if (cardRef.current) {
      const ac = card.accentColor;
      cardRef.current.style.setProperty('--accent-color', ac);
      cardRef.current.style.setProperty('--accent-color-alpha', `${ac}40`);
      cardRef.current.style.setProperty('--accent-glow-border', `${ac}60`);
      cardRef.current.style.setProperty('--accent-glow-shadow', `${ac}80`);
    }
  }, [card]);

  useEffect(() => {
    if (cardInnerRef.current) {
      cardInnerRef.current.style.transform = `rotateY(${isFlipped ? 180 : tilt.y}deg) rotateX(${tilt.x}deg)`;
    }
  }, [isFlipped, tilt]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isFlipped) return;
    const r = containerRef.current.getBoundingClientRect();
    setTilt({ x: -((e.clientY - r.top - r.height/2)/(r.height/2))*12, y: ((e.clientX - r.left - r.width/2)/(r.width/2))*12 });
  };

  const fronts: Record<IDCardData['variant'], React.ReactElement> = {
    wave: <WaveFront card={card}/>,
    diagonal: <DiagonalFront card={card}/>,
    sidebar: <SidebarFront card={card}/>,
    minimal: <MinimalFront card={card}/>,
    corporate: <CorporateFront card={card}/>,
    dark: <DarkFront card={card}/>,
  };

  return (
    <div ref={cardRef} className="flex flex-col items-center select-none">
      <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={()=>setTilt({x:0,y:0})}
        onClick={()=>{setIsFlipped(!isFlipped);setTilt({x:0,y:0});}}
        id="hero-3d-card-wrapper"
        className="relative w-[230px] h-[360px] cursor-pointer perspective-1000">
        <div ref={cardInnerRef} className="relative w-full h-full transform-style-3d transition-transform duration-[650ms] ease-[cubic-bezier(0.25,1,0.5,1)]">
          {fronts[card.variant]}
          <BackFace card={card}/>
        </div>
      </div>
    </div>
  );
}
