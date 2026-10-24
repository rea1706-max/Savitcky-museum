'use client';

import { useState } from 'react';
import CollectionSearch from './CollectionSearch';
import CollectionWorks from './CollectionWorks';
import type { ArtworkSummary } from '@/lib/catalog';

export default function CollectionExplorer({
  initialCategory,
  works,
  counts,
}: {
  initialCategory: string;
  works: ArtworkSummary[];
  counts: Record<string, number>;
}) {
  const [category, setCategory] = useState(initialCategory);

  return (
    <>
      <CollectionSearch
        initialCategory={initialCategory}
        counts={counts}
        onCategoryChange={setCategory}
      />
      <CollectionWorks works={works} category={category} />
    </>
  );
}
