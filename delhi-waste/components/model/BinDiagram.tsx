'use client';

import { useState } from 'react';

type BinKey = 'wet' | 'dry' | 'hazardous';

const BINS: {
  key: BinKey;
  label: string;
  sublabel: string;
  items: string[];
  stroke: string;
  fillColor: string;
  fid: string;
  tipTitle: string;
  tipBody: string;
  delay: string;
  cx: number;
}[] = [
  {
    key: 'wet',
    label: 'WET WASTE',
    sublabel: 'green bin',
    items: ['Food scraps', 'Vegetable peels', 'Garden waste'],
    stroke: '#4ade80',
    fillColor: 'rgba(74,222,128,0.22)',
    fid: 'bw',
    tipTitle: 'Green Bin: Wet Waste',
    tipBody: 'Food scraps, vegetable peels, cooked leftovers. At Eco-Flow, this stream goes straight to the biogas and compost unit. Nothing is burned.',
    delay: '0s',
    cx: 120,
  },
  {
    key: 'dry',
    label: 'DRY WASTE',
    sublabel: 'blue bin',
    items: ['Paper & cardboard', 'Plastic', 'Metal & glass'],
    stroke: '#60a5fa',
    fillColor: 'rgba(96,165,250,0.22)',
    fid: 'bd',
    tipTitle: 'Blue Bin: Dry Waste',
    tipBody: 'Paper, plastic, metal, glass, cardboard. This stream goes to the recycling sorting unit, run by formally employed waste pickers.',
    delay: '0.5s',
    cx: 360,
  },
  {
    key: 'hazardous',
    label: 'HAZARDOUS',
    sublabel: 'orange bin',
    items: ['Batteries & e-waste', 'Medicines', 'Paint & chemicals'],
    stroke: '#fb923c',
    fillColor: 'rgba(251,146,60,0.22)',
    fid: 'bh',
    tipTitle: 'Orange Bin: Hazardous',
    tipBody: 'Batteries, medicines, paint, chemicals, e-waste. Goes to the safe containment facility, never to an open landfill.',
    delay: '1s',
    cx: 600,
  },
];

// Bin body path: rectangle with rounded bottom corners only
function bodyPath(cx: number, bt: number, h: number, r: number): string {
  const bl = cx - 38, br = cx + 38;
  const bb = bt + h;
  return `M ${bl} ${bt} L ${br} ${bt} L ${br} ${bb - r} Q ${br} ${bb} ${br - r} ${bb} L ${bl + r} ${bb} Q ${bl} ${bb} ${bl} ${bb - r} Z`;
}

const LID_TOP  = 72;
const BODY_TOP = 95;
const BODY_H   = 138;

