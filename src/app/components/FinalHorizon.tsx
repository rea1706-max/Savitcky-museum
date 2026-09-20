'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './FinalHorizon.module.css';

export default function FinalHorizon() {
  const sceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void import('./finalHorizonAnimation').then(({ createFinalHorizonAnimation }) => {
      if (!disposed && sceneRef.current) cleanup = createFinalHorizonAnimation(sceneRef.current);
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sceneRef}
      data-final-horizon
      className={styles.scene}
      aria-labelledby="final-horizon-heading"
    >
      <div data-horizon-aperture className={styles.aperture}>
        <Image
          data-horizon-image
          src="/images/final/nukus-landscape.png"
          alt="Sunset over a broad desert landscape with distant flat-topped hills."
          fill
          sizes="100vw"
          quality={85}
          className={styles.image}
        />
        <div className={styles.grade} aria-hidden="true" />
        <div className={styles.landFade} aria-hidden="true" />
      </div>
      <div data-horizon-bleed className={styles.topBleed} aria-hidden="true" />
      <div className={styles.quietRule} aria-hidden="true">
        <span />
        <i />
      </div>

      <div className={styles.content}>
        <div className={styles.chapterMarker}>
          <span>10</span>
          <i />
        </div>
        <div className={styles.copy}>
          <h2 id="final-horizon-heading" className={styles.title}>
            <span className={styles.lineMask}>
              <span data-horizon-title>From Nukus</span>
            </span>
            <span className={styles.lineMask}>
              <span data-horizon-title>To the World</span>
            </span>
          </h2>
          <p data-horizon-meta className={styles.statement}>
            A local story.
            <br />A global dialogue.
          </p>
        </div>
        <p data-horizon-meta className={styles.location}>
          Nukus
          <br />
          Karakalpakstan
          <br />
          Uzbekistan
        </p>
        <p data-horizon-meta className={styles.caption}>
          Rooted in land. Open to the world.
        </p>
      </div>
    </section>
  );
}
