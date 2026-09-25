'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage, type Locale } from '@/lib/i18n';

type NavLink = {
  label: string;
  href: string;
  anchor?: string;
};

const languages: Locale[] = ['KK', 'RU', 'UZ', 'EN'];
let activeAnchorRequest = 0;

function jumpToScrollPosition(top: number) {
  const previousScrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
  document.documentElement.style.scrollBehavior = previousScrollBehavior;
}

function scrollToAnchor(element: HTMLElement) {
  const request = ++activeAnchorRequest;
  const journey = document.querySelector<HTMLElement>('[data-collection-journey]');

  if (element.id === 'collection' && journey) {
    const dispatchWhenReady = (attempt = 0) => {
      if (request !== activeAnchorRequest) return;

      const currentJourney = document.querySelector<HTMLElement>('[data-collection-journey]');
      const currentCollection = document.getElementById('collection') ?? element;
      if (!currentJourney) return;

      const alignResponsiveCollection = () => {
        if (request !== activeAnchorRequest) return;
        const liveCollection = document.getElementById('collection') ?? currentCollection;
        const navigationHeight =
          document.querySelector<HTMLElement>('[data-site-navigation]')?.offsetHeight ?? 72;
        const offset = liveCollection.getBoundingClientRect().top - navigationHeight;
        if (Math.abs(offset) > 8) {
          window.scrollTo({ top: Math.max(0, window.scrollY + offset), behavior: 'smooth' });
        }
      };

      if (currentJourney.dataset.collectionNavigationReady === 'true') {
        const journeyTarget = Number(currentJourney.dataset.collectionScrollTarget);
        if (Number.isFinite(journeyTarget)) {
          const alignJourneyCollection = () => {
            if (request !== activeAnchorRequest) return;
            const liveJourney = document.querySelector<HTMLElement>('[data-collection-journey]');
            const liveTarget = Number(liveJourney?.dataset.collectionScrollTarget);
            if (Number.isFinite(liveTarget)) jumpToScrollPosition(liveTarget);
          };

          alignJourneyCollection();
          window.setTimeout(alignJourneyCollection, 120);
          window.setTimeout(alignJourneyCollection, 500);
          return;
        }
      }

      if (attempt === 0) {
        const stage = currentJourney.querySelector<HTMLElement>('[data-journey-stage]');
        if (stage) {
          const start = window.scrollY + stage.getBoundingClientRect().top;
          const target = start + stage.clientHeight * 2.5 * 0.84;
          window.scrollTo({ top: target, behavior: 'smooth' });
        }
      }

      if (attempt < 80) {
        window.setTimeout(() => dispatchWhenReady(attempt + 1), 100);
        return;
      }

      const stage = currentJourney.querySelector<HTMLElement>('[data-journey-stage]');
      if (stage) {
        const start = window.scrollY + stage.getBoundingClientRect().top;
        jumpToScrollPosition(start + stage.clientHeight * 2.5 * 0.84);
      } else {
        alignResponsiveCollection();
      }
    };

    dispatchWhenReady();
    return;
  }

  // What's On lives inside a pinned track. Its own bounding box moves with
  // ScrollTrigger; the outer journey stays at a stable document position.
  const target = element.id === 'whats-on' ? (journey ?? element) : element;
  window.scrollTo({
    top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - 76),
    behavior: 'smooth',
  });
}

