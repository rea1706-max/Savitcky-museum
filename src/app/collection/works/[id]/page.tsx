import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArtworkDetail from './ArtworkDetail';
import { getArtist, getPublishedArtwork, publishedArtworks } from '@/lib/catalog';
import styles from '../../Collection.module.css';
import catalogueStyles from '../../Catalogue.module.css';
import '@/styles/museum-tokens.css';

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return publishedArtworks().map((artwork) => ({ id: artwork.id }));
}

// Only works that exist and are published get a page.
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const artwork = getPublishedArtwork(id);
  if (!artwork) return {};
  const title = Object.values(artwork.title)[0] ?? '';
  const artist = getArtist(artwork.artistId);
  const author = artist ? Object.values(artist.name)[0] : artwork.artistNameAsDisplayed;
  return {
    title: `${title}${author ? ` — ${author}` : ''} — Savitsky Museum`,
    description: [author, artwork.date, artwork.medium && Object.values(artwork.medium)[0]]
      .filter(Boolean)
      .join(' · '),
  };
}

export default async function ArtworkPage({ params }: Props) {
  const { id } = await params;
  const artwork = getPublishedArtwork(id);
  if (!artwork) notFound();
  return (
    <main className={`${styles.page} ${catalogueStyles.solidNav}`}>
      <Header />
      <ArtworkDetail artwork={artwork} artist={getArtist(artwork.artistId)} />
      <Footer />
    </main>
  );
}
