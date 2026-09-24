export type Exhibition = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string | null;
  publicationStatus: 'draft' | 'published';
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  imageCredit?: string;
  sourceUrl?: string;
  shortDescription: string;
  fullDescription: string;
  location?: string;
  address?: string;
  admissionInfo?: string;
  featuredOnHomepage: boolean;
};

export type HomepageExhibitionSettings = {
  mode: 'auto' | 'force-show' | 'force-hide';
  selectedExhibitionId: string | null;
  includeUpcoming: boolean;
};

// Verified historical exhibitions. Sources remain available on every archive record.
// Event dates are distinct from announcement dates; unknown practical details are omitted.
export const exhibitions: Exhibition[] = [
  {
    id: 'ex1',
    slug: 'form-and-symbol',
    title: 'Form and Symbol',
    subtitle: 'Uzbekistan: Avant-Garde in the Desert',
    startDate: '2024-04-17',
    endDate: '2024-09-29',
    publicationStatus: 'published',
    image: '/images/exhibitions/popova-composition.png',
    imageWidth: 1124,
    imageHeight: 1402,
    imageAlt:
      'Lyubov Popova, Composition: intersecting angular forms in earth, burgundy, green and charcoal.',
    imageCredit: 'Lyubov Popova · Composition, 1921 · Visual reference',
    shortDescription:
      'A meeting of avant-garde experiment and the artistic traditions of Central Asia.',
    fullDescription:
      'The Venice chapter of Uzbekistan: Avant-Garde in the Desert brought together works from the Savitsky Museum in Nukus and the State Museum of Arts of Uzbekistan. Painting and applied arts traced exchanges between European avant-garde ideas and Central Asian visual traditions. The Popova composition shown here is an editorial visual reference, not a confirmed exhibit.',
    location: 'Ca’ Foscari Esposizioni · Venice, Italy',
    sourceUrl:
      'https://www.unive.it/pag/fileadmin/user_upload/centri/csar/img/didattica/GB_libretto_didattica_uzbekistan.pdf',
    featuredOnHomepage: true,
  },
  {
    id: 'ex2',
    slug: 'light-and-colour',
    title: 'Light and Colour',
    subtitle: 'Uzbekistan: Avant-Garde in the Desert',
    startDate: '2024-04-16',
    endDate: '2024-06-30',
    publicationStatus: 'published',
    image: '/images/exhibitions/light-and-colour.jpg',
    imageWidth: 2048,
    imageHeight: 1365,
    imageAlt:
      'Paintings of Central Asian architecture and daily life displayed against a teal gallery wall at Palazzo Pitti.',
    imageCredit: 'Exhibition view · Uffizi Galleries',
    shortDescription:
      'Central Asian light and colour through the collections of Nukus and Tashkent.',
    fullDescription:
      'At Palazzo Pitti, paintings and textiles from the collections of Nukus and Tashkent explored an avant-garde shaped by Central Asia. This Florence chapter of the two-city exhibition focused on the region’s light, colour and artistic encounters in the early twentieth century.',
    location: 'Palazzo Pitti, Andito degli Angiolini · Florence, Italy',
    sourceUrl: 'https://www.uffizi.it/en/events/uzbekistan-l-avanguardia-nel-deserto',
    featuredOnHomepage: false,
  },
  {
    id: 'ex3',
    slug: 'light-between-worlds',
    title: 'Light Between Worlds',
    subtitle: 'Two collections, a shared modernism',
    startDate: '2025-05-30',
    endDate: '2025-11-08',
    publicationStatus: 'published',
    image: '/images/exhibitions/light-between-worlds.png',
    imageWidth: 1200,
    imageHeight: 675,
    imageAlt:
      'Three figures beside an ochre building, the artwork used in the official Light Between Worlds announcement.',
    imageCredit: 'Exhibition announcement · New Jerusalem Museum',
    shortDescription: 'Modernism of the 1920s and 1930s through two museum collections.',
    fullDescription:
      'More than 160 paintings and works on paper by 40 artists brought the Savitsky Museum collection into conversation with the New Jerusalem Museum. Works by Alexander Volkov, Solomon Nikritin, Alexander Shevchenko and Kliment Redko examined the varied artistic experiments of the 1920s and 1930s.',
    location: 'New Jerusalem Museum · Istra, Russia',
    sourceUrl: 'https://njerusalem.ru/vystavki-i-ekspozicii/arhiv-vystavok/svet-mezhdu-mirami3576/',
    featuredOnHomepage: false,
  },
  {
    id: 'ex4',
    slug: 'treasures-of-nukus',
    title: 'Treasures of Nukus',
    subtitle: 'From the collection of the Savitsky Museum',
    startDate: '2017-04-06',
    endDate: '2017-05-30',
    publicationStatus: 'published',
    image: '',
    imageAlt: '',
    shortDescription: 'The collection of Nukus presented at the Pushkin Museum in Moscow.',
    fullDescription:
      'Around 200 paintings and works on paper were shown alongside archaeological objects and Karakalpak decorative arts. The exhibition occupied the Pushkin Museum’s main building and Department of Private Collections, bringing different strands of the Savitsky collection together. Originally scheduled to close on 10 May, it was extended until 30 May 2017.',
    location: 'Pushkin State Museum of Fine Arts · Moscow, Russia',
    sourceUrl:
      'https://olk.pushkinmuseum.art/news/2017/05/vistavka_sokrovischa_nukusa_prodlena.php',
    featuredOnHomepage: false,
  },
];

