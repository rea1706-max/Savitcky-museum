'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import '@/styles/museum-tokens.css';
import styles from './AboutMuseum.module.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-archive-interface',
});

function Arrow() {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="13.5" />
      <path d="M9 14h10m-4-4 4 4-4 4" />
    </svg>
  );
}

export default function AboutMuseum() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void import('./aboutAnimation').then(({ createAboutAnimation }) => {
      if (!disposed && sectionRef.current) cleanup = createAboutAnimation(sectionRef.current);
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`${styles.chapter} ${inter.variable}`}
      aria-labelledby="about-heading"
    >
      {/* The handoff belongs to the boundary AFTER Stage 01; the artwork never moves independently. */}
      <div data-about-handoff className={styles.handoff} aria-hidden="true">
        <div data-about-wash className={styles.wash} />
        <svg className={styles.carryLine} viewBox="0 0 40 400" fill="none">
          <path data-about-carry d="M20 0V272m0 0 7 9-7 9-7-9 7-9m0 18v110" pathLength="1" />
        </svg>
      </div>

      <div className={styles.archive}>
        <svg className={styles.structure} viewBox="0 0 700 500" fill="none" aria-hidden="true">
          <path
            data-about-structure
            d="M344 -40 180 140l-8 9 8 9 8-9-8-9M180 158v164M80 149h470M180 322l6 8-6 8-6-8 6-8"
            pathLength="1"
          />
        </svg>

        <div className={styles.container}>
          <div data-about-label-mask>
            <p data-about-label className={styles.label}>
              <span>02</span>
              <span>/</span> ABOUT
            </p>
          </div>

          <div className={styles.composition}>
            <div className={styles.text}>
              <h2 id="about-heading" className={styles.title} aria-label="About the museum">
                {['ABOUT', 'THE', 'MUSEUM'].map((line) => (
                  <span data-about-title-mask className={styles.lineMask} key={line}>
                    <span data-about-title-line>{line}</span>
                  </span>
                ))}
              </h2>

              <div data-about-copy-mask className={styles.copy}>
                <p data-about-copy>
                  Founded in 1966 by artist and collector Igor Savitsky, the museum in Nukus became
                  a sanctuary for suppressed Soviet-era art.
                </p>
                <p data-about-copy>
                  Today, more than 100,000 objects bring Russian and Turkestan avant-garde together
                  with Karakalpak textiles, jewellery, ceramics and the archaeology of Ancient
                  Khorezm.
                </p>
              </div>

              <div data-about-links-mask>
                <div data-about-links className={styles.links}>
                  <Link href="/collection">
                    Explore the collection <Arrow />
                  </Link>
                  <Link href="#stories">
                    Museum today <Arrow />
                  </Link>
                </div>
              </div>
            </div>

            <figure className={styles.plate}>
              <div data-about-photo-mask className={styles.photoMask}>
                <Image
                  data-about-photo
                  src="/images/archive/03-igor-savitsky-archive.png"
                  alt="Igor Savitsky examining Karakalpak jewellery, holding a cultural object in his hands. Archival photograph."
                  width={808}
                  height={1154}
                  sizes="(max-width: 767px) 84vw, (max-width: 1023px) 42vw, 35vw"
                  quality={85}
                  className={styles.photo}
                />
              </div>
              <figcaption data-about-credit-mask className={styles.creditMask}>
                <span data-about-credit className={styles.credit}>
                  IGOR SAVITSKY <span>·</span> THE MUSEUM ARCHIVE
                </span>
              </figcaption>
            </figure>

            <div data-about-established-mask className={styles.establishedMask}>
              <p data-about-established className={styles.established}>
                <span aria-hidden="true" /> EST. 1966
              </p>
            </div>
            <div data-about-location-mask className={styles.locationMask}>
              <p data-about-location className={styles.location}>
                NUKUS <span>·</span> KARAKALPAKSTAN
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
