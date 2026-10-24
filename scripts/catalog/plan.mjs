// Decides what an import would do against the current catalogue. Never overwrites:
// an id that already exists is either "unchanged" or a "conflict" for a person to resolve.

/** Lowercase, ё→е, no punctuation, single spaces: for spotting the same work under two ids. */
export function normalizeText(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[«»"'“”„()[\].,;:!?№–—-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const firstValue = (localized) => (localized ? (Object.values(localized)[0] ?? '') : '');

const artistKey = (artist) =>
  `${normalizeText(firstValue(artist.name))}|${artist.lifeDates?.birth ?? ''}`;

const artworkKey = (artwork) =>
  [
    artwork.artistId ?? normalizeText(artwork.artistNameAsDisplayed),
    normalizeText(firstValue(artwork.title)),
    normalizeText(artwork.date),
  ].join('|');

/** Field paths whose values differ, ignoring which batch brought the record in. */
export function diffRecords(before, after, prefix = '') {
  const ignored = new Set(['importBatch']);
  const paths = [];
  const keys = new Set([...Object.keys(before ?? {}), ...Object.keys(after ?? {})]);
  for (const key of keys) {
    if (!prefix && ignored.has(key)) continue;
    const a = before?.[key];
    const b = after?.[key];
    const path = prefix ? `${prefix}.${key}` : key;
    const bothObjects =
      a &&
      b &&
      typeof a === 'object' &&
      typeof b === 'object' &&
      !Array.isArray(a) &&
      !Array.isArray(b);
    if (bothObjects) paths.push(...diffRecords(a, b, path));
    else if (JSON.stringify(a ?? null) !== JSON.stringify(b ?? null)) paths.push(path);
  }
  return paths;
}

const EDITORIAL_FIELDS = new Set(['category', 'publicationStatus']);
const LOCALIZED_FIELDS = new Set(['title', 'medium', 'keywords', 'name', 'biography']);

/**
 * Fields people fill in on our side: the collection section, publication, and translations
 * the source does not provide. A difference there is an editorial edit to keep, not a conflict.
 */
export function isEditorialPath(path, incoming) {
  const [field, locale] = path.split('.');
  if (EDITORIAL_FIELDS.has(field)) return true;
  return (
    LOCALIZED_FIELDS.has(field) && locale !== undefined && incoming?.[field]?.[locale] === undefined
  );
}

/**
 * @param {{ artists: object[], artworks: object[] }} incoming  Validated records.
 * @param {{ artists: object[], artworks: object[] }} store     Current catalogue.
 * @param {{ only?: string[] }} [options]                      Artwork ids to limit the import to.
 */
export function planImport(incoming, store, { only } = {}) {
  const problems = [];
  let artworks = incoming.artworks;
  let artists = incoming.artists;

  if (only && only.length) {
    const known = new Set(incoming.artworks.map((artwork) => artwork.id));
    for (const id of only) {
      if (!known.has(id))
        problems.push({
          code: 'plan.only-unknown',
          recordId: id,
          message: `Artwork "${id}" is not in the file.`,
        });
    }
    const wanted = new Set(only);
    artworks = incoming.artworks.filter((artwork) => wanted.has(artwork.id));
    // Bring along only the artists the selected works point at.
    const needed = new Set(artworks.map((artwork) => artwork.artistId).filter(Boolean));
    artists = incoming.artists.filter((artist) => needed.has(artist.id));
  }

  const classify = (records, existing, keyOf, kind) => {
    const byId = new Map(existing.map((record) => [record.id, record]));
    const bySource = new Map(existing.map((record) => [record.source?.url, record.id]));
    const byKey = new Map(existing.map((record) => [keyOf(record), record.id]));
    const result = { add: [], unchanged: [], conflicts: [], duplicates: [] };
    for (const record of records) {
      const current = byId.get(record.id);
      if (current) {
        const changed = diffRecords(current, record);
        const sourceChanges = changed.filter((path) => !isEditorialPath(path, record));
        const editorial = changed.filter((path) => isEditorialPath(path, record));
        if (sourceChanges.length === 0)
          result.unchanged.push({ id: record.id, keptEdits: editorial });
        else
          result.conflicts.push({
            id: record.id,
            kind,
            fields: sourceChanges,
            keptEdits: editorial,
          });
        continue;
      }
      const sameSource = bySource.get(record.source?.url);
      if (sameSource) {
        result.duplicates.push({
          id: record.id,
          kind,
          existingId: sameSource,
          reason: 'same source page',
        });
        continue;
      }
      const sameKey = byKey.get(keyOf(record));
      if (sameKey) {
        result.duplicates.push({
          id: record.id,
          kind,
          existingId: sameKey,
          reason: 'same name/title and date',
        });
        continue;
      }
      result.add.push(record);
    }
    return result;
  };

  const artistPlan = classify(artists, store.artists, artistKey, 'artist');
  const artworkPlan = classify(artworks, store.artworks, artworkKey, 'artwork');

  // A work may only be added if its artist will exist afterwards.
  const resolvable = new Set([
    ...store.artists.map((artist) => artist.id),
    ...artistPlan.add.map((artist) => artist.id),
  ]);
  const blocked = [];
  artworkPlan.add = artworkPlan.add.filter((artwork) => {
    if (artwork.artistId && !resolvable.has(artwork.artistId)) {
      blocked.push({
        id: artwork.id,
        kind: 'artwork',
        reason: `artist "${artwork.artistId}" was not imported`,
      });
      return false;
    }
    return true;
  });

  return { problems, artists: artistPlan, artworks: { ...artworkPlan, blocked } };
}
