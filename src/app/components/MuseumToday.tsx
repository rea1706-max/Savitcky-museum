'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MuseumToday.module.css';

export default function MuseumToday() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    void import('./museumTodayAnimation').then(({ createMuseumTodayAnimation }) => {
      if (!disposed && rootRef.current) {
        cleanup = createMuseumTodayAnimation(rootRef.current);
      }
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <section ref={rootRef} id="stories" className={styles.section} aria-label="Museum Today">
      {/* =======================================================
          01. VERTICAL TRANSITION: KARAKALPAK ARTS → MUSEUM TODAY
          ======================================================= */}
      <div className={styles.transitionArea} data-today-transition aria-hidden="true">
        {/* Softening residual textile background */}
        <Image
          src="/images/collection/karakalpak-textile-macro.png"
          alt="Karakalpak textile texture transitioning"
          fill
          sizes="100vw"
          quality={80}
          className={styles.transitionTextile}
          data-transition-textile
        />
        <div className={styles.transitionGradient} />

        <div className={styles.transitionContent}>
          {/* Living ornament simplifying into vertical editorial spine */}
          <svg
            className={styles.transitionSpineSvg}
            viewBox="0 0 800 240"
            fill="none"
            aria-hidden="true"
          >
            {/* Secondary weave paths that progressively dissolve */}
            <g
              data-spine-secondary
              stroke="color-mix(in srgb, var(--museum-bone, #f2ebdd) 25%, var(--museum-earth, #8a7258))"
              strokeWidth="1"
            >
              <path d="M400 30 L450 70 L400 110 L350 70 Z" />
              <path d="M400 130 L460 180 L400 230 L340 180 Z" />
              <path d="M350 70 L280 120 M450 70 L520 120" strokeDasharray="2 3" />
            </g>

            {/* Core vertical spine and diamond nodes that transform into grid */}
            <g data-spine-core>
              <line
                x1="400"
                y1="0"
                x2="400"
                y2="240"
                stroke="color-mix(in srgb, var(--museum-bone, #f2ebdd) 60%, transparent)"
                strokeWidth="1.2"
              />
              {/* Top diamond node */}
              <polygon
                points="400,30 412,42 400,54 388,42"
                stroke="color-mix(in srgb, var(--museum-bone, #f2ebdd) 85%, transparent)"
                strokeWidth="1.2"
                fill="none"
              />
              {/* Central Karakalpak Red diamond node */}
              <polygon
                points="400,105 418,123 400,141 382,123"
                stroke="color-mix(in srgb, var(--museum-bone, #f2ebdd) 90%, transparent)"
                strokeWidth="1.2"
                fill="none"
              />
              <polygon
                points="400,113 410,123 400,133 390,123"
                fill="var(--museum-karakalpak-red, #9d3028)"
              />
              {/* Lower diamond node */}
              <polygon
                points="400,195 412,207 400,219 388,207"
                stroke="color-mix(in srgb, var(--museum-bone, #f2ebdd) 75%, transparent)"
                strokeWidth="1"
                fill="none"
              />
            </g>
          </svg>

          {/* Transition editorial text */}
          <div className={styles.transitionCopyWrap} data-transition-copy>
            <span className={styles.transitionLeftCopy}>SAME ROOTS. NEW PERSPECTIVES.</span>
            <span className={styles.transitionRightCopy}>TRADITIONS TRAVEL INTO TOMORROW</span>
          </div>

          <div className={styles.transitionScrollCue} data-transition-cue>
            <span>SCROLL</span>
            <svg
              width="10"
              height="14"
              viewBox="0 0 10 14"
              fill="none"
              className={styles.transitionScrollArrow}
              aria-hidden="true"
            >
              <path
                d="M5 1v10M1 7l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* =======================================================
          02. MUSEUM TODAY: EDITORIAL MAIN SECTION (REFERENCE A)
          ======================================================= */}
      <div className={styles.mainContainer} data-today-main>
        {/* Top Horizontal Editorial Rule */}
        <div className={styles.topEditorialRule} data-top-rule aria-hidden="true">
          <div className={styles.ruleLine} />
          <div className={styles.ruleDiamondNode}>
            <div className={styles.ruleDiamondInner} />
          </div>
          <div className={styles.ruleLine} />
        </div>

        {/* Intro Layout: Headline, Main Photo, Right Metadata */}
        <div className={styles.introLayout}>
          {/* Headline and Narrative */}
          <div className={styles.headlineBlock}>
            <div className={styles.chapterTag}>
              <span>09</span>
              <span className={styles.chapterLine} />
              <span>MUSEUM TODAY</span>
            </div>

            <h2 className={styles.mainTitle} aria-label="Museum Today">
              <span className={styles.mainTitleLine} data-title-line>
                MUSEUM
              </span>
              <span className={styles.mainTitleLine} data-title-line>
                TODAY
              </span>
            </h2>

            <p className={styles.subtitleBadge} data-today-subtitle>
              A LIVING ARCHIVE
            </p>

            <p className={styles.supportingCopy} data-today-copy>
              Conservation. Research.
              <br />
              Education. People.
              <br />
              The museum continues
              <br />
              to grow.
            </p>

            <Link
              href="/collection"
              className={styles.primaryCta}
              data-today-cta
              aria-label="See our stories"
            >
              <span>SEE OUR STORIES</span>
              <span className={styles.primaryCtaArrow}>↗</span>
            </Link>
          </div>

          {/* Main Documentary Visual Slot */}
          <div className={styles.heroVisualWrapper}>
            <figure className={styles.heroVisualFrame}>
              <Image
                src="/images/stories/museum-today-conservation.jpg"
                alt="Conservator meticulously restoring an ornate painted historical casket using fine tools and tweezers in the museum laboratory"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                quality={92}
                priority={false}
                className={styles.heroVisualImg}
                data-hero-img
              />
              <figcaption className={styles.heroVisualCaption}>
                Conservation in Practice · Savitsky Museum
              </figcaption>
            </figure>
          </div>

          {/* Right Column Metadata (Reference A) */}
          <aside className={styles.rightColumnMeta} data-right-meta aria-hidden="true">
            <div>
              CARE
              <br />
              PRESERVE
              <br />
              RESEARCH
              <br />
              SHARE
              <br />
              FOR
              <br />
              FUTURE
              <br />
              GENERATIONS
            </div>
            <div>
              <div className={styles.verticalLineSegment} />
              ──
              <br />
              SAVITSKY
              <br />
              MUSEUM
            </div>
          </aside>
        </div>

        {/* Middle Layout: Left Guide & Story Cards */}
        <div className={styles.middleLayout}>
          {/* Left Vertical Guide with Diamond Nodes */}
          <aside className={styles.leftGuideColumn} data-left-guide aria-hidden="true">
            <div className={styles.guideSpine}>
              <div className={styles.guideLineTop} />
              <div className={styles.guideDiamondOutlined} />
              <div className={styles.guideDiamondRed} />
              <div className={styles.guideLineBottom} />
            </div>
            <div className={styles.guideMetaText}>
              PEOPLE
              <br />
              PLACES
              <br />
              IDEAS
              <br />
              FOR A
              <br />
              WIDER
              <br />
              TOMORROW
            </div>
          </aside>

          {/* Two Editorial Story Teasers */}
          <div className={styles.storiesGrid}>
            {/* 01. Inside the Vaults */}
            <Link
              href="/collection"
              className={styles.storyCard}
              data-story-card
              aria-label="Read story: Inside the Vaults"
            >
              <div className={styles.storyCardHeader}>
                <div className={styles.storyNumber}>01</div>
                <h3 className={styles.storyCardTitle}>Inside the Vaults</h3>
                <p className={styles.storyCardDescriptor}>
                  A collection that lives on. Rare works. Careful conditions.
                </p>
              </div>

              <div className={styles.storyImageWrap}>
                <Image
                  src="/images/stories/museum-today-vaults.png"
                  alt="Museum storage vault with rows of framed avant-garde paintings on sliding racks, warm archival lighting"
                  fill
                  sizes="(min-width: 1024px) 35vw, 100vw"
                  quality={88}
                  className={styles.storyImg}
                />
              </div>

              <div className={styles.storyFooterRow}>
                <span className={styles.storyReadMore}>
                  READ MORE <span>↗</span>
                </span>
                <span className={styles.storySideMeta}>ARCHIVE · NUKUS</span>
              </div>
            </Link>

            {/* 02. Restoration in Progress */}
            <Link
              href="/collection"
              className={styles.storyCard}
              data-story-card
              aria-label="Read story: Restoration in Progress"
            >
              <div className={styles.storyCardHeader}>
                <div className={styles.storyNumber}>02</div>
                <h3 className={styles.storyCardTitle}>Restoration in Progress</h3>
                <p className={styles.storyCardDescriptor}>Skills. Care. A longer tomorrow.</p>
              </div>

              <div className={styles.storyImageWrap}>
                <Image
                  src="/images/stories/museum-today-restoration.png"
                  alt="Art conservator carefully cleaning an aged canvas painting with fine tools under studio lighting"
                  fill
                  sizes="(min-width: 1024px) 35vw, 100vw"
                  quality={88}
                  className={styles.storyImg}
                />
              </div>

              <div className={styles.storyFooterRow}>
                <span className={styles.storyReadMore}>
                  READ MORE <span>↗</span>
                </span>
                <span className={styles.storySideMeta}>PEOPLE BEHIND PRESERVATION</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Editorial Rule & Bridge */}
        <div className={styles.bottomBridge} data-bottom-bridge>
          <div className={styles.bottomBridgeLeft}>A RICHER PAST. A MORE OPEN TOMORROW.</div>
          <div className={styles.bottomBridgeRight}>
            <span>SAVITSKY MUSEUM</span>
            <span>──</span>
            <span>NUKUS, KARAKALPAKSTAN</span>
          </div>
        </div>

        {/* Subtle Ambient Light at bottom feathering into landscape */}
        <div className={styles.ambientBottomGlow} aria-hidden="true" />
      </div>
    </section>
  );
}
