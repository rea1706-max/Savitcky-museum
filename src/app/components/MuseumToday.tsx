'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n';
import styles from './MuseumToday.module.css';

const images = {
  vaults: {
    src: '/images/stories/museum-today-vaults.png',
  },
  restoration: {
    src: '/images/stories/museum-today-restoration.png',
  },
};

function Arrow() {
  return (
    <svg viewBox="0 0 28 12" fill="none" aria-hidden="true">
      <path d="M0 6h25M20 1l5 5-5 5" />
    </svg>
  );
}

export default function MuseumToday() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    void import('./museumTodayAnimation').then(({ createMuseumTodayAnimation }) => {
      if (!disposed && rootRef.current) cleanup = createMuseumTodayAnimation(rootRef.current);
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={rootRef} data-museum-today-root className={styles.root}>
      <section
        id="stories"
        data-museum-section
        className={styles.museum}
        aria-labelledby="museum-heading"
      >
        <div className={styles.noise} aria-hidden="true" />
        <div data-museum-exit-light className={styles.exitLight} aria-hidden="true" />
        <div className={styles.topRule} aria-hidden="true">
          <span />
          <i />
        </div>

        <div className={styles.editorialGrid}>
          <header className={styles.intro}>
            <p data-museum-kicker className={styles.kicker}>
              {t.museumToday.kicker}
            </p>
            <div className={styles.titleClip}>
              <h2 id="museum-heading" data-title-line>
                {t.museumToday.title}
              </h2>
            </div>
            <p data-museum-title-note className={styles.titleNote}>
              {t.museumToday.note}
            </p>
            <p data-museum-copy className={styles.copy}>
              {t.museumToday.copyLine1}
              <br />
              {t.museumToday.copyLine2}
              <br />
              {t.museumToday.copyLine3}
              <br />
              {t.museumToday.copyLine4}
            </p>
            <Link data-museum-cta className={styles.primaryCta} href="/stories">
              {t.museumToday.cta} <Arrow />
            </Link>
          </header>

          <div id="museum-today-stories" className={styles.stories}>
            <Link
              data-story-card
              href="/stories"
              className={`${styles.story} ${styles.vaultStory}`}
              aria-label={`${t.museumToday.cta}: ${t.museumToday.vaultTitle}`}
            >
              <div className={styles.storyImage}>
                <Image
                  src={images.vaults.src}
                  alt={`${t.museumToday.vaultTitle}. ${t.museumToday.vaultMeta}`}
                  fill
                  sizes="(max-width: 767px) 100vw, 42vw"
                  className={styles.cover}
                />
              </div>
              <div className={styles.storyMeta}>
                <h3>{t.museumToday.vaultTitle}</h3>
                <p>{t.museumToday.vaultMeta}</p>
              </div>
            </Link>

            <Link
              data-story-card
              href="/stories"
              className={`${styles.story} ${styles.restorationStory}`}
              aria-label={`${t.museumToday.cta}: ${t.museumToday.restorationTitle}`}
            >
              <div className={styles.storyImage}>
                <Image
                  src={images.restoration.src}
                  alt={`${t.museumToday.restorationTitle}. ${t.museumToday.restorationMeta}`}
                  fill
                  sizes="(max-width: 767px) 100vw, 34vw"
                  className={styles.cover}
                />
              </div>
              <div className={styles.storyMeta}>
                <h3>{t.museumToday.restorationTitle}</h3>
                <p>{t.museumToday.restorationMeta}</p>
              </div>
            </Link>
          </div>

          <span data-museum-aside className="hidden" aria-hidden="true" />

          <p data-museum-note className={styles.leftNote}>
            {t.museumToday.noteLine1}
            <br />
            {t.museumToday.noteLine2}
            <br />
            {t.museumToday.noteLine3}
          </p>
        </div>

        <div className={styles.bottomBridge} aria-hidden="true">
          <span>{t.museumToday.bridgeMain}</span>
          <i />
          <small>{t.museumToday.bridgeSecondary}</small>
        </div>
      </section>
    </div>
  );
}