// An explicitly selected archival feature keeps the approved Popova composition visible.
// No unverified current or upcoming programme is implied.
export const homepageExhibitionSettings: HomepageExhibitionSettings = {
  mode: 'force-show',
  selectedExhibitionId: 'ex1',
  includeUpcoming: true,
};

export function museumToday(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tashkent',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

export function exhibitionStatus(exhibition: Exhibition, today: string) {
  if (today < exhibition.startDate) return 'upcoming';
  if (exhibition.endDate && today > exhibition.endDate) return 'past';
  return 'current';
}

export function featuredExhibition(
  records: Exhibition[],
  settings: HomepageExhibitionSettings,
  today: string
) {
  if (settings.mode === 'force-hide') return null;
  const published = records.filter((exhibition) => exhibition.publicationStatus === 'published');
  if (settings.mode === 'force-show') {
    return published.find((exhibition) => exhibition.id === settings.selectedExhibitionId) ?? null;
  }
  const current = published.filter(
    (exhibition) => exhibitionStatus(exhibition, today) === 'current'
  );
  const preferred =
    current.find((exhibition) => exhibition.id === settings.selectedExhibitionId) ??
    current.find((exhibition) => exhibition.featuredOnHomepage);
  if (preferred) return preferred;
  if (current.length) return [...current].sort((a, b) => b.startDate.localeCompare(a.startDate))[0];
  if (!settings.includeUpcoming) return null;
  return (
    published
      .filter((exhibition) => exhibitionStatus(exhibition, today) === 'upcoming')
      .sort((a, b) => a.startDate.localeCompare(b.startDate))[0] ?? null
  );
}

export function exhibitionDates(exhibition: Exhibition, compact = false, locale = 'EN') {
  const months: Record<string, { short: string[]; long: string[]; separator: string }> = {
    EN: {
      short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      long: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      separator: ' ',
    },
    RU: {
      short: [
        'янв.',
        'февр.',
        'мар.',
        'апр.',
        'мая',
        'июня',
        'июля',
        'авг.',
        'сент.',
        'окт.',
        'нояб.',
        'дек.',
      ],
      long: [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
      ],
      separator: ' ',
    },
    UZ: {
      short: ['yan', 'fev', 'mar', 'apr', 'may', 'iyun', 'iyul', 'avg', 'sen', 'okt', 'noy', 'dek'],
      long: [
        'yanvar',
        'fevral',
        'mart',
        'aprel',
        'may',
        'iyun',
        'iyul',
        'avgust',
        'sentabr',
        'oktabr',
        'noyabr',
        'dekabr',
      ],
      separator: '-',
    },
    KK: {
      short: ['yan', 'fev', 'mar', 'apr', 'may', 'iyun', 'iyul', 'avg', 'sen', 'okt', 'noy', 'dek'],
      long: [
        'yanvar',
        'fevral',
        'mart',
        'aprel',
        'may',
        'iyun',
        'iyul',
        'avgust',
        'sentyabr',
        'oktyabr',
        'noyabr',
        'dekabr',
      ],
      separator: '-',
    },
  };
  const monthSet = months[locale] ?? months.EN;
  const format = (date: string, year: boolean) => {
    const [dateYear, dateMonth, dateDay] = date.split('-');
    const month = (compact ? monthSet.short : monthSet.long)[Number(dateMonth) - 1];
    return `${Number(dateDay)}${monthSet.separator}${month}${year ? ` ${dateYear}` : ''}`;
  };
  if (!exhibition.endDate) return format(exhibition.startDate, true);
  const crossYear = exhibition.startDate.slice(0, 4) !== exhibition.endDate.slice(0, 4);
  return `${format(exhibition.startDate, crossYear)} — ${format(exhibition.endDate, !compact || crossYear)}`;
}
