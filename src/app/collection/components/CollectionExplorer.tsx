'use client';

import { useState } from 'react';
import CollectionGrid from './CollectionGrid';
import CollectionSearch from './CollectionSearch';

export default function CollectionExplorer({ initialCategory }: { initialCategory: string }) {
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
    </>
  );
}
