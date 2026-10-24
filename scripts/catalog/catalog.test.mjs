import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { isHttpsUrl, isIsoDate, validateDataset } from './validate.mjs';
import { diffRecords, isEditorialPath, normalizeText, planImport } from './plan.mjs';
import { readStore } from './store.mjs';
import { batchIdFor, parseArgs, runImport } from './import-catalog.mjs';
import { emptyStore } from './model.mjs';

const PILOT = fileURLToPath(
  new URL('../../data/catalog-sources/nukus_open_museum_pilot.json', import.meta.url)
);
const CLI = fileURLToPath(new URL('./import-catalog.mjs', import.meta.url));
const pilot = () => JSON.parse(readFileSync(PILOT, 'utf8'));
const THREE = [
  'artwork-istomin-pryahi',
  'artwork-volkov-woman-blue-shawl',
  'artwork-tarasov-hudozhniki',
];
const validate = (raw) => validateDataset(raw, { batchId: 'test-batch' });
const codes = (issues, level = 'error') =>
  issues.filter((i) => i.level === level).map((i) => i.code);

const tempDir = () => mkdtempSync(join(tmpdir(), 'catalog-test-'));
const writeJson = (dir, name, value) => {
  const path = join(dir, name);
  writeFileSync(path, JSON.stringify(value), 'utf8');
  return path;
};

test('the pilot file validates without errors and keeps attribution and rights', () => {
  const { issues, artists, artworks, batch } = validate(pilot());
  assert.deepEqual(codes(issues), []);
  assert.equal(artists.length, 3);
  assert.equal(artworks.length, 3);
  assert.equal(batch.sourceCreditsPage, 'https://nukus.open-museum.net/p/credits/');
  const shawl = artworks.find((a) => a.id === 'artwork-volkov-woman-blue-shawl');
  assert.equal(shawl.source.url, 'https://nukus.open-museum.net/exhibit/get/790/');
  assert.equal(shawl.image.rightsStatus, 'unverified');
  assert.equal(shawl.image.mayRehost, false);
  assert.equal(shawl.image.localPath, null);
  assert.match(shawl.image.credit, /2017/);
  assert.equal(shawl.publicationStatus, 'draft');
  assert.equal(shawl.category, null);
  assert.deepEqual(shawl.title, { ru: 'Женщина в синей шали на фоне окна' });
});

test('the pilot warnings name the real gaps', () => {
  const warnings = codes(validate(pilot()).issues, 'warning');
  assert.ok(warnings.includes('artwork.unlinked-artist'));
  assert.ok(warnings.includes('artwork.no-date'));
  assert.ok(warnings.includes('artwork.no-dimensions'));
  assert.ok(warnings.includes('artist.no-biography'));
});

test('limiting to three works brings only the artists they point at', () => {
  const plan = planImport(validate(pilot()), emptyStore(), { only: THREE });
  assert.deepEqual(plan.artworks.add.map((a) => a.id).sort(), [...THREE].sort());
  assert.deepEqual(plan.artists.add.map((a) => a.id).sort(), [
    'artist-alexander-volkov',
    'artist-konstantin-istomin',
  ]);
  assert.deepEqual(plan.problems, []);
});

test('an unknown id in --only is a problem', () => {
  const plan = planImport(validate(pilot()), emptyStore(), { only: ['artwork-missing'] });
  assert.equal(plan.problems[0].code, 'plan.only-unknown');
});

test('duplicate ids, broken links and missing authors are errors', () => {
  const raw = pilot();
  raw.artworks.push({
    ...raw.artworks[0],
    source: { url: 'https://example.org/a', accessedAt: '2026-10-24' },
  });
  raw.artworks[1].artistId = 'artist-nobody';
  raw.artworks[2].artistNameAsDisplayed = null;
  raw.artists.push({
    ...raw.artists[0],
    source: { url: 'https://example.org/b', accessedAt: '2026-10-24' },
  });
  const errors = codes(validate(raw).issues);
  assert.ok(errors.includes('artwork.id-duplicate'));
  assert.ok(errors.includes('artist.id-duplicate'));
  assert.ok(errors.includes('artwork.artist-missing'));
  assert.ok(errors.includes('artwork.no-artist'));
});

