// The collection catalogue: artists and artworks imported with scripts/catalog/import-catalog.mjs.
// Only published works are shown, and an image only when its rights are cleared for re-hosting.
import catalogData from '@/data/catalog.json';
import type { Locale } from './locale';

export type CatalogLocale = 'kk' | 'ru' | 'uz' | 'en';
export type Localized = Partial<Record<CatalogLocale, string>>;
export type CategoryId = 'avant-garde' | 'uzbek-art' | 'karakalpak-arts' | 'heritage';
export type RightsStatus =
  | 'cleared_public_domain'
  | 'cleared_cc0'
  | 'licensed'
  | 'permission_requested'
  | 'unverified'
  | 'restricted';

export type SourceRef = {
  url: string;
  title: string | null;
  accessedAt: string;
  notes: string | null;
};

export type CatalogArtist = {
  id: string;
  name: Localized;
  lifeDates: { birth: string | null; death: string | null; display: string | null };
  groups: string[];
  education: string[];
  biography: Localized | null;
  source: SourceRef;
  importBatch: string;
};

export type CatalogArtwork = {
  id: string;
  title: Localized;
  titleOriginal: string | null;
  date: string | null;
  artistId: string | null;
  artistNameAsDisplayed: string | null;
  dimensions: { heightCm: number | null; widthCm: number | null; display: string | null } | null;
  medium: Localized | null;
  keywords: Partial<Record<CatalogLocale, string[]>>;
  category: CategoryId | null;
  publicationStatus: 'draft' | 'published';
  image: {
    sourcePage: string | null;
    sourceImageUrl: string | null;
    localPath: string | null;
    rightsStatus: RightsStatus;
    credit: string | null;
    mayRehost: boolean;
    notes: string | null;
  };
  source: SourceRef;
  importBatch: string;
};

type CatalogStore = {
  storeVersion: number;
  batches: Record<string, { title: string | null; sourceIndex: string | null }>;
  artists: CatalogArtist[];
  artworks: CatalogArtwork[];
};

const catalog = catalogData as unknown as CatalogStore;
const CLEARED: RightsStatus[] = ['cleared_public_domain', 'cleared_cc0', 'licensed'];

/** Text in the visitor's language, or the source language with its own lang tag. */
export function pickText(
  value: Localized | null | undefined,
  locale: Locale
): { text: string; lang: CatalogLocale } | null {
  if (!value) return null;
  const wanted = locale.toLowerCase() as CatalogLocale;
  if (value[wanted]) return { text: value[wanted]!, lang: wanted };
  const fallback = (['ru', 'kk', 'uz', 'en'] as CatalogLocale[]).find((key) => value[key]);
  return fallback ? { text: value[fallback]!, lang: fallback } : null;
}

export function pickKeywords(artwork: CatalogArtwork, locale: Locale) {
  const wanted = locale.toLowerCase() as CatalogLocale;
  const lang = artwork.keywords[wanted]?.length
    ? wanted
    : (['ru', 'kk', 'uz', 'en'] as CatalogLocale[]).find((key) => artwork.keywords[key]?.length);
  return lang ? { words: artwork.keywords[lang]!, lang } : null;
}

/** A reproduction may be shown only from our own copy, with cleared rights. */
export function visibleImage(artwork: CatalogArtwork): string | null {
  const { image } = artwork;
  return image.localPath && image.mayRehost && CLEARED.includes(image.rightsStatus)
    ? image.localPath
    : null;
}

export function getArtist(id: string | null): CatalogArtist | null {
  return id ? (catalog.artists.find((artist) => artist.id === id) ?? null) : null;
}

export function publishedArtworks(): CatalogArtwork[] {
  return catalog.artworks.filter((artwork) => artwork.publicationStatus === 'published');
}

export function getPublishedArtwork(id: string): CatalogArtwork | null {
  return publishedArtworks().find((artwork) => artwork.id === id) ?? null;
}

/** The light record the collection list needs, so the page does not ship the whole catalogue. */
export type ArtworkSummary = {
  id: string;
  title: Localized;
  date: string | null;
  medium: Localized | null;
  category: CategoryId | null;
  artistName: Localized;
  image: string | null;
};

export function artworkSummaries(): ArtworkSummary[] {
  return publishedArtworks().map((artwork) => ({
    id: artwork.id,
    title: artwork.title,
    date: artwork.date,
    medium: artwork.medium,
    category: artwork.category,
    artistName:
      getArtist(artwork.artistId)?.name ??
      (artwork.artistNameAsDisplayed ? { ru: artwork.artistNameAsDisplayed } : {}),
    image: visibleImage(artwork),
  }));
}
