import SourceLink from './SourceLink';

interface StatCardProps {
  number: string;
  label: string;
  source?: string;
  sourceLabel?: string;
  highlight?: 'accent' | 'danger';
}

export default function StatCard({
  number,
  label,
  source,
  sourceLabel = 'source',
  highlight = 'accent',
}: StatCardProps) {
  return (
    <article className="bg-raised border border-subtle rounded-lg p-6 flex flex-col gap-3">
      <span
        className={`tabular-nums font-heading font-bold text-5xl md:text-6xl leading-none tracking-tight ${
          highlight === 'danger' ? 'text-danger' : 'text-accent'
        }`}
        aria-label={number}
      >
        {number}
      </span>
      <p className="text-secondary text-sm leading-relaxed">
        {label}
        {source && (
          <>
            {' '}
            <SourceLink href={source} label={sourceLabel} />
          </>
        )}
      </p>
    </article>
  );
}
