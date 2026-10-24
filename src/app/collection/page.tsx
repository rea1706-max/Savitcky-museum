import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CollectionHero from '@/app/collection/components/CollectionHero';
import CollectionExplorer from '@/app/collection/components/CollectionExplorer';
import styles from './Collection.module.css';
import '@/styles/museum-tokens.css';
import { artworkSummaries } from '@/lib/catalog';

type CollectionPageProps = {
  searchParams?: Promise<{ category?: string | string[] }>;
};

const collectionCategories = new Set([
  'all',
  'avant-garde',
  'uzbek-art',
  'karakalpak-arts',
  'heritage',
]);

export default async function CollectionPage({ searchParams }: CollectionPageProps) {
  const params = await searchParams;
  const requestedCategory = Array.isArray(params?.category) ? params.category[0] : params?.category;
  const category =
    requestedCategory && collectionCategories.has(requestedCategory) ? requestedCategory : 'all';

  return (
    <main className={styles.page}>
      <Header />
      <CollectionHero />
      <CollectionExplorer initialCategory={category} works={artworkSummaries()} />
      <Footer />
    </main>
  );
}
