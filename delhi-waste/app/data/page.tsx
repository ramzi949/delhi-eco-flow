import type { Metadata } from 'next';
import StatCard from '@/components/StatCard';
import ChartsSection from '@/components/charts/ChartsSection';
import { stats } from '@/data/stats';
import { sources } from '@/data/sources';

export const metadata: Metadata = {
  title: 'Data Hub',
  description:
    "Every number, every source. Delhi's waste crisis in data: daily generation, processing capacity, landfill growth, segregation rates, and methane emissions.",
};

export default function DataPage() {
  return (
    <>
      {/* ── Intro ── */}
      <section className="pt-32 pb-16 px-4 sm:px-6 bg-base">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary mb-6">
            Data Hub
          </h1>
          <p className="text-secondary text-lg leading-relaxed max-w-2xl">
            Delhi produces around 10,000 tons of waste every day, and most of it ends up overflowing landfills that officially reached capacity in 2008. This page collects the data behind that reality: waste generation, landfill growth, air pollution, and the gap between what the government promises and what is actually happening. The number that stays with me most is that organic waste alone contributes about 24% of PM2.5 air pollution in Delhi during winter, and it is estimated that air pollution kills 2 million people every year.
          </p>
        </div>
      </section>

      {/* ── Stat Grid ── */}
      <section className="py-16 px-4 sm:px-6 bg-raised">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-primary mb-8">
            Key figures
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map(s => (
              <StatCard
                key={s.id}
                number={s.number}
                label={s.label}
                source={s.source}
                sourceLabel={s.sourceLabel}
                highlight={s.highlight}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Charts ── */}
      <ChartsSection />

      {/* ── Sources ── */}
      <section className="py-16 px-4 sm:px-6 bg-raised">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-primary mb-6">
            Sources
          </h2>
          <ol className="space-y-3 text-sm text-secondary list-decimal list-inside">
            {sources.map(s => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors duration-200 underline underline-offset-2"
                >
                  {s.title}
                </a>
                {': '}
                <span>
                  {s.publisher} ({s.year})
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
