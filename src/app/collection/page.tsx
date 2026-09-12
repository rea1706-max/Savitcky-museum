import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CollectionHero from '@/app/collection/components/CollectionHero';
import CollectionSearch from '@/app/collection/components/CollectionSearch';
import CollectionGrid from '@/app/collection/components/CollectionGrid';

type CollectionPageProps = {
  searchParams?: Promise<{ category?: string | string[] }>;
};

const collectionCategories = new Set(['all', 'avant-garde', 'karakalpak-arts', 'heritage']);

export default async function CollectionPage({ searchParams }: CollectionPageProps) {
  const params = await searchParams;
  const requestedCategory = Array.isArray(params?.category) ? params.category[0] : params?.category;
  const category =
    requestedCategory && collectionCategories.has(requestedCategory) ? requestedCategory : 'all';

  return (
    <main className="bg-background min-h-screen">
      <Header />
      <CollectionHero />
      <CollectionSearch initialCategory={category} />
      <CollectionGrid category={category} />
      <Footer />
    </main>
  );
}
