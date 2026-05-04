'use client';

import { useEffect, useRef } from 'react';

interface HeroLandscapeProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

// ── Mountain silhouettes in viewBox 0 0 1440 900 ─────────────────────────────

// Back mountain — Ghazipur is the dominant peak (~35% from left)
const BACK_TOP: [number, number][] = [
  [0,622],[65,604],[135,616],[205,598],[268,580],[325,562],[378,544],
  [420,522],[455,500],[478,470],[496,447],[504,430],[512,444],[532,460],
  [558,478],[600,494],[648,508],[705,520],[762,526],[818,518],[865,530],
  [915,520],[968,537],[1025,546],[1082,554],[1140,560],[1200,570],
  [1268,582],[1342,598],[1440,613],
];

// Mid mountain — Bhalswa peak right side
const MID_TOP: [number, number][] = [
  [0,668],[95,650],[192,662],[285,640],[375,628],[455,636],[528,620],
  [598,608],[662,594],[725,582],[788,570],[845,556],[898,544],
  [948,532],[992,518],[1025,502],[1050,464],[1078,482],[1108,498],
  [1148,514],[1202,528],[1262,542],[1325,554],[1385,562],[1440,568],
];

// Front mountain — Okhla peak far left
const FRONT_TOP: [number, number][] = [
  [0,730],[55,714],[105,700],[152,682],[185,658],[200,630],
  [210,607],[213,564],[215,482],[220,508],[238,540],[268,562],
  [315,580],[375,594],[440,584],[508,599],[580,612],[655,622],
  [735,632],[820,640],[910,648],[1005,655],[1105,661],
  [1215,668],[1330,675],[1440,682],
];

function toPoints(pts: [number, number][], close = false): string {
  const base = pts.map(([x, y]) => `${x},${y}`).join(' ');
  return close ? `${base} 1440,900 0,900` : base;
}

// Annotation data: peak coord, leader end, label
const ANNOTATIONS = [
  {
    id: 'ghazipur',
    peak: [504, 430] as [number, number],
    leaderEnd: [580, 360] as [number, number],
    label: 'GHAZIPUR · 73M',
    delay: 'var(--a1)',
  },
  {
    id: 'bhalswa',
    peak: [1050, 464] as [number, number],
    leaderEnd: [1128, 386] as [number, number],
    label: 'BHALSWA · 62M',
    delay: 'var(--a2)',
  },
  {
    id: 'okhla',
    peak: [215, 482] as [number, number],
    leaderEnd: [310, 400] as [number, number],
    label: 'OKHLA · 55M',
    delay: 'var(--a3)',
  },
];

