import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import styles from './CollectionJourney.module.css';

export function CollectionArrow() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="15" />
      <path d="M11 21 21 11M11 11h10v10" />
    </svg>
  );
}

export default function CollectionConstellation() {
  const { t } = useLanguage();

  return (
    <section
      id="collection"
      data-collection-overview
      className={styles.overview}
      aria-labelledby="collection-heading"
    >
      <div className={styles.overviewInner}>
        <p data-collection-label className={styles.chapterLabel}>
          {t.collection.label}
        </p>
        <div className={styles.overviewHeader}>
          <h2 id="collection-heading" className={styles.collectionTitle}>
            <span className={styles.lineMask}>
              <span data-collection-title>{t.collection.title}</span>
            </span>
          </h2>
          <div className={styles.collectionIntroduction}>
            <p data-collection-copy>
              {t.collection.intro}
            </p>
            <Link data-collection-cta href="/collection" className={styles.link}>
              {t.collection.explore} <CollectionArrow />
            </Link>
          </div>
        </div>
        <div className={styles.objects}>
          <figure className={styles.volkov}>
            <Link
              href="/collection?category=avant-garde"
              className={styles.objectLink}
              aria-label="Explore the Avant-Garde collection"
            >
              <div data-volkov-mask className={styles.volkovImage}>
                <Image
                  src="/images/collection/volkov-arba-1924.png"
                  alt="Alexander Volkov, Arba, 1924 — ochre, red and dark geometric forms."
                  fill
                  sizes="(min-width: 1024px) 54vw, 90vw"
                  className={styles.painting}
                />
              </div>
              <figcaption data-volkov-caption>
                <span className={styles.gatewayNumber}>01</span>
                <span className={styles.gatewayTitle}>{t.footer.groups.collection.avantGarde}</span>
                <span className={styles.gatewayMeta}>{t.collection.volkovBadge}</span>
              </figcaption>
            </Link>
          </figure>
          <figure className={styles.vessel}>
            <Link
              href="/collection?category=heritage"
              className={styles.objectLink}
              aria-label="Explore the Heritage and History collection"
            >
              <div data-vessel-mask className={styles.vesselImage}>
                <Image
                  src="/images/collection/heritage-terracotta-vessel.jpg"
                  alt="The terracotta vessel from the existing Heritage and History selection, with a loop handle and three feet."
                  fill
                  sizes="(min-width: 1024px) 26vw, 68vw"
                  className={styles.vesselObject}
                />
              </div>
              <figcaption data-vessel-caption>
                <span className={styles.gatewayNumber}>02</span>
                <span className={styles.gatewayTitle}>{t.footer.groups.museum.history}</span>
                <span className={styles.gatewayMeta}>{t.collection.vesselBadge}</span>
              </figcaption>
            </Link>
          </figure>
        </div>
        <div data-archive-rule className={styles.archiveRule} aria-hidden="true">
          <span />
          <small>Archive line</small>
        </div>
      </div>
    </section>
  );
}
