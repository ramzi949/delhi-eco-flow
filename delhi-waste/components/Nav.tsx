'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useT } from '@/data/translations';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLanguage();
  const t = useT(lang);

  const navLinks = [
    { href: '/model', label: t.nav.model },
    { href: '/map', label: t.nav.map },
    { href: '/about', label: t.nav.about },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-base/80 backdrop-blur-md border-b border-subtle'
          : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity duration-200"
        >
          <Image src="/logo.png" alt="Delhi Eco-Flow" width={28} height={28} className="rounded-sm" />
          <span className="font-heading font-bold tracking-widest text-sm uppercase text-primary">
            Delhi Eco-Flow
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6 list-none">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-secondary hover:text-primary text-sm transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-0.5 border border-subtle rounded-full px-1 py-1 text-xs font-mono transition-colors duration-200 hover:border-accent"
            aria-label="Toggle language"
          >
            <span className={`px-2 py-0.5 rounded-full transition-colors duration-200 ${lang === 'en' ? 'bg-accent text-base font-bold' : 'text-secondary'}`} style={lang === 'en' ? { color: '#0d0d12' } : {}}>EN</span>
            <span className={`px-2 py-0.5 rounded-full transition-colors duration-200 ${lang === 'hi' ? 'bg-accent text-base font-bold' : 'text-secondary'}`} style={lang === 'hi' ? { color: '#0d0d12' } : {}}>HI</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
