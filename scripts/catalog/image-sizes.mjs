#!/usr/bin/env node
// Records the pixel size of each local catalogue image, so the gallery can show
// every work in its real proportions without cropping and without layout jumps.
//
//   node scripts/catalog/image-sizes.mjs [--store src/data/catalog.json] [--public public] [--write]
import { readFileSync, writeFileSync, renameSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

/** Width and height from a JPEG's frame header, or null if it is not a readable JPEG. */
export function jpegSize(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) return null;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    // SOF0–SOF15 carry the frame size, except DHT (C4), JPG (C8) and DAC (CC).
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  return null;
}

export function addImageSizes(store, publicDir) {
  const problems = [];
  let updated = 0;
  for (const artwork of store.artworks) {
    const path = artwork.image?.localPath;
    if (!path) continue;
    const file = join(publicDir, path);
    if (!existsSync(file)) {
      problems.push(`${artwork.id}: ${path} is missing.`);
      continue;
    }
    const size = jpegSize(readFileSync(file));
    if (!size) {
      problems.push(`${artwork.id}: ${path} is not a readable JPEG.`);
      continue;
    }
    if (artwork.image.width !== size.width || artwork.image.height !== size.height) {
      artwork.image.width = size.width;
      artwork.image.height = size.height;
      updated += 1;
    }
  }
  return { updated, problems };
}

function main() {
  const args = process.argv.slice(2);
  const option = (name, fallback) =>
    args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
  const path = option('--store', 'src/data/catalog.json');
  const store = JSON.parse(readFileSync(path, 'utf8'));
  const { updated, problems } = addImageSizes(store, option('--public', 'public'));
  problems.forEach((problem) => console.error(problem));
  console.info(`${updated} image size(s) to record.`);
  if (args.includes('--write') && updated) {
    const temporary = `${path}.tmp-${process.pid}`;
    writeFileSync(temporary, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
    renameSync(temporary, path);
    console.info('Written.');
  }
  if (problems.length) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