export default function BinDiagram() {
  const [active, setActive] = useState<BinKey | null>(null);
  const tip = active ? BINS.find(b => b.key === active) : null;

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 720 338"
          className="w-full"
          style={{ minWidth: 460, maxHeight: 400 }}
          aria-label="Eco-Flow household bin segregation system"
          role="img"
        >
          <defs>
            {BINS.map(b => (
              <filter key={b.fid} id={b.fid} x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="4" result="bl" />
                <feMerge><feMergeNode in="bl" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            ))}
            {BINS.map(b => (
              <clipPath key={`cp${b.key}`} id={`cp${b.key}`}>
                <path d={bodyPath(b.cx, BODY_TOP, BODY_H, 10)} />
              </clipPath>
            ))}
          </defs>

          {/* Header row */}
          <text x="360" y="18" textAnchor="middle" fill="#4b5563"
            fontSize="9" fontFamily="monospace" letterSpacing="2">
            HOUSEHOLD SEGREGATION
          </text>

          {/* Faint baseline connecting bins */}
          <line x1="162" y1={BODY_TOP + BODY_H / 2} x2="316" y2={BODY_TOP + BODY_H / 2}
            stroke="#1f2937" strokeWidth="1" />
          <line x1="404" y1={BODY_TOP + BODY_H / 2} x2="558" y2={BODY_TOP + BODY_H / 2}
            stroke="#1f2937" strokeWidth="1" />

          {BINS.map(b => {
            const lit = active === b.key;
            return (
              <g key={b.key} style={{ cursor: 'pointer' }}
                onMouseEnter={() => setActive(b.key)}
                onMouseLeave={() => setActive(null)}>

                {/* Stream color label */}
                <text x={b.cx} y={LID_TOP - 16} textAnchor="middle"
                  fill={b.stroke} fontSize="10" fontFamily="monospace" letterSpacing="1.5">
                  {b.label}
                </text>

                {/* Hinge knob */}
                <rect x={b.cx - 11} y={LID_TOP - 7} width={22} height={9} rx={3}
                  fill="#0d0d12" stroke={b.stroke} strokeWidth="1" />

                {/* Lid */}
                <rect x={b.cx - 44} y={LID_TOP + 2} width={88} height={20} rx={5}
                  fill="#0d0d12" stroke={b.stroke} strokeWidth="1.5"
                  filter={lit ? `url(#${b.fid})` : undefined} />

                {/* Body */}
                <path d={bodyPath(b.cx, BODY_TOP, BODY_H, 10)}
                  fill="#0d0d12" stroke={b.stroke} strokeWidth="1.5"
                  filter={lit ? `url(#${b.fid})` : undefined} />

                {/* Animated fill inside body */}
                <g clipPath={`url(#cp${b.key})`}>
                  <rect x={b.cx - 38} width={76} fill={b.fillColor}>
                    <animate attributeName="y"
                      values={`${BODY_TOP + 90};${BODY_TOP + 68};${BODY_TOP + 90}`}
                      dur="4s" begin={b.delay} repeatCount="indefinite" />
                    <animate attributeName="height"
                      values="48;70;48" dur="4s" begin={b.delay} repeatCount="indefinite" />
                  </rect>
                </g>

                {/* Interior guide lines */}
                {[-16, 0, 16].map(off => (
                  <line key={off}
                    x1={b.cx + off} y1={BODY_TOP + 4}
                    x2={b.cx + off * 0.82} y2={BODY_TOP + BODY_H - 4}
                    stroke={b.stroke} strokeWidth="0.4" opacity="0.14"
                    style={{ pointerEvents: 'none' }} />
                ))}

                {/* Animated drop particle */}
                <circle cx={b.cx} r={3.5} fill={b.stroke}>
                  <animate attributeName="cy"
                    from={LID_TOP - 18} to={BODY_TOP + 16}
                    dur="1.8s" begin={b.delay} repeatCount="indefinite" />
                  <animate attributeName="opacity"
                    values="0;0.9;0.9;0" keyTimes="0;0.15;0.7;1"
                    dur="1.8s" begin={b.delay} repeatCount="indefinite" />
                </circle>

                {/* Sublabel */}
                <text x={b.cx} y={BODY_TOP + BODY_H + 18} textAnchor="middle"
                  fill="#6b7280" fontSize="9" fontFamily="monospace">{b.sublabel}</text>

                {/* Items list */}
                {b.items.map((item, j) => (
                  <text key={j} x={b.cx} y={BODY_TOP + BODY_H + 34 + j * 15}
                    textAnchor="middle" fill="#9ca3af" fontSize="9.5" fontFamily="sans-serif">
                    {item}
                  </text>
                ))}

                {/* Down arrow */}
                <line x1={b.cx} y1={BODY_TOP + BODY_H + 83} x2={b.cx} y2={BODY_TOP + BODY_H + 96}
                  stroke={b.stroke} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.55" />
                <polygon
                  points={`${b.cx},${BODY_TOP + BODY_H + 102} ${b.cx - 5},${BODY_TOP + BODY_H + 94} ${b.cx + 5},${BODY_TOP + BODY_H + 94}`}
                  fill={b.stroke} opacity="0.55" />

                {/* Destination label */}
                <text x={b.cx} y={BODY_TOP + BODY_H + 116} textAnchor="middle"
                  fill={b.stroke} fontSize="8.5" fontFamily="monospace" opacity="0.7">
                  {b.key === 'wet' ? 'Biogas + Compost' : b.key === 'dry' ? 'Recycling Centre' : 'Safe Containment'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Tooltip panel */}
      <div
        className="mt-3 px-4 py-3 rounded-lg border border-subtle bg-raised min-h-[58px] transition-opacity duration-200"
        style={{ opacity: tip ? 1 : 0.45 }}
        aria-live="polite"
      >
        {tip ? (
          <>
            <p className="text-accent text-xs font-mono uppercase tracking-widest mb-1">{tip.tipTitle}</p>
            <p className="text-secondary text-sm leading-relaxed">{tip.tipBody}</p>
          </>
        ) : (
          <p className="text-secondary text-xs font-mono">Hover over a bin to see what goes inside.</p>
        )}
      </div>
    </div>
  );
}
