'use client';

import { useState } from 'react';
import CollectionGrid from './CollectionGrid';
import CollectionSearch from './CollectionSearch';
import CollectionWorks from './CollectionWorks';
import type { ArtworkSummary } from '@/lib/catalog';

export default function CollectionExplorer({
  initialCategory,
  works,
}: {
  initialCategory: string;
  works: ArtworkSummary[];
}) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState('');

  return (
    <>
      <CollectionSearch
        initialCategory={initialCategory}
        onSearch={setQuery}
        onCategoryChange={setCategory}
      />
      <CollectionGrid category={category} query={query} />
      <CollectionWorks works={works} category={category} />
    </>
  );
}
