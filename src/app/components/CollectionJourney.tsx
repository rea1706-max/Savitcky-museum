'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { Inter } from 'next/font/google';
import CollectionConstellation from './CollectionConstellation';
import PatternCultureChapter from './PatternCultureChapter';
import '@/styles/museum-tokens.css';
import styles from './CollectionJourney.module.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' });

export default function CollectionJourney({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

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
            <div className={styles.bridgeEarth} data-bridge-earth aria-hidden="true" />
            <div className={styles.bridgePaper} data-bridge-paper aria-hidden="true" />
            <div className={styles.grain} aria-hidden="true" />
            <p className={styles.chapterLabel} data-bridge-label>
              What&apos;s On — Collection
            </p>
            <h2 id="bridge-heading" className={styles.bridgeTitle}>
              <span>From</span>
              <span>Exhibition</span>
              <span>To</span>
              <span>Enduring</span>
              <span>Heritage.</span>
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
            <p className={styles.bridgeNote} data-bridge-note>
              Ideas fade.
              <br />
              Objects remain.
            </p>
          </section>
          <CollectionConstellation />
        </div>
      </div>
      <PatternCultureChapter />
    </div>
  );
}
