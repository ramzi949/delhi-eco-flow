'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { ghazipurGrowth } from '@/data/ghazipurGrowth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-raised border border-subtle rounded px-3 py-2 text-sm">
        <p className="text-secondary">{label}</p>
        <p className="text-accent font-bold">{payload[0].value}m tall</p>
      </div>
    );
  }
  return null;
};

export default function GhazipurChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={ghazipurGrowth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
        <XAxis
          dataKey="year"
          stroke="#262626"
          tick={{ fill: '#a3a3a3', fontSize: 11 }}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          stroke="#262626"
          tick={{ fill: '#a3a3a3', fontSize: 11 }}
          tickLine={false}
          unit="m"
          domain={[0, 80]}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          y={65}
          stroke="#dc2626"
          strokeDasharray="4 4"
          label={{ value: 'Declared full 2017', fill: '#dc2626', fontSize: 10, position: 'insideTopRight' }}
        />
        <ReferenceLine
          y={72.5}
          stroke="#a3a3a3"
          strokeDasharray="4 4"
          label={{ value: 'Qutub Minar 72.5m', fill: '#a3a3a3', fontSize: 10, position: 'insideTopRight' }}
        />
        <Line
          type="monotone"
          dataKey="height"
          stroke="#c4e538"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: '#c4e538', strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
