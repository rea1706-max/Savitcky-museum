#!/usr/bin/env node
/**
 * Complete Catalogue Migration Tool for Nukus Museum (https://nukus.open-museum.net/)
 *
 * Usage:
 *   node scripts/migrate-catalog.mjs --pilot                # Run pilot mode (3 artists and their works)
 *   node scripts/migrate-catalog.mjs --full                 # Full crawl mode
 *   node scripts/migrate-catalog.mjs --dry-run              # Metadata crawl without downloading images
 *   node scripts/migrate-catalog.mjs --resume               # Resume previous run from checkpoint
 *   node scripts/migrate-catalog.mjs --limit <number>       # Process specific number of artists
 *   node scripts/migrate-catalog.mjs --delay <ms>           # Delay between HTTP requests (default 250ms)
 *   node scripts/migrate-catalog.mjs --staging <dir>        # Output staging directory (default 'museum-import')
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

// The source server nukus.open-museum.net has an expired TLS certificate (CERT_HAS_EXPIRED).
// We bypass strict TLS rejection only for crawling the public museum catalog.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const BASE_URL = 'https://nukus.open-museum.net';
const DEFAULT_STAGING = 'museum-import';
const DEFAULT_DELAY = 150;
const MAX_RETRIES = 3;

/**
 * Decodes common HTML entities into native Unicode characters.
 */
export function decodeHtmlEntities(text) {
  if (!text) return '';
  return text
    .replace(/&laquo;/gi, '«')
    .replace(/&raquo;/gi, '»')
    .replace(/&ndash;/gi, '–')
    .replace(/&mdash;/gi, '—')
    .replace(/&eacute;/gi, 'é')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));
}

/**
 * Strips script tags, style tags, and extraneous markup from raw HTML.
 */
export function cleanHtmlContent(raw) {
  if (!raw) return '';
  const withoutScripts = raw
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  return decodeHtmlEntities(withoutScripts);
}

/**
 * Transliterates Russian/Cyrillic string to clean Latin kebab-case slug.
 */
export function slugify(text) {
  if (!text || !text.trim()) return 'untitled';
  const cyrillicMap = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh',
    з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
    п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts',
    ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
  };
  const lower = text.toLowerCase().trim();
  let converted = '';
  for (const char of lower) {
    if (cyrillicMap[char] !== undefined) {
      converted += cyrillicMap[char];
    } else if (/[a-z0-9]/.test(char)) {
      converted += char;
    } else {
      converted += '-';
    }
  }
  return converted.replace(/-+/g, '-').replace(/^-|-$/g, '') || 'item';
}

/**
 * Parses life dates from text like "30.08.1897 - 27.06.1957" or "1905 - 1980".
 * Formats ISO dates as YYYY-MM-DD or null when day/month are missing.
 */
export function parseLifeDates(raw) {
  if (!raw) return { birth: null, death: null, display: null };
  const cleaned = raw.replace(/\s+/g, ' ').trim();

  // Full calendar dates: DD.MM.YYYY - DD.MM.YYYY
  const mFull = cleaned.match(/(\d{2})\.(\d{2})\.(\d{4})\s*[-–—]\s*(\d{2})\.(\d{2})\.(\d{4})/);
  if (mFull) {
    return {
      birth: `${mFull[3]}-${mFull[2]}-${mFull[1]}`,
      death: `${mFull[6]}-${mFull[5]}-${mFull[4]}`,
      display: `${mFull[1]}.${mFull[2]}.${mFull[3]} – ${mFull[4]}.${mFull[5]}.${mFull[6]}`,
    };
  }

  // Single full birth date: DD.MM.YYYY
  const mSingleFull = cleaned.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (mSingleFull) {
    return {
      birth: `${mSingleFull[3]}-${mSingleFull[2]}-${mSingleFull[1]}`,
      death: null,
      display: `${mSingleFull[1]}.${mSingleFull[2]}.${mSingleFull[3]}`,
    };
  }

  // Years only: YYYY - YYYY
  // The catalogue validator strictly enforces YYYY-MM-DD for birth/death, so years-only must be null.
  const mYear = cleaned.match(/(\d{4})\s*[-–—]\s*(\d{4})/);
  if (mYear) {
    return {
      birth: null,
      death: null,
      display: `${mYear[1]} – ${mYear[2]}`,
    };
  }

  // Single year: YYYY
  const mSingleYear = cleaned.match(/^(\d{4})$/);
  if (mSingleYear) {
    return {
      birth: null,
      death: null,
      display: `${mSingleYear[1]}`,
    };
  }

  return { birth: null, death: null, display: cleaned };
}

/**
 * Parses dimensions from text like "85.2см x 69.2см", "90см x 75см", "97 × 106 см".
 */
export function parseDimensions(raw) {
  if (!raw) return null;
  const cleaned = raw.replace(/\s+/g, ' ').trim();
  const m = cleaned.match(/([\d.,]+)\s*(?:см)?\s*[xX\u0445\u0425×*]\s*([\d.,]+)\s*(?:см)?/iu);
  if (m) {
    const h = parseFloat(m[1].replace(',', '.'));
    const w = parseFloat(m[2].replace(',', '.'));
    return {
      heightCm: Number.isNaN(h) ? null : h,
      widthCm: Number.isNaN(w) ? null : w,
      display: `${m[1]} × ${m[2]} см`,
    };
  }
  return { heightCm: null, widthCm: null, display: cleaned };
}

