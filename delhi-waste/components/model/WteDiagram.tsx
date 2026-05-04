'use client';

import { useState } from 'react';

type Key = 'biogas' | 'recycling' | 'hazardous' | 'wte' | 'filters' | 'workers' | 'electricity';

const TIPS: Record<Key, { title: string; body: string }> = {
  biogas: {
    title: 'Biogas + Compost Unit',
    body: 'Wet organic waste becomes cooking gas and compost for farms. Nothing is burned.',
  },
  recycling: {
    title: 'Recycling Sorting Unit',
    body: 'Dry waste is sorted by waste pickers and sent to recycling centres. No incineration.',
  },
  hazardous: {
    title: 'Safe Containment',
    body: 'Batteries, medicines, and chemicals are safely contained and never dumped in open landfills.',
  },
  wte: {
    title: 'WTE Incinerator',
    body: 'Only true residual waste that cannot be recycled or composted is burned here. Most waste is diverted before reaching this point.',
  },
  filters: {
    title: 'Filtration Tower',
    body: 'Three layers trap particulates, acid gases, and CO2 before anything exits into the air.',
  },
  workers: {
    title: 'Formally Employed',
    body: "Waste pickers are hired with proper wages, safety equipment, and healthcare. They are the system.",
  },
  electricity: {
    title: 'Clean Electricity',
    body: 'Residual incineration powers the local grid with far fewer emissions than the current unfiltered system.',
  },
};

const ANIM = `
  @keyframes flowRight { to { stroke-dashoffset: -32; } }
  @keyframes flowSlow  { to { stroke-dashoffset: -20; } }
  .fl  { animation: flowRight 0.9s linear infinite; }
  .fl2 { animation: flowRight 0.9s 0.3s linear infinite; }
  .fl3 { animation: flowRight 0.9s 0.6s linear infinite; }
  .fls { animation: flowSlow  1.8s linear infinite; }
  .fls2{ animation: flowSlow  1.8s 0.6s linear infinite; }
  .fls3{ animation: flowSlow  1.8s 1.2s linear infinite; }
`;

function Worker({ x, y, showLabel }: { x: number; y: number; showLabel?: boolean }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx="0" cy="-16" rx="8" ry="4.5" fill="#c4e538" />
      <circle cx="0" cy="-9" r="5.5" fill="#d1d5db" />
      <rect x="-5" y="-3" width="10" height="13" rx="2" fill="#374151" />
      <line x1="-5" y1="1" x2="-12" y2="8" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      <line x1="5"  y1="1" x2="12"  y2="8" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      <line x1="-3" y1="10" x2="-3" y2="19" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      <line x1="3"  y1="10" x2="3"  y2="19" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      {showLabel && (
        <text x="0" y="32" textAnchor="middle" fill="#c4e538" fontSize="8" fontFamily="monospace" letterSpacing="0.5">
          EMPLOYED
        </text>
      )}
    </g>
  );
}

