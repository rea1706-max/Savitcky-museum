// Catalogue model for the collection import.
//
// The project has no artist or artwork model yet: the site only knows exhibitions
// (src/lib/exhibitions.ts). This model follows the same conventions — string ids,
// a source URL on every record, an image credit, and a draft/published status — so
// imported records stay invisible until someone publishes them.

/** Pilot schema versions this importer understands. */
export const SUPPORTED_SCHEMA_VERSIONS = ['1.0'];

/** Site languages. Kara-Kalpak is the default language of the site. */
export const LOCALES = ['kk', 'ru', 'uz', 'en'];

/** The four collection cards on the site. */
export const CATEGORIES = ['avant-garde', 'uzbek-art', 'karakalpak-arts', 'heritage'];

/** Image rights states, as recommended by the pilot dataset. */
export const RIGHTS_STATUSES = [
  'cleared_public_domain',
  'cleared_cc0',
  'licensed',
  'permission_requested',
  'unverified',
  'restricted',
];

/** Only these states allow an image to be stored on or shown from our server. */
export const CLEARED_RIGHTS = ['cleared_public_domain', 'cleared_cc0', 'licensed'];

/** Ids are lowercase words joined by hyphens, e.g. "artist-alexander-volkov". */
export const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Fields the importer reads. Anything else in the source is reported, never silently kept. */
export const KNOWN_ARTIST_FIELDS = [
  'id',
  'name',
  'lifeDates',
  'groups',
  'education',
  'biography',
  'worksCountOnSourceProfile',
  'source',
];

export const KNOWN_ARTWORK_FIELDS = [
  'id',
  'title',
  'titleOriginal',
  'date',
  'artistId',
  'artistNameAsDisplayed',
  'dimensions',
  'medium',
  'keywords',
  'image',
  'source',
];

/**
 * @typedef {Partial<Record<'kk' | 'ru' | 'uz' | 'en', string>>} Localized
 *
 * @typedef {object} SourceRef
 * @property {string} url          Page the record was taken from.
 * @property {string | null} title
 * @property {string} accessedAt   ISO date the page was read.
 * @property {string | null} notes
 *
 * @typedef {object} ImageRecord
 * @property {string | null} sourcePage      Page that shows the image at the source.
 * @property {string | null} sourceImageUrl  Direct image URL at the source. Never downloaded by the importer.
 * @property {string | null} localPath       Our copy. Only allowed once rights are cleared.
 * @property {string} rightsStatus           One of RIGHTS_STATUSES.
 * @property {string | null} credit          Attribution exactly as given by the source.
 * @property {boolean} mayRehost
 * @property {string | null} notes
 *
 * @typedef {object} CatalogArtist
 * @property {string} id
 * @property {Localized} name
 * @property {{ birth: string | null, death: string | null, display: string | null }} lifeDates
 * @property {string[]} groups
 * @property {string[]} education
 * @property {Localized | null} biography
 * @property {SourceRef} source
 * @property {string} importBatch
 *
 * @typedef {object} CatalogArtwork
 * @property {string} id
 * @property {Localized} title
 * @property {string | null} titleOriginal
 * @property {string | null} date            Display date as written at the source, e.g. "1923–1924".
 * @property {string | null} artistId        Must point at an artist in the catalogue, or be null.
 * @property {string | null} artistNameAsDisplayed  Name shown when no artist record exists yet.
 * @property {{ heightCm: number | null, widthCm: number | null, display: string | null } | null} dimensions
 * @property {Localized | null} medium
 * @property {Partial<Record<'kk' | 'ru' | 'uz' | 'en', string[]>>} keywords
 * @property {string | null} category        One of CATEGORIES; the source has none, so it starts empty.
 * @property {'draft' | 'published'} publicationStatus
 * @property {ImageRecord} image
 * @property {SourceRef} source
 * @property {string} importBatch
 *
 * @typedef {object} CatalogStore
 * @property {number} storeVersion
 * @property {Record<string, object>} batches   Dataset-level attribution, keyed by batch id.
 * @property {CatalogArtist[]} artists
 * @property {CatalogArtwork[]} artworks
 */

/** @returns {CatalogStore} */
export function emptyStore() {
  return { storeVersion: 1, batches: {}, artists: [], artworks: [] };
}
