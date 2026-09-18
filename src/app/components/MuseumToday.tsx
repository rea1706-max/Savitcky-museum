'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './MuseumToday.module.css';

const images = {
  conservation: {
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_46ebb1ed6-1788627712885.png',
    alt: 'Art conservator carefully cleaning an aged canvas with fine tools in the museum studio.',
  },
  vaults: {
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_45b2bc068-1788627713692.png',
    alt: 'Museum storage vault with rows of framed paintings on archival racks.',
  },
  restoration: {
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_46ebb1ed6-1788627712885.png',
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
            <p>09 / Museum Today</p>
            <div className={styles.transitionTitleClip}>
              <span>Museum Today</span>
            </div>
            <small>Material memory, preserved by people.</small>
          </div>

          <figure data-transition-image className={styles.transitionImage}>
            <Image
              src={images.conservation.src}
              alt={images.conservation.alt}
              fill
              sizes="(max-width: 767px) 88vw, 58vw"
              className={styles.cover}
            />
            <figcaption>Conservation in practice · Savitsky Museum</figcaption>
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
            <div className={styles.titleClip}>
              <h2 id="museum-heading" data-title-line>
                Museum
              </h2>
            </div>
            <div className={styles.titleClip}>
              <span data-title-line>Today</span>
            </div>
            <p data-museum-kicker className={styles.kicker}>
              A living archive
            </p>
            <p data-museum-copy className={styles.copy}>
              Conservation. Research.
              <br />
              Education. People.
              <br />
              The museum continues
              <br />
              to grow.
            </p>
            <a data-museum-cta className={styles.primaryCta} href="#museum-today-stories">
              See our stories <Arrow />
            </a>
          </header>

          <figure data-museum-main-image className={styles.mainVisual}>
            <div className={`${styles.imageFrame} imageFrame`}>
              <Image
                src={images.conservation.src}
                alt={images.conservation.alt}
                fill
                priority
                sizes="(max-width: 767px) 100vw, 65vw"
                className={styles.cover}
              />
            </div>
            <figcaption>
              <span>Care · Preserve · Research</span>
              <small>Conservation studio</small>
            </figcaption>
          </figure>

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
            People. Places.
            <br />
            Ideas for a
            <br />
            wider tomorrow.
          </p>

          <div id="museum-today-stories" className={styles.stories}>
            <article data-story-card className={`${styles.story} ${styles.vaultStory}`}>
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
                <h3>Inside the Vaults</h3>
                <p>A collection that lives on.</p>
              </div>
            </article>

            <article data-story-card className={`${styles.story} ${styles.restorationStory}`}>
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
                <h3>Restoration in Progress</h3>
                <p>Skills. Care. A longer tomorrow.</p>
              </div>
            </article>
          </div>
        </div>

        <div className={styles.bottomBridge} aria-hidden="true">
          <span>A richer past. A more open tomorrow.</span>
          <i />
          <small>From Nukus to the world</small>
        </div>
      </section>
    </div>
  );
}