export default function WteDiagram() {
  const [active, setActive] = useState<Key | null>(null);
  const tip = active ? TIPS[active] : null;

  const on  = (k: Key) => () => setActive(k);
  const off = () => setActive(null);

  return (
    <div className="w-full">
      <style>{ANIM}</style>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 880 470"
          className="w-full"
          style={{ minWidth: 580, maxHeight: 520 }}
          aria-label="Ethical waste-to-energy system diagram"
          role="img"
        >
          <defs>
            <filter id="gg" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="gb" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="go" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="gl" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* INPUT LABELS */}
          <rect x="10" y="85" width="124" height="28" rx="4"
            fill="rgba(74,222,128,0.10)" stroke="#4ade80" strokeWidth="1" />
          <text x="72" y="104" textAnchor="middle" fill="#4ade80"
            fontSize="10" fontFamily="monospace" letterSpacing="1">WET WASTE</text>

          <rect x="10" y="218" width="124" height="28" rx="4"
            fill="rgba(96,165,250,0.10)" stroke="#60a5fa" strokeWidth="1" />
          <text x="72" y="237" textAnchor="middle" fill="#60a5fa"
            fontSize="10" fontFamily="monospace" letterSpacing="1">DRY WASTE</text>

          <rect x="10" y="351" width="124" height="28" rx="4"
            fill="rgba(251,146,60,0.10)" stroke="#fb923c" strokeWidth="1" />
          <text x="72" y="370" textAnchor="middle" fill="#fb923c"
            fontSize="10" fontFamily="monospace" letterSpacing="1">HAZARDOUS</text>

          {/* INPUT FLOW LINES */}
          <path d="M 134 99 L 250 99" stroke="#4ade80" strokeWidth="2.5"
            strokeDasharray="12 7" fill="none" filter="url(#gg)" className="fl" />
          <path d="M 134 232 L 250 232" stroke="#60a5fa" strokeWidth="2.5"
            strokeDasharray="12 7" fill="none" filter="url(#gb)" className="fl2" />
          <path d="M 134 365 L 250 365" stroke="#fb923c" strokeWidth="2.5"
            strokeDasharray="12 7" fill="none" filter="url(#go)" className="fl3" />

          {/* PROCESSING UNITS */}
          <rect x="250" y="73" width="154" height="54" rx="6"
            fill="rgba(74,222,128,0.07)" stroke="#4ade80" strokeWidth="1.5"
            style={{ cursor: 'pointer' }}
            onMouseEnter={on('biogas')} onMouseLeave={off} />
          <text x="327" y="98" textAnchor="middle" fill="#e5e7eb"
            fontSize="11" fontFamily="sans-serif" fontWeight="600">Biogas + Compost</text>
          <text x="327" y="114" textAnchor="middle" fill="#6b7280"
            fontSize="9" fontFamily="monospace">organic to gas + fertiliser</text>

          <rect x="250" y="205" width="154" height="54" rx="6"
            fill="rgba(96,165,250,0.07)" stroke="#60a5fa" strokeWidth="1.5"
            style={{ cursor: 'pointer' }}
            onMouseEnter={on('recycling')} onMouseLeave={off} />
          <text x="327" y="230" textAnchor="middle" fill="#e5e7eb"
            fontSize="11" fontFamily="sans-serif" fontWeight="600">Recycling Sorting</text>
          <text x="327" y="246" textAnchor="middle" fill="#6b7280"
            fontSize="9" fontFamily="monospace">paper · plastic · metal · glass</text>

          <rect x="250" y="338" width="154" height="54" rx="6"
            fill="rgba(251,146,60,0.07)" stroke="#fb923c" strokeWidth="1.5"
            style={{ cursor: 'pointer' }}
            onMouseEnter={on('hazardous')} onMouseLeave={off} />
          <text x="327" y="363" textAnchor="middle" fill="#e5e7eb"
            fontSize="11" fontFamily="sans-serif" fontWeight="600">Safe Containment</text>
          <text x="327" y="379" textAnchor="middle" fill="#6b7280"
            fontSize="9" fontFamily="monospace">contained, not dumped</text>

          {/* WORKER ICONS */}
          <g style={{ cursor: 'pointer' }} onMouseEnter={on('workers')} onMouseLeave={off}>
            <Worker x={420} y={99} />
            <Worker x={420} y={232} showLabel />
          </g>

          {/* RESIDUAL LABEL */}
          <text x="460" y="172" textAnchor="middle" fill="#4b5563"
            fontSize="8.5" fontFamily="monospace">residual</text>
          <text x="460" y="183" textAnchor="middle" fill="#4b5563"
            fontSize="8.5" fontFamily="monospace">only</text>

          {/* RESIDUAL LINES to WTE */}
          <path d="M 404 99 C 450 99 450 255 496 255"
            stroke="#4b5563" strokeWidth="1.2" fill="none"
            strokeDasharray="5 5" className="fls" />
          <path d="M 404 232 C 450 232 450 255 496 255"
            stroke="#4b5563" strokeWidth="1.2" fill="none"
            strokeDasharray="5 5" className="fls2" />
          <path d="M 404 365 C 450 365 450 258 496 257"
            stroke="#4b5563" strokeWidth="0.8" fill="none"
            strokeDasharray="3 7" className="fls3" />

          {/* WTE INCINERATOR */}
          <rect x="496" y="182" width="132" height="148" rx="8"
            fill="rgba(220,38,38,0.05)" stroke="#7f1d1d" strokeWidth="1.5"
            style={{ cursor: 'pointer' }}
            onMouseEnter={on('wte')} onMouseLeave={off} />
          <text x="562" y="214" textAnchor="middle" fill="#e5e7eb"
            fontSize="12" fontFamily="sans-serif" fontWeight="700">WTE</text>
          <text x="562" y="231" textAnchor="middle" fill="#e5e7eb"
            fontSize="11" fontFamily="sans-serif">Incinerator</text>
          <text x="562" y="249" textAnchor="middle" fill="#6b7280"
            fontSize="9" fontFamily="monospace">residual only</text>
          {/* flame */}
          <path d="M 550 305 Q 553 285 562 276 Q 560 292 568 285 Q 571 305 562 316 Q 554 321 550 305 Z"
            fill="#ef4444" opacity="0.35" />
          <path d="M 555 310 Q 558 296 562 289 Q 561 300 567 295 Q 569 310 562 318 Q 556 322 555 310 Z"
            fill="#fbbf24" opacity="0.45" />

          {/* CONNECTING PIPE to filter tower */}
          <rect x="550" y="142" width="24" height="40" rx="2"
            fill="rgba(75,85,99,0.35)" stroke="#4b5563" strokeWidth="1" />

          {/* FILTER TOWER */}
          <g style={{ cursor: 'pointer' }} onMouseEnter={on('filters')} onMouseLeave={off}>
            <rect x="508" y="106" width="108" height="28" rx="5"
              fill="rgba(156,163,175,0.10)" stroke="#9ca3af" strokeWidth="1.5" />
            <text x="562" y="125" textAnchor="middle" fill="#9ca3af"
              fontSize="8.5" fontFamily="monospace" letterSpacing="0.4">PARTICULATE FILTER</text>

            <rect x="508" y="70" width="108" height="28" rx="5"
              fill="rgba(147,197,253,0.10)" stroke="#93c5fd" strokeWidth="1.5" />
            <text x="562" y="89" textAnchor="middle" fill="#93c5fd"
              fontSize="9" fontFamily="monospace" letterSpacing="0.4">SCRUBBER</text>

            <rect x="508" y="34" width="108" height="28" rx="5"
              fill="rgba(196,229,56,0.10)" stroke="#c4e538" strokeWidth="1.5" />
            <text x="562" y="53" textAnchor="middle" fill="#c4e538"
              fontSize="8.5" fontFamily="monospace" letterSpacing="0.4">CARBON CAPTURE</text>
          </g>

          {/* clean air arrow */}
          <line x1="562" y1="34" x2="562" y2="14" stroke="#c4e538" strokeWidth="1.5" />
          <polygon points="562,5 556,16 568,16" fill="#c4e538" />
          <text x="584" y="12" fill="#c4e538" fontSize="8.5" fontFamily="monospace">CLEAN AIR</text>

          {/* rising particles */}
          <circle cx="553" cy="100" r="2" fill="#9ca3af">
            <animate attributeName="cy" from="172" to="12" dur="2.4s" repeatCount="indefinite" begin="0s" />
            <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.8;1" dur="2.4s" repeatCount="indefinite" begin="0s" />
          </circle>
          <circle cx="564" cy="100" r="1.5" fill="#93c5fd">
            <animate attributeName="cy" from="172" to="12" dur="2.4s" repeatCount="indefinite" begin="0.8s" />
            <animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.1;0.8;1" dur="2.4s" repeatCount="indefinite" begin="0.8s" />
          </circle>
          <circle cx="572" cy="100" r="2" fill="#c4e538">
            <animate attributeName="cy" from="172" to="12" dur="2.4s" repeatCount="indefinite" begin="1.6s" />
            <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.1;0.8;1" dur="2.4s" repeatCount="indefinite" begin="1.6s" />
          </circle>

          {/* OUTPUT LINE */}
          <path d="M 628 256 L 726 256" stroke="#c4e538" strokeWidth="2.5"
            strokeDasharray="12 7" fill="none" filter="url(#gl)" className="fl" />

          {/* ELECTRICITY BOX */}
          <g style={{ cursor: 'pointer' }} onMouseEnter={on('electricity')} onMouseLeave={off}>
            <rect x="726" y="224" width="96" height="64" rx="6"
              fill="rgba(196,229,56,0.07)" stroke="#c4e538" strokeWidth="1.5" />
            <polygon points="772,234 763,253 771,253 766,282 783,257 773,257 782,234"
              fill="#c4e538" opacity="0.85" />
          </g>
          <text x="774" y="302" textAnchor="middle" fill="#c4e538"
            fontSize="9" fontFamily="monospace">ELECTRICITY</text>

        </svg>
      </div>

      {/* TOOLTIP PANEL */}
      <div
        className="mt-3 px-4 py-3 rounded-lg border border-subtle bg-raised min-h-[58px] transition-opacity duration-200"
        style={{ opacity: tip ? 1 : 0.45 }}
        aria-live="polite"
      >
        {tip ? (
          <>
            <p className="text-accent text-xs font-mono uppercase tracking-widest mb-1">{tip.title}</p>
            <p className="text-secondary text-sm leading-relaxed">{tip.body}</p>
          </>
        ) : (
          <p className="text-secondary text-xs font-mono">Hover over any component to learn more.</p>
        )}
      </div>
    </div>
  );
}
