// Validation and normalisation of a source dataset. Pure functions: no file or network access.
import {
  CATEGORIES,
  CLEARED_RIGHTS,
  ID_PATTERN,
  KNOWN_ARTIST_FIELDS,
  KNOWN_ARTWORK_FIELDS,
  RIGHTS_STATUSES,
  SUPPORTED_SCHEMA_VERSIONS,
} from './model.mjs';

/**
 * @typedef {object} Issue
 * @property {'error' | 'warning'} level  Errors block a write; warnings are listed for review.
 * @property {string} code
 * @property {string} path               Where in the source file, e.g. "artworks[2].artistId".
 * @property {string | null} recordId
 * @property {string} message
 */

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';

/** A real calendar date in YYYY-MM-DD form. */
export function isIsoDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function isHttpsUrl(value) {
  if (typeof value !== 'string') return false;
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validates a parsed source dataset and converts it to the catalogue model.
 * @param {unknown} raw  Parsed JSON.
 * @param {{ sourceLocale?: string, batchId: string }} options
 */
export function validateDataset(raw, { sourceLocale = 'ru', batchId }) {
  /** @type {Issue[]} */
  const issues = [];
  const add = (level, code, path, recordId, message) =>
    issues.push({ level, code, path, recordId, message });
  const error = (...args) => add('error', ...args);
  const warn = (...args) => add('warning', ...args);

  if (!isObject(raw)) {
    error('file.not-object', '$', null, 'The file must contain a JSON object.');
    return { issues, artists: [], artworks: [], batch: null };
  }
  if (!SUPPORTED_SCHEMA_VERSIONS.includes(raw.schemaVersion)) {
    error(
      'file.schema-version',
      'schemaVersion',
      null,
      `Unsupported schemaVersion ${JSON.stringify(raw.schemaVersion)}; expected ${SUPPORTED_SCHEMA_VERSIONS.join(', ')}.`
    );
  }
  if (!Array.isArray(raw.artists))
    error('file.artists', 'artists', null, '"artists" must be a list.');
  if (!Array.isArray(raw.artworks))
    error('file.artworks', 'artworks', null, '"artworks" must be a list.');
  if (issues.some((issue) => issue.level === 'error')) {
    return { issues, artists: [], artworks: [], batch: null };
  }

  const dataset = isObject(raw.dataset) ? raw.dataset : {};
  if (!isObject(raw.dataset)) {
    warn(
      'file.dataset',
      'dataset',
      null,
      'No "dataset" block: the batch will carry no dataset-level attribution.'
    );
  }

  // Dataset-level attribution is kept once per batch instead of on every record.
  const batch = {
    id: batchId,
    title: dataset.title ?? null,
    createdAt: dataset.createdAt ?? null,
    schemaVersion: raw.schemaVersion,
    notice: dataset.importantNotice ?? null,
    sourceIndex: dataset.sourceIndex ?? null,
    sourceCreditsPage: dataset.sourceCreditsPage ?? null,
    sourceReferencesPage: dataset.sourceReferencesPage ?? null,
    sourceLocale,
  };

  const checkId = (record, path, kind, seen) => {
    if (!isNonEmptyString(record.id)) {
      error(`${kind}.id-missing`, `${path}.id`, null, 'Missing id.');
      return false;
    }
    if (!ID_PATTERN.test(record.id)) {
      error(
        `${kind}.id-format`,
        `${path}.id`,
        record.id,
        `Id "${record.id}" must be lowercase words joined by hyphens.`
      );
    }
    if (seen.has(record.id)) {
      error(
        `${kind}.id-duplicate`,
        `${path}.id`,
        record.id,
        `Id "${record.id}" is used more than once (also at ${seen.get(record.id)}).`
      );
      return false;
    }
    seen.set(record.id, path);
    return true;
  };

  const checkUnknownFields = (record, known, path, kind) => {
    for (const key of Object.keys(record)) {
      if (!known.includes(key)) {
        warn(
          `${kind}.unknown-field`,
          `${path}.${key}`,
          record.id ?? null,
          `Field "${key}" is not part of the catalogue model and will not be imported.`
        );
      }
    }
  };

  const seenSourceUrls = new Map();
  const checkSource = (source, path, recordId, kind) => {
    if (!isObject(source)) {
      error(
        `${kind}.source-missing`,
        `${path}.source`,
        recordId,
        'Every record needs a "source" with the page it came from.'
      );
      return null;
    }
    if (!isHttpsUrl(source.url)) {
      error(
        `${kind}.source-url`,
        `${path}.source.url`,
        recordId,
        'source.url must be an https:// address.'
      );
    } else if (seenSourceUrls.has(source.url)) {
      error(
        `${kind}.source-duplicate`,
        `${path}.source.url`,
        recordId,
        `The same source page is already used by "${seenSourceUrls.get(source.url)}".`
      );
    } else {
      seenSourceUrls.set(source.url, recordId);
    }
    if (!isIsoDate(source.accessedAt)) {
      error(
        `${kind}.source-accessed`,
        `${path}.source.accessedAt`,
        recordId,
        'source.accessedAt must be a date in YYYY-MM-DD form.'
      );
    }
    return {
      url: source.url,
      title: source.title ?? null,
      accessedAt: source.accessedAt,
      notes: source.notes ?? null,
    };
  };

  const stringList = (value, path, recordId, kind) => {
    if (value === undefined || value === null) return [];
    if (!Array.isArray(value) || !value.every(isNonEmptyString)) {
      error(`${kind}.list`, path, recordId, 'Must be a list of non-empty strings.');
      return [];
    }
    return value.map((item) => item.trim());
  };

  // ── Artists ──
  const artistIds = new Map();
  const artists = [];
  raw.artists.forEach((record, index) => {
    const path = `artists[${index}]`;
    if (!isObject(record)) {
      error('artist.not-object', path, null, 'Each artist must be an object.');
      return;
    }
    const idOk = checkId(record, path, 'artist', artistIds);
    const id = record.id ?? null;
    checkUnknownFields(record, KNOWN_ARTIST_FIELDS, path, 'artist');
    if (!isNonEmptyString(record.name))
      error('artist.name', `${path}.name`, id, 'Missing artist name.');

    const lifeDates = isObject(record.lifeDates) ? record.lifeDates : {};
    for (const key of ['birth', 'death']) {
      const value = lifeDates[key] ?? null;
      if (value !== null && !isIsoDate(value)) {
        error(
          'artist.life-date',
          `${path}.lifeDates.${key}`,
          id,
          `${key} must be YYYY-MM-DD or null.`
        );
      }
    }
    if (
      isIsoDate(lifeDates.birth) &&
      isIsoDate(lifeDates.death) &&
      lifeDates.birth > lifeDates.death
    ) {
      error('artist.life-order', `${path}.lifeDates`, id, 'Birth date is after death date.');
    }
    if (record.worksCountOnSourceProfile !== undefined) {
      warn(
        'artist.works-count-dropped',
        `${path}.worksCountOnSourceProfile`,
        id,
        'Works count describes the source site and changes over time; it is not imported.'
      );
    }
    if (record.biography === null || record.biography === undefined) {
      warn(
        'artist.no-biography',
        `${path}.biography`,
        id,
        'No biography text; the artist page will show dates and groups only.'
      );
    }

    const source = checkSource(record.source, path, id, 'artist');
    if (!idOk) return;
    artists.push({
      id,
      name: isNonEmptyString(record.name) ? { [sourceLocale]: record.name.trim() } : {},
      lifeDates: {
        birth: lifeDates.birth ?? null,
        death: lifeDates.death ?? null,
        display: lifeDates.display ?? null,
      },
      groups: stringList(record.groups, `${path}.groups`, id, 'artist'),
      education: stringList(record.education, `${path}.education`, id, 'artist'),
      biography: isNonEmptyString(record.biography)
        ? { [sourceLocale]: record.biography.trim() }
        : null,
      source,
      importBatch: batchId,
    });
  });

  // ── Artworks ──
  const artworkIds = new Map();
  const artworks = [];
  raw.artworks.forEach((record, index) => {
    const path = `artworks[${index}]`;
    if (!isObject(record)) {
      error('artwork.not-object', path, null, 'Each artwork must be an object.');
      return;
    }
    const idOk = checkId(record, path, 'artwork', artworkIds);
    const id = record.id ?? null;
    if (idOk && artistIds.has(id)) {
      error(
        'artwork.id-collides-with-artist',
        `${path}.id`,
        id,
        `Id "${id}" is also used by an artist.`
      );
    }
    checkUnknownFields(record, KNOWN_ARTWORK_FIELDS, path, 'artwork');
    if (!isNonEmptyString(record.title))
      error('artwork.title', `${path}.title`, id, 'Missing title.');

    // Links to artists: a missing link is allowed only when the source shows a name.
    const artistId = record.artistId ?? null;
    const shownName = isNonEmptyString(record.artistNameAsDisplayed)
      ? record.artistNameAsDisplayed.trim()
      : null;
    if (artistId !== null && !artistIds.has(artistId)) {
      error(
        'artwork.artist-missing',
        `${path}.artistId`,
        id,
        `artistId "${artistId}" does not match any artist in the file.`
      );
    }
    if (artistId === null && shownName === null) {
      error(
        'artwork.no-artist',
        `${path}.artistId`,
        id,
        'No artistId and no artistNameAsDisplayed: the work would have no author line.'
      );
    }
    if (artistId === null && shownName !== null) {
      warn(
        'artwork.unlinked-artist',
        `${path}.artistId`,
        id,
        `Not linked to an artist record; "${shownName}" will be shown as plain text until an artist record is added.`
      );
    }

    if (record.date === null || record.date === undefined) {
      warn('artwork.no-date', `${path}.date`, id, 'No date.');
    }

    let dimensions = null;
    if (record.dimensions !== null && record.dimensions !== undefined) {
      if (!isObject(record.dimensions)) {
        error(
          'artwork.dimensions',
          `${path}.dimensions`,
          id,
          'dimensions must be an object or null.'
        );
      } else {
        for (const key of ['heightCm', 'widthCm']) {
          const value = record.dimensions[key];
          if (value !== null && value !== undefined && !(typeof value === 'number' && value > 0)) {
            error(
              'artwork.dimension-value',
              `${path}.dimensions.${key}`,
              id,
              `${key} must be a positive number or null.`
            );
          }
        }
        dimensions = {
          heightCm: record.dimensions.heightCm ?? null,
          widthCm: record.dimensions.widthCm ?? null,
          display: record.dimensions.display ?? null,
        };
      }
    } else {
      warn('artwork.no-dimensions', `${path}.dimensions`, id, 'No dimensions.');
    }

    // Image rights: the importer never downloads anything and refuses local copies that are not cleared.
    const image = isObject(record.image) ? record.image : null;
    if (!image) {
      error(
        'artwork.image-missing',
        `${path}.image`,
        id,
        'Every artwork needs an "image" block with a rights status, even when there is no image.'
      );
    } else {
      if (!RIGHTS_STATUSES.includes(image.rightsStatus)) {
        error(
          'artwork.rights-status',
          `${path}.image.rightsStatus`,
          id,
          `rightsStatus must be one of: ${RIGHTS_STATUSES.join(', ')}.`
        );
      }
      if (typeof image.mayRehost !== 'boolean') {
        error(
          'artwork.may-rehost',
          `${path}.image.mayRehost`,
          id,
          'mayRehost must be true or false.'
        );
      }
      const cleared = CLEARED_RIGHTS.includes(image.rightsStatus);
      if (image.mayRehost === true && !cleared) {
        error(
          'artwork.rights-inconsistent',
          `${path}.image.mayRehost`,
          id,
          `mayRehost is true but rightsStatus is "${image.rightsStatus}".`
        );
      }
      if (
        image.localPath !== null &&
        image.localPath !== undefined &&
        !(cleared && image.mayRehost === true)
      ) {
        error(
          'artwork.local-copy-not-cleared',
          `${path}.image.localPath`,
          id,
          'A local image copy is listed but rights are not cleared for re-hosting.'
        );
      }
      for (const key of ['sourcePage', 'sourceImageUrl']) {
        if (image[key] !== null && image[key] !== undefined && !isHttpsUrl(image[key])) {
          error(
            'artwork.image-url',
            `${path}.image.${key}`,
            id,
            `${key} must be an https:// address or null.`
          );
        }
      }
      if (!isNonEmptyString(image.credit)) {
        warn(
          'artwork.no-credit',
          `${path}.image.credit`,
          id,
          'No image credit: the source of the reproduction is unknown.'
        );
      }
    }

    const source = checkSource(record.source, path, id, 'artwork');
    if (!idOk) return;
    const keywords = stringList(record.keywords, `${path}.keywords`, id, 'artwork');
    artworks.push({
      id,
      title: isNonEmptyString(record.title) ? { [sourceLocale]: record.title.trim() } : {},
      titleOriginal: record.titleOriginal ?? null,
      date: isNonEmptyString(record.date) ? record.date.trim() : null,
      artistId,
      artistNameAsDisplayed: shownName,
      dimensions,
      medium: isNonEmptyString(record.medium) ? { [sourceLocale]: record.medium.trim() } : null,
      keywords: keywords.length ? { [sourceLocale]: keywords } : {},
      // The source has no collection section; it is assigned by a person, never guessed.
      category: null,
      publicationStatus: 'draft',
      image: image
        ? {
            sourcePage: image.sourcePage ?? null,
            sourceImageUrl: image.sourceImageUrl ?? null,
            localPath: image.localPath ?? null,
            rightsStatus: image.rightsStatus,
            credit: image.credit ?? null,
            mayRehost: image.mayRehost === true,
            notes: image.notes ?? null,
          }
        : null,
      source,
      importBatch: batchId,
    });
  });

  return { issues, artists, artworks, batch };
}

/**
 * Checks the site catalogue itself, including hand edits: what CI guards before a deploy.
 * @param {{ artists: object[], artworks: object[] }} store
 * @returns {string[]} Problems; empty when the catalogue is consistent.
 */
export function checkCatalogue(store) {
  const problems = [];
  const ids = new Set();
  for (const record of [...store.artists, ...store.artworks]) {
    if (!ID_PATTERN.test(record.id ?? '')) problems.push(`Bad id ${JSON.stringify(record.id)}.`);
    if (ids.has(record.id)) problems.push(`Id "${record.id}" is used twice.`);
    ids.add(record.id);
    if (!isHttpsUrl(record.source?.url)) problems.push(`${record.id}: source.url is missing.`);
  }
  const artistIds = new Set(store.artists.map((artist) => artist.id));
  for (const artwork of store.artworks) {
    const where = artwork.id;
    if (artwork.artistId && !artistIds.has(artwork.artistId)) {
      problems.push(`${where}: artist "${artwork.artistId}" is not in the catalogue.`);
    }
    if (!artwork.artistId && !artwork.artistNameAsDisplayed) problems.push(`${where}: no author.`);
    if (artwork.category !== null && !CATEGORIES.includes(artwork.category)) {
      problems.push(`${where}: unknown category "${artwork.category}".`);
    }
    if (!['draft', 'published'].includes(artwork.publicationStatus)) {
      problems.push(`${where}: publicationStatus must be draft or published.`);
    }
    if (
      artwork.publicationStatus === 'published' &&
      !Object.values(artwork.title ?? {}).some(Boolean)
    ) {
      problems.push(`${where}: a published work needs a title.`);
    }
    const image = artwork.image ?? {};
    if (!RIGHTS_STATUSES.includes(image.rightsStatus)) problems.push(`${where}: bad rightsStatus.`);
    const cleared = CLEARED_RIGHTS.includes(image.rightsStatus) && image.mayRehost === true;
    if (image.localPath && !cleared) {
      problems.push(`${where}: a local image is listed but rights are not cleared for re-hosting.`);
    }
    if (image.mayRehost === true && !CLEARED_RIGHTS.includes(image.rightsStatus)) {
      problems.push(`${where}: mayRehost is true but rights are not cleared.`);
    }
  }
  return problems;
}
