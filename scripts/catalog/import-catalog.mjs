#!/usr/bin/env node
// Catalogue importer.
//
//   node scripts/catalog/import-catalog.mjs --input <file.json> [--only id,id] [--store <catalog.json>]
//
// Dry run by default: it validates, compares with the catalogue and prints what would change.
// Writing needs both --write and --confirm, adds new records as drafts, and never overwrites.
// It makes no network requests and never downloads images.
import { readFileSync, writeFileSync } from 'node:fs';
import { basename, extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { validateDataset } from './validate.mjs';
import { planImport } from './plan.mjs';
import { applyPlan, readStore, writeStore } from './store.mjs';
import { formatReport } from './report.mjs';

export const DEFAULT_STORE = 'src/data/catalog.json';

export function parseArgs(argv) {
  const options = {
    write: false,
    confirm: false,
    store: DEFAULT_STORE,
    only: [],
    sourceLocale: 'ru',
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const value = () => {
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) throw new Error(`${arg} needs a value.`);
      i += 1;
      return next;
    };
    if (arg === '--input') options.input = value();
    else if (arg === '--store') options.store = value();
    else if (arg === '--only')
      options.only = value()
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean);
    else if (arg === '--batch') options.batch = value();
    else if (arg === '--source-locale') options.sourceLocale = value();
    else if (arg === '--report') options.report = value();
    else if (arg === '--write') options.write = true;
    else if (arg === '--confirm') options.confirm = true;
    else throw new Error(`Unknown option ${arg}.`);
  }
  if (!options.input) throw new Error('--input <file.json> is required.');
  return options;
}

/** Batch id from the file name and the dataset date, e.g. "nukus-open-museum-pilot-2026-10-24". */
export function batchIdFor(input, raw) {
  const name = basename(input, extname(input))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const date = typeof raw?.dataset?.createdAt === 'string' ? raw.dataset.createdAt : 'undated';
  return `${name}-${date}`;
}

/**
 * Runs an import and returns the outcome; prints nothing itself.
 * @param {ReturnType<typeof parseArgs>} options
 * @param {{ today?: string }} [env]
 */
export function runImport(options, { today = new Date().toISOString().slice(0, 10) } = {}) {
  const raw = JSON.parse(readFileSync(options.input, 'utf8'));
  const batchId = options.batch ?? batchIdFor(options.input, raw);
  const { issues, artists, artworks, batch } = validateDataset(raw, {
    sourceLocale: options.sourceLocale,
    batchId,
  });
  const store = readStore(options.store);
  const plan = planImport({ artists, artworks }, store, { only: options.only });

  const errors = issues.filter((issue) => issue.level === 'error');
  const mode = options.write ? 'write' : 'dry-run';
  let written = false;
  let refused = null;

  if (options.write) {
    const additions = plan.artists.add.length + plan.artworks.add.length;
    if (!options.confirm) refused = '--write also needs --confirm.';
    else if (errors.length) refused = `the file has ${errors.length} validation error(s).`;
    else if (plan.problems.length)
      refused = plan.problems.map((problem) => problem.message).join(' ');
    else if (additions === 0) refused = 'there is nothing new to add.';
    else {
      writeStore(options.store, applyPlan(store, plan, batch, today));
      written = true;
    }
  }

  const report = formatReport({
    mode,
    input: options.input,
    storePath: options.store,
    issues,
    plan,
    written,
  });
  return {
    ok: errors.length === 0 && plan.problems.length === 0 && refused === null,
    written,
    refused,
    issues,
    plan,
    report: refused ? `${report}\nWrite refused: ${refused}` : report,
  };
}

function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (problem) {
    console.error(problem.message);
    process.exitCode = 2;
    return;
  }
  const result = runImport(options);
  console.info(result.report);
  if (options.report) {
    const summary = {
      written: result.written,
      refused: result.refused,
      issues: result.issues,
      plan: result.plan,
    };
    writeFileSync(options.report, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
  }
  if (!result.ok) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
