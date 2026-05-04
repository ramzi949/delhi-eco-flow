'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useT } from '@/data/translations';

export default function FactorsSection() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <section className="py-24 px-4 sm:px-6 bg-raised">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-primary mb-12">
          {t.factors.heading}
        </h2>
        <div className="flex flex-col gap-2">
          {t.factors.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  onClick={() => toggle(i)}
                  className={`w-full text-left border rounded-lg px-5 py-4 transition-all duration-200 ${
                    isOpen
                      ? 'bg-base border-accent rounded-b-none'
                      : 'bg-base border-subtle hover:border-secondary'
                  }`}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-accent text-sm shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-heading font-bold text-lg text-primary">
                        {item.label}
                      </span>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className={`text-secondary shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
                {isOpen && (
                  <div className="border border-t-0 border-accent rounded-b-lg bg-base px-5 py-5">
                    <p className="text-secondary text-sm leading-relaxed">
                      {item.body}
                      {'source' in item && item.source && (
                        <span className="ml-1 text-accent font-mono text-xs">({item.source})</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
