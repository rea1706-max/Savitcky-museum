'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/lib/i18n';
import styles from '../Collection.module.css';

interface CollectionSearchProps {
  initialCategory?: string;
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

export default function CollectionSearch({
  initialCategory = 'all',
  onSearch,
  onCategoryChange,
}: CollectionSearchProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: t.collectionPage.categories.all },
    { id: 'avant-garde', label: t.collectionPage.categories.avantGarde },
    { id: 'uzbek-art', label: t.collectionPage.categories.uzbekArt },
    { id: 'karakalpak-arts', label: t.collectionPage.categories.karakalpakArts },
    { id: 'heritage', label: t.collectionPage.categories.heritage },
  ];

  useEffect(() => setActiveCategory(initialCategory), [initialCategory]);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    onCategoryChange(id);
    router.replace(id === 'all' ? '/collection' : `/collection?category=${id}`, { scroll: false });
  };

  return (
    <section className={styles.searchPanel} aria-label={t.collectionPage.searchAria}>
      <form
        className={styles.searchForm}
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          onSearch(searchQuery);
        }}
      >
        <label htmlFor="collection-search" className="sr-only">
          {t.collectionPage.searchAria}
        </label>
        <Icon name="MagnifyingGlassIcon" size={20} />
        <input
          id="collection-search"
          type="search"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            onSearch(event.target.value);
          }}
          placeholder={t.collectionPage.searchPlaceholder}
          aria-label={t.collectionPage.searchAria}
        />
        <button type="submit" aria-label={t.collectionPage.searchAria}>
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <nav className={styles.categoryTabs} aria-label={t.ui.collectionCategories}>
        {categories.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => handleCategoryChange(entry.id)}
            aria-pressed={activeCategory === entry.id}
          >
            {entry.label}
          </button>
        ))}
      </nav>
    </section>
  );
}
