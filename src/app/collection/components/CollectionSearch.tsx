'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';
import styles from '../Collection.module.css';

interface CollectionSearchProps {
  initialCategory?: string;
  /** Published works per section; sections without works are not offered. */
  counts: Record<string, number>;
  onCategoryChange: (category: string) => void;
}

export default function CollectionSearch({
  initialCategory = 'all',
  counts,
  onCategoryChange,
}: CollectionSearchProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const categories = [
    { id: 'all', label: t.collectionPage.categories.all },
    { id: 'avant-garde', label: t.collectionPage.categories.avantGarde },
    { id: 'uzbek-art', label: t.collectionPage.categories.uzbekArt },
    { id: 'karakalpak-arts', label: t.collectionPage.categories.karakalpakArts },
    { id: 'heritage', label: t.collectionPage.categories.heritage },
  ].filter((entry) => entry.id === 'all' || (counts[entry.id] ?? 0) > 0);

  useEffect(() => setActiveCategory(initialCategory), [initialCategory]);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    onCategoryChange(id);
    router.replace(id === 'all' ? '/collection' : `/collection?category=${id}`, { scroll: false });
  };

  return (
    <section className={styles.searchPanel} aria-label={t.collectionPage.searchAria}>
      <nav className={styles.categoryTabs} aria-label={t.ui.collectionCategories}>
        {categories.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => handleCategoryChange(entry.id)}
            aria-pressed={activeCategory === entry.id}
          >
            {entry.label} <sup className={styles.tabCount}>{counts[entry.id] ?? 0}</sup>
          </button>
        ))}
      </nav>
    </section>
  );
}
