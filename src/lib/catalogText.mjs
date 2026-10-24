// Translates the catalogue's recurring vocabulary — technique, dates and dimensions —
// from the Russian source into the visitor's language. Anything not covered here
// stays in Russian, so a visitor never sees a guessed translation.

/** Technique terms, ru → { en, uz, kk }. Combinations like "бумага, тушь, перо" are built from these. */
const MEDIUM_TERMS = {
  холст: { en: 'canvas', uz: 'xolst', kk: 'xolst' },
  масло: { en: 'oil', uz: 'moy boʻyoq', kk: 'may boyaw' },
  бумага: { en: 'paper', uz: 'qogʻoz', kk: 'qaǵaz' },
  картон: { en: 'cardboard', uz: 'karton', kk: 'karton' },
  фанера: { en: 'plywood', uz: 'fanera', kk: 'fanera' },
  дерево: { en: 'wood', uz: 'yogʻoch', kk: 'aǵash' },
  карандаш: { en: 'pencil', uz: 'qalam', kk: 'qálem' },
  'цветные карандаши': { en: 'coloured pencils', uz: 'rangli qalamlar', kk: 'reńli qálemler' },
  акварель: { en: 'watercolour', uz: 'akvarel', kk: 'akvarel' },
  гуашь: { en: 'gouache', uz: 'guash', kk: 'guash' },
  темпера: { en: 'tempera', uz: 'tempera', kk: 'tempera' },
  пастель: { en: 'pastel', uz: 'pastel', kk: 'pastel' },
  уголь: { en: 'charcoal', uz: 'koʻmir', kk: 'kómir' },
  сангина: { en: 'sanguine', uz: 'sangina', kk: 'sangina' },
  сепия: { en: 'sepia', uz: 'sepiya', kk: 'sepiya' },
  соус: { en: 'sauce crayon', uz: 'sous', kk: 'sous' },
  тушь: { en: 'Indian ink', uz: 'tush', kk: 'tush' },
  чернила: { en: 'ink', uz: 'siyoh', kk: 'siya' },
  перо: { en: 'pen', uz: 'pero', kk: 'pero' },
  кисть: { en: 'brush', uz: 'moʻyqalam', kk: 'qılqálem' },
  'сухая кисть': { en: 'dry brush', uz: 'quruq moʻyqalam', kk: 'qurǵaq qılqálem' },
  белила: { en: 'white', uz: 'oq boʻyoq', kk: 'aq boyaw' },
  мелки: { en: 'crayons', uz: 'rangli boʻr', kk: 'reńli bor' },
  'клеевая краска': { en: 'distemper', uz: 'yelimli boʻyoq', kk: 'jelimli boyaw' },
  'серебряная краска': { en: 'silver paint', uz: 'kumush boʻyoq', kk: 'gúmis boyaw' },
  лак: { en: 'varnish', uz: 'lak', kk: 'lak' },
  бронза: { en: 'bronze', uz: 'bronza', kk: 'bronza' },
  энкаустика: { en: 'encaustic', uz: 'enkaustika', kk: 'enkaustika' },
  автотрафарет: { en: 'stencil', uz: 'trafaret', kk: 'trafaret' },
  газета: { en: 'newspaper', uz: 'gazeta', kk: 'gazeta' },
  ткань: { en: 'fabric', uz: 'mato', kk: 'gezleme' },
  кошма: { en: 'felt', uz: 'kigiz', kk: 'kiyiz' },
  литография: { en: 'lithograph', uz: 'litografiya', kk: 'litografiya' },
  линогравюра: { en: 'linocut', uz: 'linogravyura', kk: 'linogravyura' },
  офорт: { en: 'etching', uz: 'ofort', kk: 'ofort' },
  монотипия: { en: 'monotype', uz: 'monotipiya', kk: 'monotipiya' },
};

const lang = (locale) => String(locale).toLowerCase();

/**
 * @param {string | null | undefined} ru  Technique as written in the source, e.g. "холст, масло".
 * @param {string} locale                 EN, RU, UZ or KK.
 * @returns {{ text: string, lang: string } | null}
 */
export function translateMedium(ru, locale) {
  if (!ru) return null;
  const target = lang(locale);
  if (target === 'ru') return { text: ru, lang: 'ru' };
  const terms = ru.split(',').map((term) => term.trim().toLowerCase());
  const translated = terms.map((term) => MEDIUM_TERMS[term]?.[target]);
  // One unknown term keeps the whole line in Russian rather than half-translated.
  if (translated.some((term) => !term)) return { text: ru, lang: 'ru' };
  return { text: translated.join(', '), lang: target };
}

const DECADE_PARTS = {
  начало: { en: 'early {d}s', uz: '{d}-yillar boshi', kk: '{d}-jıllardıń bası' },
  середина: { en: 'mid-{d}s', uz: '{d}-yillar oʻrtasi', kk: '{d}-jıllardıń ortası' },
  конец: { en: 'late {d}s', uz: '{d}-yillar oxiri', kk: '{d}-jıllardıń aqırı' },
};
const DECADE = { en: '{d}s', uz: '{d}-yillar', kk: '{d}-jıllar' };

/** "1920-е", "Начало 1930-х", "1919-1921" in the visitor's language. */
export function translateDate(date, locale) {
  if (!date) return null;
  const target = lang(locale);
  const value = date.trim();
  const range = value.match(/^(\d{4})\s*-\s*(\d{4})$/);
  if (range) return `${range[1]}–${range[2]}`;
  if (target === 'ru') return value;
  const decade = value.match(/^(\d{4})-е$/);
  if (decade) return DECADE[target].replace('{d}', decade[1]);
  const part = value.match(/^(Начало|Середина|Конец)\s+(\d{4})-х$/i);
  if (part) return DECADE_PARTS[part[1].toLowerCase()][target].replace('{d}', part[2]);
  return value;
}

const UNIT = { ru: 'см', en: 'cm', uz: 'sm', kk: 'sm' };

/** "106,2 × 126,7 см" / "106.2 × 126.7 cm", from the numbers rather than the Russian text. */
export function formatDimensions(dimensions, locale) {
  if (!dimensions) return null;
  const target = lang(locale);
  const { heightCm, widthCm, display } = dimensions;
  if (typeof heightCm !== 'number' || typeof widthCm !== 'number') return display ?? null;
  const number = (value) => (target === 'en' ? String(value) : String(value).replace('.', ','));
  return `${number(heightCm)} × ${number(widthCm)} ${UNIT[target] ?? 'cm'}`;
}
