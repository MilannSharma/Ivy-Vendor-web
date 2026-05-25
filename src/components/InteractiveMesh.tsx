import { useEffect, useRef } from 'react';

export default function InteractiveMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      ox: number; // Original x
      oy: number; // Original y
      vx: number;
      vy: number;
      size: number;
      color: string;
      phase: number;
      speed: number;
    }> = [];

    const numParticles = 48;

    // Create particles with random distribution
    for (let i = 0; i < numParticles; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const isGold = Math.random() > 0.75;
      particles.push({
        x: rx,
        y: ry,
        ox: rx,
        oy: ry,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: isGold ? '#FFB800' : '#00AEEF',
        phase: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.02,
      });
    }

    let mouse = { x: -1000, y: -1000, radius: 150 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint mesh network lines first
      ctx.strokeStyle = 'rgba(0, 174, 239, 0.08)';
      ctx.lineWidth = 0.7;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            // Draw connecting line
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update individual particles
      particles.forEach((p, idx) => {
        // Slow float wave behavior
        p.phase += p.speed;
        const driftY = Math.sin(p.phase) * 0.25;
        const driftX = Math.cos(p.phase) * 0.15;

        p.x += p.vx + driftX;
        p.y += p.vy + driftY;

        // Bounce off canvas margins
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse displacement
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          // Push away slightly
          p.x -= Math.cos(angle) * force * 1.5;
          p.y -= Math.sin(angle) * force * 1.5;
        }

        // Draw glowing particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra outer pulse outer aura on 4 selected anchor points
        if (idx % 12 === 0) {
          ctx.strokeStyle = p.color === '#FFB800' ? 'rgba(255, 184, 0, 0.15)' : 'rgba(0, 174, 239, 0.15)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size + 4 + Math.sin(p.phase) * 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto opacity-75"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}
