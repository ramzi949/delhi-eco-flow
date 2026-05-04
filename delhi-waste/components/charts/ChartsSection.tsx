'use client';

import dynamic from 'next/dynamic';

const ChartSkeleton = () => (
  <div className="h-[300px] bg-raised rounded-lg animate-pulse" />
);

const GhazipurChart = dynamic(() => import('./GhazipurChart'), {
  ssr: false,
  loading: ChartSkeleton,
});
const SegregationChart = dynamic(() => import('./SegregationChart'), {
  ssr: false,
  loading: ChartSkeleton,
});
const CompositionChart = dynamic(() => import('./CompositionChart'), {
  ssr: false,
  loading: ChartSkeleton,
});
const ProcessingGapChart = dynamic(() => import('./ProcessingGapChart'), {
  ssr: false,
  loading: ChartSkeleton,
});

interface ChartBlockProps {
  title: string;
  caption: string;
  children: React.ReactNode;
}

function ChartBlock({ title, caption, children }: ChartBlockProps) {
  return (
    <div className="bg-raised border border-subtle rounded-lg p-6">
      <h3 className="font-heading font-bold text-xl text-primary mb-1">{title}</h3>
      <p className="text-secondary text-sm mb-6">{caption}</p>
      {children}
    </div>
  );
}

export default function ChartsSection() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-primary mb-10">
          The data, visualised
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <ChartBlock
            title="Ghazipur Landfill Growth (1984–2026)"
            caption="Height in metres. The site was declared full in 2017. Dumping has continued every day since."
          >
            <GhazipurChart />
          </ChartBlock>

          <ChartBlock
            title="Segregation by Civic Body"
            caption="NDMC covers 3% of Delhi's area but achieves 92% segregation. MCD covers 90% of the city and reaches only 59%."
          >
            <SegregationChart />
          </ChartBlock>

          <ChartBlock
            title="Waste Composition"
            caption="Over half of Delhi's waste is organic, compostable material that instead fills landfills and generates methane."
          >
            <CompositionChart />
          </ChartBlock>

          <ChartBlock
            title="Generation vs. Processing Capacity (TPD)"
            caption="The gap between what Delhi generates and what it can process has grown every year. In 2025 it exceeds 4,200 tonnes per day."
          >
            <ProcessingGapChart />
          </ChartBlock>
        </div>
      </div>
    </section>
  );
}
