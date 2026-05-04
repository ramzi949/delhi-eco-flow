import type { Metadata } from 'next';
import MapSection from '@/components/map/MapSection';

export const metadata: Metadata = {
  title: 'Map',
  description:
    'Find e-waste drop-off centres, composting collectives, verified recyclers, and hazardous waste collection points across Delhi.',
};

export default function MapPage() {
  return (
    <>
      {/* ── Intro ── */}
      <section className="pt-32 pb-8 px-4 sm:px-6 bg-base">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary mb-6">
            Map
          </h1>
          <p className="text-secondary text-lg leading-relaxed max-w-2xl">
            This map shows where Delhi&apos;s waste actually goes, and where it
            can go differently. Use the filter pills to toggle between{' '}
            <span className="text-accent">e-waste drop-off centres</span>,{' '}
            <span className="text-[#4ade80]">composting collectives</span>,{' '}
            <span className="text-[#60a5fa]">verified recyclers</span>,{' '}
            <span className="text-[#f97316]">hazardous waste points</span>, and{' '}
            <span className="text-danger">the three active landfills</span>.
            Click any marker for details, hours, and what it accepts.
          </p>
        </div>
      </section>

      {/* ── Map + Filters ── */}
      <MapSection />
    </>
  );
}
