'use client';

import WteDiagram from '@/components/model/WteDiagram';
import BinDiagram from '@/components/model/BinDiagram';
import { useLanguage } from '@/contexts/LanguageContext';
import { useT } from '@/data/translations';

export default function ModelContent() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const m = t.model;

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-12 px-4 sm:px-6 bg-base">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent text-xs uppercase tracking-widest font-mono mb-4">
            {m.eyebrow}
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary mb-5 leading-tight">
            {m.heading}
          </h1>
          <p className="text-secondary max-w-xl">
            {m.subtitle}
          </p>
        </div>
      </section>

      {/* ── WTE Diagram ── */}
      <section className="py-12 px-4 sm:px-6 bg-raised">
        <div className="max-w-5xl mx-auto">
          <WteDiagram />
        </div>
      </section>

      {/* ── Bin System Diagram ── */}
      <section className="py-12 px-4 sm:px-6 bg-base">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent text-xs uppercase tracking-widest font-mono mb-2">{m.binEyebrow}</p>
          <h2 className="font-heading font-bold text-2xl text-primary mb-2">
            {m.binHeading}
          </h2>
          <p className="text-secondary text-sm mb-8 max-w-xl">
            {m.binDesc}
          </p>
          <BinDiagram />
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className="py-16 px-4 sm:px-6 bg-raised">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent text-xs uppercase tracking-widest font-mono mb-2">{m.comparisonEyebrow}</p>
          <h2 className="font-heading font-bold text-2xl text-primary mb-8">
            {m.comparisonHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-danger/30 rounded-lg p-6 bg-base">
              <p className="text-xs uppercase tracking-widest font-mono text-danger mb-4">
                {m.currentLabel}
              </p>
              <ul className="space-y-3">
                {m.currentPoints.map((pt, i) => (
                  <li key={i} className="flex gap-3 text-sm text-secondary">
                    <span className="shrink-0 text-danger">x</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-accent/30 rounded-lg p-6 bg-base">
              <p className="text-xs uppercase tracking-widest font-mono text-accent mb-4">
                {m.modelLabel}
              </p>
              <ul className="space-y-3">
                {m.modelPoints.map((pt, i) => (
                  <li key={i} className="flex gap-3 text-sm text-secondary">
                    <span className="shrink-0 text-accent">v</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Idea ── */}
      <section className="py-16 px-4 sm:px-6 bg-base">
        <div className="max-w-3xl mx-auto border border-accent/30 rounded-lg p-8 sm:p-12">
          <p className="text-accent text-xs uppercase tracking-widest font-mono mb-4">
            {m.coreEyebrow}
          </p>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-primary mb-4 leading-snug">
            {m.coreHeading}<br />
            {m.coreHeading2}
          </h2>
          <p className="text-secondary leading-relaxed">
            {m.coreBody}
          </p>
        </div>
      </section>
    </>
  );
}
