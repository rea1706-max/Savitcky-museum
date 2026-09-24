'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import enLocale from '@/locales/en.json';
import ruLocale from '@/locales/ru.json';
import uzLocale from '@/locales/uz.json';
import kkLocale from '@/locales/kk.json';

export type Locale = 'EN' | 'RU' | 'UZ' | 'KK';

export interface Translations {
  ui: {
    brandLine1: string;
    brandLine2: string;
    mainNavigation: string;
    museumHome: string;
    languageSelector: string;
    switchLanguage: string;
    openMenu: string;
    closeMenu: string;
    footer: string;
    openingSequence: string;
    scrollToExplore: string;
    ustyurtAlt: string;
    portraitAlt: string;
    aboutPortraitAlt: string;
    collectionHeroAlt: string;
    visitHeroAlt: string;
    storiesHeroAlt: string;
    collectionCategories: string;
    storyFormats: string;
    storiesClosing: string;
    museumMap: string;
    languageNames: Record<Locale, string>;
  };
  opening: {
    city: string;
    region: string;
    country: string;
    scroll: string;
    stageLabel: string;
    heritage: string;
    costume: string;
  };
  notFound: {
    title: string;
    description: string;
    back: string;
    home: string;
  };
  nav: {
    home: string;
    about: string;
    whatsOn: string;
    collection: string;
    stories: string;
    planVisit: string;
  };
  hero: {
    museumName: string;
    location: string;
    subtitle: string;
    badge: string;
    years: string;
  };
  info: {
    locationLabel: string;
    locationValue: string;
    hoursLabel: string;
    hoursValue: string;
    collectionLabel: string;
    collectionValue: string;
  };
  about: {
    label: string;
    title: string;
    savitskyQuote: string;
    savitskyQuoteAuthor: string;
    paragraph1: string;
    paragraph2: string;
    learnMore: string;
    archiveCredit: string;
    established: string;
    location: string;
  };
  whatsOn: {
    label: string;
    heading: string;
    nowOn: string;
    upcoming: string;
    archive: string;
    allExhibitions: string;
    viewDetails: string;
  };
  bridge: {
    label: string;
    title1: string;
    title2: string;
    title3: string;
    title4: string;
    title5: string;
    note1: string;
    note2: string;
  };
  collection: {
    label: string;
    title: string;
    intro: string;
    explore: string;
    volkovBadge: string;
    vesselBadge: string;
    archiveLine: string;
    volkovAria: string;
    vesselAria: string;
    volkovAlt: string;
    vesselAlt: string;
  };
  culture: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    desc1: string;
    desc2: string;
    link: string;
    caption: string;
    aside1: string;
    aside2: string;
  };
  desert: {
    coordinates: string;
    region: string;
    quoteLine1: string;
    quoteLine2: string;
  };
  museumToday: {
    label: string;
    title: string;
    subtitle: string;
    kicker: string;
    copyLine1: string;
    copyLine2: string;
    copyLine3: string;
    copyLine4: string;
    cta: string;
    noteLine1: string;
    noteLine2: string;
    noteLine3: string;
    vaultTitle: string;
    vaultMeta: string;
    restorationTitle: string;
    restorationMeta: string;
    bridgeMain: string;
    bridgeSecondary: string;
    conservationCaption: string;
    asideWords: string;
    asideSub: string;
  };
  finalHorizon: {
    marker: string;
    titleLine1: string;
    titleLine2: string;
    body: string;
    imageAlt: string;
  };
  footer: {
    sloganLine1: string;
    sloganLine2: string;
    tagline: string;
    contact: string;
    press: string;
    copyright: string;
    groups: {
      museum: {
        title: string;
        about: string;
        history: string;
        today: string;
      };
      collection: {
        title: string;
        explore: string;
        karakalpak: string;
        avantGarde: string;
      };
      exhibitions: {
        title: string;
        whatsOn: string;
        all: string;
      };
      stories: {
        title: string;
        explore: string;
        people: string;
      };
      visit: {
        title: string;
        plan: string;
        hours: string;
        gettingHere: string;
      };
    };
  };
  collectionPage: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    searchPlaceholder: string;
    searchAria: string;
    showing: string;
    of: string;
    works: string;
    onView: string;
    loadMore: string;
    categories: {
      all: string;
      avantGarde: string;
      karakalpakArts: string;
      heritage: string;
    };
    artworks?: Record<
      string,
      {
        title: string;
        artist: string;
        year?: string;
        medium: string;
        collection: string;
      }
    >;
  };
  exhibitionsPage: {
    back: string;
    eyebrow: string;
    title: string;
    subtitleLine1: string;
    subtitleLine2: string;
    onView: string;
    forthcoming: string;
    past: string;
    filterAll: string;
    archiveAria: string;
    emptyState: string;
    dates: string;
    location: string;
    address: string;
    admission: string;
    source: string;
    planVisit: string;
    entries: Record<
      string,
      {
        title: string;
        subtitle: string;
        imageAlt: string;
        imageCredit?: string;
        shortDescription: string;
        fullDescription: string;
        location?: string;
      }
    >;
  };
  storiesPage: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    introLine1: string;
    introLine2: string;
    browseJournal: string;
    featuredReel: string;
    featuredTitle: string;
    featuredSubtitle: string;
    livingArchive: string;
    location: string;
    archiveIndex: string;
    journalTitle: string;
    categories: {
      reels: string;
      research: string;
      publications: string;
      history: string;
    };
    closingStatement: string;
    closingSub: string;
    stories: Array<{
      number: string;
      type: string;
      length: string;
      title: string;
      dek: string;
    }>;
  };
  visitPage: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    intro: string;
    hoursEyebrow: string;
    hoursTitle: string;
    today: string;
    closed: string;
    lastEntry: string;
    publicHolidaysNote: string;
    days: Record<string, string>;
    ticketsEyebrow: string;
    ticketsTitle: string;
    ticketsDesc: string;
    bookAdvance: string;
    freeAdmissionNote: string;
    tickets: Array<{
      type: string;
      price: string;
      currency: string;
      note: string;
      highlight: boolean;
    }>;
    locationEyebrow: string;
    locationTitle: string;
    phoneLabel: string;
    emailLabel: string;
    coordinatesLabel: string;
    transit: Array<{
      mode: string;
      detail: string;
    }>;
    toursEyebrow: string;
    toursTitle: string;
    tours: Array<{
      id: string;
      name: string;
      duration: string;
      groupSize: string;
      languages: string;
      price: string;
      description: string;
      available: string;
    }>;
    tourLabels: {
      duration: string;
      groupSize: string;
      languages: string;
      schedule: string;
      book: string;
    };
    tourGroupNote: string;
    contactTours: string;
    faqEyebrow: string;
    faqTitle: string;
    faqContact: string;
    faqs: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
  };
}