test('ids must be well formed and must not be shared between artists and works', () => {
  const raw = pilot();
  raw.artists[0].id = 'Artist Bad';
  raw.artworks[0].artistId = 'Artist Bad';
  raw.artworks[1].id = 'artist-alexander-volkov';
  delete raw.artworks[2].id;
  const errors = codes(validate(raw).issues);
  assert.ok(errors.includes('artist.id-format'));
  assert.ok(errors.includes('artwork.id-collides-with-artist'));
  assert.ok(errors.includes('artwork.id-missing'));
});

test('image rights rules block uncleared copies and inconsistent flags', () => {
  const raw = pilot();
  raw.artworks[0].image.localPath = '/images/collection/pryahi.jpg';
  raw.artworks[1].image.mayRehost = true;
  raw.artworks[2].image.rightsStatus = 'probably-fine';
  const errors = codes(validate(raw).issues);
  assert.ok(errors.includes('artwork.local-copy-not-cleared'));
  assert.ok(errors.includes('artwork.rights-inconsistent'));
  assert.ok(errors.includes('artwork.rights-status'));
});

test('a cleared, re-hostable image may have a local copy', () => {
  const raw = pilot();
  Object.assign(raw.artworks[0].image, {
    rightsStatus: 'cleared_public_domain',
    mayRehost: true,
    localPath: '/images/collection/pryahi.jpg',
  });
  assert.deepEqual(codes(validate(raw).issues), []);
});

test('image and source fields are checked', () => {
  const raw = pilot();
  delete raw.artworks[0].image;
  raw.artworks[1].image.sourceImageUrl = 'ftp://example.org/x.jpg';
  raw.artworks[1].image.mayRehost = 'no';
  raw.artworks[1].image.credit = '';
  raw.artworks[2].source = { url: 'http://insecure.example', accessedAt: 'yesterday' };
  raw.artists[0].source = null;
  const { issues } = validate(raw);
  const errors = codes(issues);
  assert.ok(errors.includes('artwork.image-missing'));
  assert.ok(errors.includes('artwork.image-url'));
  assert.ok(errors.includes('artwork.may-rehost'));
  assert.ok(errors.includes('artwork.source-url'));
  assert.ok(errors.includes('artwork.source-accessed'));
  assert.ok(errors.includes('artist.source-missing'));
  assert.ok(codes(issues, 'warning').includes('artwork.no-credit'));
});

test('two records pointing at the same source page are an error', () => {
  const raw = pilot();
  raw.artworks[1].source.url = raw.artworks[0].source.url;
  assert.ok(codes(validate(raw).issues).includes('artwork.source-duplicate'));
});

test('dates, dimensions, lists and names are checked', () => {
  const raw = pilot();
  raw.artists[0].lifeDates.birth = '1886-13-40';
  raw.artists[1].lifeDates = { birth: '1960-01-01', death: '1950-01-01' };
  raw.artists[2].name = '';
  raw.artists[2].groups = ['ok', 42];
  raw.artworks[0].dimensions.heightCm = -1;
  raw.artworks[1].dimensions = 'big';
  raw.artworks[2].title = '';
  const errors = codes(validate(raw).issues);
  assert.ok(errors.includes('artist.life-date'));
  assert.ok(errors.includes('artist.life-order'));
  assert.ok(errors.includes('artist.name'));
  assert.ok(errors.includes('artist.list'));
  assert.ok(errors.includes('artwork.dimension-value'));
  assert.ok(errors.includes('artwork.dimensions'));
  assert.ok(errors.includes('artwork.title'));
});

test('unknown fields are reported, not silently imported', () => {
  const raw = pilot();
  raw.artworks[0].inventoryNumber = 'КП-123';
  const { issues, artworks } = validate(raw);
  assert.ok(codes(issues, 'warning').includes('artwork.unknown-field'));
  assert.equal('inventoryNumber' in artworks[0], false);
});

test('a malformed file stops before reading records', () => {
  assert.deepEqual(codes(validate(null).issues), ['file.not-object']);
  assert.deepEqual(codes(validate({ schemaVersion: '9', artists: [], artworks: {} }).issues), [
    'file.schema-version',
    'file.artworks',
  ]);
  assert.deepEqual(
    codes(validate({ schemaVersion: '1.0', artists: [1], artworks: [null] }).issues),
    ['artist.not-object', 'artwork.not-object']
  );
  assert.ok(
    codes(validate({ schemaVersion: '1.0', artists: [], artworks: [] }).issues, 'warning').includes(
      'file.dataset'
    )
  );
});

