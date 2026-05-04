'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { segregationByBody } from '@/data/segregationByBody';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-raised border border-subtle rounded px-3 py-2 text-sm">
        <p className="text-secondary">{label}</p>
        <p className="text-accent font-bold">{payload[0].value}% segregation</p>
      </div>
    );
  }
  return null;
};

function barColor(pct: number) {
  if (pct >= 85) return '#c4e538';
  if (pct >= 55) return '#a3a3a3';
  return '#dc2626';
}

export default function SegregationChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={segregationByBody}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
        <XAxis
          dataKey="body"
          stroke="#262626"
          tick={{ fill: '#a3a3a3', fontSize: 12 }}
          tickLine={false}
        />
        <YAxis
          stroke="#262626"
          tick={{ fill: '#a3a3a3', fontSize: 11 }}
          tickLine={false}
          unit="%"
          domain={[0, 100]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="percentage" radius={[4, 4, 0, 0]} maxBarSize={60}>
          {segregationByBody.map(entry => (
            <Cell key={entry.body} fill={barColor(entry.percentage)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