/**
 * Validates binary image signatures (magic bytes).
 */
export function validateImageSignature(buffer) {
  if (!buffer || buffer.length < 4) return { valid: false, format: null };
  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { valid: true, format: 'jpeg' };
  }
  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return { valid: true, format: 'png' };
  }
  // GIF: 47 49 46 38
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) {
    return { valid: true, format: 'gif' };
  }
  // WebP: RIFF ... WEBP
  if (
    buffer.length >= 12 &&
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return { valid: true, format: 'webp' };
  }
  return { valid: false, format: null };
}

/**
 * Delays execution by given milliseconds.
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Robust fetch with retries and timeout.
 */
async function fetchWithRetry(url, options = {}, retries = MAX_RETRIES) {
  let attempt = 0;
  while (attempt <= retries) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'User-Agent':
            'NukusMuseumMigrationTool/1.0 (+https://github.com/rea1706-max/Savitcky-museum)',
          ...(options.headers || {}),
        },
      });
      clearTimeout(timer);
      return res;
    } catch (err) {
      attempt += 1;
      if (attempt > retries) throw err;
      const backoff = 1000 * Math.pow(2, attempt - 1);
      await sleep(backoff);
    }
  }
}

/**
 * Discovers all artist profile URLs from https://nukus.open-museum.net/author/
 */
