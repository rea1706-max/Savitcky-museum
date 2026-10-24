#!/usr/bin/env node
// Assigns a collection section to works that have none.
//
//   node scripts/catalog/sections.mjs [--store src/data/catalog.json] [--write]
//
// Dry run by default. Only empty sections are filled; a section set by hand is never changed.
// The rules are deliberately simple so a curator can read and correct them:
//   1. Karakalpakstan and Khorezm — the founder's own works, and any work whose title or
//      keywords name a place or people of the region.
//   2. Central Asia — artists of the Turkestan circle (Volkov's school, "Masters of the New East",
//      the Turkestan art school) and any work with a Central Asian subject.
//   3. Everything else — the avant-garde.
import { readFileSync, writeFileSync, renameSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const KARAKALPAK =
  /каракалпак|нукус|хорезм|хив[аеыу]|муйнак|арал|кой-крылган|калалы-гыр|кызыл-гыр|ангка-кала|кават-кала|топрак-кала|казах-дарья|уйджай|кыз-кеткен|устюрт|амударь/i;

const CENTRAL_ASIA =
  /узбек|ташкент|самарканд|бухар|ферган|карши|туркестан|туркмен|ашхабад|казах|киргиз|таджик|чайхан|тюбетей|паранджа|арба|хлоп|кишлак|медресе|дувал|чапан|юрт|кочевник/i;

const CENTRAL_ASIAN_GROUPS = /мастера нового востока|бригада волкова/i;
const CENTRAL_ASIAN_SCHOOLS = /туркестанская краевая|ударная школа искусств востока/i;

/** Artists who worked in Uzbekistan and Central Asia, by their name in the catalogue. */
const CENTRAL_ASIAN_ARTISTS = [
  'Волков',
  'Николаев (Усто Мумин)',
  'Тансыкбаев',
  'Карахан',
  'Уфимцев',
  'Курзин',
  'Коровай',
  'Маркова',
  'Мазель',
  'Кашина',
  'Еремян',
  'Татевосян',
  'Ковалевская',
  'Беньков',
  'Новиков',
  'Подковыров',
  'Исупов',
  'Владимир Рождественский',
];

const FOUNDER = 'Игорь Савицкий';

const clean = (value) =>
  String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * @returns {{ section: string, reason: string }}
 */
export function suggestSection(artwork, artist) {
  const name = clean(artist?.name?.ru ?? artwork.artistNameAsDisplayed);
  const subject = clean(
    `${Object.values(artwork.title ?? {}).join(' ')} ${Object.values(artwork.keywords ?? {})
      .flat()
      .join(' ')}`
  );

  if (name === FOUNDER) return { section: 'karakalpak-arts', reason: 'founder' };
  if (KARAKALPAK.test(subject)) return { section: 'karakalpak-arts', reason: 'subject' };

  const circle =
    CENTRAL_ASIAN_ARTISTS.some((artistName) => name.includes(artistName)) ||
    (artist?.groups ?? []).some((group) => CENTRAL_ASIAN_GROUPS.test(group)) ||
    (artist?.education ?? []).some((school) => CENTRAL_ASIAN_SCHOOLS.test(school));
  if (circle) return { section: 'uzbek-art', reason: 'artist' };
  if (CENTRAL_ASIA.test(subject)) return { section: 'uzbek-art', reason: 'subject' };

  return { section: 'avant-garde', reason: 'default' };
}

/** Fills empty sections only. Returns the counts and the changed ids. */
export function assignSections(store) {
  const artists = new Map(store.artists.map((artist) => [artist.id, artist]));
  const counts = {};
  const changed = [];
  for (const artwork of store.artworks) {
    if (artwork.category) continue;
    const { section, reason } = suggestSection(artwork, artists.get(artwork.artistId));
    artwork.category = section;
    changed.push(artwork.id);
    counts[`${section} (${reason})`] = (counts[`${section} (${reason})`] ?? 0) + 1;
  }
  return { counts, changed };
}

function main() {
  const args = process.argv.slice(2);
  const storeIndex = args.indexOf('--store');
  const path = storeIndex >= 0 ? args[storeIndex + 1] : 'src/data/catalog.json';
  const store = JSON.parse(readFileSync(path, 'utf8'));
  const { counts, changed } = assignSections(store);
  console.info(`${changed.length} work(s) without a section.`);
  for (const [key, value] of Object.entries(counts).sort()) console.info(`  ${key}: ${value}`);
  if (args.includes('--write') && changed.length) {
    const temporary = `${path}.tmp-${process.pid}`;
    writeFileSync(temporary, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
    renameSync(temporary, path);
    console.info('Written.');
  } else {
    console.info('Dry run: nothing written.');
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
