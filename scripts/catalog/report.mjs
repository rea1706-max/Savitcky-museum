// Human-readable import report.

const line = (items, render) =>
  items.length ? items.map((item) => `    - ${render(item)}`).join('\n') : '    (none)';

export function formatReport({ mode, input, storePath, issues, plan, written }) {
  const errors = issues.filter((issue) => issue.level === 'error');
  const warnings = issues.filter((issue) => issue.level === 'warning');
  const counts = (part) =>
    `add ${part.add.length}, unchanged ${part.unchanged.length}, conflicts ${part.conflicts.length}, duplicates ${part.duplicates.length}` +
    (part.blocked ? `, blocked ${part.blocked.length}` : '');

  return [
    `Catalogue import — ${mode === 'write' ? 'WRITE' : 'DRY RUN (nothing written)'}`,
    `  source: ${input}`,
    `  catalogue: ${storePath}`,
    '',
    `Validation: ${errors.length} error(s), ${warnings.length} warning(s)`,
    '  Errors:',
    line(errors, (issue) => `[${issue.code}] ${issue.path}: ${issue.message}`),
    '  Warnings:',
    line(warnings, (issue) => `[${issue.code}] ${issue.path}: ${issue.message}`),
    '',
    'Plan:',
    ...plan.problems.map((problem) => `  ! ${problem.message}`),
    `  Artists:  ${counts(plan.artists)}`,
    line(plan.artists.add, (artist) => `add ${artist.id}`),
    `  Artworks: ${counts(plan.artworks)}`,
    line(
      plan.artworks.add,
      (artwork) =>
        `add ${artwork.id} (image: ${artwork.image?.rightsStatus}, shown: ${artwork.image?.mayRehost ? 'yes' : 'no'})`
    ),
    '  Conflicts (existing records are never overwritten):',
    line(
      [...plan.artists.conflicts, ...plan.artworks.conflicts],
      (c) => `${c.kind} ${c.id}: differs in ${c.fields.join(', ')}`
    ),
    '  Kept editorial edits (category, publication, translations — left as they are):',
    line(
      [
        ...plan.artists.unchanged,
        ...plan.artworks.unchanged,
        ...plan.artists.conflicts,
        ...plan.artworks.conflicts,
      ].filter((entry) => entry.keptEdits?.length),
      (entry) => `${entry.id}: ${entry.keptEdits.join(', ')}`
    ),
    '  Duplicates (skipped):',
    line(
      [...plan.artists.duplicates, ...plan.artworks.duplicates],
      (d) => `${d.kind} ${d.id} looks like existing ${d.existingId} (${d.reason})`
    ),
    '  Blocked (skipped):',
    line(plan.artworks.blocked, (b) => `${b.id}: ${b.reason}`),
    '',
    written
      ? `Written: ${plan.artists.add.length} artist(s), ${plan.artworks.add.length} artwork(s) added as drafts.`
      : 'Nothing was written.',
  ].join('\n');
}