export default function Header({ openingSequence = false }: { openingSequence?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale: activeLang, setLocale, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const navLinks: NavLink[] = [
    { label: t.nav.home, href: '/', anchor: 'hero' },
    { label: t.nav.about, href: '/#about', anchor: 'about' },
    { label: t.nav.whatsOn, href: '/#whats-on', anchor: 'whats-on' },
    { label: t.nav.collection, href: '/#collection', anchor: 'collection' },
    { label: t.nav.stories, href: '/stories' },
  ];

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
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Navigate to homepage anchor — works from any page
  const handleNavClick = (e: React.MouseEvent, link: NavLink) => {
    e.preventDefault();
    activeAnchorRequest += 1;
    setMenuOpen(false);
    document.body.style.overflow = '';

    if (!link.anchor) {
      router.push(link.href);
      return;
    }

    if (link.anchor === 'hero' || link.href === '/') {
      if (pathname === '/') {
        window.history.pushState(null, '', '/');
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
        window.history.pushState(null, '', link.href);
        scrollToAnchor(el);
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
        setTimeout(() => scrollToAnchor(el), 300);
      }
    }
  }, [pathname]);

  return (
    <>
      {/* Main Navigation */}
      <nav
        data-site-navigation
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
        }`}
        aria-label={t.ui.mainNavigation}
      >
        <div className="flex items-center justify-between px-5 py-4 md:px-8 xl:px-12">
          {/* Logo — Cormorant Garamond wordmark */}
          <Link
            href="/"
            className="group flex min-w-0 shrink-0 items-center"
            aria-label={t.ui.museumHome}
          >
            <div className="flex min-w-0 flex-col">
              <span
                className={`font-display font-semibold tracking-widest uppercase transition-colors ${
                  scrolled ? 'text-foreground' : 'text-primary-foreground'
                } group-hover:text-accent`}
                style={{ fontSize: '0.98rem', letterSpacing: '0.2em', fontStyle: 'normal' }}
              >
                {t.ui.brandLine1}
              </span>
              <span
                className={`transition-colors font-display font-light ${
                  scrolled ? 'text-muted-foreground' : 'text-primary-foreground/70'
                }`}
                style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}
              >
                {t.ui.brandLine2}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-5 lg:flex xl:gap-8">
            {navLinks?.map((link) => (
              <a
                key={link?.label}
                href={link?.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`site-nav-label cursor-pointer transition-colors hover:text-accent ${
                  scrolled ? 'text-foreground' : 'text-primary-foreground'
                }`}
              >
                {link?.label}
              </a>
            ))}
          </div>

          {/* Right — language selector + Plan Your Visit */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-4">
            {/* Language selector */}
            <div className="flex shrink-0 items-center gap-0.5 xl:gap-1">
              {languages?.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLocale(lang)}
                  className={`site-language-option site-nav-label px-1.5 py-0.5 xl:px-2 ${
                    scrolled ? 'site-nav-on-light' : 'site-nav-on-dark'
                  }`}
                  aria-label={t.ui.switchLanguage.replace('{language}', t.ui.languageNames[lang])}
                  aria-pressed={activeLang === lang}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Plan Your Visit button — always white/visible, hover matches nav accent */}
            <Link
              href="/visit"
              className={`site-nav-label hidden border px-4 py-2 transition-colors xl:inline-flex ${
                scrolled
                  ? 'border-foreground/30 text-foreground hover:bg-accent hover:text-primary-foreground hover:border-accent'
                  : 'border-primary-foreground/60 text-primary-foreground hover:text-accent hover:border-accent'
              }`}
            >
              {t.nav.planVisit}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden flex flex-col gap-1.5 w-8 group transition-colors ${
              scrolled ? 'text-foreground' : 'text-primary-foreground'
            }`}
            aria-label={menuOpen ? t.ui.closeMenu : t.ui.openMenu}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'w-full rotate-45 translate-y-2' : 'w-full'}`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : 'w-2/3'}`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'w-full -rotate-45 -translate-y-2' : 'w-full'}`}
            />
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
                className="mobile-menu-link cursor-pointer border-b border-primary-foreground/10 py-5 font-display transition-colors hover:text-primary-foreground"
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
                  onClick={() => setLocale(lang)}
                  className="site-language-option site-nav-on-dark text-label"
                  aria-label={t.ui.switchLanguage.replace('{language}', t.ui.languageNames[lang])}
                  aria-pressed={activeLang === lang}
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
              {t.nav.planVisit}
            </Link>
            <div className="text-metadata text-primary-foreground/50">{t.info.hoursValue}</div>
          </div>
        </div>
      </div>
    </>
  );
}
