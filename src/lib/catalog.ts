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
    /** Pixel size of the local file, recorded by scripts/catalog/image-sizes.mjs. */
    width?: number;
    height?: number;
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
  category: CategoryId | null;
  artistName: Localized;
  image: string | null;
};

export const SECTIONS: CategoryId[] = ['avant-garde', 'uzbek-art', 'karakalpak-arts', 'heritage'];

/** Number of published works in each section; a section with none is not offered as a filter. */
export function sectionCounts(): Record<CategoryId | 'all', number> {
  const counts = { all: 0, 'avant-garde': 0, 'uzbek-art': 0, 'karakalpak-arts': 0, heritage: 0 };
  for (const artwork of publishedArtworks()) {
    counts.all += 1;
    if (artwork.category) counts[artwork.category] += 1;
  }
  return counts;
}

/** Surname for ordering: "Александр Николаев (Усто Мумин)" → "Николаев". */
export function surname(name: string): string {
  const words = name
    .replace(/\([^)]*\)/g, ' ')
    .trim()
    .split(/\s+/);
  return words[words.length - 1] ?? '';
}

/** The gallery runs artist by artist (by surname), each artist's works by date and title. */
export function artworkSummaries(): ArtworkSummary[] {
  const rows = publishedArtworks().map((artwork) => {
    const artistName =
      getArtist(artwork.artistId)?.name ??
      (artwork.artistNameAsDisplayed ? { ru: artwork.artistNameAsDisplayed } : {});
    return {
      id: artwork.id,
      title: artwork.title,
      date: artwork.date,
      category: artwork.category,
      artistName,
      image: visibleImage(artwork),
    };
  });
  const key = (row: ArtworkSummary) => {
    const name = Object.values(row.artistName)[0] ?? '';
    return [surname(name), name, row.date ?? '9999', Object.values(row.title)[0] ?? ''];
  };
  return rows.sort((a, b) => {
    const [ka, kb] = [key(a), key(b)];
    for (let i = 0; i < ka.length; i += 1) {
      const order = ka[i].localeCompare(kb[i], 'ru');
      if (order) return order;
    }
    return 0;
  });
}
