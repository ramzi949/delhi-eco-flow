'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useT } from '@/data/translations';

export default function Footer() {
  const { lang } = useLanguage();
  const t = useT(lang);

  return (
    <footer className="border-t border-subtle py-8 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-1">
        <p className="text-secondary text-sm text-center">
          {t.footer.main}
        </p>
        <p className="text-secondary text-xs text-center font-mono tracking-widest uppercase">
          {t.footer.tagline}
        </p>
      </div>
    </footer>
  );
}
