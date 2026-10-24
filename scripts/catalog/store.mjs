// Reading and writing the catalogue file. Writes are atomic and only ever add records.
import { existsSync, readFileSync, renameSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { emptyStore } from './model.mjs';

export function readStore(path) {
  if (!existsSync(path)) return emptyStore();
  const store = JSON.parse(readFileSync(path, 'utf8'));
  if (store.storeVersion !== 1 || !Array.isArray(store.artists) || !Array.isArray(store.artworks)) {
    throw new Error(
      `${path} is not a catalogue file (expected storeVersion 1 with artists and artworks).`
    );
  }
  store.batches ??= {};
  return store;
}

const byId = (a, b) => a.id.localeCompare(b.id);

/** Returns a new store with the planned additions; existing records are kept exactly as they are. */
export function applyPlan(store, plan, batch, importedAt) {
  return {
    storeVersion: 1,
    batches: { ...store.batches, [batch.id]: { ...batch, importedAt } },
    artists: [...store.artists, ...plan.artists.add].sort(byId),
    artworks: [...store.artworks, ...plan.artworks.add].sort(byId),
  };
}

/** Writes through a temporary file so a crash never leaves a half-written catalogue. */
export function writeStore(path, store) {
  mkdirSync(dirname(path), { recursive: true });
  const temporary = `${path}.tmp-${process.pid}`;
  writeFileSync(temporary, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
  renameSync(temporary, path);
}
