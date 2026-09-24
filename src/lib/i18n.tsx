'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import enLocale from '@/locales/en.json';
import ruLocale from '@/locales/ru.json';
import uzLocale from '@/locales/uz.json';
import kkLocale from '@/locales/kk.json';

export type Locale = 'EN' | 'RU' | 'UZ' | 'KK';

export interface Translations {
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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('EN');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('savitsky_locale') as Locale | null;
      if (saved && (saved === 'EN' || saved === 'RU' || saved === 'UZ' || saved === 'KK')) {
        setLocaleState(saved);
      }
    } catch {
      // Ignore
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('savitsky_locale', newLocale);
      document.documentElement.lang = newLocale.toLowerCase();
    } catch {
      // Ignore
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
