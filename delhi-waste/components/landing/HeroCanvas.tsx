'use client';

import { useEffect, useRef } from 'react';

interface HeroCanvasProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

const ACCENT = { r: 196, g: 229, b: 56 };

type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  life: number; maxLife: number;
};

type Ring = { x: number; y: number; radius: number; maxRadius: number; opacity: number };

function spawnParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: h + 10,
    vx: (Math.random() - 0.5) * 0.35,
    vy: -(Math.random() * 0.6 + 0.2),
    size: Math.random() * 1.6 + 0.4,
    opacity: Math.random() * 0.55 + 0.2,
    life: 0,
    maxLife: Math.random() * 240 + 120,
  };
}

export default function HeroCanvas({ mouseRef }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const PARTICLE_COUNT = 75;
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = spawnParticle(canvas.offsetWidth, canvas.offsetHeight);
      p.y = Math.random() * canvas.offsetHeight;
      p.life = Math.floor(Math.random() * p.maxLife);
      particles.push(p);
    }

    const rings: Ring[] = [];
    let lastRingTime = 0;
    let rafId: number;
    let lastTime = 0;

    const draw = (time: number) => {
      rafId = requestAnimationFrame(draw);
      const dt = time - lastTime;
      lastTime = time;
      if (dt > 200) return;

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const mx = (mouseRef.current.x / 100) * w;
      const my = (mouseRef.current.y / 100) * h;

      // Vanishing point at horizon (~60% down), mouse-tracked
      const vpX = w * 0.15 + (mx / w) * w * 0.7;
      const vpY = h * 0.58;
      const groundY = h;

      ctx.clearRect(0, 0, w, h);

      // ── Perspective grid ── only lower half of viewport, fades at horizon
      const gridCols = 16;
      for (let i = 0; i <= gridCols; i++) {
        const t = i / gridCols;
        const bottomX = t * w;
        // Fade lines that are near the VP center (crowded there)
        const edgeness = Math.abs(t - 0.5) * 2;
        const alpha = 0.03 + 0.05 * edgeness;
        ctx.beginPath();
        ctx.moveTo(vpX, vpY);
        ctx.lineTo(bottomX, groundY);
        ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Horizontal lines (perspective spacing), only below horizon
      const hLines = 10;
      for (let i = 1; i <= hLines; i++) {
        const t = Math.pow(i / hLines, 1.8);
        const y = vpY + (groundY - vpY) * t;
        const progress = (y - vpY) / (groundY - vpY);
        const halfW = progress * w * 0.65;
        const alpha = 0.025 + progress * 0.045;
        ctx.beginPath();
        ctx.moveTo(vpX - halfW, y);
        ctx.lineTo(vpX + halfW, y);
        ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // ── Pulse rings from ground ──
      if (time - lastRingTime > 2400) {
        const rx = vpX * 0.3 + Math.random() * vpX * 1.4;
        rings.push({ x: rx, y: groundY, radius: 0, maxRadius: w * 0.5, opacity: 0.22 });
        lastRingTime = time;
      }
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.radius += 1.2;
        ring.opacity = 0.22 * (1 - ring.radius / ring.maxRadius);
        if (ring.radius >= ring.maxRadius) { rings.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.ellipse(ring.x, ring.y, ring.radius, ring.radius * 0.22, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${ring.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ── Particles ──
      const repelR = 100, repelStr = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < repelR && dist > 0) {
          const f = (1 - dist / repelR) * repelStr;
          p.vx += (dx / dist) * f * 0.1;
          p.vy += (dy / dist) * f * 0.1;
        }
        p.vx *= 0.97;
        p.x  += p.vx;
        p.y  += p.vy;
        p.life += 1;

        const lf = p.life / p.maxLife;
        const fadeIn  = Math.min(lf / 0.08, 1);
        const fadeOut = lf > 0.72 ? 1 - (lf - 0.72) / 0.28 : 1;
        const alpha   = p.opacity * fadeIn * fadeOut;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha})`;
        ctx.fill();

        if (p.y < -20 || p.life >= p.maxLife) Object.assign(p, spawnParticle(w, h));
      }

      // ── Scan line ──
      const scanY = ((time * 0.032) % (h + 80)) - 40;
      const sGrad = ctx.createLinearGradient(0, scanY, 0, scanY + 3);
      sGrad.addColorStop(0,   `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0)`);
      sGrad.addColorStop(0.5, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.05)`);
      sGrad.addColorStop(1,   `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0)`);
      ctx.fillStyle = sGrad;
      ctx.fillRect(0, scanY, w, 3);
    };

    rafId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
  }, [mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