test('existing records are never overwritten: identical is unchanged, different is a conflict', () => {
  const incoming = validate(pilot());
  const store = emptyStore();
  store.artists = incoming.artists.map((a) => ({ ...a, importBatch: 'older-batch' }));
  store.artworks = [{ ...incoming.artworks[0], title: { ru: 'Пряхи (старое название)' } }];
  const plan = planImport(incoming, store);
  assert.equal(plan.artists.unchanged.length, 3);
  assert.equal(plan.artists.add.length, 0);
  assert.deepEqual(plan.artworks.conflicts, [
    { id: 'artwork-istomin-pryahi', kind: 'artwork', fields: ['title.ru'], keptEdits: [] },
  ]);
  assert.equal(plan.artworks.add.length, 2);
});

test('editorial edits are kept and are not conflicts; source changes still are', () => {
  const incoming = validate(pilot());
  const store = emptyStore();
  store.artists = incoming.artists;
  store.artworks = incoming.artworks.map((artwork) => ({ ...artwork }));
  const pryahi = store.artworks.find((a) => a.id === 'artwork-istomin-pryahi');
  pryahi.category = 'avant-garde';
  pryahi.publicationStatus = 'published';
  pryahi.title = { ...pryahi.title, kk: 'Iyiriwshiler' };
  const shawl = store.artworks.find((a) => a.id === 'artwork-volkov-woman-blue-shawl');
  shawl.medium = { ru: 'картон, масло', en: 'Oil on cardboard' };

  const plan = planImport(incoming, store);
  const kept = plan.artworks.unchanged.find((entry) => entry.id === 'artwork-istomin-pryahi');
  assert.deepEqual(kept.keptEdits.sort(), ['category', 'publicationStatus', 'title.kk']);
  assert.deepEqual(plan.artworks.conflicts, [
    {
      id: 'artwork-volkov-woman-blue-shawl',
      kind: 'artwork',
      fields: ['medium.ru'],
      keptEdits: ['medium.en'],
    },
  ]);
  assert.equal(isEditorialPath('title.ru', { title: { ru: 'x' } }), false);
  assert.equal(isEditorialPath('date', {}), false);
});

test('the same work under a new id is reported as a duplicate', () => {
  const incoming = validate(pilot());
  const store = emptyStore();
  store.artists = incoming.artists;
  store.artworks = [
    { ...incoming.artworks[0], id: 'artwork-old-1' },
    { ...incoming.artworks[1], id: 'artwork-old-2', source: { url: 'https://example.org/other' } },
  ];
  const plan = planImport(incoming, store);
  const reasons = Object.fromEntries(plan.artworks.duplicates.map((d) => [d.id, d.reason]));
  assert.equal(reasons['artwork-istomin-pryahi'], 'same source page');
  assert.equal(reasons['artwork-volkov-woman-blue-shawl'], 'same name/title and date');
});

test('a work whose artist is skipped as a duplicate is blocked, not imported with a broken link', () => {
  const incoming = validate(pilot());
  const store = emptyStore();
  const volkov = incoming.artists.find((a) => a.id === 'artist-alexander-volkov');
  store.artists = [
    { ...volkov, id: 'artist-volkov-legacy', source: { url: 'https://example.org/volkov' } },
  ];
  const plan = planImport(incoming, store);
  assert.deepEqual(
    plan.artists.duplicates.map((d) => d.existingId),
    ['artist-volkov-legacy']
  );
  assert.deepEqual(
    plan.artworks.blocked.map((b) => b.id),
    ['artwork-volkov-woman-blue-shawl']
  );
});

test('dry run writes nothing; write needs --confirm; confirmed write adds drafts only once', () => {
  const dir = tempDir();
  const store = join(dir, 'catalog.json');
  const base = {
    input: PILOT,
    store,
    only: THREE,
    sourceLocale: 'ru',
    write: false,
    confirm: false,
  };

  const dry = runImport(base, { today: '2026-10-24' });
  assert.equal(dry.written, false);
  assert.equal(existsSync(store), false);
  assert.match(dry.report, /DRY RUN/);

  const unconfirmed = runImport({ ...base, write: true }, { today: '2026-10-24' });
  assert.equal(unconfirmed.written, false);
  assert.match(unconfirmed.refused, /--confirm/);
  assert.equal(existsSync(store), false);

  const confirmed = runImport({ ...base, write: true, confirm: true }, { today: '2026-10-24' });
  assert.equal(confirmed.written, true);
  const saved = readStore(store);
  assert.deepEqual(saved.artworks.map((a) => a.id).sort(), [...THREE].sort());
  assert.equal(saved.artists.length, 2);
  assert.ok(
    saved.artworks.every((a) => a.publicationStatus === 'draft' && a.image.mayRehost === false)
  );
  assert.equal(saved.batches['nukus-open-museum-pilot-2026-10-24'].importedAt, '2026-10-24');
  const before = readFileSync(store, 'utf8');

  const again = runImport({ ...base, write: true, confirm: true }, { today: '2026-10-25' });
  assert.equal(again.written, false);
  assert.match(again.refused, /nothing new/);
  assert.equal(again.plan.artworks.unchanged.length, 3);
  assert.equal(readFileSync(store, 'utf8'), before);
});

