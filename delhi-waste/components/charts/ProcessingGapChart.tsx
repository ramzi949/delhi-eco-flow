'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { processingGap } from '@/data/processingGap';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    const gen = payload.find((p: { name: string; value: number }) => p.name === 'generated');
    const proc = payload.find((p: { name: string; value: number }) => p.name === 'processed');
    const gap = gen && proc ? gen.value - proc.value : 0;
    return (
      <div className="bg-raised border border-subtle rounded px-3 py-2 text-sm space-y-1">
        <p className="text-secondary font-medium">{label}</p>
        {payload.map((p: { name: string; value: number; color: string }) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name === 'generated' ? 'Generated' : 'Processed'}:{' '}
            {p.value.toLocaleString()} TPD
          </p>
        ))}
        {gap > 0 && (
          <p className="text-danger border-t border-subtle pt-1 mt-1">
            Gap: {gap.toLocaleString()} TPD
          </p>
        )}
      </div>
    );
  }
  return null;
};

const LABELS: Record<string, string> = { generated: 'Generated', processed: 'Processed' };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomLegend = ({ payload }: any) => (
  <ul className="flex justify-center gap-6 mt-2">
    {payload?.map((entry: { value: string; color: string }) => (
      <li key={entry.value} className="flex items-center gap-1.5 text-xs text-secondary">
        <span
          className="inline-block w-3 h-3 rounded-sm"
          style={{ backgroundColor: entry.color }}
        />
        {LABELS[entry.value] ?? entry.value}
      </li>
    ))}
  </ul>
);

export default function ProcessingGapChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={processingGap}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        barCategoryGap="30%"
        barGap={2}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
        <XAxis
          dataKey="year"
          stroke="#262626"
          tick={{ fill: '#a3a3a3', fontSize: 11 }}
          tickLine={false}
        />
        <YAxis
          stroke="#262626"
          tick={{ fill: '#a3a3a3', fontSize: 11 }}
          tickLine={false}
          tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
        <Bar dataKey="generated" name="generated" fill="#404040" radius={[2, 2, 0, 0]} />
        <Bar dataKey="processed" name="processed" fill="#c4e538" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
