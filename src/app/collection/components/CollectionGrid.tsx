'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';
import styles from '../Collection.module.css';

type CategoryId = 'avant-garde' | 'uzbek-art' | 'karakalpak-arts' | 'heritage';

const categories: Array<{ id: CategoryId; image: string; focalPoint: string }> = [
  {
    id: 'avant-garde',
    image: '/images/collection/collection-avant-garde-hall.png',
    focalPoint: '70% 50%',
  },
  {
    id: 'uzbek-art',
    image: '/images/exhibitions/gallery-archive-light.png',
    focalPoint: '65% 48%',
  },
  {
    id: 'karakalpak-arts',
    image: '/images/collection/collection-cross-section.png',
    focalPoint: '50% 50%',
  },
  {
    id: 'heritage',
    image: '/images/collection/heritage-terracotta-vessel.jpg',
    focalPoint: '50% 45%',
  },
];

interface CollectionGridProps {
  category?: string;
  query?: string;
}

export default function CollectionGrid({ category = 'all', query = '' }: CollectionGridProps) {
  const { t } = useLanguage();
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleCategories = categories.filter((entry) => {
    if (category !== 'all' && entry.id !== category) return false;
    const copy = t.collectionPage.categoryCards[entry.id];
    return (
      !normalizedQuery ||
      `${copy.title} ${copy.description}`.toLocaleLowerCase().includes(normalizedQuery)
    );
  });

  return (
    <section className={styles.collectionGrid} aria-live="polite">
      <div className={styles.resultLine}>
        <p>
          {t.collectionPage.showing} <strong>{visibleCategories.length}</strong>{' '}
          {t.collectionPage.sections}
        </p>
        <span aria-hidden="true" />
      </div>

      {visibleCategories.length ? (
        <div className={styles.cards}>
          {visibleCategories.map((entry) => {
            const copy = t.collectionPage.categoryCards[entry.id];
            return (
              <article className={styles.card} key={entry.id} data-category={entry.id}>
                <div className={styles.cardImage}>
                  <Image
                    src={entry.image}
                    alt=""
                    fill
                    quality={85}
                    sizes="(max-width: 767px) 92vw, (max-width: 1100px) 50vw, 38vw"
                    style={{ objectPosition: entry.focalPoint }}
                  />
                  <div className={styles.cardShade} aria-hidden="true" />
                </div>
                <div className={styles.cardCopy}>
                  <p className={styles.cardLabel}>{t.collectionPage.eyebrow}</p>
                  <h2>{copy.title}</h2>
                  <p>{copy.description}</p>
                  <small>{t.collectionPage.visualReference}</small>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className={styles.empty}>{t.collectionPage.emptyState}</p>
      )}
    </section>
  );
}
