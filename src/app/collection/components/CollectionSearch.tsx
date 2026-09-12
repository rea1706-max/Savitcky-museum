'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

const categories = [
  { id: 'all', label: 'All Works' },
  { id: 'avant-garde', label: 'Avant-Garde' },
  { id: 'karakalpak-arts', label: 'Karakalpak Arts' },
  { id: 'heritage', label: 'Heritage & History' },
];

interface CollectionSearchProps {
  initialCategory?: string;
  onSearch?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  viewMode?: 'grid' | 'story';
  onViewModeChange?: (mode: 'grid' | 'story') => void;
}

export default function CollectionSearch({
  initialCategory = 'all',
  onSearch,
  onCategoryChange,
}: CollectionSearchProps) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    onCategoryChange?.(id);
    router.replace(id === 'all' ? '/collection' : `/collection?category=${id}`, {
      scroll: false,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <section
      className="bg-background border-b border-border"
      aria-label="Collection search and filters"
    >
      <div className="px-6 md:px-12 py-4 max-w-screen-xl mx-auto">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="mb-4" role="search">
          <div className="relative max-w-2xl">
            <label htmlFor="collection-search" className="sr-only">
              Search the collection
            </label>
            <input
              id="collection-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search artist, title, period, medium…"
              className="w-full bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm py-3 pl-5 pr-12 focus:outline-none focus:border-foreground transition-colors"
              aria-label="Search the collection"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Submit search"
            >
              <Icon name="MagnifyingGlassIcon" size={18} />
            </button>
          </div>
        </form>

        {/* Category tabs only — no view toggle */}
        <nav
          className="flex items-center gap-0 overflow-x-auto no-scrollbar"
          aria-label="Collection categories"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`text-label px-4 py-2 whitespace-nowrap transition-colors border-b-2 ${
                activeCategory === cat.id
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              aria-pressed={activeCategory === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
