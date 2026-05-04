'use client';

import { useState, useEffect, useRef } from 'react';
import HeroCanvas from './HeroCanvas';
import HeroLandscape from './HeroLandscape';
import { useLanguage } from '@/contexts/LanguageContext';
import { useT } from '@/data/translations';

const RATE = 49; // kg per second (processing gap)
const SPIN_UP_MS = 1200;
const IST_OFFSET_S = 5.5 * 3600; // UTC+5:30

function getISTSecondsSinceMidnight(): number {
  const utcSeconds = Date.now() / 1000;
  return (utcSeconds + IST_OFFSET_S) % 86400;
}

function formatKg(n: number): string {
  return Math.floor(n).toLocaleString('en-US');
}

export default function HeroCounter() {
  const [kg, setKg] = useState(0);
  const [entered, setEntered] = useState(false);
  const { lang } = useLanguage();
  const t = useT(lang);

  const startRef      = useRef(0);
  const baseKgRef     = useRef(0);
  const pausedAtRef   = useRef(0);
  const totalPausedRef = useRef(0);

  const mouseRef  = useRef({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLElement>(null);

  // Entrance fade
  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Tab visibility pause
  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === 'hidden') {
        pausedAtRef.current = performance.now();
      } else if (pausedAtRef.current > 0) {
        totalPausedRef.current += performance.now() - pausedAtRef.current;
        pausedAtRef.current = 0;
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Live counter — today's total from IST midnight
  useEffect(() => {
    startRef.current  = performance.now();
    baseKgRef.current = getISTSecondsSinceMidnight() * RATE;

    const id = setInterval(() => {
      if (document.visibilityState === 'hidden') return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const now     = performance.now();
      const paused  = pausedAtRef.current > 0 ? now - pausedAtRef.current : 0;
      const elapsed = now - startRef.current - totalPausedRef.current - paused;

      const additional = reduced
        ? (elapsed / 1000) * RATE
        : (() => {
            const sp = Math.min(elapsed / SPIN_UP_MS, 1);
            return (elapsed / 1000) * RATE * (1 - Math.pow(1 - sp, 3));
          })();

      setKg(baseKgRef.current + additional);
    }, 100);

    return () => clearInterval(id);
  }, []);

  // Mouse tracking — shared with canvas + landscape via ref (no re-renders)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width)  * 100,
        y: ((e.clientY - rect.top)  / rect.height) * 100,
      };
    };
    section.addEventListener('mousemove', onMove, { passive: true });
    return () => section.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      // pt-14 accounts for the fixed nav (h-14 = 56px) so flex centering
      // aligns the counter to the visual midpoint of the visible viewport
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-base pt-14"
      aria-label="Live waste counter"
    >
      {/* ── SVG landfill landscape ── */}
      <HeroLandscape mouseRef={mouseRef} />

      {/* ── Animated canvas (grid, particles, scan) ── */}
      <HeroCanvas mouseRef={mouseRef} />

      {/* ── Radial vignette to keep number legible ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(13,13,18,0.65) 60%, rgba(13,13,18,0.90) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Slow-breathing grain ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none animate-grain"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="hero-noise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      {/* ── Counter content ── */}
      <div
        className="relative z-10 text-center px-4 sm:px-6 w-full max-w-[90vw] sm:max-w-4xl"
        style={{
          opacity: entered ? 1 : 0,
          transform: entered ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 700ms ease-out, transform 700ms ease-out',
        }}
      >
        <p className="text-secondary text-xs sm:text-sm uppercase tracking-widest mb-6">
          {t.hero.label}
        </p>

        <div
          className="mx-auto mb-6"
          style={{ width: 100, height: 1, background: 'rgba(196,229,56,0.20)' }}
          aria-hidden="true"
        />

        {/* The number — capped so it never bleeds off-screen */}
        <p
          className="tabular-nums font-heading font-bold text-accent leading-none"
          style={{
            fontSize: 'clamp(4.5rem, 14vw, 12rem)',
            filter: 'drop-shadow(0 0 48px rgba(196,229,56,0.18))',
            letterSpacing: '-0.02em',
          }}
          aria-live="polite"
          aria-atomic="true"
          aria-label={`Approximately ${formatKg(kg)} kilograms of waste dumped into Delhi's landfills today`}
        >
          <span
            style={{ fontSize: '0.52em', opacity: 0.65, marginRight: '0.15em', verticalAlign: 'middle' }}
            aria-hidden="true"
          >
            ≈
          </span>
          {formatKg(kg)}
        </p>

        <p className="text-secondary text-xs sm:text-sm uppercase tracking-widest mt-6">
          {t.hero.sub}
        </p>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center" aria-hidden="true">
        <div className="animate-bob">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-secondary">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
