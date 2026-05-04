'use client';

import { sources } from '@/data/sources';
import { useLanguage } from '@/contexts/LanguageContext';
import { useT } from '@/data/translations';

export default function AboutContent() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const a = t.about;

  return (
    <>
      {/* ── Story ── */}
      <section className="pt-32 pb-16 px-4 sm:px-6 bg-base">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary mb-10">
            {a.heading}
          </h1>
          <div className="space-y-6 text-secondary leading-relaxed">
            {a.story.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Research & Sources ── */}
      <section className="py-16 px-4 sm:px-6 bg-raised">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-primary mb-6">
            {a.sourcesHeading}
          </h2>
          <ol className="space-y-3 text-sm text-secondary list-decimal list-inside">
            {sources.map(s => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors duration-200 underline underline-offset-2"
                >
                  {s.title}
                </a>
                {': '}
                <span>
                  {s.publisher} ({s.year})
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Acknowledgments ── */}
      <section className="py-16 px-4 sm:px-6 bg-base">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-primary mb-6">
            {a.acknowledgementsHeading}
          </h2>
          <ul className="space-y-2 text-secondary text-sm">
            {a.acknowledgements.map(({ org, desc }) => (
              <li key={org}>
                <span className="text-primary font-medium">{org}</span>
                {desc}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="py-16 px-4 sm:px-6 bg-base">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-primary mb-4">
            {a.contactHeading}
          </h2>
          <p className="text-secondary text-sm">
            {a.contactBody}
            <a
              href="mailto:28rabdulahi@aes.ac.in"
              className="text-accent hover:underline underline-offset-2"
            >
              28rabdulahi@aes.ac.in
            </a>
          </p>
        </div>
      </section>

      {/* ── Action List ── */}
      <section id="action" className="py-24 px-4 sm:px-6 bg-raised">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-primary mb-3">
            {a.actionsHeading}
          </h2>
          <p className="text-secondary mb-12">
            {a.actionsSub}
          </p>
          <ol className="space-y-8">
            {a.actions.map((action, i) => (
              <li key={i} className="flex gap-6">
                <span className="font-mono text-accent text-2xl font-bold leading-none shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-heading font-bold text-lg text-primary mb-2">
                    {action.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    {action.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
