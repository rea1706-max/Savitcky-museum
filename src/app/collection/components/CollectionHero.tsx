'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';
import styles from '../Collection.module.css';

export default function CollectionHero() {
  const { t } = useLanguage();

  return (
    <section className={styles.hero} aria-labelledby="collection-hero-heading">
      <Image
        src="/images/collection/collection-avant-garde-hall.png"
        alt={t.ui.collectionHeroAlt}
        fill
        priority
        quality={85}
        sizes="100vw"
        className={styles.heroImage}
      />
      <div className={styles.heroTone} aria-hidden="true" />
      <svg className={styles.heroGeometry} viewBox="0 0 1440 620" fill="none" aria-hidden="true">
        <path d="M930 -90 1130 112 928 314 1130 516 930 718" />
        <path d="M930 112H1440M930 516H1440" />
        <path d="m1130 96 16 16-16 16-16-16 16-16" />
      </svg>
      <div className={styles.heroInner}>
        <p className={styles.eyebrow}>{t.collectionPage.eyebrow}</p>
        <div className={styles.heroGrid}>
          <h1 id="collection-hero-heading">
            {t.collectionPage.titleLine1}
            <span>{t.collectionPage.titleLine2}</span>
          </h1>
          <div className={styles.heroCopy}>
            <p>{t.collectionPage.description}</p>
            <span>{t.collectionPage.visualReference}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
