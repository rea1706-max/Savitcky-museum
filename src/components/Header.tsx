'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/', anchor: 'hero' },
  { label: 'About', href: '/#about', anchor: 'about' },
  { label: "What\'s On", href: '/#whats-on', anchor: 'whats-on' },
  { label: 'Collection', href: '/#collection', anchor: 'collection' },
  { label: 'Stories', href: '/#stories', anchor: 'stories' },
];

const languages = ['KK', 'RU', 'UZ', 'EN'];

export default function Header({ openingSequence = false }: { openingSequence?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('EN');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const opening = openingSequence ? document.getElementById('opening-hero') : null;
      setScrolled(opening ? opening.getBoundingClientRect().bottom <= 0 : window.scrollY > 60);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openingSequence]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Navigate to homepage anchor — works from any page
  const handleNavClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    e.preventDefault();
    setMenuOpen(false);

    if (link.anchor === 'hero' || link.href === '/') {
      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/');
      }
      return;
    }

    if (pathname === '/') {
      // Already on homepage — scroll to anchor
      const el = document.getElementById(link.anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On a subpage — navigate to homepage with hash
      router.push(link.href);
    }
  };

  // After navigating to homepage with hash, scroll to anchor
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const anchor = window.location.hash.replace('#', '');
      const el = document.getElementById(anchor);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
      }
    }
  }, [pathname]);

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          {/* Logo — Cormorant Garamond wordmark */}
          <Link href="/" className="flex items-center group" aria-label="Savitsky Museum home">
            <div className="flex flex-col">
              <span
                className={`font-display font-medium tracking-widest uppercase transition-colors ${
                  scrolled ? 'text-foreground' : 'text-primary-foreground'
                } group-hover:text-accent`}
                style={{ fontSize: '0.95rem', letterSpacing: '0.2em', fontStyle: 'normal' }}
              >
                Savitsky
              </span>
              <span
                className={`transition-colors font-display font-light ${
                  scrolled ? 'text-muted-foreground' : 'text-primary-foreground/70'
                }`}
                style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}
              >
                Museum
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks?.map((link) => (
              <a
                key={link?.label}
                href={link?.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-label transition-colors hover:text-accent cursor-pointer ${
                  scrolled ? 'text-foreground' : 'text-primary-foreground'
                }`}
              >
                {link?.label}
              </a>
            ))}
          </div>

          {/* Right — language selector + Plan Your Visit */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language selector */}
            <div className="flex items-center gap-1">
              {languages?.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`text-label px-2 py-0.5 transition-colors ${
                    activeLang === lang
                      ? scrolled ? 'text-foreground' : 'text-primary-foreground'
                      : scrolled ? 'text-muted-foreground hover:text-foreground' : 'text-primary-foreground/40 hover:text-primary-foreground/70'
                  }`}
                  aria-label={`Switch to ${lang}`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Plan Your Visit button — always white/visible, hover matches nav accent */}
            <Link
              href="/visit"
              className={`text-label px-4 py-2 border transition-colors ${
                scrolled
                  ? 'border-foreground/30 text-foreground hover:bg-accent hover:text-primary-foreground hover:border-accent'
                  : 'border-primary-foreground/60 text-primary-foreground hover:text-accent hover:border-accent'
              }`}
            >
              Plan Your Visit
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden flex flex-col gap-1.5 w-8 group transition-colors ${
              scrolled ? 'text-foreground' : 'text-primary-foreground'
            }`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'w-full rotate-45 translate-y-2' : 'w-full'}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : 'w-2/3'}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'w-full -rotate-45 -translate-y-2' : 'w-full'}`} />
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-primary transition-transform duration-500 ease-museum lg:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Karakalpak ornament in mobile menu */}
        <div className="absolute inset-0 kk-pattern-dark pointer-events-none" aria-hidden="true" />
        <div className="relative flex flex-col h-full pt-28 px-8 pb-12">
          <nav className="flex flex-col gap-2 flex-1">
            {navLinks?.map((link, i) => (
              <a
                key={link?.label}
                href={link?.href}
                onClick={(e) => handleNavClick(e, link)}
                className="font-display text-primary-foreground/80 hover:text-primary-foreground border-b border-primary-foreground/10 py-5 transition-colors cursor-pointer"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', animationDelay: `${i * 60}ms` }}
              >
                {link?.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto">
            <div className="flex items-center gap-4 mb-4">
              {languages?.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`text-label transition-colors ${
                    activeLang === lang ? 'text-primary-foreground' : 'text-primary-foreground/40'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <Link
              href="/visit"
              onClick={() => setMenuOpen(false)}
              className="inline-block text-label text-primary-foreground border border-primary-foreground/60 px-5 py-2.5 mb-5 hover:text-accent hover:border-accent transition-colors"
            >
              Plan Your Visit
            </Link>
            <div className="text-metadata text-primary-foreground/50">
              Open Today: 09:00 – 18:00 &nbsp;·&nbsp; Tue – Sun
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
