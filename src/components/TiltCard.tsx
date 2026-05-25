import { useState, useRef, MouseEvent, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  id?: string;
  maxTilt?: number;
}

export default function TiltCard({ children, className = '', id, maxTilt = 12 }: TiltCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Convert to percentage for glow reflection
    const pctX = (mouseX / width) * 100;
    const pctY = (mouseY / height) * 100;
    
    // Normalized centered values from -0.5 to 0.5
    const normX = (mouseX / width) - 0.5;
    const normY = (mouseY / height) - 0.5;
    
    // Calculate rotation angles
    const rotateX = -normY * maxTilt;
    const rotateY = normX * maxTilt;
    
    setTilt({ x: rotateX, y: rotateY });
    setGlow({ x: pctX, y: pctY });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl transition-transform duration-300 ease-out select-none ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        boxShadow: isHovered 
          ? '0 20px 40px -15px rgba(10, 22, 40, 0.15), 0 0 25px -5px rgba(0, 174, 239, 0.12)'
          : '0 4px 20px -5px rgba(10, 22, 40, 0.05)',
      }}
    >
      {/* 3D Depth backplate sheen */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 overflow-hidden mix-blend-overlay"
        style={{
          opacity: isHovered ? 0.85 : 0,
          background: `radial-gradient(circle 220px at ${glow.x}% ${glow.y}%, rgba(0, 174, 239, 0.15) 0%, transparent 80%)`,
          zIndex: 5
        }}
      />
      
      {/* Dynamic glossy border reflection */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 border border-transparent"
        style={{
          opacity: isHovered ? 1 : 0,
          borderImage: `radial-gradient(circle 120px at ${glow.x}% ${glow.y}%, rgba(0, 174, 239, 0.4) 0%, rgba(255, 184, 0, 0.2) 50%, transparent 100%) 1`,
          zIndex: 6
        }}
      />

      {/* Main payload layer */}
      <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
