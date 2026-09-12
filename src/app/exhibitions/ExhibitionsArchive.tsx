'use client';

import { useEffect, useRef, useState } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { exhibitionDates, exhibitionStatus, type Exhibition } from '@/lib/exhibitions';
import '@/styles/museum-tokens.css';
import styles from './ExhibitionsArchive.module.css';
import environment from '@/components/exhibitionEnvironment.module.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-exhibitions-interface',
});

export default function ExhibitionsArchive({
  exhibitions,
  today,
}: {
  exhibitions: Exhibition[];
  today: string;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const records = [...exhibitions].sort((a, b) => b.startDate.localeCompare(a.startDate));
  const years = [...new Set(records.map((exhibition) => exhibition.startDate.slice(0, 4)))];

  useEffect(() => {
    const syncHash = () => {
      let slug = '';
      try {
        slug = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        /* Invalid hashes have no matching item. */
      }
      const match = exhibitions.find((exhibition) => exhibition.slug === slug);
      setOpen(match?.slug ?? null);
      clearTimeout(scrollTimer.current);
      if (match) {
        setVisited((previous) => new Set(previous).add(match.slug));
        scrollTimer.current = setTimeout(() => {
          document.getElementById(match.slug)?.scrollIntoView({
            block: 'start',
            behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          });
        }, 360);
      }
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    window.addEventListener('popstate', syncHash);
    window.dispatchEvent(new Event('savitsky:exhibitions-ready'));
    return () => {
      clearTimeout(scrollTimer.current);
      window.removeEventListener('hashchange', syncHash);
      window.removeEventListener('popstate', syncHash);
    };
  }, [exhibitions]);

  const toggle = (slug: string) => {
    clearTimeout(scrollTimer.current);
    const next = open === slug ? null : slug;
    setOpen(next);
    if (next) setVisited((previous) => new Set(previous).add(next));
    // Preserve Next's history state so browser Back/Forward restores the open row.
    window.history.pushState(
      window.history.state,
      '',
      next ? `#${next}` : window.location.pathname + window.location.search
    );
  };

  return (
    <main
      className={`${styles.page} ${environment.environment} ${inter.className} ${inter.variable}`}
    >
      <Header />
      <section className={environment.hero} aria-labelledby="exhibitions-heading">
        <div className={environment.hall} aria-hidden="true" />
        <header className={`${styles.container} ${styles.intro}`}>
          <Link href="/#whats-on" className={styles.back}>
            ← Back to the museum
          </Link>
          <p className={styles.eyebrow}>Exhibitions</p>
          <div className={styles.introGrid}>
            <h1 id="exhibitions-heading">
              WHAT&apos;S
              <br />
              ON
            </h1>
            <p>
              Exhibitions from the Savitsky Museum archive.
              <br className={styles.desktopBreak} /> From Nukus to museums around the world.
            </p>
          </div>
        </header>
      </section>
      <div className={styles.container}>
        <div className={styles.archive} aria-label="Exhibition archive">
          {!records.length && (
            <p className={styles.empty}>Exhibition information will be announced here.</p>
          )}
          {years.map((year) => (
            <section className={styles.yearGroup} key={year} aria-labelledby={`year-${year}`}>
              <h2 id={`year-${year}`} className={styles.year}>
                {year}
              </h2>
              <div className={styles.rows}>
                {records
                  .filter((exhibition) => exhibition.startDate.startsWith(year))
                  .map((exhibition) => {
                    const expanded = open === exhibition.slug;
                    const status = exhibitionStatus(exhibition, today);
                    return (
                      <article
                        className={styles.row}
                        key={exhibition.id}
                        id={exhibition.slug}
                        data-open={expanded}
                      >
                        <h3 className={styles.rowHeading}>
                          <button
                            className={styles.rowButton}
                            id={`${exhibition.slug}-trigger`}
                            aria-expanded={expanded}
                            aria-controls={`${exhibition.slug}-content`}
                            onClick={() => toggle(exhibition.slug)}
                          >
                            <span className={styles.schedule}>
                              {status !== 'past' && (
                                <span className={styles.status} data-status={status}>
                                  {status === 'current' && (
                                    <span aria-hidden="true" className={styles.dot} />
                                  )}
                                  {status === 'current' ? 'Now on' : 'Upcoming'}
                                </span>
                              )}
                              <span className={styles.date}>
                                {exhibitionDates(exhibition, true)}
                              </span>
                            </span>
                            <span className={styles.rowTitle}>
                              {exhibition.title}
                              {exhibition.subtitle && (
                                <span className={styles.subtitle}>{exhibition.subtitle}</span>
                              )}
                            </span>
                            <svg
                              className={styles.arrow}
                              viewBox="0 0 32 32"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path d="M7 7 25 25M9 25h16V9" />
                            </svg>
                          </button>
                        </h3>
                        <div
                          id={`${exhibition.slug}-content`}
                          role="region"
                          aria-labelledby={`${exhibition.slug}-trigger`}
                          aria-hidden={!expanded}
                          inert={!expanded}
                          className={styles.panel}
                        >
                          <div className={styles.panelClip}>
                            <div
                              className={styles.spread}
                              data-has-image={Boolean(exhibition.image)}
                            >
                              {visited.has(exhibition.slug) && (
                                <>
                                  {exhibition.image && (
                                    <figure className={styles.figure}>
                                      <div className={styles.imageMask}>
                                        <AppImage
                                          src={exhibition.image}
                                          alt={exhibition.imageAlt}
                                          width={exhibition.imageWidth ?? 1280}
                                          height={exhibition.imageHeight ?? 1586}
                                          sizes="(max-width: 767px) 84vw, 34vw"
                                          className={styles.image}
                                        />
                                      </div>
                                      {exhibition.imageCredit && (
                                        <figcaption>{exhibition.imageCredit}</figcaption>
                                      )}
                                    </figure>
                                  )}
                                  <div className={styles.information}>
                                    <p className={styles.description}>
                                      {exhibition.fullDescription || exhibition.shortDescription}
                                    </p>
                                    <dl>
                                      <div>
                                        <dt>Dates</dt>
                                        <dd>{exhibitionDates(exhibition)}</dd>
                                      </div>
                                      {exhibition.location && (
                                        <div>
                                          <dt>Location</dt>
                                          <dd>{exhibition.location}</dd>
                                        </div>
                                      )}
                                      {exhibition.address && (
                                        <div>
                                          <dt>Address</dt>
                                          <dd>{exhibition.address}</dd>
                                        </div>
                                      )}
                                      {exhibition.admissionInfo && (
                                        <div>
                                          <dt>Admission</dt>
                                          <dd>{exhibition.admissionInfo}</dd>
                                        </div>
                                      )}
                                    </dl>
                                    {exhibition.sourceUrl && (
                                      <a
                                        className={styles.visitLink}
                                        href={exhibition.sourceUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        Exhibition source <span aria-hidden="true">↗</span>
                                      </a>
                                    )}
                                    {status !== 'past' && (
                                      <Link className={styles.visitLink} href="/visit">
                                        Plan your visit <span aria-hidden="true">↗</span>
                                      </Link>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
              </div>
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
