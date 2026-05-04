'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { LocationCategory } from '@/data/types';
import { locations } from '@/data/locations';

const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-lg bg-raised border border-subtle flex items-center justify-center"
      style={{ height: '70vh' }}
    >
      <p className="text-secondary text-sm">Loading map…</p>
    </div>
  ),
});

const ALL_CATEGORIES: LocationCategory[] = [
  'ewaste',
  'composting',
  'recycler',
  'hazardous',
  'landfill',
];

const LABELS: Record<LocationCategory, string> = {
  ewaste: 'E-waste',
  composting: 'Composting',
  recycler: 'Recyclers',
  hazardous: 'Hazardous',
  landfill: 'Landfills',
};

const DOT_COLORS: Record<LocationCategory, string> = {
  ewaste: '#c4e538',
  composting: '#4ade80',
  recycler: '#60a5fa',
  hazardous: '#f97316',
  landfill: '#dc2626',
};

export default function MapSection() {
  const [active, setActive] = useState<Set<LocationCategory>>(
    new Set(ALL_CATEGORIES)
  );

  const allSelected = active.size === ALL_CATEGORIES.length;

  const toggleAll = () => {
    setActive(allSelected ? new Set(['landfill']) : new Set(ALL_CATEGORIES));
  };

  const toggle = (cat: LocationCategory) => {
    setActive(prev => {
      const next = new Set(prev);
      if (next.has(cat)) {
        if (next.size > 1) next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  return (
    <section className="py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Filter pills */}
        <div
          className="flex flex-wrap gap-2 mb-4"
          role="group"
          aria-label="Filter map markers by category"
        >
          <button
            onClick={toggleAll}
            aria-pressed={allSelected}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
              allSelected
                ? 'bg-accent text-base border-accent'
                : 'bg-transparent text-secondary border-subtle hover:border-secondary'
            }`}
          >
            All
          </button>
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => toggle(cat)}
              aria-pressed={active.has(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 flex items-center gap-1.5 ${
                active.has(cat)
                  ? 'bg-accent text-base border-accent'
                  : 'bg-transparent text-secondary border-subtle hover:border-secondary'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  backgroundColor: active.has(cat)
                    ? '#0a0a0a'
                    : DOT_COLORS[cat],
                }}
              />
              {LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Map */}
        <MapClient locations={locations} activeCategories={active} />

        {/* Disclaimer */}
        <p className="text-secondary text-xs mt-4 max-w-2xl">
          This is a prototype built for a school project. Locations are sourced
          from public data and NGO listings but may not be fully up to date.
          Entries marked [unverified] have not been independently confirmed.
          Verify before visiting.
        </p>
      </div>
    </section>
  );
}
