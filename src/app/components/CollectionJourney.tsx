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
          {/* The seam carries the eye out of the dark: one long, soft gradient from
              charcoal through warm earth into the ivory of the collection. */}
          <div className={styles.seam} data-journey-seam aria-hidden="true">
            <span className={styles.seamGlow} data-seam-glow />
          </div>
          <CollectionConstellation />
        </div>
      </div>
      <PatternCultureChapter />
    </div>
  );
}