test('a write is refused when the file has errors or the selection is wrong', () => {
  const dir = tempDir();
  const raw = pilot();
  raw.artworks[0].artistId = 'artist-nobody';
  const input = writeJson(dir, 'broken.json', raw);
  const store = join(dir, 'catalog.json');
  const broken = runImport({
    input,
    store,
    only: [],
    sourceLocale: 'ru',
    write: true,
    confirm: true,
  });
  assert.equal(broken.ok, false);
  assert.match(broken.refused, /validation error/);
  assert.equal(existsSync(store), false);

  const wrongSelection = runImport({
    input: PILOT,
    store,
    only: ['artwork-nope'],
    sourceLocale: 'ru',
    write: true,
    confirm: true,
  });
  assert.match(wrongSelection.refused, /not in the file/);
  assert.equal(existsSync(store), false);
});

test('command-line options', () => {
  assert.throws(() => parseArgs([]), /--input/);
  assert.throws(() => parseArgs(['--input']), /needs a value/);
  assert.throws(() => parseArgs(['--input', 'a.json', '--force']), /Unknown option/);
  const options = parseArgs([
    '--input',
    'a.json',
    '--only',
    'x, y',
    '--write',
    '--confirm',
    '--store',
    's.json',
    '--batch',
    'b',
    '--source-locale',
    'en',
    '--report',
    'r.json',
  ]);
  assert.deepEqual(options, {
    input: 'a.json',
    only: ['x', 'y'],
    write: true,
    confirm: true,
    store: 's.json',
    batch: 'b',
    sourceLocale: 'en',
    report: 'r.json',
  });
  assert.equal(parseArgs(['--input', 'a.json']).store, 'src/data/catalog.json');
  assert.equal(batchIdFor('/x/Nukus Pilot.JSON', {}), 'nukus-pilot-undated');
});

test('a file that is not a catalogue is rejected', () => {
  const dir = tempDir();
  assert.throws(() => readStore(writeJson(dir, 'bad.json', { hello: 1 })), /not a catalogue/);
});

test('helpers', () => {
  assert.equal(isIsoDate('2024-02-29'), true);
  assert.equal(isIsoDate('2023-02-29'), false);
  assert.equal(isIsoDate(20240101), false);
  assert.equal(isHttpsUrl('https://a.b/c'), true);
  assert.equal(isHttpsUrl('not a url'), false);
  assert.equal(isHttpsUrl(null), false);
  assert.equal(normalizeText('  «Пряхи»,  Ёлка — 1923 '), 'пряхи елка 1923');
  assert.deepEqual(diffRecords({ a: 1, b: { c: [1] } }, { a: 1, b: { c: [2] }, d: 3 }), [
    'b.c',
    'd',
  ]);
});

test('the command prints a dry-run report, saves a JSON report and exits non-zero on bad input', () => {
  const dir = tempDir();
  const store = join(dir, 'catalog.json');
  const reportPath = join(dir, 'report.json');
  const output = execFileSync(
    process.execPath,
    [CLI, '--input', PILOT, '--store', store, '--report', reportPath],
    { encoding: 'utf8' }
  );
  assert.match(output, /DRY RUN/);
  assert.equal(existsSync(store), false);
  assert.equal(JSON.parse(readFileSync(reportPath, 'utf8')).written, false);

  assert.throws(
    () => execFileSync(process.execPath, [CLI], { stdio: 'pipe' }),
    (error) => error.status === 2
  );
  const raw = pilot();
  raw.artworks[0].artistId = 'artist-nobody';
  const broken = writeJson(dir, 'broken.json', raw);
  assert.throws(
    () =>
      execFileSync(process.execPath, [CLI, '--input', broken, '--store', store], { stdio: 'pipe' }),
    (error) => error.status === 1
  );
});
