'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

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
  EN: {
    nav: {
      home: 'Home',
      about: 'About',
      whatsOn: "What's On",
      collection: 'Collection',
      stories: 'Stories',
      planVisit: 'Plan Your Visit',
    },
    hero: {
      museumName: 'State Museum of Arts of the Republic of Karakalpakstan named after I.V. Savitsky',
      location: 'Nukus, Karakalpakstan',
      subtitle: 'Avant-Garde in the Desert · The Savitsky Collection',
      badge: '82,000 works of Russian avant-garde, Karakalpak folk arts, and ancient Khorezm.',
      years: '1966 — Present',
    },
    info: {
      locationLabel: 'Location',
      locationValue: 'Nukus, Karakalpakstan, Uzbekistan',
      hoursLabel: 'Opening Hours',
      hoursValue: 'Tue — Sun: 09:00 — 18:00 · Monday closed',
      collectionLabel: 'The Collection',
      collectionValue: '82,000+ preserved works',
    },
    about: {
      label: '02 / The Founder & Mission',
      title: 'Igor Savitsky: The Louvre in the Sands',
      savitskyQuote: '“I wanted to rescue art that was doomed to disappear.”',
      savitskyQuoteAuthor: 'Igor Savitsky, Founder',
      paragraph1:
        'In the remote desert capital of Nukus, artist and archaeologist Igor Savitsky established one of the world’s most extraordinary cultural sanctuaries. Defying ideological suppression, he gathered over 40,000 banned Russian and Soviet avant-garde masterpieces.',
      paragraph2:
        'Alongside this treasure, Savitsky documented the endangered heritage of the Karakalpak people—collecting exquisite textiles, jewelry, and ritual artifacts that would otherwise have been lost to time.',
      learnMore: 'Discover the Museum History',
    },
    whatsOn: {
      label: "WHAT'S ON",
      heading: 'Exhibitions & Programmes',
      nowOn: 'Now on',
      upcoming: 'Upcoming',
      archive: 'From the archive',
      allExhibitions: 'All exhibitions',
      viewDetails: 'View details',
    },
    bridge: {
      label: "What's On — Collection",
      title1: 'From',
      title2: 'Exhibition',
      title3: 'To',
      title4: 'Enduring',
      title5: 'Heritage',
      note1: 'A living archive in Nukus.',
      note2: '82,000 works preserved.',
    },
    collection: {
      label: '04 / Permanent Holdings',
      title: 'Avant-Garde & Ancient Earth',
      intro:
        'The second-largest collection of Russian avant-garde art in the world, alongside ancient Khorezmian artifacts and Karakalpak ethnographic treasures.',
      explore: 'Explore the Collection',
      volkovBadge: 'A. Volkov · Pomegranate Tea House (1924)',
      vesselBadge: 'Ancient Khorezm · Terracotta Vessel (3rd C. BCE)',
    },
    culture: {
      label: '05 / Material Culture',
      titleLine1: 'Tradition',
      titleLine2: 'Lives in',
      titleLine3: 'Detail.',
      desc1: 'Woven memories, protective ornaments, and enduring desert identity.',
      desc2: 'From yurt bands to silver bridal crowns.',
      link: 'Explore Karakalpak Arts',
      caption: 'Karakalpak textile detail: warp-faced band with horn motifs.',
      aside1: 'Many stories.',
      aside2: 'Still to explore.',
    },
    desert: {
      coordinates: '42°27′49″N 59°36′20″E',
      region: 'Kyzylkum Desert · Nukus',
      quoteLine1: '“Art thrives where courage',
      quoteLine2: 'meets devotion.”',
    },
    museumToday: {
      label: 'Current Life',
      title: 'MUSEUM TODAY',
      subtitle: 'Conservation · Living Archive · Nukus',
      kicker: '09 Living Archive',
      copyLine1: 'Preserving fragile surfaces.',
      copyLine2: 'Cataloging rare acquisitions.',
      copyLine3: 'Connecting Nukus to',
      copyLine4: 'the global art dialogue.',
      cta: 'Explore Stories',
      noteLine1: 'Nukus, Karakalpakstan',
      noteLine2: 'Open Tuesday–Sunday',
      noteLine3: '09:00 — 18:00',
      vaultTitle: 'Inside the Vaults',
      vaultMeta: 'Rare works. Careful conditions.',
      restorationTitle: 'Restoration Studio',
      restorationMeta: 'Skills. Care. A longer tomorrow.',
      bridgeMain: 'A RICHER PAST. A MORE OPEN TOMORROW.',
      bridgeSecondary: 'SAVITSKY MUSEUM · NUKUS, KARAKALPAKSTAN',
      conservationCaption: 'Restoration Studio, Nukus',
      asideWords: 'Care\nPreserve\nResearch\nShare',
      asideSub: 'For future generations',
    },
    finalHorizon: {
      marker: '10 Horizon',
      titleLine1: 'Art Lives',
      titleLine2: 'Where It Is Loved',
      body: 'In the heart of Karakalpakstan, an improbable sanctuary of human creativity continues to inspire researchers, travellers, and art lovers from every corner of the world.',
    },
    footer: {
      sloganLine1: 'FROM NUKUS',
      sloganLine2: 'TO THE WORLD',
      tagline: 'State Museum of Arts of the Republic of Karakalpakstan named after I.V. Savitsky.',
      contact: 'Contact',
      press: 'Press',
      copyright: '© 2026 Savitsky Museum. All rights reserved.',
      groups: {
        museum: {
          title: 'Museum',
          about: 'About Museum',
          history: 'History & Founder',
          today: 'Museum Today',
        },
        collection: {
          title: 'Collection',
          explore: 'Explore All Works',
          karakalpak: 'Karakalpak Arts',
          avantGarde: 'Russian Avant-Garde',
        },
        exhibitions: {
          title: 'Exhibitions',
          whatsOn: "What's On",
          all: 'Exhibition Archive',
        },
        stories: {
          title: 'Stories',
          explore: 'Explore Stories',
          people: 'People · Places · Ideas',
        },
        visit: {
          title: 'Visit',
          plan: 'Plan Your Visit',
          hours: 'Opening Hours',
          gettingHere: 'Getting Here',
        },
      },
    },
    collectionPage: {
      eyebrow: 'State Museum of Arts — Savitsky',
      titleLine1: 'Explore',
      titleLine2: 'The Collection',
      description:
        '82,000+ works across Russian avant-garde, Karakalpak decorative arts, Ancient Khorezm archaeology and modern Karakalpak painting.',
      searchPlaceholder: 'Search artist, title, period, medium…',
      searchAria: 'Search the collection',
      showing: 'Showing',
      of: 'of',
      works: 'works',
      onView: 'On View',
      loadMore: 'Load More Works',
      categories: {
        all: 'All Works',
        avantGarde: 'Avant-Garde',
        karakalpakArts: 'Karakalpak Arts',
        heritage: 'Heritage & History',
      },
    },
    exhibitionsPage: {
      back: '← Back to the museum',
      eyebrow: 'Exhibitions',
      title: "WHAT'S ON",
      subtitleLine1: 'Exhibitions from the Savitsky Museum archive.',
      subtitleLine2: 'From Nukus to museums around the world.',
      onView: 'On View',
      forthcoming: 'Forthcoming',
      past: 'Past',
      filterAll: 'All Years',
    },
    storiesPage: {
      badge: '10 / STORIES',
      titleLine1: 'Stories',
      titleLine2: 'From the archive',
      introLine1: 'Films. Research. Publications. People.',
      introLine2: 'The museum continues beyond the walls.',
      browseJournal: 'Browse the journal',
      featuredReel: '01 / FEATURED REEL',
      featuredTitle: 'Inside the Vaults',
      featuredSubtitle: 'A collection that lives on',
      livingArchive: 'Living archive',
      location: 'Nukus · Karakalpakstan',
      archiveIndex: 'Archive index · 2026',
      journalTitle: 'The journal',
      categories: {
        reels: 'Reels',
        research: 'Research',
        publications: 'Publications',
        history: 'History',
      },
      closingStatement: 'Every object carries more than one history.',
      closingSub: 'New stories from Nukus, added throughout the year.',
      stories: [
        {
          number: '02',
          type: 'Conservation',
          length: '04 min read',
          title: 'Restoration in Progress',
          dek: 'The patient work that gives a fragile painted surface a longer tomorrow.',
        },
        {
          number: '03',
          type: 'Collection story',
          length: '08 min read',
          title: 'The Avant-Garde in Nukus',
          dek: 'How a remote museum became a sanctuary for a radical generation of artists.',
        },
        {
          number: '04',
          type: 'Research',
          length: '07 min read',
          title: 'Savitsky’s Letters',
          dek: 'Notes, appeals and field records reveal the human story behind the collection.',
        },
        {
          number: '05',
          type: 'Reel',
          length: '02:18',
          title: 'Karakalpak Craft Today',
          dek: 'A short encounter with the makers carrying textile memory into the present.',
        },
        {
          number: '06',
          type: 'Publication',
          length: 'New release',
          title: 'Desert Archive',
          dek: 'The new monograph traces the museum’s ideas, images and unlikely geography.',
        },
        {
          number: '07',
          type: 'History',
          length: '06 min read',
          title: 'Patterns of Karakalpakstan',
          dek: 'Reading family, landscape and protection in the geometry of woven cloth.',
        },
      ],
    },
    visitPage: {
      eyebrow: 'Visitor Information',
      titleLine1: 'Plan Your',
      titleLine2: 'Visit',
      intro: 'Nukus, Karakalpakstan, Uzbekistan. Open Tuesday through Sunday.',
      hoursEyebrow: 'Opening Times',
      hoursTitle: 'Opening Hours',
      today: 'Today',
      closed: 'Closed',
      lastEntry: 'Last entry 16:30',
      publicHolidaysNote:
        'The museum may have adjusted hours on Uzbek national holidays. Please check announcements before visiting.',
      days: {
        Monday: 'Monday',
        Tuesday: 'Tuesday',
        Wednesday: 'Wednesday',
        Thursday: 'Thursday',
        Friday: 'Friday',
        Saturday: 'Saturday',
        Sunday: 'Sunday',
      },
      ticketsEyebrow: 'Admission',
      ticketsTitle: 'Tickets & Prices',
      ticketsDesc:
        'Tickets can be purchased at the museum entrance. Group bookings and guided tours should be arranged in advance.',
      bookAdvance: 'Book in Advance',
      freeAdmissionNote:
        'Free admission: First Sunday of every month. Journalists and accredited researchers with valid ID.',
      tickets: [
        { type: 'Adult', price: '50,000', currency: 'UZS', note: 'General admission', highlight: false },
        { type: 'Student', price: '25,000', currency: 'UZS', note: 'Valid student ID required', highlight: false },
        { type: 'Concession', price: '25,000', currency: 'UZS', note: 'Senior, disabled visitors', highlight: false },
        { type: 'Child', price: 'Free', currency: '', note: 'Under 7 years', highlight: false },
        { type: 'Guided Tour', price: '100,000', currency: 'UZS', note: 'Per person, includes admission', highlight: true },
        { type: 'Group (10+)', price: '35,000', currency: 'UZS', note: 'Per person, advance booking', highlight: false },
      ],
      locationEyebrow: 'Getting Here',
      locationTitle: 'Location & Directions',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      coordinatesLabel: 'Coordinates',
      transit: [
        {
          mode: 'By Air',
          detail: 'Nukus Airport (NCU) serves domestic flights from Tashkent. Taxis available outside arrivals.',
        },
        {
          mode: 'By Train',
          detail:
            'Nukus Railway Station connects to Tashkent and other Uzbek cities. Journey from Tashkent approx. 18–20 hours.',
        },
        {
          mode: 'Local Transport',
          detail: 'Taxis and shared minibuses operate throughout Nukus. The museum is centrally located.',
        },
      ],
      toursEyebrow: 'Guided Experiences',
      toursTitle: 'Tours',
      tours: [
        {
          id: 't1',
          name: 'Highlights Tour',
          duration: '90 minutes',
          groupSize: 'Up to 15',
          languages: 'English, Russian, Uzbek, Karakalpak',
          price: '100,000 UZS per person',
          description:
            "A curated walk through the museum's most significant avant-garde works and Karakalpak cultural objects. Ideal for first-time visitors.",
          available: 'Daily 10:00 and 14:00 (Tue–Sat)',
        },
        {
          id: 't2',
          name: 'Avant-Garde Deep Dive',
          duration: '2.5 hours',
          groupSize: 'Up to 10',
          languages: 'English, Russian',
          price: '150,000 UZS per person',
          description:
            'An extended specialist tour focusing exclusively on the Russian and Turkestan avant-garde collection, including works not on permanent display.',
          available: 'Saturday 11:00 (advance booking required)',
        },
        {
          id: 't3',
          name: 'Karakalpak Heritage Tour',
          duration: '2 hours',
          groupSize: 'Up to 12',
          languages: 'Karakalpak, Uzbek, Russian',
          price: '120,000 UZS per person',
          description:
            "Explore the decorative arts, textiles, jewelry and material culture of Karakalpakstan across two centuries of the museum's collection.",
          available: 'Tuesday and Thursday 11:00',
        },
      ],
      tourLabels: {
        duration: 'Duration',
        groupSize: 'Group Size',
        languages: 'Languages',
        schedule: 'Schedule',
        book: 'Book',
      },
      tourGroupNote:
        'Private & Educational Groups: The museum offers tailored tours for schools, universities and private groups.',
      contactTours: 'tours@museum.kr.uz',
      faqEyebrow: 'Before You Arrive',
      faqTitle: 'Visitor FAQ',
      faqContact: 'Further questions? Contact us at info@museum.kr.uz',
      faqs: [
        {
          id: 'f1',
          question: 'Can I take photographs in the museum?',
          answer:
            'Personal, non-commercial photography without flash is permitted in permanent exhibition galleries. Tripods and professional equipment require prior written permission.',
        },
        {
          id: 'f2',
          question: 'Is the museum accessible for visitors with disabilities?',
          answer:
            'The main museum building is wheelchair accessible with ramp access, lifts between floors and accessible restrooms. Audio guides are available in English and Russian.',
        },
        {
          id: 'f3',
          question: 'Is there a cloakroom or luggage storage?',
          answer:
            'A cloakroom is available near the main entrance and is free to use. Large bags, backpacks and luggage must be deposited before entering the galleries.',
        },
        {
          id: 'f4',
          question: 'Does the museum have a café or restaurant?',
          answer:
            'A small café is located in the museum courtyard serving tea, coffee and light refreshments during open hours.',
        },
        {
          id: 'f5',
          question: 'Is there a museum shop?',
          answer:
            'The museum shop is located near the main entrance and carries exhibition catalogues, art books, postcards, reproductions and Karakalpak craft items.',
        },
        {
          id: 'f6',
          question: 'How long does a typical visit take?',
          answer:
            'A standard visit to the permanent collection takes approximately 1.5 to 2 hours. Visitors wishing to explore in depth should allow 2.5 to 3 hours.',
        },
        {
          id: 'f7',
          question: 'Can I visit without booking in advance?',
          answer:
            'Walk-in visitors are welcome. Tickets can be purchased at the entrance. Guided tours and group visits should be booked in advance.',
        },
        {
          id: 'f8',
          question: 'Does the museum offer research or archive access?',
          answer:
            'The museum archive and study room are accessible to accredited researchers by appointment. Contact research@museum.kr.uz with your research purpose.',
        },
      ],
    },
  },

  RU: {
    nav: {
      home: 'Главная',
      about: 'О музее',
      whatsOn: 'Афиша',
      collection: 'Коллекция',
      stories: 'Истории',
      planVisit: 'Спланировать визит',
    },
    hero: {
      museumName: 'Государственный музей искусств Республики Каракалпакстан имени И.В. Савицкого',
      location: 'Нукус, Каракалпакстан',
      subtitle: 'Авангард в пустыне · Коллекция Савицкого',
      badge: '82 000 шедевров русского авангарда, декоративного искусства Каракалпакстана и Древнего Хорезма.',
      years: '1966 — По сей день',
    },
    info: {
      locationLabel: 'Локация',
      locationValue: 'Нукус, Каракалпакстан, Узбекистан',
      hoursLabel: 'Режим работы',
      hoursValue: 'Вт — Вс: 09:00 — 18:00 · Понедельник выходной',
      collectionLabel: 'Фонд музея',
      collectionValue: 'Более 82 000 экспонатов',
    },
    about: {
      label: '02 / Основатель и Миссия',
      title: 'Игорь Савицкий: Лувр в пустыне',
      savitskyQuote: '«Я хотел спасти искусство, обреченное на уничтожение».',
      savitskyQuoteAuthor: 'Игорь Савицкий, Основатель',
      paragraph1:
        'В далеком Нукусе художник и археолог Игорь Савицкий создал одну из самых поразительных сокровищниц мировой культуры. Вопреки запретам он собрал более 40 000 полотен опальных мастеров русского и туркестанского авангарда.',
      paragraph2:
        'Параллельно Савицкий спас исчезающее материальное наследие каракалпакского народа — уникальные ткани, украшения и ритуальные артефакты, возвращенные истории.',
      learnMore: 'Узнать историю музея',
    },
    whatsOn: {
      label: 'АФИША',
      heading: 'Выставки и Программы',
      nowOn: 'Сейчас в музее',
      upcoming: 'Скоро',
      archive: 'Из архива выставок',
      allExhibitions: 'Все выставки',
      viewDetails: 'Подробнее',
    },
    bridge: {
      label: 'Афиша — Коллекция',
      title1: 'От',
      title2: 'Выставки',
      title3: 'К',
      title4: 'Вечному',
      title5: 'Наследию',
      note1: 'Живой архив в Нукусе.',
      note2: '82 000 сохраненных шедевров.',
    },
    collection: {
      label: '04 / Постоянная экспозиция',
      title: 'Авангард и Древняя Земля',
      intro:
        'Вторая по величине коллекция русского авангарда в мире, соседствующая с артефактами Древнего Хорезма и народным искусством Каракалпакстана.',
      explore: 'Исследовать коллекцию',
      volkovBadge: 'А. Волков · Гранатовая чайхана (1924)',
      vesselBadge: 'Древний Хорезм · Терракотовый сосуд (III в. до н.э.)',
    },
    culture: {
      label: '05 / Материальная культура',
      titleLine1: 'Традиция',
      titleLine2: 'Живет в',
      titleLine3: 'Деталях.',
      desc1: 'Память ткачества, охранные орнаменты и подлинный дух Каракалпакстана.',
      desc2: 'От юртовых лент до серебряных венцов невест.',
      link: 'Искусство Каракалпакстана',
      caption: 'Деталь каракалпакского ткачества: юртовая тесьма с роговидным узором.',
      aside1: 'Множество историй.',
      aside2: 'Ожидающих открытий.',
    },
    desert: {
      coordinates: '42°27′49″ с.ш. 59°36′20″ в.д.',
      region: 'Пустыня Кызылкум · Нукус',
      quoteLine1: '«Искусство расцветает там, где смелость',
      quoteLine2: 'соединяется с преданностью».',
    },
    museumToday: {
      label: 'Жизнь музея',
      title: 'МУЗЕЙ СЕГОДНЯ',
      subtitle: 'Реставрация · Живой архив · Нукус',
      kicker: '09 Живой архив',
      copyLine1: 'Консервация хрупких полотен.',
      copyLine2: 'Научные каталоги и архивы.',
      copyLine3: 'Диалог Нукуса',
      copyLine4: 'с мировым сообществом.',
      cta: 'Смотреть истории',
      noteLine1: 'Нукус, Каракалпакстан',
      noteLine2: 'Открыто со вторника по воскресенье',
      noteLine3: '09:00 — 18:00',
      vaultTitle: 'В глубине фондов',
      vaultMeta: 'Редкие полотна. Научный уход.',
      restorationTitle: 'Реставрационная мастерская',
      restorationMeta: 'Мастерство. Забота. Будущее.',
      bridgeMain: 'БОГАТОЕ ПРОШЛОЕ. ОТКРЫТОЕ БУДУЩЕЕ.',
      bridgeSecondary: 'МУЗЕЙ САВИЦКОГО · НУКУС, КАРАКАЛПАКСТАН',
      conservationCaption: 'Реставрационная студия, Нукус',
      asideWords: 'Беречь\nСохранять\nИсследовать\nПередавать',
      asideSub: 'Будущим поколениям',
    },
    finalHorizon: {
      marker: '10 Горизонт',
      titleLine1: 'Искусство живо',
      titleLine2: 'Там, где его любят',
      body: 'В сердце Каракалпакстана удивительный ковчег человеческого творчества продолжает вдохновлять исследователей, путешественников и ценителей красоты со всего мира.',
    },
    footer: {
      sloganLine1: 'ИЗ НУКУСА',
      sloganLine2: 'ВСЕМУ МИРУ',
      tagline: 'Государственный музей искусств Республики Каракалпакстан имени И.В. Савицкого.',
      contact: 'Контакты',
      press: 'Пресса',
      copyright: '© 2026 Музей Савицкого. Все права защищены.',
      groups: {
        museum: {
          title: 'О музее',
          about: 'О музее',
          history: 'История и Савицкий',
          today: 'Музей сегодня',
        },
        collection: {
          title: 'Коллекция',
          explore: 'Все экспонаты',
          karakalpak: 'Искусство Каракалпакстана',
          avantGarde: 'Русский авангард',
        },
        exhibitions: {
          title: 'Выставки',
          whatsOn: 'Текущие выставки',
          all: 'Архив выставок',
        },
        stories: {
          title: 'Истории',
          explore: 'Читать истории',
          people: 'Люди · Места · Идеи',
        },
        visit: {
          title: 'Визит',
          plan: 'Спланировать визит',
          hours: 'Часы работы',
          gettingHere: 'Как добраться',
        },
      },
    },
    collectionPage: {
      eyebrow: 'Государственный музей искусств им. И.В. Савицкого',
      titleLine1: 'Исследовать',
      titleLine2: 'Коллекцию',
      description:
        'Более 82 000 произведений русского авангарда, декоративно-прикладного искусства Каракалпакстана, археологии Древнего Хорезма и живописи.',
      searchPlaceholder: 'Поиск по художнику, названию, эпохе, технике…',
      searchAria: 'Поиск по коллекции',
      showing: 'Показано',
      of: 'из',
      works: 'произведений',
      onView: 'В экспозиции',
      loadMore: 'Загрузить ещё работы',
      categories: {
        all: 'Все работы',
        avantGarde: 'Авангард',
        karakalpakArts: 'Искусство Каракалпакстана',
        heritage: 'Наследие и история',
      },
    },
    exhibitionsPage: {
      back: '← Назад в музей',
      eyebrow: 'Выставки',
      title: 'ВЫСТАВКИ',
      subtitleLine1: 'Выставки из архива Государственного музея искусств им. Савицкого.',
      subtitleLine2: 'От Нукуса до ведущих музеев мира.',
      onView: 'В экспозиции',
      forthcoming: 'Скоро',
      past: 'Прошедшие',
      filterAll: 'Все годы',
    },
    storiesPage: {
      badge: '10 / ИСТОРИИ И АРХИВ',
      titleLine1: 'Истории',
      titleLine2: 'Из архива',
      introLine1: 'Фильмы. Исследования. Публикации. Люди.',
      introLine2: 'Жизнь музея продолжается за пределами выставочных залов.',
      browseJournal: 'Открыть журнал',
      featuredReel: '01 / СПЕЦИАЛЬНЫЙ СЮЖЕТ',
      featuredTitle: 'В глубине фондов',
      featuredSubtitle: 'Живая коллекция и искусство реставрации',
      livingArchive: 'Живой архив',
      location: 'Нукус · Каракалпакстан',
      archiveIndex: 'Индекс архива · 2026',
      journalTitle: 'Журнал музея',
      categories: {
        reels: 'Видео',
        research: 'Исследования',
        publications: 'Издания',
        history: 'История',
      },
      closingStatement: 'Каждый предмет хранит больше одной человеческой судьбы.',
      closingSub: 'Новые материалы и исследования из Нукуса публикуются в течение года.',
      stories: [
        {
          number: '02',
          type: 'Реставрация',
          length: '4 мин чтения',
          title: 'Реставрация в процессе',
          dek: 'Кропотливый труд, дарующий хрупкому красочному слою долгую жизнь.',
        },
        {
          number: '03',
          type: 'История собрания',
          length: '8 мин чтения',
          title: 'Авангард в Нукусе',
          dek: 'Как далекий музей посреди пустыни стал спасением для шедевров эпохи.',
        },
        {
          number: '04',
          type: 'Исследования',
          length: '7 мин чтения',
          title: 'Письма Савицкого',
          dek: 'Заметки, обращения и полевые дневники раскрывают подлинную историю коллекции.',
        },
        {
          number: '05',
          type: 'Видеосюжет',
          length: '02:18',
          title: 'Традиционные ремесла сегодня',
          dek: 'Короткая встреча с мастерами, сохраняющими ткаческие традиции народа.',
        },
        {
          number: '06',
          type: 'Публикация',
          length: 'Новинка',
          title: 'Архив пустыни',
          dek: 'Новая монография исследует идеи, визуальный язык и феномен музея в Нукусе.',
        },
        {
          number: '07',
          type: 'История',
          length: '6 мин чтения',
          title: 'Орнаменты Каракалпакстана',
          dek: 'Семейная память, степные просторы и обереги в геометрии традиционной ткани.',
        },
      ],
    },
    visitPage: {
      eyebrow: 'Информация для посетителей',
      titleLine1: 'Посетить',
      titleLine2: 'Музей Савицкого',
      intro: 'Нукус, Каракалпакстан, Узбекистан. Музей открыт со вторника по воскресенье.',
      hoursEyebrow: 'Время работы',
      hoursTitle: 'Часы работы',
      today: 'Сегодня',
      closed: 'Выходной',
      lastEntry: 'Вход до 16:30',
      publicHolidaysNote:
        'В праздничные дни график работы музея может меняться. Пожалуйста, уточняйте расписание заранее.',
      days: {
        Monday: 'Понедельник',
        Tuesday: 'Вторник',
        Wednesday: 'Среда',
        Thursday: 'Четверг',
        Friday: 'Пятница',
        Saturday: 'Суббота',
        Sunday: 'Воскресенье',
      },
      ticketsEyebrow: 'Билеты',
      ticketsTitle: 'Билеты и цены',
      ticketsDesc:
        'Билеты можно приобрести в кассе музея при входе. Групповые визиты и экскурсии бронируются заранее.',
      bookAdvance: 'Забронировать',
      freeAdmissionNote:
        'Бесплатный вход: каждое первое воскресенье месяца. Журналисты и аккредитованные исследователи при предъявлении удостоверения.',
      tickets: [
        { type: 'Взрослый', price: '50 000', currency: 'UZS', note: 'Основная экспозиция', highlight: false },
        { type: 'Студенческий', price: '25 000', currency: 'UZS', note: 'При наличии студенческого билета', highlight: false },
        { type: 'Льготный', price: '25 000', currency: 'UZS', note: 'Пенсионеры и лица с инвалидностью', highlight: false },
        { type: 'Детский', price: 'Бесплатно', currency: '', note: 'Дети до 7 лет', highlight: false },
        { type: 'С экскурсией', price: '100 000', currency: 'UZS', note: 'На человека, включая входной билет', highlight: true },
        { type: 'Групповой (от 10 чел.)', price: '35 000', currency: 'UZS', note: 'На человека, предварительная бронь', highlight: false },
      ],
      locationEyebrow: 'Как добраться',
      locationTitle: 'Адрес и проезд',
      phoneLabel: 'Телефон',
      emailLabel: 'Эл. почта',
      coordinatesLabel: 'Координаты',
      transit: [
        {
          mode: 'Самолетом',
          detail: 'Аэропорт Нукуса (NCU) принимает регулярные рейсы из Ташкента. Такси у выхода из терминала.',
        },
        {
          mode: 'Поездом',
          detail:
            'Железнодорожный вокзал Нукуса связан прямыми рейсами с Ташкентом и другими городами (время в пути 18–20 ч).',
        },
        {
          mode: 'Городской транспорт',
          detail: 'Городские такси и маршрутные автобусы курсируют по всему Нукусу. Музей расположен в центре города.',
        },
      ],
      toursEyebrow: 'Экскурсионные программы',
      toursTitle: 'Экскурсии',
      tours: [
        {
          id: 't1',
          name: 'Обзорная экскурсия',
          duration: '90 минут',
          groupSize: 'До 15 человек',
          languages: 'Каракалпакский, русский, узбекский, английский',
          price: '100 000 UZS с человека',
          description:
            'Знакомство с ключевыми шедеврами авангарда и уникальной этнографической коллекцией Каракалпакстана.',
          available: 'Ежедневно в 10:00 и 14:00 (Вт–Сб)',
        },
        {
          id: 't2',
          name: 'Русский и туркестанский авангард',
          duration: '2,5 часа',
          groupSize: 'До 10 человек',
          languages: 'Русский, английский',
          price: '150 000 UZS с человека',
          description:
            'Углубленная авторская экскурсия по феномену авангарда 1920–1930-х годов и судьбам художников.',
          available: 'Суббота 11:00 (по предварительной записи)',
        },
        {
          id: 't3',
          name: 'Культурное наследие каракалпаков',
          duration: '2 часа',
          groupSize: 'До 12 человек',
          languages: 'Каракалпакский, узбекский, русский',
          price: '120 000 UZS с человека',
          description:
            'Богатейшее собрание национального костюма, ювелирного искусства, вышивки и убранства юрты.',
          available: 'Вторник и четверг в 11:00',
        },
      ],
      tourLabels: {
        duration: 'Продолжительность',
        groupSize: 'Размер группы',
        languages: 'Языки',
        schedule: 'Расписание',
        book: 'Заказать',
      },
      tourGroupNote:
        'Организованные и учебные группы: музей проводит специальные экскурсии для школ и университетов.',
      contactTours: 'tours@museum.kr.uz',
      faqEyebrow: 'Перед визитом',
      faqTitle: 'Частые вопросы',
      faqContact: 'Остались вопросы? Напишите нам: info@museum.kr.uz',
      faqs: [
        {
          id: 'f1',
          question: 'Разрешена ли фотосъемка в музее?',
          answer:
            'Любительская фотосъемка без вспышки разрешена в залах постоянной экспозиции. Для использования штативов и профессионального оборудования требуется предварительное согласование.',
        },
        {
          id: 'f2',
          question: 'Доступен ли музей для маломобильных посетителей?',
          answer:
            'Главный корпус музея оснащен пандусами, лифтами и специально оборудованными санитарными комнатами. Аудиогиды доступны на русском и английском языках.',
        },
        {
          id: 'f3',
          question: 'Есть ли в музее гардероб и камера хранения?',
          answer:
            'Бесплатный гардероб расположен у главного входа. Крупные сумки, рюкзаки и багаж необходимо оставить перед входом в залы.',
        },
        {
          id: 'f4',
          question: 'Есть ли при музее кафе?',
          answer:
            'В уютном музейном дворике работает кафе с чаем, кофе и легкими закусками (в теплое время года).',
        },
        {
          id: 'f5',
          question: 'Работает ли музейный магазин?',
          answer:
            'Сувенирный магазин находится в вестибюле. Здесь представлены каталоги выставок, книги об искусстве, открытки и изделия традиционных каракалпакских мастеров.',
        },
        {
          id: 'f6',
          question: 'Сколько времени занимает посещение?',
          answer:
            'Осмотр основной экспозиции занимает от 1,5 до 2 часов. Для подробного знакомства с фондами и временными выставками рекомендуется заложить 2,5–3 часа.',
        },
        {
          id: 'f7',
          question: 'Нужно ли бронировать билеты заранее?',
          answer:
            'Индивидуальные посетители могут приобрести билеты в кассе при входе. Экскурсионное обслуживание и групповые визиты рекомендуется бронировать заранее.',
        },
        {
          id: 'f8',
          question: 'Как исследователям получить доступ к архиву?',
          answer:
            'Доступ к научно-исследовательскому архиву предоставляется аккредитованным специалистам по официальному запросу на research@museum.kr.uz.',
        },
      ],
    },
  },

  UZ: {
    nav: {
      home: 'Bosh sahifa',
      about: 'Muzey haqida',
      whatsOn: 'Afisha',
      collection: 'Kolleksiya',
      stories: 'Hikoyalar',
      planVisit: 'Tashrifni rejalashtirish',
    },
    hero: {
      museumName: 'I.V. Savitskiy nomidagi Qoraqalpogʻiston Respublikasi Davlat sanʼat muzeyi',
      location: 'Nukus, Qoraqalpogʻiston',
      subtitle: 'Saxrodagi avangard · Savitskiy kolleksiyasi',
      badge: 'Rus avangardi, Qoraqalpogʻiston amaliy sanʼati va Qadimgi Xorazmga oid 82 000 dan ortiq durdona.',
      years: '1966 — Hozirgacha',
    },
    info: {
      locationLabel: 'Manzil',
      locationValue: 'Nukus, Qoraqalpogʻiston, Oʻzbekiston',
      hoursLabel: 'Ish tartibi',
      hoursValue: 'Sesh — Yak: 09:00 — 18:00 · Dushanba dam olish kuni',
      collectionLabel: 'Muzey fondi',
      collectionValue: '82 000+ saqlanayotgan asarlar',
    },
    about: {
      label: '02 / Asoschi va Missiya',
      title: 'Igor Savitskiy: Qumdagi Luvr',
      savitskyQuote: '“Men yoʻqolib ketishga mahkum boʻlgan sanʼatni asrab qolmoqchi edim”.',
      savitskyQuoteAuthor: 'Igor Savitskiy, Asoschi',
      paragraph1:
        'Olis Nukus shahrida rassom va arxeolog Igor Savitskiy dunyodagi eng noyob madaniy maskanlardan birini yaratdi. Mafkuraviy taqiqlarga qaramay, u 40 000 dan ziyod taqiqlangan rus va turkiston avangardi durdonalarini toʻpladi.',
      paragraph2:
        'Shu bilan birga, Savitskiy qoraqalpoq xalqining yoʻqolib borayotgan boy merosini — nozik matolar, zargarlik buyumlari va qadimiy buyumlarni toʻplab, tarixga qaytardi.',
      learnMore: 'Muzey tarixi bilan tanishish',
    },
    whatsOn: {
      label: 'AFISHA',
      heading: 'Koʻrgazmalar va Dasturlar',
      nowOn: 'Hozir muzeyda',
      upcoming: 'Tez kunda',
      archive: 'Koʻrgazmalar arxividan',
      allExhibitions: 'Barcha koʻrgazmalar',
      viewDetails: 'Batafsil',
    },
    bridge: {
      label: 'Afisha — Kolleksiya',
      title1: 'Koʻrgazmadan',
      title2: 'Boqiy',
      title3: 'Meros',
      title4: 'Sari',
      title5: 'Yoʻl',
      note1: 'Nukusdagi tirik arxiv.',
      note2: '82 000 saqlanayotgan asarlar.',
    },
    collection: {
      label: '04 / Doimiy ekspozitsiya',
      title: 'Avangard va Qadimiy Zamin',
      intro:
        'Dunyoda rus avangardi boʻyicha ikkinchi oʻrinda turuvchi kolleksiya, Qadimgi Xorazm arxeologiyasi va Qoraqalpogʻiston amaliy sanʼati.',
      explore: 'Kolleksiyani koʻrish',
      volkovBadge: 'A. Volkov · Anorli choyxona (1924)',
      vesselBadge: 'Qadimgi Xorazm · Terrakota idishi (mil. avv. III asr)',
    },
    culture: {
      label: '05 / Moddiy madaniyat',
      titleLine1: 'Anʼanalar',
      titleLine2: 'Har bir',
      titleLine3: 'Chiziqda.',
      desc1: 'Toʻqimachilik xotirasi, saqlovchi naqshlar va sahro ruhiyati.',
      desc2: 'Oʻtov jiyaklaridan tortib kumush tojgacha.',
      link: 'Qoraqalpogʻiston sanʼati',
      caption: 'Qoraqalpoq matosi detali: shoxsimon naqshli oʻtov jiyagi.',
      aside1: 'Koʻplab hikoyalar.',
      aside2: 'Kashf etish uchun.',
    },
    desert: {
      coordinates: '42°27′49″SH 59°36′20″SH',
      region: 'Qizilqum sahrosi · Nukus',
      quoteLine1: '“Sanʼat jasorat va sadoqat',
      quoteLine2: 'birlashgan joyda gullab-yashnaydi”.',
    },
    museumToday: {
      label: 'Muzey hayoti',
      title: 'MUZEY BUGUN',
      subtitle: 'Restavratsiya · Tirik arxiv · Nukus',
      kicker: '09 Tirik arxiv',
      copyLine1: 'Nafis polotnolarni asrash.',
      copyLine2: 'Ilmiy kataloglar va fondlar.',
      copyLine3: 'Nukusning jahon sanʼati',
      copyLine4: 'bilan muloqoti.',
      cta: 'Hikoyalarni koʻrish',
      noteLine1: 'Nukus, Qoraqalpogʻiston',
      noteLine2: 'Seshanbadan yakshanbagacha ochiq',
      noteLine3: '09:00 — 18:00',
      vaultTitle: 'Fondlar qaʼrida',
      vaultMeta: 'Noyob asarlar. Ehtiyotkor parvarish.',
      restorationTitle: 'Restavratsiya ustaxonasi',
      restorationMeta: 'Mahorat. Eʼtibor. Uzoq ertangi kun.',
      bridgeMain: 'BOY OʻTMISH. OCHIQ KELAJAK.',
      bridgeSecondary: 'SAVITSKIY MUZEYI · NUKUS, QORAQALPOGʻISTON',
      conservationCaption: 'Restavratsiya studiyasi, Nukus',
      asideWords: 'Asrash\nSaqlash\nTadqiq qilish\nUlashish',
      asideSub: 'Kelgusi avlodlar uchun',
    },
    finalHorizon: {
      marker: '10 Ufq',
      titleLine1: 'Sanʼat uni',
      titleLine2: 'Sevgan joyda yashaydi',
      body: 'Qoraqalpogʻistonning qoq markazida insoniyat ijodining bu buyuk maskani dunyoning barcha burchaklaridan kelgan sayyohlar va tadqiqotchilarni ilhomlantirishda davom etmoqda.',
    },
    footer: {
      sloganLine1: 'NUKUSDAN',
      sloganLine2: 'JAHONGA',
      tagline: 'I.V. Savitskiy nomidagi Qoraqalpogʻiston Respublikasi Davlat sanʼat muzeyi.',
      contact: 'Aloqa',
      press: 'Matbuot',
      copyright: '© 2026 Savitskiy muzeyi. Barcha huquqlar himoyalangan.',
      groups: {
        museum: {
          title: 'Muzey',
          about: 'Muzey haqida',
          history: 'Tarix va Savitskiy',
          today: 'Muzey bugun',
        },
        collection: {
          title: 'Kolleksiya',
          explore: 'Barcha asarlar',
          karakalpak: 'Qoraqalpoq sanʼati',
          avantGarde: 'Rus avangardi',
        },
        exhibitions: {
          title: 'Koʻrgazmalar',
          whatsOn: 'Hozirgi koʻrgazmalar',
          all: 'Koʻrgazmalar arxivi',
        },
        stories: {
          title: 'Hikoyalar',
          explore: 'Hikoyalarni oʻqish',
          people: 'Shaxslar · Makonlar · Fikrlar',
        },
        visit: {
          title: 'Tashrif',
          plan: 'Tashrifni rejalashtirish',
          hours: 'Ish vaqti',
          gettingHere: 'Qanday borish mumkin',
        },
      },
    },
    collectionPage: {
      eyebrow: 'I.V. Savitskiy nomidagi Qoraqalpogʻiston Davlat sanʼat muzeyi',
      titleLine1: 'Keng qamrovli',
      titleLine2: 'Kolleksiya',
      description:
        'Rus avangardi, Qoraqalpogʻiston amaliy sanʼati, Qadimgi Xorazm arxeologiyasi va zamonaviy rangtasvir boʻyicha 82 000 dan ortiq durdona asarlar.',
      searchPlaceholder: 'Rassom, asar nomi, davr yoki yoʻnalish boʻyicha qidiruv…',
      searchAria: 'Kolleksiyadan qidirish',
      showing: 'Koʻrsatilmoqda',
      of: '/',
      works: 'asar',
      onView: 'Ekspozitsiyada',
      loadMore: 'Yana asarlarni koʻrish',
      categories: {
        all: 'Barcha asarlar',
        avantGarde: 'Avangard',
        karakalpakArts: 'Qoraqalpogʻiston sanʼati',
        heritage: 'Tarix va meros',
      },
    },
    exhibitionsPage: {
      back: '← Muzeyga qaytish',
      eyebrow: 'Koʻrgazmalar',
      title: 'KOʻRGAZMALAR',
      subtitleLine1: 'Savitskiy muzeyi arxividan koʻrgazmalar va loyihalar.',
      subtitleLine2: 'Nukusdan jahonning yetakchi sanʼat markazlarigacha.',
      onView: 'Ekspozitsiyada',
      forthcoming: 'Kutilmoqda',
      past: 'Oʻtgan',
      filterAll: 'Barcha yillar',
    },
    storiesPage: {
      badge: '10 / HIKOYALAR VA ARXIV',
      titleLine1: 'Muzey',
      titleLine2: 'Hikoyalari va Arxivi',
      introLine1: 'Filmlar. Tadqiqotlar. Nashrlar. Shaxslar.',
      introLine2: 'Muzey hayoti koʻrgazma zallaridan tashqarida ham davom etmoqda.',
      browseJournal: 'Jurnalni ochish',
      featuredReel: '01 / MAXSUS VIDEO',
      featuredTitle: 'Fondlar qaʼrida',
      featuredSubtitle: 'Tirik meros va asrash sanʼati',
      livingArchive: 'Tirik arxiv',
      location: 'Nukus · Qoraqalpogʻiston',
      archiveIndex: 'Arxiv indeksi · 2026',
      journalTitle: 'Muzey jurnali',
      categories: {
        reels: 'Videolar',
        research: 'Tadqiqotlar',
        publications: 'Nashrlar',
        history: 'Tarix',
      },
      closingStatement: 'Har bir asar oʻzida bir necha davr tarixini mujassam etgan.',
      closingSub: 'Nukusdan yangi maqolalar va tadqiqotlar yil davomida eʼlon qilib boriladi.',
      stories: [
        {
          number: '02',
          type: 'Restavratsiya',
          length: '4 daqiqa oʻqish',
          title: 'Restavratsiya jarayoni',
          dek: 'Nafis boʻyoq qatlamiga uzoq kelajak bagʻishlovchi sabotli mehnat.',
        },
        {
          number: '03',
          type: 'Toʻplam tarixi',
          length: '8 daqiqa oʻqish',
          title: 'Nukusdagi avangard',
          dek: 'Qumlar qoʻynidagi muzey qanday qilib oʻz davrining jasur rassomlari boshpanasiga aylandi.',
        },
        {
          number: '04',
          type: 'Tadqiqot',
          length: '7 daqiqa oʻqish',
          title: 'Savitskiy maktublari',
          dek: 'Esdaliklar, murojaatlar va dala daftarlari kolleksiya ortidagi insoniy qismatni ochib beradi.',
        },
        {
          number: '05',
          type: 'Videolavha',
          length: '02:18',
          title: 'Bugungi qoraqalpoq hunarmandchiligi',
          dek: 'Toʻqimachilik xotirasini bugungi kunga yetkazayotgan ustalar bilan uchrashuv.',
        },
        {
          number: '06',
          type: 'Nashr',
          length: 'Yangi nashr',
          title: 'Sahro arxivi',
          dek: 'Yangi monografiya muzey gʻoyalari, asarlar tili va Nukus fenomenini tadqiq etadi.',
        },
        {
          number: '07',
          type: 'Tarix',
          length: '6 daqiqa oʻqish',
          title: 'Qoraqalpogʻiston naqshlari',
          dek: 'Anʼanaviy matolar geometriyasida oila, tabiat va tumorlar ramzi.',
        },
      ],
    },
    visitPage: {
      eyebrow: 'Tashrif buyuruvchilar uchun maʼlumot',
      titleLine1: 'Savitskiy muzeyiga',
      titleLine2: 'Tashrif buyuring',
      intro: 'Nukus, Qoraqalpogʻiston, Oʻzbekiston. Muzey seshanbadan yakshanbagacha ochiq.',
      hoursEyebrow: 'Ish tartibi',
      hoursTitle: 'Ish vaqti',
      today: 'Bugun',
      closed: 'Dam olish kuni',
      lastEntry: 'Kirish 16:30 gacha',
      publicHolidaysNote:
        'Bayram kunlarida muzey ish jadvaliga oʻzgartirishlar kiritilishi mumkin. Iltimos, tashrifdan oldin aniqlashtiring.',
      days: {
        Monday: 'Dushanba',
        Tuesday: 'Seshanba',
        Wednesday: 'Chorshanba',
        Thursday: 'Payshanba',
        Friday: 'Juma',
        Saturday: 'Shanba',
        Sunday: 'Yakshanba',
      },
      ticketsEyebrow: 'Kirish',
      ticketsTitle: 'Chiptalar va narxlar',
      ticketsDesc:
        'Chiptalarni muzeyga kirish joyidagi kassadan xarid qilishingiz mumkin. Guruhli tashriflar oldindan buyurtma qilinadi.',
      bookAdvance: 'Oldindan buyurtma berish',
      freeAdmissionNote:
        'Bepul kirish: har oyning birinchi yakshanbasi. Jurnalistlar va ilmiy xodimlar tegishli guvohnoma asosida.',
      tickets: [
        { type: 'Kattalar uchun', price: '50 000', currency: 'UZS', note: 'Asosiy ekspozitsiya', highlight: false },
        { type: 'Talabalar uchun', price: '25 000', currency: 'UZS', note: 'Talabalik guvohnomasi bilan', highlight: false },
        { type: 'Imtiyozli', price: '25 000', currency: 'UZS', note: 'Nafaqaxoʻrlar va imkoniyati cheklanganlar', highlight: false },
        { type: 'Bolalar', price: 'Bepul', currency: '', note: '7 yoshgacha bolalar', highlight: false },
        { type: 'Ekskursiya bilan', price: '100 000', currency: 'UZS', note: 'Bir kishi uchun, kirish chiptasi bilan', highlight: true },
        { type: 'Guruhli (10 kishidan)', price: '35 000', currency: 'UZS', note: 'Bir kishi uchun, oldindan buyurtma asosida', highlight: false },
      ],
      locationEyebrow: 'Qanday yetib borish mumkin',
      locationTitle: 'Manzil va yoʻnalish',
      phoneLabel: 'Telefon',
      emailLabel: 'Elektron pochta',
      coordinatesLabel: 'Koordinatalar',
      transit: [
        {
          mode: 'Samolyotda',
          detail: 'Nukus aeroporti (NCU) Toshkentdan muntazam parvozlarni qabul qiladi. Terminal chiqishida taksi mavjud.',
        },
        {
          mode: 'Poyezdda',
          detail:
            'Nukus temir yoʻl vokzali Toshkent va boshqa shaharlar bilan toʻgʻridan-toʻgʻri bogʻlangan (safarlar 18–20 soat).',
        },
        {
          mode: 'Shahar transporti',
          detail: 'Taksilar va yoʻnalishli avtobuslar Nukus boʻylab harakatlanadi. Muzey shahar markazida joylashgan.',
        },
      ],
      toursEyebrow: 'Ekskursiya dasturlari',
      toursTitle: 'Ekskursiyalar',
      tours: [
        {
          id: 't1',
          name: 'Umumiy tanishuv ekskursiyasi',
          duration: '90 daqiqa',
          groupSize: '15 kishigacha',
          languages: 'Qoraqalpoq, oʻzbek, rus, ingliz',
          price: 'Kishi boshiga 100 000 UZS',
          description:
            'Avangard durdonalari va Qoraqalpogʻiston xalq amaliy sanʼatining eng sara namunalari bilan tanishuv.',
          available: 'Har kuni 10:00 va 14:00 da (Sesh–Shan)',
        },
        {
          id: 't2',
          name: 'Rus va Turkiston avangardi',
          duration: '2,5 soat',
          groupSize: '10 kishigacha',
          languages: 'Rus, ingliz',
          price: 'Kishi boshiga 150 000 UZS',
          description:
            '1920–1930-yillar avangard sanʼati, asarlar taqdiri va rassomlar hayotiga bagʻishlangan maxsus ekskursiya.',
          available: 'Shanba 11:00 da (oldindan buyurtma orqali)',
        },
        {
          id: 't3',
          name: 'Qoraqalpoq madaniy merosi',
          duration: '2 soat',
          groupSize: '12 kishigacha',
          languages: 'Qoraqalpoq, oʻzbek, rus',
          price: 'Kishi boshiga 120 000 UZS',
          description:
            'Qoraqalpoq milliy liboslari, zargarlik buyumlari, gilamdoʻzlik va oʻtov bezaklari bilan batafsil tanishuv.',
          available: 'Seshanba va payshanba 11:00 da',
        },
      ],
      tourLabels: {
        duration: 'Davomiyligi',
        groupSize: 'Guruh hajmi',
        languages: 'Tillar',
        schedule: 'Vaqti',
        book: 'Buyurtma',
      },
      tourGroupNote:
        'Taʼlim va xususiy guruhlar: maktablar va universitetlar uchun maxsus moslashtirilgan ekskursiyalar tashkil etiladi.',
      contactTours: 'tours@museum.kr.uz',
      faqEyebrow: 'Tashrifdan oldin',
      faqTitle: 'Koʻp beriladigan savollar',
      faqContact: 'Savollaringiz bormi? Biz bilan bogʻlaning: info@museum.kr.uz',
      faqs: [
        {
          id: 'f1',
          question: 'Muzeyda suratga olish mumkinmi?',
          answer:
            'Doimiy koʻrgazma zallarida chaqnnoqsiz (vspyshkasiz) shaxsiy suratga olishga ruxsat beriladi. Professional uskunalar uchun oldindan ruxsatnoma talab qilinadi.',
        },
        {
          id: 'f2',
          question: 'Imkoniyati cheklangan tashrif buyuruvchilar uchun sharoit bormi?',
          answer:
            'Muzeyning asosiy binosi panduslar, qavatlararo liftlar va maxsus jihozlangan xonalar bilan toʻliq taʼminlangan. Rus va ingliz tillarida audiogidlar mavjud.',
        },
        {
          id: 'f3',
          question: 'Muzeyda garderob va yuk saqlash xonasi bormi?',
          answer:
            'Bosh kirish joyi yonida bepul kiyim ilgich va yuk saqlash xonasi mavjud. Katta sumkalar zallarga kiritilmaydi.',
        },
        {
          id: 'f4',
          question: 'Muzey hududida kafe bormi?',
          answer:
            'Muzey hovlisida issiq choy, qahva va yengil tamaddilar taklif qiluvchi shinam kafe faoliyat yuritadi.',
        },
        {
          id: 'f5',
          question: 'Muzey doʻkoni bormi?',
          answer:
            'Vestibyulda koʻrgazma kataloglari, sanʼat kitoblari, otkritkalar va anʼanaviy qoraqalpoq hunarmandchilik buyumlari doʻkoni joylashgan.',
        },
        {
          id: 'f6',
          question: 'Tashrif odatda qancha vaqt oladi?',
          answer:
            'Doimiy koʻrgazma bilan tanishuv oʻrtacha 1,5–2 soat vaqtni oladi. Barcha boʻlimlarni chuqur oʻrganish uchun 2,5–3 soat tavsiya etiladi.',
        },
        {
          id: 'f7',
          question: 'Chiptalarni oldindan bron qilish shartmi?',
          answer:
            'Alohida tashrif buyuruvchilar chiptalarni kassadan toʻgʻridan-toʻgʻri olishlari mumkin. Ekskursiyalar uchun oldindan yozilish tavsiya etiladi.',
        },
        {
          id: 'f8',
          question: 'Tadqiqotchilar arxivdan qanday foydalanishi mumkin?',
          answer:
            'Ilmiy xodimlar research@museum.kr.uz orqali rasmiy murojaat qilish orqali arxiv fondlari bilan ishlashlari mumkin.',
        },
      ],
    },
  },

  KK: {
    nav: {
      home: 'Bas bet',
      about: 'Muzey haqqında',
      whatsOn: 'Afisha',
      collection: 'Kollekciya',
      stories: 'Tariyxlar',
      planVisit: 'Sapardı rejelestiriw',
    },
    hero: {
      museumName: 'I.V. Savickiy atındaǵı Qaraqalpaqstan Respublikası Mámleketlik Kórkem Óner Muzeyi',
      location: 'Nókis, Qaraqalpaqstan',
      subtitle: 'Shóldegi avangard · Savickiy kollekciyası',
      badge: 'Orys avangardı, qaraqalpaq xalıq ámeliy kórkem óneri hám Áyyemgi Xorezm boyınsha 82 000 eksponat.',
      years: '1966 — Házirgi waqıt',
    },
    info: {
      locationLabel: 'Mánzil',
      locationValue: 'Nókis, Qaraqalpaqstan, Ózbekstan',
      hoursLabel: 'Jumıs kestesı',
      hoursValue: 'Siysh — Yek: 09:00 — 18:00 · Dúyshembi dem alıs',
      collectionLabel: 'Muzey qorı',
      collectionValue: '82 000+ saqlanıp atırǵan eksponat',
    },
    about: {
      label: '02 / Tiykar salıwshı hám Missiya',
      title: 'Igor Savickiy: Qumdaǵı Luvr',
      savitskyQuote: '«Men joq bolıp ketiwge máhbir bolǵan kórkem ónerdi qutqarıp qalıwdı qáledim».',
      savitskyQuoteAuthor: 'Igor Savickiy, Tiykar salıwshı',
      paragraph1:
        'Alys Nókis qalasında súwretshi hám arxeolog Igor Savickiy dúnyadaǵı eń ǵáziyne kórkem óner oraylarınan birin payda etti. Ideologiyalıq qadaǵanlarǵa qaramay, ol 40 000-nan aslam qadaǵan etilgen orys hám túrkstan avangard durdanaların topladı.',
      paragraph2:
        'Sonıń menen birge, Savickiy qaraqalpaq xalqınıń joǵalıp baratırǵan kórkem miyrasın — unikal toqımashılıq buyımların, zergerlik kórkem ónerin hám áyyemgi salt buyımların saqlap qaldı.',
      learnMore: 'Muzey tariyxı menen tanıısıw',
    },
    whatsOn: {
      label: 'AFISHA',
      heading: 'Kórgizbeler hám Joybarlar',
      nowOn: 'Házir muzeyde',
      upcoming: 'Ja эффект jaqında',
      archive: 'Kórgizbeler arxivinen',
      allExhibitions: 'Barlıq kórgizbeler',
      viewDetails: 'Tolıq maǵlıwmat',
    },
    bridge: {
      label: 'Afisha — Kollekciya',
      title1: 'Kórgizbeden',
      title2: 'Mángilik',
      title3: 'Miyras',
      title4: 'Sarı',
      title5: 'Baǵdar',
      note1: 'Nókistegi tiri arxiv.',
      note2: '82 000 saqlanǵan jumıs.',
    },
    collection: {
      label: '04 / Turaqlı ekspoziciya',
      title: 'Avangard hám Áyyemgi Topıraq',
      intro:
        'Dúnyadaǵı ekinshi orında turatuǵın orys avangardı qorı, Áyyemgi Xorezm arxeologiyası hám Qaraqalpaqstan xalıq ámeliy kórkem óneri.',
      explore: 'Kollekciyanı kóriw',
      volkovBadge: 'A. Volkov · Anarlı shayxana (1924)',
      vesselBadge: 'Áyyemgi Xorezm · Terrakota ıdısı (b.e.sh. III ásir)',
    },
    culture: {
      label: '05 / Materiallıq mádeniyat',
      titleLine1: 'Dástúr',
      titleLine2: 'Hár bir',
      titleLine3: 'Naǵısta.',
      desc1: 'Toqımashılıq esteligi, saqlawshı naǵıslar hám shól xalqınıń ruwxı.',
      desc2: 'Qara úy bawlarınan baslap gúmis sáwkelelerge shekem.',
      link: 'Qaraqalpaq kórkem óneri',
      caption: 'Qaraqalpaq toqımashılıq detali: qoshqar múyiz naǵıslı aq basqur.',
      aside1: 'Kóp tariyxlar.',
      aside2: 'Ele izertlew kútpekte.',
    },
    desert: {
      coordinates: '42°27′49″A 59°36′20″SH',
      region: 'Qızılqum shóli · Nókis',
      quoteLine1: '«Kórkem óner batırlıq hám sadıqlıq',
      quoteLine2: 'tutashqan jerde jasaydı».',
    },
    museumToday: {
      label: 'Muzey búgin',
      title: 'MUZEY BÚGIN',
      subtitle: 'Qayta tiklew · Tiri arxiv · Nókis',
      kicker: '09 Tiri arxiv',
      copyLine1: 'Názik polotnolardı saqlaw.',
      copyLine2: 'Ilimiy kataloglar hám qorlar.',
      copyLine3: 'Nókistiń jáhán kórkem óneri',
      copyLine4: 'menen baylanısı.',
      cta: 'Tariyxlardı kóriw',
      noteLine1: 'Nókis qalası, Qaraqalpaqstan',
      noteLine2: 'Siyshembiden ekshembige shekem ashıq',
      noteLine3: '09:00 — 18:00',
      vaultTitle: 'Qorlar qoynında',
      vaultMeta: 'Noyob eksponatlar. Ilimiy parvarish.',
      restorationTitle: 'Restavraciya ustaxanası',
      restorationMeta: 'Sheberlik. Ayaw. Uzaq keleshek.',
      bridgeMain: 'BAY ÓTMISH. ASHIQ KELESHEK.',
      bridgeSecondary: 'SAVICKIY MUZEYI · NÓKIS, QARAQALPAQSTAN',
      conservationCaption: 'Restavraciya studiyası, Nókis',
      asideWords: 'Ayaw\nSaqlaw\nIzertlew\nJetkeriw',
      asideSub: 'Keleshek áwladlar ushın',
    },
    finalHorizon: {
      marker: '10 Gorizont',
      titleLine1: 'Kórkem óner',
      titleLine2: 'Qádir tapqan jerde jasaydı',
      body: 'Qaraqalpaqstan qoynında adamzat qáleminiń bul ǵáziyne keshigi pútkil dúnyadan kelgen izertlewshilerdi, sayaxatshılardı hám óner súyiwshilerdi zawıqlandırmaqta.',
    },
    footer: {
      sloganLine1: 'NÓKISTEN',
      sloganLine2: 'DÚNYAǴA',
      tagline: 'I.V. Savickiy atındaǵı Qaraqalpaqstan Respublikası Mámleketlik Kórkem Óner Muzeyi.',
      contact: 'Baylanıs',
      press: 'Baspasóz',
      copyright: '© 2026 Savickiy muzeyi. Barlıq huqıqlar qorǵalǵan.',
      groups: {
        museum: {
          title: 'Muzey',
          about: 'Muzey haqqında',
          history: 'Tariyx',
          today: 'Muzey búgin',
        },
        collection: {
          title: 'Kollekciya',
          explore: 'Barlıq eksponatlar',
          karakalpak: 'Qaraqalpaq óneri',
          avantGarde: 'Avangard',
        },
        exhibitions: {
          title: 'Kórgezbeler',
          whatsOn: 'Afisha',
          all: 'Barlıq kórgezbeler',
        },
        stories: {
          title: 'Tarixlar',
          explore: 'Tarixlardı oqıw',
          people: 'İnsanlar · Oraylar · Pikirlar',
        },
        visit: {
          title: 'Saprawat',
          plan: 'Sapardı rejelestiriw',
          hours: 'Jumıs waqtı',
          gettingHere: 'Qalay jetip barıw',
        },
      },
    },
    collectionPage: {
      eyebrow: 'I.V. Savickiy atındaǵı Qaraqalpaqstan Mámleketlik Kórkem Óner Muzeyi',
      titleLine1: 'Kólemdi',
      titleLine2: 'Kollekciya',
      description:
        'Orys avangardı, qaraqalpaq ámeliy kórkem óneri, Áyyemgi Xorezm arxeologiyası hám zamanagóy kórkem súwretshilik boyınsha 82 000-nan aslam eksponat.',
      searchPlaceholder: 'Súwretshi, atama, dáwir, baǵdar boyınsha izlew…',
      searchAria: 'Kollekciyadan izlew',
      showing: 'Kórsetilmekte',
      of: '/',
      works: 'eksponat',
      onView: 'Ekspoziciyada',
      loadMore: 'Kóbirek kórsetiw',
      categories: {
        all: 'Barlıq eksponatlar',
        avantGarde: 'Avangard',
        karakalpakArts: 'Qaraqalpaq kórkem óneri',
        heritage: 'Tariyx hám miyras',
      },
    },
    exhibitionsPage: {
      back: '← Muzeyge qaytıw',
      eyebrow: 'Kórgizbeler',
      title: 'KÓRGIZBELER',
      subtitleLine1: 'Savickiy muzeyi arxivinen kórgizbeler hám joybarlar.',
      subtitleLine2: 'Nókisten dúnyanıń jetekshi kórkem óner oraylarına shekem.',
      onView: 'Ekspoziciyada',
      forthcoming: 'Kútilmekte',
      past: 'Ótken',
      filterAll: 'Barlıq jıllar',
    },
    storiesPage: {
      badge: '10 / TARIYX HÁM MAQALALAR',
      titleLine1: 'Muzey',
      titleLine2: 'Tariyxı hám Arxiv',
      introLine1: 'Filmler. Izertlewler. Baspalar. Insanlar.',
      introLine2: 'Muzey ómiri diywallardan sırtta da dawam etpekte.',
      browseJournal: 'Jurnaldı kóriw',
      featuredReel: '01 / ARNALLI VIDEOMATERIAL',
      featuredTitle: 'Qorlar qoynında',
      featuredSubtitle: 'Tiri qalǵan miyras hám turaqlı saqlaw',
      livingArchive: 'Tiri arxiv',
      location: 'Nókis · Qaraqalpaqstan',
      archiveIndex: 'Arxiv indeksi · 2026',
      journalTitle: 'Muzey jurnalı',
      categories: {
        reels: 'Videolar',
        research: 'Izertlewler',
        publications: 'Baspalar',
        history: 'Tariyx',
      },
      closingStatement: 'Hár bir eksponat bir neshe dáwirdiń tariyxın saqlaydı.',
      closingSub: 'Nókisten jańa maqalalar hám izertlewler jıl dawamında járiyalanıp baradı.',
      stories: [
        {
          number: '02',
          type: 'Qayta tiklew',
          length: '4 min oqıw',
          title: 'Restavraciya jumısları',
          dek: 'Názik boyaw qatlamına uzaq keleshek baǵıshlaytuǵın turaqlı miynet.',
        },
        {
          number: '03',
          type: 'Miyras tariyxı',
          length: '8 min oqıw',
          title: 'Nókistegi avangard',
          dek: 'Qumlar qoynındaǵı muzey qalay etip dáwirdiń eń jasırın kórkem óner orayına aylandı.',
        },
        {
          number: '04',
          type: 'Izertlew',
          length: '7 min oqıw',
          title: 'Savickiydiń xatları',
          dek: 'Jeke jazbalar, múrájatlar hám ekspediciya kúnlikleri kollekciya tariyxın ashıp beredi.',
        },
        {
          number: '05',
          type: 'Videomaterial',
          length: '02:18',
          title: 'Búgingi qaraqalpaq óneri',
          dek: 'Toqımashılıq kórkem ónerin búgingi kúnge jetkerip atırǵan sheberler menen ushırasıw.',
        },
        {
          number: '06',
          type: 'Baspa',
          length: 'Jańa baspa',
          title: 'Shól arxivi',
          dek: 'Jańa monografiya muzey ideyaların, kórkem óner tilin hám Nókis qubılısın izertleydi.',
        },
        {
          number: '07',
          type: 'Tariyx',
          length: '6 min oqıw',
          title: 'Qaraqalpaqstan naǵısları',
          dek: 'Gúbelek, tuwrı hám túrli naǵıslardaǵı shańaraq, tabiyat hám saqlawshı belgiler.',
        },
      ],
    },
    visitPage: {
      eyebrow: 'Keliwshiler ushın maǵlıwmat',
      titleLine1: 'Savickiy muzeyine',
      titleLine2: 'Xosh kelipsiz',
      intro: 'Nókis qalası, Qaraqalpaqstan Respublikası. Muzey siyshembiden ekshembige shekem ashıq.',
      hoursEyebrow: 'Jumıs waqıtları',
      hoursTitle: 'Jumıs waqtı',
      today: 'Búgin',
      closed: 'Dem alıs kúni',
      lastEntry: 'Kiriw 16:30 ǵa shekem',
      publicHolidaysNote:
        'Bayram kúnlerinde muzey jumıs kestesinen ózgerisler bolıwı múmkin. Aldın-ala anıqlap alıwıńızdı soraymız.',
      days: {
        Monday: 'Dúyshembi',
        Tuesday: 'Siyshembi',
        Wednesday: 'Sárshembi',
        Thursday: 'Piyshembi',
        Friday: 'Juma',
        Saturday: 'Shembi',
        Sunday: 'Yekshembi',
      },
      ticketsEyebrow: 'Biletler',
      ticketsTitle: 'Biletler hám bahalar',
      ticketsDesc:
        'Biletlerdi muzey kireberisindegi kassadan satıp alıwıńız múmkin. Toparlıq saparlar aldın-ala buyırtpa beriledi.',
      bookAdvance: 'Aldın-ala buyırtpa beriw',
      freeAdmissionNote:
        'Biybiyparaq (Tekin) kiriw: hár aydıń birinshi yekshembisi. Jurnalistler hám ilimiy xızmetkerler gúwalıq tiykarında.',
      tickets: [
        { type: 'Úlkenler ushın', price: '50 000', currency: 'UZS', note: 'Tiykarǵı ekspoziciya', highlight: false },
        { type: 'Studentler ushın', price: '25 000', currency: 'UZS', note: 'Studentlik gúwalıǵı menen', highlight: false },
        { type: 'Jeńillikli', price: '25 000', currency: 'UZS', note: 'Pensiyanerler hám mayıplıǵı bar shaxslar', highlight: false },
        { type: 'Balalar', price: 'Tekin', currency: '', note: '7 jasqa shekemgi balalar', highlight: false },
        { type: 'Ekskursiya menen', price: '100 000', currency: 'UZS', note: 'Bir adamǵa, kiriw bileti menen birge', highlight: true },
        { type: 'Toparlıq (10 adamnan)', price: '35 000', currency: 'UZS', note: 'Bir adamǵa, aldın-ala buyırtpa tiykarında', highlight: false },
      ],
      locationEyebrow: 'Qalay jetip barıwǵa boladı',
      locationTitle: 'Mánzil hám baǵdarlar',
      phoneLabel: 'Telefon',
      emailLabel: 'Elektron pochta',
      coordinatesLabel: 'Koordinatalar',
      transit: [
        {
          mode: 'Samolyotta',
          detail: 'Nókis aeroportı (NCU) Tashkentten úzliksiz reyslerdi qabıllaydı. Terminal shıǵıwında taksi xızmeti bar.',
        },
        {
          mode: 'Poezdda',
          detail:
            'Nókis temir jol vokzalı Tashkent hám basqa qalalar menen baylanısqan (jol waqtı shama menen 18–20 saat).',
        },
        {
          mode: 'Qala transportı',
          detail: 'Qala taksileri hám marshrutkalar Nókis boylap qatnaydı. Muzey qala orayında jaylasqan.',
        },
      ],
      toursEyebrow: 'Ekskursiya baǵdarları',
      toursTitle: 'Ekskursiyalar',
      tours: [
        {
          id: 't1',
          name: 'Ulıwma tanıstırıw ekskursiyası',
          duration: '90 minut',
          groupSize: '15 adamǵa shekem',
          languages: 'Qaraqalpaq, orys, ózbek, inglis',
          price: 'Adam basına 100 000 UZS',
          description:
            'Avangard durdanaları hám Qaraqalpaqstan xalıq ámeliy kórkem óneriniń eń saylandı úlgileri menen tanıstırıw.',
          available: 'Hár kúni saat 10:00 hám 14:00 de (Siysh–Shem)',
        },
        {
          id: 't2',
          name: 'Orys hám Túrkstan avangardı',
          duration: '2,5 saat',
          groupSize: '10 adamǵa shekem',
          languages: 'Orys, inglis',
          price: 'Adam basına 150 000 UZS',
          description:
            '1920–1930-jıllardaǵı avangard kórkem óneri, kórkem súwretshiler táǵdiri hám qorlar haqqında arnawlı baǵdar.',
          available: 'Shembi saat 11:00 de (aldın-ala jazılıw boyınsha)',
        },
        {
          id: 't3',
          name: 'Qaraqalpaq mádeniy miyrası',
          duration: '2 saat',
          groupSize: '12 adamǵa shekem',
          languages: 'Qaraqalpaq, ózbek, orys',
          price: 'Adam basına 120 000 UZS',
          description:
            'Milliy kiyimler, zergerlik buyımları, reńbá-reń toqımashılıq hám qara úy bezewleri kórgezbesi.',
          available: 'Siyshembi hám piyshembi saat 11:00 de',
        },
      ],
      tourLabels: {
        duration: 'Dawamlılıǵı',
        groupSize: 'Topar quramı',
        languages: 'Tiller',
        schedule: 'Waqtı',
        book: 'Buyırtpa',
      },
      tourGroupNote:
        'Bilimlendiriw hám jeke toparlar: mektepler hám universitetler ushın arnawlı ekskursiyalar shólkemlestiriledi.',
      contactTours: 'tours@museum.kr.uz',
      faqEyebrow: 'Keliwden aldın',
      faqTitle: 'Kóp beriletuǵın sorawlar',
      faqContact: 'Sorawlarıńız bar ma? Bizge xat jazıń: info@museum.kr.uz',
      faqs: [
        {
          id: 'f1',
          question: 'Muzeyde súwretke túsiriw múmkin be?',
          answer:
            'Turaqlı ekspoziciya zallarında shıraq qollanbastan (vspyshkasız) jeke paydalanıw ushın súwretke túsiriwge ruqsat etiledi. Kásiplik úskeneler ushın aldın-ala ruqsatnama kerek.',
        },
        {
          id: 'f2',
          question: 'Imkaniyatı sheklengen keliwshiler ushın shárayatlar bar ma?',
          answer:
            'Muzeydiń bas imaratı panduslar, qabatlararası liftler hám arnawlı orınlar menen tolıq támiyinlengen. Orys hám inglis tillerinde audiogidler bar.',
        },
        {
          id: 'f3',
          question: 'Muzeyde kiyim iletuǵın hám júk saqlaw xanası bar ma?',
          answer:
            'Bas kireberiste biypul kiyim iletuǵın hám júk qoyılatuǵın orın bar. Úlken sumkalardı zallarǵa alıp kiriwge ruqsat etilmeydi.',
        },
        {
          id: 'f4',
          question: 'Muzey átirapında kofe ya shay ishiwge orın bar ma?',
          answer:
            'Muzey háwlisinde shay, kofe hám jeńil awqatlar usınılatuǵın ıqsham kafe isleydi.',
        },
        {
          id: 'f5',
          question: 'Muzey dúkánı bar ma?',
          answer:
            'Kireberis zatta kórgezbe katalogları, kitaplar, ashıq xatlar hám qaraqalpaq qol óneri buyımları dúkánı bar.',
        },
        {
          id: 'f6',
          question: 'Muzeydi kózden keshiriw qansha waqıt aladı?',
          answer:
            'Tiykarǵı ekspoziciya menen tanısqa shama menen 1,5–2 saat waqıt ketedi. Tereńirek úyreniw ushın 2,5–3 saat ajıratıw usınıs etiledi.',
        },
        {
          id: 'f7',
          question: 'Biletlerdi aldın-ala bronlaw kerek pe?',
          answer:
            'Jeke keliwshiler biletlerdi kassadan birden alıwı múmkin. Ekskursiyalar ushın aldın-ala jazılıw maqul.',
        },
        {
          id: 'f8',
          question: 'Ilimiy izertlewshiler arxivten qalay paydalansa boladı?',
          answer:
            'Ilimiy xızmetkerler research@museum.kr.uz mámziline rásmiy xat jollap, qor materialları menen islesiwge ruqsat ala aladı.',
        },
      ],
    },
  },
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
