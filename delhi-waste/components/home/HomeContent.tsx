'use client';

import Link from 'next/link';
import Image from 'next/image';
import FactorsSection from '@/components/home/FactorsSection';
import StatCard from '@/components/StatCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useT } from '@/data/translations';

const statSources = [
  {
    source: 'https://www.downtoearth.org.in/waste/living-next-to-delhi-s-trash-mountain-policies-should-focus-on-easing-the-struggles-of-waste-pickers-91080',
    sourceLabel: 'Down To Earth',
    highlight: 'danger' as const,
  },
  {
    source: 'https://earth5r.org/delhi-pollution-circular-economy/',
    sourceLabel: 'Earth5R',
    highlight: 'danger' as const,
  },
  {
    source: 'https://histecon.fas.harvard.edu/1800_histories/sites/delhi.html',
    sourceLabel: 'Harvard',
    highlight: 'accent' as const,
  },
  {
    source: 'https://earth5r.org/delhi-pollution-circular-economy/',
    sourceLabel: 'Earth5R',
    highlight: 'danger' as const,
  },
];

const nextLinkHrefs = ['/model', '/map', '/about#action'];

export default function HomeContent() {
  const { lang } = useLanguage();
  const t = useT(lang);

  const nextLinks = t.home.whereNext.links.map((l, i) => ({
    ...l,
    href: nextLinkHrefs[i],
  }));

  return (
    <>
      {/* ── Logo / brand banner ── */}
      <div className="flex flex-col items-center justify-center gap-3 py-10 px-4 bg-base border-b border-subtle">
        <Image src="/logo.png" alt="Delhi Eco-Flow" width={72} height={72} className="rounded-md" />
        <p className="font-heading font-bold tracking-widest text-lg uppercase text-primary">
          Delhi Eco-Flow
        </p>
        <p className="text-secondary text-sm text-center max-w-xs">
          {lang === 'en'
            ? 'A student-led campaign for ethical waste management in Delhi'
            : 'दिल्ली में नैतिक कचरा प्रबंधन के लिए छात्र-नेतृत्व अभियान'}
        </p>
      </div>

      {/* ── Fact strip ── */}
      <div className="border-y border-subtle bg-raised" aria-label="Key facts">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-subtle">
          {t.home.factStrip.map(({ number, fact }) => (
            <div key={number + fact} className="py-8 px-4 sm:px-8">
              <p className="tabular-nums font-heading font-bold text-3xl sm:text-4xl text-accent leading-none mb-2">
                {number}
              </p>
              <p className="text-secondary text-sm leading-relaxed">{fact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Factors ── */}
      <FactorsSection />

      {/* ── Human Cost ── */}
      <section className="py-24 px-4 sm:px-6 bg-base">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-primary mb-3">
            {t.home.humanCost.heading}
          </h2>
          <p className="text-secondary mb-12 max-w-2xl">
            {t.home.humanCost.intro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.home.humanCost.stats.map((s, i) => (
              <StatCard
                key={s.number + i}
                number={s.number}
                label={s.label}
                source={statSources[i].source}
                sourceLabel={statSources[i].sourceLabel}
                highlight={statSources[i].highlight}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-24 px-4 sm:px-6 bg-base">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-primary mb-3">
            {t.home.mission.heading}
          </h2>
          <p className="text-secondary mb-12 max-w-2xl">
            {t.home.mission.intro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.home.mission.pillars.map(({ eyebrow, title, desc }) => (
              <div
                key={eyebrow}
                className="bg-raised border border-subtle rounded-lg p-6 sm:p-8 flex flex-col gap-4"
              >
                <p className="text-accent text-xs uppercase tracking-widest font-mono">
                  {eyebrow}
                </p>
                <h3 className="font-heading font-bold text-xl text-primary leading-snug">
                  {title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed flex-1">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-accent text-sm hover:underline underline-offset-4"
            >
              {t.home.mission.readMore} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Support / Donate ── */}
      <section className="py-24 px-4 sm:px-6 bg-raised">
        <div className="max-w-6xl mx-auto">
          <div className="border border-subtle rounded-lg p-8 sm:p-16 flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-16">
            <div className="flex-1">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-primary mb-4">
                {t.home.support.heading}
              </h2>
              <p className="text-secondary leading-relaxed max-w-xl">
                {t.home.support.body}
              </p>
            </div>
            <div className="shrink-0">
              <a
                href="#"
                className="inline-block px-8 py-4 bg-accent text-base font-heading font-bold text-sm rounded-lg hover:opacity-90 transition-opacity duration-200"
                style={{ color: '#0d0d12' }}
              >
                {t.home.support.donate} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Where to Next ── */}
      <section className="py-24 px-4 sm:px-6 bg-base">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-primary mb-12">
            {t.home.whereNext.heading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {nextLinks.map(({ href, title, desc }) => (
              <Link
                key={href}
                href={href}
                className="group bg-raised border border-subtle rounded-lg p-6 flex flex-col gap-3 hover:border-accent transition-all duration-200"
              >
                <h3 className="font-heading font-bold text-xl text-primary group-hover:text-accent transition-colors duration-200">
                  {title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed flex-1">{desc}</p>
                <span className="text-accent text-lg" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="py-20 px-4 sm:px-6 bg-raised border-t border-subtle">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-heading font-bold text-2xl text-primary mb-2">
              {t.home.contact.heading}
            </h2>
            <p className="text-secondary text-sm max-w-md">
              {t.home.contact.body}
            </p>
          </div>
          <a
            href="mailto:28rabdulahi@aes.ac.in"
            className="shrink-0 inline-flex items-center gap-2 border border-subtle rounded-lg px-6 py-3 text-sm text-secondary hover:border-accent hover:text-accent transition-all duration-200"
          >
            28rabdulahi@aes.ac.in →
          </a>
        </div>
      </section>
    </>
  );
}