export const translations: Record<Locale, Translations> = {
  EN: enLocale as unknown as Translations,
  RU: ruLocale as unknown as Translations,
  UZ: uzLocale as unknown as Translations,
  KK: kkLocale as unknown as Translations,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'EN',
  setLocale: () => {},
  t: translations.EN,
});

const htmlLanguages: Record<Locale, string> = {
  EN: 'en',
  RU: 'ru',
  UZ: 'uz',
  KK: 'kaa',
};

function isLocale(value: string | null | undefined): value is Locale {
  return value === 'EN' || value === 'RU' || value === 'UZ' || value === 'KK';
}

function browserLocale(): Locale {
  const languages = typeof navigator === 'undefined' ? [] : navigator.languages;
  for (const language of languages) {
    const normalized = language.toLowerCase();
    if (normalized.startsWith('ru')) return 'RU';
    if (normalized.startsWith('uz')) return 'UZ';
    if (normalized.startsWith('kaa') || normalized.startsWith('kk')) return 'KK';
  }
  return 'EN';
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? 'EN');
  const pathname = usePathname();

  useEffect(() => {
    if (initialLocale) return;
    let detected = browserLocale();
    try {
      const saved = localStorage.getItem('savitsky_locale');
      if (isLocale(saved)) detected = saved;
    } catch {
      // Storage can be unavailable in privacy-restricted contexts.
    }
    setLocaleState(detected);
  }, [initialLocale]);

  useEffect(() => {
    const copy = translations[locale];
    const museumName = `${copy.ui.brandLine1} ${copy.ui.brandLine2}`;
    const sectionTitle = pathname.startsWith('/collection')
      ? `${copy.collectionPage.titleLine1} ${copy.collectionPage.titleLine2}`
      : pathname.startsWith('/exhibitions')
        ? copy.exhibitionsPage.title
        : pathname.startsWith('/stories')
          ? `${copy.storiesPage.titleLine1} ${copy.storiesPage.titleLine2}`
          : pathname.startsWith('/visit')
            ? `${copy.visitPage.titleLine1} ${copy.visitPage.titleLine2}`
            : copy.opening.city;
    const localizedTitle =
      pathname === '/' ? `${museumName} — ${sectionTitle}` : `${sectionTitle} — ${museumName}`;
    const syncTitle = () => {
      if (document.title !== localizedTitle) document.title = localizedTitle;
    };

    document.documentElement.lang = htmlLanguages[locale];
    syncTitle();
    const titleObserver = new MutationObserver(syncTitle);
    titleObserver.observe(document.head, { childList: true, subtree: true, characterData: true });
    window.requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    return () => titleObserver.disconnect();
  }, [locale, pathname]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('savitsky_locale', newLocale);
      document.cookie = `savitsky_locale=${newLocale}; Path=/; Max-Age=31536000; SameSite=Lax${
        window.location.protocol === 'https:' ? '; Secure' : ''
      }`;
    } catch {
      // The current view still updates even when persistence is unavailable.
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
