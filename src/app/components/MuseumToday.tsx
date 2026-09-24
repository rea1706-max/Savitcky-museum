'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n';
import styles from './MuseumToday.module.css';

const images = {
  conservation: {
    src: '/images/stories/museum-today-conservation.jpg',
    alt: 'Art conservator carefully cleaning an aged canvas with fine tools in the museum studio.',
  },
  vaults: {
    src: '/images/stories/museum-today-vaults.png',
    alt: 'Museum storage vault with rows of framed paintings on archival racks.',
  },
  restoration: {
    src: '/images/stories/museum-today-restoration.png',
    alt: 'Close view of a conservator at work on a historic painted surface.',
  },
};

function Arrow() {
  return (
    <svg viewBox="0 0 28 12" fill="none" aria-hidden="true">
      <path d="M0 6h25M20 1l5 5-5 5" />
    </svg>
  );
}

function TransitionOrnament() {
  return (
    <svg
      data-transition-ornament
      className={styles.transitionOrnament}
      viewBox="0 0 1200 800"
      fill="none"
      aria-hidden="true"
    >
      <path data-transition-rule d="M0 18H1200" />
      <path data-transition-secondary d="m720 2 16 16-16 16-16-16 16-16M720 34v96" />
      <path data-transition-secondary d="m720 74-46 46 46 46 46-46-46-46" />
      <path data-transition-secondary d="M720 166v126m0-88-76 76 76 76 76-76-76-76" />
      <path
        data-transition-secondary
        d="m720 262 18 18-18 18-18-18 18-18m0 94v126m0-95-54 54 54 54 54-54-54-54"
      />
      <path data-transition-spine d="M720 482v250" />
      <path data-transition-node d="m720 589 36 36-36 36-36-36 36-36" />
      <circle data-transition-point cx="720" cy="625" r="5" />
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
        data-museum-transition
        className={styles.transition}
        aria-label="From Karakalpak Arts to Museum Today"
      >
        <div className={styles.transitionFrame}>
          <div data-transition-textile className={styles.transitionTextile} aria-hidden="true">
            <Image
              src="/images/collection/karakalpak-textile-macro.png"
              alt=""
              fill
              sizes="100vw"
              quality={100}
              className={styles.transitionTextileImage}
            />
          </div>
          <div data-transition-shade className={styles.transitionShade} aria-hidden="true" />
          <div data-transition-grain className={styles.grain} aria-hidden="true" />
          <TransitionOrnament />

          <div className={styles.transitionGrid} aria-hidden="true">
            <span data-transition-grid-vertical />
            <span data-transition-grid-horizontal />
            <i data-transition-grid-node />
          </div>

          <div data-transition-copy className={styles.transitionCopy}>
            <p>{t.museumToday.label}</p>
            <div className={styles.transitionTitleClip}>
              <span>{t.museumToday.title}</span>
            </div>
            <small>{t.museumToday.subtitle}</small>
          </div>

          <figure data-transition-image className={styles.transitionImage}>
            <Image
              src={images.conservation.src}
              alt={images.conservation.alt}
              fill
              sizes="(max-width: 767px) 88vw, 58vw"
              className={styles.cover}
            />
            <figcaption>{t.museumToday.conservationCaption}</figcaption>
          </figure>
        </div>
      </section>

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

        <div className={styles.sectionMarker} aria-hidden="true">
          <span>09</span>
          <i />
        </div>

        <div className={styles.editorialGrid}>
          <header className={styles.intro}>
            <p data-museum-kicker className={styles.kicker}>
              {t.museumToday.kicker}
            </p>
            <div className={styles.titleClip}>
              <h2 id="museum-heading" data-title-line>
                {t.museumToday.vaultTitle}
              </h2>
            </div>
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
              aria-label={`Open Stories: ${t.museumToday.vaultTitle}`}
            >
              <div className={styles.storyIndex}>01</div>
              <div className={styles.storyImage}>
                <Image
                  src={images.vaults.src}
                  alt={images.vaults.alt}
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
              aria-label={`Open Stories: ${t.museumToday.restorationTitle}`}
            >
              <div className={styles.storyIndex}>02</div>
              <div className={styles.storyImage}>
                <Image
                  src={images.restoration.src}
                  alt={images.restoration.alt}
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

          <aside data-museum-aside className={styles.rightAside}>
            <p>
              Care
              <br />
              Preserve
              <br />
              Research
              <br />
              Share
            </p>
            <span />
            <small>For future generations</small>
          </aside>

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
