'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { wasteComposition } from '@/data/wasteComposition';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const item = payload[0];
    return (
      <div className="bg-raised border border-subtle rounded px-3 py-2 text-sm">
        <p style={{ color: item.payload.color }} className="font-bold">
          {item.name}
        </p>
        <p className="text-secondary">{item.value}% of total waste</p>
      </div>
    );
  }
  return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomLegend = ({ payload }: any) => (
  <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
    {payload?.map((entry: { value: string; color: string }) => (
      <li key={entry.value} className="flex items-center gap-1.5 text-xs text-secondary">
        <span
          className="inline-block w-2.5 h-2.5 rounded-sm shrink-0"
          style={{ backgroundColor: entry.color }}
        />
        {entry.value}
      </li>
    ))}
  </ul>
);

export default function CompositionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={wasteComposition}
          cx="50%"
          cy="45%"
          innerRadius={65}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
        >
          {wasteComposition.map(entry => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