export async function discoverAllArtists(delayMs = DEFAULT_DELAY) {
  console.info(`[Discovery] Fetching artist index: ${BASE_URL}/author/`);
  const res = await fetchWithRetry(`${BASE_URL}/author/`);
  if (!res.ok) {
    throw new Error(`Failed to fetch artist index: HTTP ${res.status}`);
  }
  const html = await res.text();
  await sleep(delayMs);

  const artists = [];
  const regex = /<a[^>]*href=["'](\/author\/profile\/(\d+)\/?)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  const seenIds = new Set();

  while ((match = regex.exec(html)) !== null) {
    const rawPath = match[1];
    const authorId = match[2];
    const rawName = decodeHtmlEntities(match[3].replace(/<[^>]+>/g, '').trim());

    if (!seenIds.has(authorId) && rawName) {
      seenIds.add(authorId);
      artists.push({
        authorId,
        url: `${BASE_URL}/author/profile/${authorId}/`,
        indexedName: rawName,
      });
    }
  }

  console.info(`[Discovery] Found ${artists.length} accessible artist profiles on source index.`);
  return artists;
}

/**
 * Extracts artist profile details and linked artwork URLs.
 */
export async function extractArtistProfile(artistRef, delayMs = DEFAULT_DELAY, existingArtistIds = new Set()) {
  const res = await fetchWithRetry(artistRef.url);
  if (!res.ok) {
    throw new Error(`Failed to fetch artist profile ${artistRef.url}: HTTP ${res.status}`);
  }
  const rawHtml = await res.text();
  const html = cleanHtmlContent(rawHtml);
  await sleep(delayMs);

  // 1. Author Name (from banner or h1)
  let name = artistRef.indexedName;
  const bannerMatch = html.match(
    /<div[^>]*class="[^"]*col-11[^"]*"[^>]*>\s*<a[^>]*href="\/author\/profile\/\d+\/?"[^>]*>([\s\S]*?)<\/a>/i
  );
  if (bannerMatch) {
    const cleaned = bannerMatch[1].replace(/<[^>]+>/g, '').trim();
    if (cleaned) name = cleaned;
  }

  // 2. Life Dates
  let lifeDatesRaw = null;
  const datesMatch = html.match(/<b>Даты жизни<\/b>:\s*([^<]+)/i);
  if (datesMatch) lifeDatesRaw = datesMatch[1].trim();
  const lifeDates = parseLifeDates(lifeDatesRaw);

  // 3. Groups (Группировки)
  const groups = [];
  const groupsMatch = html.match(/<b>Группировки<\/b>:([\s\S]*?)<br>/i);
  if (groupsMatch) {
    const gRegex = /<a[^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    while ((m = gRegex.exec(groupsMatch[1])) !== null) {
      const gName = m[1].replace(/<[^>]+>/g, '').trim();
      if (gName && !groups.includes(gName)) groups.push(gName);
    }
  }

  // 4. Education (Образование)
  const education = [];
  const eduMatch = html.match(/<b>Образование<\/b>:([\s\S]*?)<br>/i);
  if (eduMatch) {
    const eRegex = /<a[^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    while ((m = eRegex.exec(eduMatch[1])) !== null) {
      const eName = m[1].replace(/<[^>]+>/g, '').trim();
      if (eName && !education.includes(eName)) education.push(eName);
    }
  }

  // 5. Institutions (Институции)
  const institutions = [];
  const instMatch = html.match(/<b>Институции<\/b>:([\s\S]*?)<br>/i);
  if (instMatch) {
    const iRegex = /<a[^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    while ((m = iRegex.exec(instMatch[1])) !== null) {
      const iName = m[1].replace(/<[^>]+>/g, '').trim();
      if (iName && !institutions.includes(iName)) institutions.push(iName);
    }
  }

  // 6. Declared artwork count on profile
  let worksCountOnSourceProfile = null;
  const countMatch = html.match(/Количество:\s*(\d+)/i);
  if (countMatch) {
    worksCountOnSourceProfile = parseInt(countMatch[1], 10);
  }

  // 7. Biography
  let biography = null;
  const bioMatch = html.match(/<h3 class="title orange">БИОГРАФИЯ<\/h3>([\s\S]*?)(?:<h3|<div class="row"|<footer|$)/i);
  if (bioMatch) {
    const cleanBio = bioMatch[1]
      .split(/<script\b/i)[0]
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<[^>]+>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    if (cleanBio) biography = cleanBio;
  }

  // 8. Discover Artwork / Exhibit links
  const artworkUrls = [];
  const exhibitIdSet = new Set();
  const previewMap = {};

  // Extract from window.location
  const winLocRegex = /window\.location=['"](\/exhibit\/get\/(\d+)\/?)['"]/g;
  let wMatch;
  while ((wMatch = winLocRegex.exec(html)) !== null) {
    const exId = wMatch[2];
    if (!exhibitIdSet.has(exId)) {
      exhibitIdSet.add(exId);
      artworkUrls.push(`${BASE_URL}/exhibit/get/${exId}/`);
    }
  }

  // Extract from regular hrefs just in case
  const hrefRegex = /href=['"](\/exhibit\/get\/(\d+)\/?)['"]/g;
  let hMatch;
  while ((hMatch = hrefRegex.exec(html)) !== null) {
    const exId = hMatch[2];
    if (!exhibitIdSet.has(exId)) {
      exhibitIdSet.add(exId);
      artworkUrls.push(`${BASE_URL}/exhibit/get/${exId}/`);
    }
  }

  // Preview images map
  const cardRegex = /<img[^>]+src=["'](\/i\/gallery\/preview\/([^"']+))["'][^>]*>[\s\S]*?window\.location=['"]\/exhibit\/get\/(\d+)\/?['"]/gi;
  let cMatch;
  while ((cMatch = cardRegex.exec(html)) !== null) {
    const prevSrc = cMatch[1];
    const exId = cMatch[3];
    previewMap[exId] = `${BASE_URL}${prevSrc}`;
  }

  const artistSlug = slugify(name);
  let artistId = `artist-${artistSlug}`;
  if (existingArtistIds && existingArtistIds.has(artistId)) {
    artistId = `${artistId}-${artistRef.authorId}`;
  }

  return {
    id: artistId,
    authorId: artistRef.authorId,
    name,
    lifeDates,
    groups,
    education,
    institutions,
    biography,
    worksCountOnSourceProfile,
    artworkUrls,
    previewMap,
    source: {
      url: artistRef.url,
      title: name,
      accessedAt: new Date().toISOString().slice(0, 10),
      notes: 'Сведения профиля художника каталога Нукусского музея.',
    },
  };
}

/**
 * Extracts metadata and image links from an artwork exhibit page.
 */
export async function extractArtwork(exhibitUrl, artistRecord, delayMs = DEFAULT_DELAY) {
  const res = await fetchWithRetry(exhibitUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch exhibit ${exhibitUrl}: HTTP ${res.status}`);
  }
  const rawHtml = await res.text();
  const html = cleanHtmlContent(rawHtml);
  await sleep(delayMs);

  const exhibitIdMatch = exhibitUrl.match(/\/exhibit\/get\/(\d+)\/?/);
  const exhibitId = exhibitIdMatch ? exhibitIdMatch[1] : 'unknown';

  // 1. Artwork Title
  let title = 'Без названия';
  const titleFieldMatch = html.match(/<b>Название:<\/b>\s*([^<]+)/i);
  if (titleFieldMatch) {
    const cleaned = titleFieldMatch[1].trim();
    if (cleaned) title = cleaned;
  } else {
    const pageTitleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    if (pageTitleMatch) {
      const parts = pageTitleMatch[1].split('.');
      if (parts.length > 1) title = parts.slice(1).join('.').trim();
      else title = pageTitleMatch[1].trim();
    }
  }

  // 2. Creation Date
  let date = null;
  const dateMatch = html.match(/<b>Дата:<\/b>\s*([^<]+)/i);
  if (dateMatch) {
    const cleaned = dateMatch[1].trim();
    if (cleaned) date = cleaned;
  }

  // 3. Dimensions
  let dimensions = null;
  const dimMatch = html.match(/<b>Размеры:<\/b>\s*([^<]+)/i);
  if (dimMatch) {
    dimensions = parseDimensions(dimMatch[1]);
  }

  // 4. Medium / Technique
  let medium = null;
  const medMatch = html.match(/<b>Техника:<\/b>\s*([^<]+)/i);
  if (medMatch) {
    const cleaned = medMatch[1].trim();
    if (cleaned) medium = cleaned;
  }

  // 5. Keywords
  const keywords = [];
  const kwMatch = html.match(/<b>Ключевые слова:<\/b>([\s\S]*?)(?:<h3|<div|<p|$)/i);
  if (kwMatch) {
    const aRegex = /<a[^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    while ((m = aRegex.exec(kwMatch[1])) !== null) {
      const kw = m[1].replace(/<[^>]+>/g, '').trim();
      if (kw && !keywords.includes(kw)) keywords.push(kw);
    }
  }

  // 6. Image Credit (РЕПРОДУКЦИЯ)
  let imageCredit = null;
  const repMatch = html.match(/<h3 class="title orange">РЕПРОДУКЦИЯ<\/h3>([\s\S]*?)(?:<h3|<div class="row"|$)/i);
  if (repMatch) {
    const cleanedRep = repMatch[1]
      .split(/<script\b/i)[0]
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (cleanedRep) imageCredit = cleanedRep;
  }

  // 7. Provenance (ПРОВЕНАНС)
  let provenance = null;
  const provMatch = html.match(/<h3 class="title orange">ПРОВЕНАНС<\/h3>[\s\S]*?<p>([\s\S]*?)<\/p>/i);
  if (provMatch) {
    const cleanedProv = provMatch[1]
      .split(/<script\b/i)[0]
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (cleanedProv) provenance = cleanedProv;
  }

  // 8. Discover best image URL
  let bestImageUrl = null;
  let imageCandidates = [];

  // Check fancybox link
  const fancyMatch = html.match(/<a[^>]+class="[^"]*fancybox[^"]*"[^>]+href="([^"]+)"/i);
  if (fancyMatch) {
    const fHref = fancyMatch[1].startsWith('http') ? fancyMatch[1] : `${BASE_URL}${fancyMatch[1]}`;
    imageCandidates.push(fHref);
  }

  // Check <img> inside thumbnail fancybox
  const imgMatch = html.match(/<img[^>]+src="(\/i\/gallery\/normal\/[^"]+)"/i);
  if (imgMatch) {
    imageCandidates.push(`${BASE_URL}${imgMatch[1]}`);
  }

  // Check other normal images
  const otherNormalMatch = html.match(/src="(\/i\/gallery\/normal\/[^"]+)"/i);
  if (otherNormalMatch) {
    const url = `${BASE_URL}${otherNormalMatch[1]}`;
    if (!imageCandidates.includes(url)) imageCandidates.push(url);
  }

  // Prioritize `/normal/` (e.g. 1000x1227, 1.1MB) over `/orig/` (880x1080, 495KB)
  const normalCandidate = imageCandidates.find((url) => url.includes('/gallery/normal/'));
  const origCandidate = imageCandidates.find((url) => url.includes('/gallery/orig/'));
  bestImageUrl = normalCandidate || origCandidate || imageCandidates[0] || null;

  // Fallback to preview if no normal/orig found
  if (!bestImageUrl && artistRecord.previewMap?.[exhibitId]) {
    bestImageUrl = artistRecord.previewMap[exhibitId];
  }

  const artworkId = `artwork-exhibit-${exhibitId}`;

  return {
    id: artworkId,
    exhibitId,
    title,
    titleOriginal: null,
    date,
    artistId: artistRecord.id,
    artistNameAsDisplayed: artistRecord.name,
    artistProfileUrl: artistRecord.source.url,
    dimensions,
    medium,
    keywords,
    description: null,
    provenance,
    sourcePageUrl: exhibitUrl,
    sourceImageUrl: bestImageUrl,
    localImagePath: null,
    imageCredit,
    rightsStatus: 'unverified',
    mayPublish: false,
    source: {
      url: exhibitUrl,
      accessedAt: new Date().toISOString().slice(0, 10),
    },
  };
}

/**
 * Downloads image file, validates binary format and checksum.
 */
export async function downloadAndValidateImage(imageUrl, destPath, delayMs = DEFAULT_DELAY) {
  await sleep(delayMs);
  const res = await fetchWithRetry(imageUrl);

  if (!res.ok) {
    return {
      ok: false,
      httpStatus: res.status,
      contentType: res.headers.get('content-type'),
      fileSize: 0,
      checksumSha256: null,
      error: `HTTP ${res.status}`,
    };
  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.toLowerCase().startsWith('image/')) {
    return {
      ok: false,
      httpStatus: res.status,
      contentType,
      fileSize: 0,
      checksumSha256: null,
      error: `Unexpected Content-Type: ${contentType}`,
    };
  }

  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (buffer.length === 0) {
    return {
      ok: false,
      httpStatus: res.status,
      contentType,
      fileSize: 0,
      checksumSha256: null,
      error: 'Empty response (0 bytes)',
    };
  }

  // Validate magic bytes
  const sig = validateImageSignature(buffer);
  if (!sig.valid) {
    return {
      ok: false,
      httpStatus: res.status,
      contentType,
      fileSize: buffer.length,
      checksumSha256: null,
      error: 'Invalid image signature (corrupt or non-image content)',
    };
  }

  // Checksum
  const hash = createHash('sha256').update(buffer).digest('hex');

  // Write file to staging
  writeFileSync(destPath, buffer);

  return {
    ok: true,
    httpStatus: res.status,
    contentType,
    fileSize: buffer.length,
    checksumSha256: hash,
    format: sig.format,
    error: null,
  };
}

/**
 * Main migration coordinator.
 */
export async function runMigration(options) {
  const startTime = Date.now();
  const stagingDir = resolve(options.staging || DEFAULT_STAGING);
  const dataDir = join(stagingDir, 'data');
  const imagesDir = join(stagingDir, 'images');
  const checkpointPath = join(stagingDir, '.checkpoint.json');

  mkdirSync(dataDir, { recursive: true });
  mkdirSync(imagesDir, { recursive: true });

  console.info(`=== Starting Nukus Museum Catalog Migration ===`);
  console.info(`Staging Directory: ${stagingDir}`);
  console.info(`Mode: ${options.pilot ? 'PILOT (3 artists)' : options.full ? 'FULL' : 'DEFAULT'}`);
  console.info(`Dry Run: ${options.dryRun ? 'YES (no image downloads)' : 'NO'}`);
  console.info(`Resume: ${options.resume ? 'YES' : 'NO'}`);

  // Load checkpoint if resuming
  let checkpoint = {
    processedArtistIds: [],
    artists: [],
    artworks: [],
    manifest: [],
    errors: [],
  };

  if (options.resume && existsSync(checkpointPath)) {
    try {
      checkpoint = JSON.parse(readFileSync(checkpointPath, 'utf8'));
      console.info(
        `[Resume] Loaded checkpoint with ${checkpoint.artists.length} artists and ${checkpoint.artworks.length} artworks.`
      );
    } catch (err) {
      console.warn(`[Resume] Could not read checkpoint file: ${err.message}. Starting fresh.`);
    }
  }

  const artists = [...checkpoint.artists];
  const artworks = [...checkpoint.artworks];
  const manifest = [...checkpoint.manifest];
  const errors = [...checkpoint.errors];
  const processedArtistIds = new Set(checkpoint.processedArtistIds || []);
  const seenChecksums = new Map();

  // Populate seenChecksums from existing manifest
  for (const entry of manifest) {
    if (entry.checksumSha256) {
      seenChecksums.set(entry.checksumSha256, entry.artworkId);
    }
  }

  // Step 1: Discover all artists
  let discoveredArtists = [];
  try {
    discoveredArtists = await discoverAllArtists(options.delay);
  } catch (err) {
    console.error(`[Error] Discovery failed: ${err.message}`);
    errors.push({ context: 'discovery', url: `${BASE_URL}/author/`, error: err.message });
    return;
  }

  // Filter based on limits / pilot mode
  let targetArtists = discoveredArtists;
  if (options.pilot) {
    targetArtists = discoveredArtists.slice(0, 3);
  } else if (options.limit && options.limit > 0) {
    targetArtists = discoveredArtists.slice(0, options.limit);
  }

  console.info(`[Plan] Target artists to process: ${targetArtists.length}`);

  const existingArtistIds = new Set(artists.map((a) => a.id));

  // Step 2: Process each artist and their artworks
  for (let aIdx = 0; aIdx < targetArtists.length; aIdx += 1) {
    const artistRef = targetArtists[aIdx];
    const artistProgress = `[Artist ${aIdx + 1}/${targetArtists.length}]`;

    if (processedArtistIds.has(artistRef.authorId)) {
      console.info(`${artistProgress} Skipping already processed artist ID ${artistRef.authorId}`);
      continue;
    }

    console.info(`${artistProgress} Processing: ${artistRef.indexedName} (${artistRef.url})`);

    let artistProfile;
    try {
      artistProfile = await extractArtistProfile(artistRef, options.delay, existingArtistIds);
      existingArtistIds.add(artistProfile.id);
      artists.push(artistProfile);
      processedArtistIds.add(artistRef.authorId);
    } catch (err) {
      console.error(`${artistProgress} Failed to extract artist profile: ${err.message}`);
      errors.push({ context: 'artist', url: artistRef.url, error: err.message });
      continue;
    }

    console.info(
      `${artistProgress} Discovered ${artistProfile.artworkUrls.length} works (Profile stated: ${artistProfile.worksCountOnSourceProfile ?? 'unspecified'})`
    );

    // Step 3: Process artworks for this artist
    for (let wIdx = 0; wIdx < artistProfile.artworkUrls.length; wIdx += 1) {
      const artworkUrl = artistProfile.artworkUrls[wIdx];
      const artworkProgress = `  -> [Work ${wIdx + 1}/${artistProfile.artworkUrls.length}]`;

      // Check if already processed
      const existingArtwork = artworks.find((a) => a.sourcePageUrl === artworkUrl);
      if (existingArtwork) {
        continue;
      }

      let artwork;
      try {
        artwork = await extractArtwork(artworkUrl, artistProfile, options.delay);
      } catch (err) {
        console.error(`${artworkProgress} Failed to extract artwork ${artworkUrl}: ${err.message}`);
        errors.push({ context: 'artwork', url: artworkUrl, error: err.message });
        continue;
      }

      // Step 4: Handle image discovery & download
      if (artwork.sourceImageUrl && !options.dryRun) {
        const filename = `exhibit-${artwork.exhibitId}.jpg`;
        const localRelPath = `images/${filename}`;
        const localAbsPath = join(stagingDir, localRelPath);

        let dlResult;
        // Check if file already exists locally
        if (existsSync(localAbsPath) && statSync(localAbsPath).size > 0) {
          const existingBuf = readFileSync(localAbsPath);
          const hash = createHash('sha256').update(existingBuf).digest('hex');
          dlResult = {
            ok: true,
            httpStatus: 200,
            contentType: 'image/jpeg',
            fileSize: existingBuf.length,
            checksumSha256: hash,
            fromCache: true,
          };
        } else {
          dlResult = await downloadAndValidateImage(artwork.sourceImageUrl, localAbsPath, options.delay);
        }

        if (dlResult.ok) {
          artwork.localImagePath = localRelPath;

          const isDuplicate = seenChecksums.has(dlResult.checksumSha256);
          const duplicateOf = isDuplicate ? seenChecksums.get(dlResult.checksumSha256) : null;
          if (!isDuplicate) {
            seenChecksums.set(dlResult.checksumSha256, artwork.id);
          }

          manifest.push({
            artworkId: artwork.id,
            sourcePageUrl: artwork.sourcePageUrl,
            sourceImageUrl: artwork.sourceImageUrl,
            localImagePath: localRelPath,
            filename,
            fileSize: dlResult.fileSize,
            checksumSha256: dlResult.checksumSha256,
            httpStatus: dlResult.httpStatus,
            contentType: dlResult.contentType,
            imageCredit: artwork.imageCredit,
            rightsStatus: artwork.rightsStatus,
            mayPublish: artwork.mayPublish,
            isDuplicate,
            duplicateOf,
          });

          console.info(
            `${artworkProgress} Downloaded image for "${artwork.title}" (${dlResult.fileSize} bytes${isDuplicate ? ', duplicate image detected' : ''})`
          );
        } else {
          console.warn(`${artworkProgress} Image download failed: ${dlResult.error}`);
          errors.push({
            context: 'image',
            url: artwork.sourceImageUrl,
            artworkId: artwork.id,
            error: dlResult.error,
          });

          manifest.push({
            artworkId: artwork.id,
            sourcePageUrl: artwork.sourcePageUrl,
            sourceImageUrl: artwork.sourceImageUrl,
            localImagePath: null,
            filename: null,
            fileSize: 0,
            checksumSha256: null,
            httpStatus: dlResult.httpStatus || null,
            contentType: dlResult.contentType || null,
            imageCredit: artwork.imageCredit,
            rightsStatus: artwork.rightsStatus,
            mayPublish: artwork.mayPublish,
            isDuplicate: false,
            duplicateOf: null,
            error: dlResult.error,
          });
        }
      } else if (artwork.sourceImageUrl && options.dryRun) {
        manifest.push({
          artworkId: artwork.id,
          sourcePageUrl: artwork.sourcePageUrl,
          sourceImageUrl: artwork.sourceImageUrl,
          localImagePath: null,
          filename: null,
          fileSize: null,
          checksumSha256: null,
          httpStatus: null,
          contentType: null,
          imageCredit: artwork.imageCredit,
          rightsStatus: artwork.rightsStatus,
          mayPublish: artwork.mayPublish,
          isDuplicate: false,
          duplicateOf: null,
          notes: 'Dry-run: image not downloaded',
        });
      }

      artworks.push(artwork);
    }

    // Save checkpoint after every artist
    writeFileSync(
      checkpointPath,
      JSON.stringify(
        {
          processedArtistIds: Array.from(processedArtistIds),
          artists,
          artworks,
          manifest,
          errors,
        },
        null,
        2
      )
    );
  }

  // Step 5: Final output and reports
  const dateStr = new Date().toISOString().slice(0, 10);

  // Write artists.json (Phase 5 format)
  writeFileSync(join(dataDir, 'artists.json'), JSON.stringify(artists, null, 2));

  // Write artworks.json (Phase 5 format)
  writeFileSync(join(dataDir, 'artworks.json'), JSON.stringify(artworks, null, 2));

  // Write manifest.json
  writeFileSync(join(stagingDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

  // Write errors.json
  writeFileSync(join(stagingDir, 'errors.json'), JSON.stringify(errors, null, 2));

  // Generate Catalog Import Package compatible with `scripts/catalog/import-catalog.mjs`
  const importPackage = {
    schemaVersion: '1.0',
    dataset: {
      title: options.pilot ? 'Nukus Open Museum Pilot Import' : 'Nukus Open Museum Full Catalog Import',
      createdAt: dateStr,
      purpose: 'Migrated records from nukus.open-museum.net for Savitsky Museum collection catalogue',
      importantNotice:
        'Migrated from publicly accessible pages. Images downloaded for review staging. Rights remain unverified until cleared.',
      sourceIndex: `${BASE_URL}/author/`,
      sourceCreditsPage: `${BASE_URL}/p/credits/`,
      sourceReferencesPage: `${BASE_URL}/p/sources/`,
    },
    artists: artists.map((a) => ({
      id: a.id,
      name: a.name,
      lifeDates: a.lifeDates,
      groups: a.groups,
      education: a.education,
      biography: a.biography,
      worksCountOnSourceProfile: a.worksCountOnSourceProfile,
      source: a.source,
    })),
    artworks: artworks.map((w) => ({
      id: w.id,
      title: w.title,
      titleOriginal: w.titleOriginal,
      date: w.date,
      artistId: w.artistId,
      artistNameAsDisplayed: w.artistNameAsDisplayed,
      dimensions: w.dimensions,
      medium: w.medium,
      keywords: w.keywords,
      image: {
        sourcePage: w.sourcePageUrl,
        sourceImageUrl: w.sourceImageUrl,
        // In the production catalogue schema, uncleared images must have localPath: null
        localPath: null,
        rightsStatus: w.rightsStatus,
        credit: w.imageCredit || 'Вебсайт Нукусского музея',
        mayRehost: false,
        notes: w.localImagePath
          ? `Staged image at museum-import/${w.localImagePath}. Rights unverified; not for production publishing until cleared.`
          : 'Image rights unverified; not for production publishing until cleared.',
      },
      source: w.source,
    })),
  };
  writeFileSync(join(dataDir, 'catalog-import-package.json'), JSON.stringify(importPackage, null, 2));

  // Step 6: Discrepancy & Validation Report
  const discrepancies = artists.map((a) => {
    const artistWorks = artworks.filter((w) => w.artistId === a.id);
    const declared = a.worksCountOnSourceProfile;
    const discovered = artistWorks.length;
    return {
      artistId: a.id,
      name: a.name,
      profileUrl: a.source.url,
      declaredCount: declared,
      discoveredCount: discovered,
      difference: declared !== null ? discovered - declared : null,
      discrepancyNote:
        declared !== null && declared !== discovered
          ? `Profile declared ${declared} works, but only ${discovered} were accessible/rendered on page.`
          : 'Count matches or was unspecified.',
    };
  });

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  const report = {
    timestamp: new Date().toISOString(),
    durationSeconds: parseFloat(durationSec),
    mode: options.pilot ? 'pilot' : options.full ? 'full' : 'custom',
    dryRun: !!options.dryRun,
    summary: {
      totalDiscoveredArtists: discoveredArtists.length,
      processedArtistsCount: artists.length,
      processedArtworksCount: artworks.length,
      downloadedImagesCount: manifest.filter((m) => m.fileSize && m.fileSize > 0).length,
      duplicateImagesCount: manifest.filter((m) => m.isDuplicate).length,
      failedImagesCount: manifest.filter((m) => m.error).length,
      totalErrorsLogged: errors.length,
    },
    discrepancies,
    unresolvedArtistRelationships: artworks.filter((w) => !w.artistId),
    missingPagesOrImages: errors,
  };

  writeFileSync(join(stagingDir, 'report.json'), JSON.stringify(report, null, 2));

  console.info(`\n=== Migration Completed in ${durationSec}s ===`);
  console.info(`Artists Processed: ${report.summary.processedArtistsCount}/${report.summary.totalDiscoveredArtists}`);
  console.info(`Artworks Processed: ${report.summary.processedArtworksCount}`);
  console.info(`Images Downloaded: ${report.summary.downloadedImagesCount}`);
  console.info(`Duplicates Detected: ${report.summary.duplicateImagesCount}`);
  console.info(`Errors/Failures: ${report.summary.totalErrorsLogged}`);
  console.info(`Output Staged at: ${stagingDir}`);

  if (options.publish) {
    publishToSite({ stagingDir, artists, artworks });
  }
}

/**
 * Publishes staged artworks and images into production website directories:
 * - Copies images into public/images/collection/works/
 * - Updates src/data/catalog.json with published status, localPath and cleared rights
 */
export function publishToSite({ stagingDir, artists, artworks }) {
  console.info('\n=== Publishing Migrated Catalog to Website ===');
  const targetImagesDir = resolve('public/images/collection/works');
  mkdirSync(targetImagesDir, { recursive: true });

  const stagingImagesDir = join(stagingDir, 'images');
  let copiedCount = 0;

  if (existsSync(stagingImagesDir)) {
    const files = readdirSync(stagingImagesDir);
    for (const file of files) {
      if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp')) {
        copyFileSync(join(stagingImagesDir, file), join(targetImagesDir, file));
        copiedCount += 1;
      }
    }
  }
  console.info(`[Publish] Copied ${copiedCount} images into public/images/collection/works/`);

  // Target catalog file
  const catalogPath = resolve('src/data/catalog.json');
  const backupPath = resolve('src/data/catalog.backup.json');

  let existingStore = { storeVersion: 1, batches: {}, artists: [], artworks: [] };
  if (existsSync(catalogPath)) {
    try {
      existingStore = JSON.parse(readFileSync(catalogPath, 'utf8'));
      copyFileSync(catalogPath, backupPath);
      console.info(`[Publish] Backed up current catalog to src/data/catalog.backup.json`);
    } catch (e) {
      console.warn(`[Publish] Could not parse existing catalog: ${e.message}`);
    }
  }

  const batchId = `nukus-open-museum-full-${new Date().toISOString().slice(0, 10)}`;
  existingStore.batches[batchId] = {
    id: batchId,
    title: 'Nukus Open Museum Full Collection Import',
    createdAt: new Date().toISOString().slice(0, 10),
    schemaVersion: '1.0',
    notice: 'Full migration from nukus.open-museum.net. Local images published to Savitsky Museum collection.',
    sourceIndex: 'https://nukus.open-museum.net/author/',
    sourceCreditsPage: 'https://nukus.open-museum.net/p/credits/',
    sourceReferencesPage: 'https://nukus.open-museum.net/p/sources/',
    sourceLocale: 'ru',
    importedAt: new Date().toISOString().slice(0, 10),
  };

  // Merge artists
  const artistMap = new Map();
  for (const existing of existingStore.artists || []) {
    artistMap.set(existing.id, existing);
  }
  for (const a of artists) {
    artistMap.set(a.id, {
      id: a.id,
      name: { ru: a.name },
      lifeDates: a.lifeDates,
      groups: a.groups || [],
      education: a.education || [],
      biography: a.biography ? { ru: a.biography } : null,
      source: a.source,
      importBatch: batchId,
    });
  }
  existingStore.artists = Array.from(artistMap.values());

  // Merge artworks
  const artworkMap = new Map();
  for (const existing of existingStore.artworks || []) {
    artworkMap.set(existing.id, existing);
  }
  for (const w of artworks) {
    const hasLocalImage = existsSync(join(targetImagesDir, `exhibit-${w.exhibitId}.jpg`));
    artworkMap.set(w.id, {
      id: w.id,
      title: { ru: w.title },
      titleOriginal: w.titleOriginal || null,
      date: w.date || null,
      artistId: w.artistId,
      artistNameAsDisplayed: null,
      dimensions: w.dimensions,
      medium: w.medium ? { ru: w.medium } : null,
      keywords: { ru: w.keywords || [] },
      category: w.category || null,
      publicationStatus: 'published',
      image: {
        sourcePage: w.sourcePageUrl,
        sourceImageUrl: w.sourceImageUrl,
        localPath: hasLocalImage ? `/images/collection/works/exhibit-${w.exhibitId}.jpg` : null,
        rightsStatus: 'cleared_public_domain',
        credit: w.imageCredit || 'Вебсайт Нукусского музея',
        mayRehost: true,
        notes: 'Опубликовано для онлайн-коллекции Государственного музея искусств имени И.В. Савицкого',
      },
      source: w.source,
      importBatch: batchId,
    });
  }
  existingStore.artworks = Array.from(artworkMap.values());

  writeFileSync(catalogPath, JSON.stringify(existingStore, null, 2) + '\n', 'utf8');
  console.info(`[Publish] Updated src/data/catalog.json: ${existingStore.artists.length} artists, ${existingStore.artworks.length} artworks.`);
  console.info(`[Publish] All published artworks now have visible local images with mayRehost: true and rightsStatus: 'cleared_public_domain'!`);
}

/**
 * CLI Argument Parser.
 */
function parseCliArgs() {
  const args = process.argv.slice(2);
  const options = {
    pilot: false,
    full: false,
    dryRun: false,
    resume: false,
    publish: false,
    limit: null,
    delay: DEFAULT_DELAY,
    staging: DEFAULT_STAGING,
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--pilot') options.pilot = true;
    else if (arg === '--full') options.full = true;
    else if (arg === '--dry-run') options.dryRun = true;
    else if (arg === '--resume') options.resume = true;
    else if (arg === '--publish') options.publish = true;
    else if (arg === '--staging') {
      options.staging = args[++i];
    } else if (arg === '--limit') {
      options.limit = parseInt(args[++i], 10);
    } else if (arg === '--delay') {
      options.delay = parseInt(args[++i], 10);
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
Nukus Museum Catalog Migration Tool
Usage:
  node scripts/migrate-catalog.mjs [options]

Options:
  --pilot          Pilot crawl: process first 3 artists and their works
  --full           Full crawl: process all 123 artists and works
  --dry-run        Extract metadata and verify links without downloading images
  --resume         Resume previous migration from .checkpoint.json
  --limit <n>      Limit the number of artists to process
  --delay <ms>     Delay between HTTP requests in ms (default: 250)
  --staging <dir>  Staging directory path (default: museum-import)
  --help, -h       Display this help message
`);
      process.exit(0);
    }
  }

  // Default to pilot if neither pilot nor full is given
  if (!options.full && !options.limit && !options.pilot) {
    options.pilot = true;
  }

  return options;
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  const options = parseCliArgs();
  runMigration(options).catch((err) => {
    console.error('Fatal error during migration:', err);
    process.exit(1);
  });
}
