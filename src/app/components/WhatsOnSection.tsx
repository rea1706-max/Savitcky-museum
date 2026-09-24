'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import ExhibitionTransitionLink from '@/components/ExhibitionTransitionLink';
import { exhibitionDates, exhibitionStatus, type Exhibition } from '@/lib/exhibitions';
import { useLanguage } from '@/lib/i18n';
import '@/styles/museum-tokens.css';
import styles from './WhatsOnSection.module.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' });

function Arrow() {
  return (
    <svg viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <circle cx="15" cy="15" r="14" />
      <path d="M10 15h10m-4-4 4 4-4 4" />
    </svg>
  );
}

export default function WhatsOnSection({
  exhibition,
  today,
}: {
  exhibition: Exhibition;
  today: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale, t } = useLanguage();
  const status = exhibitionStatus(exhibition, today);
  const href = `/exhibitions#${exhibition.slug}`;
  const localizedExhibition = {
    ...exhibition,
    ...t.exhibitionsPage.entries[exhibition.id],
  };

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void import('./whatsOnAnimation').then(({ createWhatsOnAnimation }) => {
      if (!disposed && sectionRef.current) cleanup = createWhatsOnAnimation(sectionRef.current);
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      id="whats-on"
      ref={sectionRef}
      className={`${styles.section} ${inter.className}`}
      aria-labelledby="whatson-heading"
    >
      <svg
        data-feature-geometry
        className={styles.geometry}
        viewBox="0 0 1440 1000"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path data-feature-spine d="M858 -190V30l8 10-8 10-8-10 8-10M858 50V150" />
        <path data-feature-diagonal d="M858 150 504 326 1090 900M858 150 1224 440M504 326H1348" />
        <path data-feature-node d="m504 315 9 11-9 11-9-11 9-11M1224 431l7 9-7 9-7-9 7-9" />
      </svg>
      <div className={styles.container}>
        <h2 data-feature-reveal="label" id="whatson-heading" className={styles.chapterTitle}>
          {t.whatsOn.label}
        </h2>
        <div className={styles.poster}>
          <div className={styles.redMask} data-feature-red-mask aria-hidden="true">
            <div data-feature-red className={styles.redField} />
          </div>
          <div className={styles.titleBlock}>
            <h3 data-feature-reveal="title" className={styles.title}>
              {localizedExhibition.title}
            </h3>
            {localizedExhibition.subtitle && (
              <p data-feature-reveal="subtitle" className={styles.subtitle}>
                {localizedExhibition.subtitle.split(' ').map((word, index) => (
                  <span key={`${word}-${index}`}>{word}</span>
                ))}
              </p>
            )}
            <div data-feature-reveal="actions" className={styles.allLink}>
              <ExhibitionTransitionLink href="/exhibitions" className={styles.link}>
                {t.whatsOn.allExhibitions} <Arrow />
              </ExhibitionTransitionLink>
            </div>
          </div>
          <figure className={styles.figure}>
            <ExhibitionTransitionLink
              href={href}
              className={styles.artwork}
              data-feature-artwork
              aria-label={`${t.whatsOn.viewDetails}: ${localizedExhibition.title}`}
            >
              <div data-feature-mask className={styles.imageMask}>
                <Image
                  data-feature-image
                  src={exhibition.image}
                  alt={localizedExhibition.imageAlt}
                  fill
                  sizes="(max-width: 767px) 84vw, (max-width: 1023px) 55vw, 44vw"
                  quality={85}
                  className={styles.image}
                />
              </div>
            </ExhibitionTransitionLink>
            {localizedExhibition.imageCredit && (
              <figcaption data-feature-reveal="credit" className={styles.credit}>
                {localizedExhibition.imageCredit}
              </figcaption>
            )}
            <div className={styles.details}>
              <div>
                <p data-feature-reveal="status" className={styles.status}>
                  <span aria-hidden="true" />
                  {status === 'current'
                    ? t.whatsOn.nowOn
                    : status === 'upcoming'
                      ? t.whatsOn.upcoming
                      : t.whatsOn.archive}
                </p>
                <p data-feature-reveal="dates" className={styles.dates}>
                  {exhibitionDates(exhibition, true, locale)}{' '}
                  {exhibition.endDate &&
                  exhibition.startDate.slice(0, 4) === exhibition.endDate.slice(0, 4)
                    ? exhibition.endDate.slice(0, 4)
                    : ''}
                </p>
              </div>
              <div data-feature-reveal="actions">
                <ExhibitionTransitionLink href={href} className={styles.link}>
                  {t.whatsOn.viewDetails} <Arrow />
                </ExhibitionTransitionLink>
              </div>
            </div>
          </figure>
          <aside className={styles.aside}>
            <p data-feature-reveal="copy" className={styles.copy}>
              {localizedExhibition.shortDescription}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
