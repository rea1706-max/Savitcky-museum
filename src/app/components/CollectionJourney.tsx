'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import CollectionConstellation from './CollectionConstellation';
import PatternCultureChapter from './PatternCultureChapter';
import { useLanguage } from '@/lib/i18n';
import '@/styles/museum-tokens.css';
import styles from './CollectionJourney.module.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' });

export default function CollectionJourney({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void import('./collectionJourneyAnimation').then(({ createCollectionJourney }) => {
      if (!disposed && rootRef.current) cleanup = createCollectionJourney(rootRef.current);
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={rootRef} data-collection-journey className={`${styles.journey} ${inter.className}`}>
      <div data-journey-stage className={styles.stage}>
        <div className={styles.track} data-journey-track>
          <div className={styles.exitPanel} data-exit-panel>
            {children}
          </div>
          <section className={styles.bridge} data-mineral-bridge aria-labelledby="bridge-heading">
            <figure className={styles.bridgePrevious} data-bridge-popova aria-hidden="true">
              <Image
                src="/images/exhibitions/popova-composition.png"
                alt=""
                fill
                sizes="34vw"
                className={styles.bridgeArtwork}
              />
            </figure>
            <figure className={styles.bridgeFuture} data-bridge-volkov aria-hidden="true">
              <Image
                src="/images/collection/volkov-arba-1924.png"
                alt=""
                fill
                sizes="38vw"
                className={styles.bridgeArtwork}
              />
            </figure>
            <div className={styles.bridgeEarth} data-bridge-earth aria-hidden="true" />
            <div className={styles.bridgePaper} data-bridge-paper aria-hidden="true" />
            <div className={styles.grain} aria-hidden="true" />
            <h2 id="bridge-heading" className={styles.bridgeTitle}>
              <span>{t.bridge.title1}</span>
              <span>{t.bridge.title2}</span>
              <span>{t.bridge.title3}</span>
              <span>{t.bridge.title4}</span>
              <span>{t.bridge.title5}</span>
            </h2>
            <div className={styles.staticHinge} data-static-hinge aria-hidden="true" />
            <svg
              className={styles.staticConnection}
              viewBox="0 0 800 800"
              fill="none"
              aria-hidden="true"
            >
              <path data-static-path d="M750 100 410 390 730 730M410 390H800" />
              <path data-static-node d="m410 379 11 11-11 11-11-11 11-11" />
            </svg>
            <span data-bridge-note className="hidden" aria-hidden="true" />
          </section>
          <CollectionConstellation />
        </div>
      </div>
      <PatternCultureChapter />
    </div>
  );
}
