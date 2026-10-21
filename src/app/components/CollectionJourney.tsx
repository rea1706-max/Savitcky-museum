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
          {/* The seam carries the eye out of the dark: charcoal gives way to earth,
              clay and sand in diagonal bands until the ivory collection takes over. */}
          <div className={styles.seam} data-journey-seam aria-hidden="true">
            <span className={styles.seamEarth} data-seam-layer="earth" />
            <span className={styles.seamClay} data-seam-layer="clay" />
            <span className={styles.seamSand} data-seam-layer="sand" />
            <svg className={styles.seamLine} viewBox="0 0 400 800" preserveAspectRatio="none">
              <path data-seam-line d="M0 120 400 560" />
            </svg>
          </div>
          <CollectionConstellation />
        </div>
      </div>
      <PatternCultureChapter />
    </div>
  );
}
