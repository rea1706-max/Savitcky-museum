'use client';

import Link from 'next/link';
import { useLanguage, type Locale } from '@/lib/i18n';
import styles from './ClosingFooter.module.css';

const languages: Locale[] = ['EN', 'RU', 'UZ', 'KK'];

export default function ClosingFooter() {
  const { locale: activeLanguage, setLocale, t } = useLanguage();

  const groups = [
    {
      title: t.footer.groups.museum.title,
      links: [
        { label: t.footer.groups.museum.about, href: '/#about' },
        { label: t.footer.groups.museum.history, href: '/#about' },
        { label: t.footer.groups.museum.today, href: '/#stories' },
      ],
    },
    {
      title: t.footer.groups.collection.title,
      links: [
        { label: t.footer.groups.collection.explore, href: '/collection' },
        { label: t.footer.groups.collection.karakalpak, href: '/#collection' },
        { label: t.footer.groups.collection.avantGarde, href: '/collection' },
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
        { label: t.footer.groups.stories.people, href: '/stories' },
      ],
    },
    {
      title: t.footer.groups.visit.title,
      links: [
        { label: t.footer.groups.visit.plan, href: '/visit' },
        { label: t.footer.groups.visit.hours, href: '/visit' },
        { label: t.footer.groups.visit.gettingHere, href: '/visit' },
      ],
    },
  ];

  return (
    <footer className={styles.footer} aria-label="Savitsky Museum footer">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.diamond} aria-hidden="true" />
          <p>
            Savitsky
            <br />
            Museum
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
                      <Link href={link.href}>{link.label}</Link>
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
          <div className={styles.contact}>
            <a href="mailto:info@museum.kr.uz">{t.footer.contact}</a>
            <a href="mailto:info@museum.kr.uz?subject=Press%20enquiry">{t.footer.press}</a>
          </div>
          <div className={styles.languages} aria-label="Language selector">
            {languages.map((language) => (
              <button
                key={language}
                type="button"
                aria-pressed={activeLanguage === language}
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