export default function HeroLandscape({ mouseRef }: HeroLandscapeProps) {
  const backRef  = useRef<SVGGElement>(null);
  const midRef   = useRef<SVGGElement>(null);
  const frontRef = useRef<SVGGElement>(null);

  // ── Parallax RAF loop (desktop pointer only) ──────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduced || !hasPointer) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let cx = 0, cy = 0;
    let rafId: number;

    const tick = () => {
      const tx = (mouseRef.current.x / 100 - 0.5); // -0.5 → 0.5
      const ty = (mouseRef.current.y / 100 - 0.5);
      cx = lerp(cx, tx, 0.06);
      cy = lerp(cy, ty, 0.06);

      if (backRef.current)  backRef.current.style.transform  = `translate(${cx * 5}px,${cy * 2.5}px)`;
      if (midRef.current)   midRef.current.style.transform   = `translate(${cx * 12}px,${cy * 6}px)`;
      if (frontRef.current) frontRef.current.style.transform = `translate(${cx * 20}px,${cy * 10}px)`;

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [mouseRef]);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={
        {
          '--a1': '1400ms',
          '--a2': '1620ms',
          '--a3': '1840ms',
        } as React.CSSProperties
      }
    >
      <defs>
        {/* Sky gradient — very dark top, subtly warmer toxic glow at bottom */}
        <linearGradient id="ls-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0a0a0a" />
          <stop offset="55%"  stopColor="#050806" />
          <stop offset="100%" stopColor="#0d1208" />
        </linearGradient>

        {/* Horizon haze radial glow */}
        <radialGradient id="ls-haze" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#c4e538" stopOpacity="0.11" />
          <stop offset="100%" stopColor="#c4e538" stopOpacity="0"    />
        </radialGradient>

        {/* Top-edge accent gradient — fades left/right so it doesn't look painted */}
        <linearGradient id="ls-edge-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#c4e538" stopOpacity="0"    />
          <stop offset="8%"   stopColor="#c4e538" stopOpacity="1"    />
          <stop offset="92%"  stopColor="#c4e538" stopOpacity="1"    />
          <stop offset="100%" stopColor="#c4e538" stopOpacity="0"    />
        </linearGradient>

        {/* Stroke mask so edge gradient applies to polyline */}
        <mask id="ls-edge-mask">
          <rect width="1440" height="900" fill="url(#ls-edge-fade)" />
        </mask>
      </defs>

      {/* ── Layer 1: Sky ── */}
      <rect width="1440" height="900" fill="url(#ls-sky)" />

      {/* ── Layer 2: Horizon haze band ── */}
      <ellipse cx="720" cy="544" rx="500" ry="52" fill="url(#ls-haze)" />

      {/* ── Layer 3a: Back mountain (Ghazipur) ── */}
      <g ref={backRef}>
        <polygon
          points={toPoints(BACK_TOP, true)}
          fill="#1a1f18"
        />
        {/* Top-edge glow stroke */}
        <polyline
          points={toPoints(BACK_TOP)}
          fill="none"
          stroke="#c4e538"
          strokeWidth="1"
          strokeOpacity="0.28"
          mask="url(#ls-edge-mask)"
        />
      </g>

      {/* ── Layer 3b: Mid mountain (Bhalswa) ── */}
      <g ref={midRef}>
        <polygon
          points={toPoints(MID_TOP, true)}
          fill="#14170f"
        />
        <polyline
          points={toPoints(MID_TOP)}
          fill="none"
          stroke="#c4e538"
          strokeWidth="1"
          strokeOpacity="0.20"
          mask="url(#ls-edge-mask)"
        />
      </g>

      {/* ── Layer 3c: Front mountain (Okhla) ── */}
      <g ref={frontRef}>
        <polygon
          points={toPoints(FRONT_TOP, true)}
          fill="#0d0f0a"
        />
        <polyline
          points={toPoints(FRONT_TOP)}
          fill="none"
          stroke="#c4e538"
          strokeWidth="1"
          strokeOpacity="0.14"
          mask="url(#ls-edge-mask)"
        />
      </g>

      {/* ── Layer 5: Data annotations (desktop only, staggered fade-in) ── */}
      {ANNOTATIONS.map(({ id, peak, leaderEnd, label, delay }) => (
        <g
          key={id}
          className="hidden sm:block annot-fade"
          style={{ animationDelay: delay }}
        >
          {/* Peak marker circle */}
          <circle
            cx={peak[0]} cy={peak[1]}
            r="4"
            fill="none"
            stroke="#c4e538"
            strokeWidth="1"
          />
          {/* Leader line */}
          <line
            x1={peak[0]} y1={peak[1] - 5}
            x2={leaderEnd[0]} y2={leaderEnd[1]}
            stroke="#c4e538"
            strokeWidth="0.8"
            strokeOpacity="0.32"
          />
          {/* Tiny terminal dot at label end */}
          <circle cx={leaderEnd[0]} cy={leaderEnd[1]} r="2" fill="#c4e538" fillOpacity="0.5" />
          {/* Label */}
          <text
            x={leaderEnd[0] + 6}
            y={leaderEnd[1] + 4}
            fill="#a8a8b8"
            fontSize="13"
            fontFamily="ui-monospace, 'Cascadia Code', monospace"
            letterSpacing="1.5"
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}
