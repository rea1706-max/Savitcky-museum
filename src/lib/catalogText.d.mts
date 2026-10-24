export function translateMedium(
  ru: string | null | undefined,
  locale: string
): { text: string; lang: string } | null;

export function translateDate(date: string | null | undefined, locale: string): string | null;

export function formatDimensions(
  dimensions: { heightCm: number | null; widthCm: number | null; display: string | null } | null,
  locale: string
): string | null;
