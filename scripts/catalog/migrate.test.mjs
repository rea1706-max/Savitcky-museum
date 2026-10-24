import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  slugify,
  parseLifeDates,
  parseDimensions,
  validateImageSignature,
  decodeHtmlEntities,
  cleanHtmlContent,
} from '../migrate-catalog.mjs';

describe('Catalog Migration Utilities', () => {
  it('slugify converts Cyrillic names to stable Latin slugs', () => {
    assert.equal(slugify('Алексей Бабичев'), 'aleksey-babichev');
    assert.equal(slugify('Александр Волков'), 'aleksandr-volkov');
    assert.equal(slugify('Александр Николаев (Усто Мумин)'), 'aleksandr-nikolaev-usto-mumin');
    assert.equal(slugify('   '), 'untitled');
  });

  it('parseLifeDates extracts full calendar dates or preserves display strings', () => {
    const full = parseLifeDates('30.08.1897 - 27.06.1957');
    assert.deepEqual(full, {
      birth: '1897-08-30',
      death: '1957-06-27',
      display: '30.08.1897 – 27.06.1957',
    });

    const yearsOnly = parseLifeDates('1905 - 1980');
    assert.deepEqual(yearsOnly, {
      birth: null,
      death: null,
      display: '1905 – 1980',
    });

    assert.deepEqual(parseLifeDates(null), {
      birth: null,
      death: null,
      display: null,
    });
  });

  it('parseDimensions correctly parses width, height and decimal values', () => {
    const d1 = parseDimensions('85.2см x 69.2см');
    assert.equal(d1.heightCm, 85.2);
    assert.equal(d1.widthCm, 69.2);
    assert.equal(d1.display, '85.2 × 69.2 см');

    const d2 = parseDimensions('90см x 75см');
    assert.equal(d2.heightCm, 90);
    assert.equal(d2.widthCm, 75);
    assert.equal(d2.display, '90 × 75 см');

    const d3 = parseDimensions('69,5 × 61,5 см');
    assert.equal(d3.heightCm, 69.5);
    assert.equal(d3.widthCm, 61.5);

    assert.equal(parseDimensions(null), null);
  });

  it('validateImageSignature recognizes real image formats and rejects HTML/empty data', () => {
    const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0]);
    assert.deepEqual(validateImageSignature(jpeg), { valid: true, format: 'jpeg' });

    const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a]);
    assert.deepEqual(validateImageSignature(png), { valid: true, format: 'png' });

    const html = Buffer.from('<!doctype html><html><body>Error</body></html>');
    assert.deepEqual(validateImageSignature(html), { valid: false, format: null });

    assert.deepEqual(validateImageSignature(Buffer.from([])), { valid: false, format: null });
  });

  it('decodeHtmlEntities decodes special entities and French/German accents', () => {
    assert.equal(decodeHtmlEntities('&laquo;Венок&raquo;'), '«Венок»');
    assert.equal(decodeHtmlEntities('Вхутемас &ndash; Вхутеин'), 'Вхутемас – Вхутеин');
    assert.equal(decodeHtmlEntities('Mus&eacute;e'), 'Musée');
    assert.equal(decodeHtmlEntities(''), '');
  });

  it('cleanHtmlContent strips inline scripts, style tags and comments', () => {
    const dirty = '<div>Content<script>alert(1);</script><!-- comment --></div>';
    assert.equal(cleanHtmlContent(dirty), '<div>Content</div>');
  });
});
