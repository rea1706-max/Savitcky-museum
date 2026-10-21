'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEvent } from 'react';
import { useLanguage, type Locale } from '@/lib/i18n';
import { homeSectionFromHref, jumpToSection } from '@/lib/sectionNavigation';
import styles from './ClosingFooter.module.css';

const languages: Locale[] = ['EN', 'RU', 'UZ', 'KK'];

export default function ClosingFooter() {
  const { locale: activeLanguage, setLocale, t } = useLanguage();
  const pathname = usePathname();

  // On the home page, section links open their section at once, like the header.
  const openHomeSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const section = homeSectionFromHref(href);
    if (!section || pathname !== '/') return;
    event.preventDefault();
    window.history.pushState(null, '', href);
    jumpToSection(section);
  };

  const groups = [
    {
      title: t.footer.groups.museum.title,
      links: [
        { label: t.footer.groups.museum.about, href: '/#about' },
        { label: t.footer.groups.museum.today, href: '/#stories' },
      ],
    },
    {
      title: t.footer.groups.collection.title,
      links: [
        { label: t.footer.groups.collection.explore, href: '/collection' },
        {
          label: t.footer.groups.collection.karakalpak,
          href: '/collection?category=karakalpak-arts',
        },
        { label: t.footer.groups.collection.avantGarde, href: '/collection?category=avant-garde' },
      ],
    },
    {
      title: t.footer.groups.exhibitions.title,
      links: [
        { label: t.footer.groups.exhibitions.whatsOn, href: '/#whats-on' },
        { label: t.footer.groups.exhibitions.all, href: '/exhibitions' },
      ],
    },
    {
      title: t.footer.groups.stories.title,
      links: [
        { label: t.footer.groups.stories.explore, href: '/stories' },
        { label: t.footer.groups.stories.people, href: '/stories#people' },
      ],
    },
    {
      title: t.footer.groups.visit.title,
      links: [
        { label: t.footer.groups.visit.plan, href: '/visit' },
        { label: t.footer.groups.visit.hours, href: '/visit#hours' },
        { label: t.footer.groups.visit.gettingHere, href: '/visit#location' },
      ],
    },
  ];

  return (
    <footer className={styles.footer} aria-label={t.ui.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p>
            {t.ui.brandLine1}
            <br />
            {t.ui.brandLine2}
          </p>
          <small>{t.footer.tagline}</small>
        </div>

        <div className={styles.navigation}>
          <div className={styles.columns}>
            {groups.map((group) => (
              <div className={styles.group} key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} onClick={(event) => openHomeSection(event, link.href)}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={styles.signature}>
            {t.footer.sloganLine1}
            <br />
            {t.footer.sloganLine2}
          </p>
        </div>

        <div className={styles.lowerRule} aria-hidden="true">
          <i />
        </div>
        <div className={styles.bottom}>
          <p>{t.info.locationValue}</p>
          <div className={styles.languages} aria-label={t.ui.languageSelector}>
            {languages.map((language) => (
              <button
                key={language}
                type="button"
                aria-pressed={activeLanguage === language}
                aria-label={t.ui.switchLanguage.replace('{language}', t.ui.languageNames[language])}
                onClick={() => setLocale(language)}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
        <p className={styles.copyright}>{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
