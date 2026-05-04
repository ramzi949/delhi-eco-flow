'use client';

import { useState } from 'react';
import type { FlowStep } from '@/data/types';

interface WasteFlowProps {
  steps: readonly FlowStep[];
}

export default function WasteFlow({ steps }: WasteFlowProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) => setActiveId(prev => (prev === id ? null : id));

  return (
    <section className="py-24 px-4 sm:px-6 bg-raised">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-primary mb-3">
          How Delhi&apos;s waste actually flows
        </h2>
        <p className="text-secondary mb-12 max-w-2xl">
          Six steps. Each one with a plan. Each one with a reality. Tap a step to see the gap.
        </p>

        <div className="flex flex-col gap-2">
          {steps.map((step, index) => {
            const isOpen = activeId === step.id;
            return (
              <div key={step.id}>
                <button
                  onClick={() => toggle(step.id)}
                  className={`w-full text-left border rounded-lg px-5 py-4 transition-all duration-200 ${
                    isOpen
                      ? 'bg-base border-accent rounded-b-none'
                      : 'bg-base border-subtle hover:border-secondary'
                  }`}
                  aria-expanded={isOpen}
                  aria-controls={`step-panel-${step.id}`}
                  id={`step-btn-${step.id}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-accent text-sm shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-heading font-bold text-lg text-primary">
                        {step.title}
                      </span>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className={`text-secondary shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`step-panel-${step.id}`}
                    role="region"
                    aria-labelledby={`step-btn-${step.id}`}
                    className="border border-t-0 border-accent rounded-b-lg bg-base px-5 py-5 grid sm:grid-cols-3 gap-5"
                  >
                    <div>
                      <p className="text-xs font-medium text-accent uppercase tracking-wider mb-2">
                        Intended
                      </p>
                      <p className="text-secondary text-sm leading-relaxed">
                        {step.intended}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-2">
                        Reality
                      </p>
                      <p className="text-secondary text-sm leading-relaxed">
                        {step.reality}
                      </p>
                    </div>
                    <div className="sm:border-l sm:border-subtle sm:pl-5">
                      <p className="text-xs font-medium text-danger uppercase tracking-wider mb-2">
                        The Gap
                      </p>
                      <p className="text-primary text-sm font-medium leading-relaxed">
                        {step.gap}
                      </p>
                    </div>
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
