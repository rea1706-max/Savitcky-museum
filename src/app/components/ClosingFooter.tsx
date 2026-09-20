'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './ClosingFooter.module.css';

const groups = [
  {
    title: 'Museum',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'History', href: '/#about' },
      { label: 'Museum Today', href: '/#stories' },
    ],
  },
  {
    title: 'Collection',
    links: [
      { label: 'Explore', href: '/collection' },
      { label: 'Karakalpak Arts', href: '/#collection' },
      { label: 'Avant-Garde', href: '/collection' },
    ],
  },
  {
    title: 'Exhibitions',
    links: [
      { label: "What's On", href: '/#whats-on' },
      { label: 'All Exhibitions', href: '/exhibitions' },
    ],
  },
  {
    title: 'Stories',
    links: [
      { label: 'Explore Stories', href: '/stories' },
      { label: 'People · Places · Ideas', href: '/stories' },
    ],
  },
  {
    title: 'Visit',
    links: [
      { label: 'Plan Your Visit', href: '/visit' },
      { label: 'Opening Hours', href: '/visit' },
      { label: 'Getting Here', href: '/visit' },
    ],
  },
];

const languages = ['EN', 'RU', 'UZ', 'KK'];

export default function ClosingFooter() {
  const [activeLanguage, setActiveLanguage] = useState('EN');

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
          <small>Art &nbsp; People &nbsp; Memory &nbsp; Future</small>
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
            Rooted in land.
            <br />
            Open to the world.
          </p>
        </div>

        <div className={styles.lowerRule} aria-hidden="true">
          <i />
        </div>
        <div className={styles.bottom}>
          <p>Nukus, Karakalpakstan, Uzbekistan</p>
          <div className={styles.contact}>
            <a href="mailto:info@museum.kr.uz">Contact</a>
            <a href="mailto:info@museum.kr.uz?subject=Press%20enquiry">Press</a>
          </div>
          <div className={styles.languages} aria-label="Language selector">
            {languages.map((language) => (
              <button
                key={language}
                type="button"
                aria-pressed={activeLanguage === language}
                onClick={() => setActiveLanguage(language)}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
        <p className={styles.copyright}>© 2026 Savitsky Museum</p>
      </div>
    </footer>
  );
}
