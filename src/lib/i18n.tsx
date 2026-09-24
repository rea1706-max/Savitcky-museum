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
      title5: 'Heritage.',
      note1: 'Ideas fade.',
      note2: 'Objects remain.',
    },
    collection: {
      label: 'The Collection',
      title: 'Four Horizons of Art',
      intro:
        'A dialogue across millennia: radical avant-garde experimentation, living Karakalpak traditions, ancient Khorezm antiquities, and modern Central Asian expression.',
      explore: 'Explore the Collection',
      volkovBadge: 'Avant-Garde · Alexander Volkov',
      vesselBadge: 'Ancient Khorezm · Terracotta Vessel',
    },
    culture: {
      label: 'Karakalpak Arts',
      titleLine1: 'Tradition',
      titleLine2: 'Lives in',
      titleLine3: 'Detail.',
      desc1: 'Threads, colour and geometry.',
      desc2: 'A living language, held in every woven stitch.',
      link: 'Explore Karakalpak Arts',
      caption: 'Karakalpak textile · Woven detail',
    },
    desert: {
      coordinates: '41°33′N 60°37′E',
      region: 'Karakalpakstan, Uzbekistan',
      quoteLine1: 'The desert provides',
      quoteLine2: 'the space.',
    },
    museumToday: {
      label: '09 / Museum Today',
      title: 'Museum Today',
      subtitle: 'Material memory, preserved by people.',
      kicker: 'A living archive',
      copyLine1: 'Conservation. Research.',
      copyLine2: 'Education. People.',
      copyLine3: 'The museum continues',
      copyLine4: 'to grow and inspire.',
      cta: 'See our stories',
      noteLine1: 'People. Places.',
      noteLine2: 'Ideas for a',
      noteLine3: 'wider tomorrow.',
      vaultTitle: 'Inside the Vaults',
      vaultMeta: 'A collection that lives on across generations.',
      restorationTitle: 'Restoration in Progress',
      restorationMeta: 'Mastery. Care. Prolonging the life of masterpieces.',
      bridgeMain: 'A richer past. A more open tomorrow.',
      bridgeSecondary: 'From Nukus to the world',
      conservationCaption: 'Conservation studio · Savitsky Museum',
    },
    finalHorizon: {
      marker: '10 / Horizon',
      titleLine1: 'From Nukus',
      titleLine2: 'To the World',
      body: 'A museum born in the heart of Central Asia, preserving what was once forbidden, welcoming audiences from across the globe.',
    },
    footer: {
      sloganLine1: 'Rooted in land.',
      sloganLine2: 'Open to the world.',
      tagline: 'Art · People · Memory · Future',
      contact: 'Contact',
      press: 'Press',
      copyright: '© 2026 Savitsky Museum. All rights reserved.',
      groups: {
        museum: {
          title: 'Museum',
          about: 'About',
          history: 'History',
          today: 'Museum Today',
        },
        collection: {
          title: 'Collection',
          explore: 'Explore',
          karakalpak: 'Karakalpak Arts',
          avantGarde: 'Avant-Garde',
        },
        exhibitions: {
          title: 'Exhibitions',
          whatsOn: "What's On",
          all: 'All Exhibitions',
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
      museumName: 'Государственный музей искусств Республики Каракалпакстан имени И. В. Савицкого',
      location: 'Нукус, Каракалпакстан',
      subtitle: 'Авангард в пустыне · Коллекция Савицкого',
      badge: '82 000 шедевров русского авангарда, прикладного искусства Каракалпакстана и древнего Хорезма.',
      years: '1966 — Настоящее время',
    },
    info: {
      locationLabel: 'Адрес',
      locationValue: 'Нукус, Каракалпакстан, Узбекистан',
      hoursLabel: 'Режим работы',
      hoursValue: 'Вт — Вс: 09:00 — 18:00 · Понедельник — выходной',
      collectionLabel: 'Собрание',
      collectionValue: 'Более 82 000 экспонатов',
    },
    about: {
      label: '02 / Основатель и миссия',
      title: 'Игорь Савицкий: Лувр в песках',
      savitskyQuote: '«Я хотел спасти искусство, которому грозило исчезновение».',
      savitskyQuoteAuthor: 'Игорь Савицкий, основатель музея',
      paragraph1:
        'В уединённом городе Нукусе художник и исследователь Игорь Савицкий создал одну из самых поразительных сокровищниц мировой культуры. Вопреки запретам он собрал вторую по величине в мире коллекцию произведений русского авангарда.',
      paragraph2:
        'Вместе с живописью Савицкий спас от забвения культурное достояние каракалпакского народа — старинные ковры, ювелирные украшения и костюмы, составляющие бесценную летопись степной цивилизации.',
      learnMore: 'История создания музея',
    },
    whatsOn: {
      label: 'АФИША',
      heading: 'Выставки и события',
      nowOn: 'Сейчас в музее',
      upcoming: 'Скоро',
      archive: 'Из архива',
      allExhibitions: 'Все выставки',
      viewDetails: 'Подробнее',
    },
    bridge: {
      label: 'Афиша — Коллекция',
      title1: 'От',
      title2: 'Выставки',
      title3: 'К',
      title4: 'Вечному',
      title5: 'Наследию.',
      note1: 'Идеи уходят.',
      note2: 'Подлинники остаются.',
    },
    collection: {
      label: 'Собрание музея',
      title: 'Четыре горизонта искусства',
      intro:
        'Диалог эпох и культур: смелые эксперименты авангарда, живые традиции каракалпакских мастеров, артефакты древнего Хорезма и живопись Узбекистана.',
      explore: 'Смотреть коллекцию',
      volkovBadge: 'Авангард · Александр Волков',
      vesselBadge: 'Древний Хорезм · Терракотовый сосуд',
    },
    culture: {
      label: 'Искусство Каракалпакстана',
      titleLine1: 'Традиция',
      titleLine2: 'Живёт в',
      titleLine3: 'Деталях.',
      desc1: 'Нити, цвет и геометрия.',
      desc2: 'Живой язык предков, запечатлённый в каждом узоре.',
      link: 'Исследовать народное искусство',
      caption: 'Каракалпакский текстиль · Фрагмент ткачества',
    },
    desert: {
      coordinates: '41°33′N 60°37′E',
      region: 'Каракалпакстан, Узбекистан',
      quoteLine1: 'Пустыня дарует',
      quoteLine2: 'пространство.',
    },
    museumToday: {
      label: '09 / Музей сегодня',
      title: 'Музей сегодня',
      subtitle: 'Материальная память, сбережённая людьми.',
      kicker: 'Живой архив',
      copyLine1: 'Реставрация. Исследования.',
      copyLine2: 'Просвещение. Люди.',
      copyLine3: 'Музей продолжает',
      copyLine4: 'жить и развиваться.',
      cta: 'Читать истории',
      noteLine1: 'Люди. Места.',
      noteLine2: 'Идеи для',
      noteLine3: 'открытого будущего.',
      vaultTitle: 'Внутри фондохранилища',
      vaultMeta: 'Коллекция, сохранённая для будущих поколений.',
      restorationTitle: 'Реставрация в действии',
      restorationMeta: 'Мастерство. Забота. Продлевая жизнь шедевров.',
      bridgeMain: 'Богатое прошлое. Открытое будущее.',
      bridgeSecondary: 'Из Нукуса — всему миру',
      conservationCaption: 'Реставрационная мастерская · Музей Савицкого',
    },
    finalHorizon: {
      marker: '10 / Горизонт',
      titleLine1: 'Из Нукуса',
      titleLine2: 'Всему миру',
      body: 'Музей, рождённый в сердце Центральной Азии: хранитель спасённого авангарда, открытый для исследователей и зрителей со всех континентов.',
    },
    footer: {
      sloganLine1: 'Укоренён в земле.',
      sloganLine2: 'Открыт миру.',
      tagline: 'Искусство · Люди · Память · Будущее',
      contact: 'Контакты',
      press: 'Пресса',
      copyright: '© 2026 Музей Савицкого. Все права защищены.',
      groups: {
        museum: {
          title: 'Музей',
          about: 'О музее',
          history: 'История',
          today: 'Музей сегодня',
        },
        collection: {
          title: 'Коллекция',
          explore: 'Все работы',
          karakalpak: 'Искусство Каракалпакстана',
          avantGarde: 'Авангард',
        },
        exhibitions: {
          title: 'Выставки',
          whatsOn: 'Текущие выставки',
          all: 'Все выставки',
        },
        stories: {
          title: 'Истории',
          explore: 'Читать публикации',
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
      museumName: 'I. V. Savitskiy nomidagi Qoraqalpogʻiston davlat sanʼat muzeyi',
      location: 'Nukus, Qoraqalpogʻiston',
      subtitle: 'Sahrodagi avangard · Savitskiy kolleksiyasi',
      badge: 'Rus avangardi, Qoraqalpoq xalq amaliy sanʼati va qadimgi Xorazmning 82 000 durdonasi.',
      years: '1966 — Hozirgi davr',
    },
    info: {
      locationLabel: 'Manzil',
      locationValue: 'Nukus, Qoraqalpogʻiston, Oʻzbekiston',
      hoursLabel: 'Ish vaqti',
      hoursValue: 'Seyshanba — Yakshanba: 09:00 — 18:00 · Dushanba dam olish kuni',
      collectionLabel: 'Muzey fondi',
      collectionValue: '82 000 dan ziyod eksponat',
    },
    about: {
      label: '02 / Asoschi va missiya',
      title: 'Igor Savitskiy: Qumdagi Luvr',
      savitskyQuote: '“Yoʻqolib ketishga mahkum etilgan sanʼatni qutqarib qolmoqchi edim.”',
      savitskyQuoteAuthor: 'Igor Savitskiy, muzey asoschisi',
      paragraph1:
        'Nukusdek olis sahro shahrida rassom va arxeolog Igor Savitskiy jahon miqyosidagi betakror xazinaga asos soldi. Taqiqlarga qaramay, u sovet avangardining dunyodagi ikkinchi eng yirik toʻplamini jamladi.',
      paragraph2:
        'Tasviriy sanʼat bilan bir qatorda, Savitskiy qoraqalpoq xalqining asriy madaniy merosi — nodir kashtalar, zargarlik buyumlari va milliy liboslarni saqlab qoldi.',
      learnMore: 'Muzey tarixi bilan tanishish',
    },
    whatsOn: {
      label: 'AFISHA',
      heading: 'Koʻrgazmalar va tadbirlar',
      nowOn: 'Muzeyda hozir',
      upcoming: 'Yaqinda',
      archive: 'Arxivdan',
      allExhibitions: 'Barcha koʻrgazmalar',
      viewDetails: 'Batafsil',
    },
    bridge: {
      label: 'Afisha — Kolleksiya',
      title1: 'Koʻrgazmadan',
      title2: 'Abadiy',
      title3: 'Meros',
      title4: 'Sari',
      title5: 'Qadam.',
      note1: 'Gʻoyalar oʻtkinchi.',
      note2: 'Sanʼat asarlari mangu.',
    },
    collection: {
      label: 'Muzey kolleksiyasi',
      title: 'Sanʼatning toʻrt ufqi',
      intro:
        'Davrlar muloqoti: jasur avangard izlanishlari, qoraqalpoq xalq ustalari merosi, qadimiy Xorazm topilmalari va zamonaviy Oʻzbekiston sanʼati.',
      explore: 'Kolleksiyani koʻrish',
      volkovBadge: 'Avangard · Aleksandr Volkov',
      vesselBadge: 'Qadimgi Xorazm · Terrakota idishi',
    },
    culture: {
      label: 'Qoraqalpoq amaliy sanʼati',
      titleLine1: 'Anʼana',
      titleLine2: 'Har bir',
      titleLine3: 'Naqshda.',
      desc1: 'Iplar, ranglar va geometriya.',
      desc2: 'Har bir chokda muhrlangan ajdodlar tili.',
      link: 'Amaliy sanʼatni oʻrganish',
      caption: 'Qoraqalpoq toʻqimachiligi · Matoning nozik qismi',
    },
    desert: {
      coordinates: '41°33′N 60°37′E',
      region: 'Qoraqalpogʻiston, Oʻzbekiston',
      quoteLine1: 'Sahro kenglik',
      quoteLine2: 'baxsh etadi.',
    },
    museumToday: {
      label: '09 / Muzey bugun',
      title: 'Muzey bugun',
      subtitle: 'Inson mehnati bilan asralgan moddiy xotira.',
      kicker: 'Tirik arxiv',
      copyLine1: 'Restavratsiya. Tadqiqot.',
      copyLine2: 'Maʼrifat. Insonlar.',
      copyLine3: 'Muzey rivojlanishda',
      copyLine4: 'davom etmoqda.',
      cta: 'Hikoyalarni oʻqish',
      noteLine1: 'Insonlar. Makonlar.',
      noteLine2: 'Keng kelajak sari',
      noteLine3: 'yangi qarashlar.',
      vaultTitle: 'Fondlar qaʼrida',
      vaultMeta: 'Kelajak avlodlar uchun asrab qolingan durdonalar.',
      restorationTitle: 'Restavratsiya jarayoni',
      restorationMeta: 'Mahorat. Ehtirom. Asarlar umrini uzaytirib.',
      bridgeMain: 'Boy oʻtmish. Ochiq kelajak.',
      bridgeSecondary: 'Nukusdan butun dunyoga',
      conservationCaption: 'Restavratsiya ustaxonasi · Savitskiy muzeyi',
    },
    finalHorizon: {
      marker: '10 / Ufq',
      titleLine1: 'Nukusdan',
      titleLine2: 'Dunyo sari',
      body: 'Markaziy Osiyo bagʻrida tugʻilgan, taqiqlangan sanʼatni asrab qolgan va butun dunyo tomoshabinlarini chorlovchi jahon darajasidagi muzey.',
    },
    footer: {
      sloganLine1: 'Oʻz zaminiga tayangan.',
      sloganLine2: 'Dunyogacha ochiq.',
      tagline: 'Sanʼat · Insonlar · Xotira · Kelajak',
      contact: 'Aloqa',
      press: 'Matbuot',
      copyright: '© 2026 Savitskiy muzeyi. Barcha huquqlar himoyalangan.',
      groups: {
        museum: {
          title: 'Muzey',
          about: 'Muzey haqida',
          history: 'Tarix',
          today: 'Muzey bugun',
        },
        collection: {
          title: 'Kolleksiya',
          explore: 'Barcha asarlar',
          karakalpak: 'Qoraqalpoq sanʼati',
          avantGarde: 'Avangard',
        },
        exhibitions: {
          title: 'Koʻrgazmalar',
          whatsOn: 'Joriy afisha',
          all: 'Barcha koʻrgazmalar',
        },
        stories: {
          title: 'Hikoyalar',
          explore: 'Maqolalar',
          people: 'Odamlar · Makonlar · Gʻoyalar',
        },
        visit: {
          title: 'Tashrif',
          plan: 'Tashrifni rejalashtirish',
          hours: 'Ish vaqti',
          gettingHere: 'Yetib kelish yoʻllari',
        },
      },
    },
  },

  KK: {
    nav: {
      home: 'Bas bet',
      about: 'Muzey haqqında',
      whatsOn: 'Afisha',
      collection: 'Kollekciya',
      stories: 'Tarixlar',
      planVisit: 'Sapardı rejelestiriw',
    },
    hero: {
      museumName: 'I. V. Savickiy atındaǵı Qaraqalpaqstan mámleketlik kórkem óner muzeyi',
      location: 'Nókis, Qaraqalpaqstan',
      subtitle: 'Shóldegi avangard · Savickiy kollekciyası',
      badge: 'Rus avangardı, Qaraqalpaq xalıq ámeliy óneri hám áyyemgi Xorezmniń 82 000 kórkem ǵáziynesi.',
      years: '1966 — Házirgi waqıt',
    },
    info: {
      locationLabel: 'Mánzil',
      locationValue: 'Nókis, Qaraqalpaqstan, Ózbekstan',
      hoursLabel: 'Jumıs waqtı',
      hoursValue: 'Siyshembi — Ykshembi: 09:00 — 18:00 · Dúyshembi dem alıs kúni',
      collectionLabel: 'Muzey qorı',
      collectionValue: '82 000 nen artıq eksponat',
    },
    about: {
      label: '02 / Tiykar salıwshı hám missiya',
      title: 'Igor Savickiy: Qumdaǵı Luvr',
      savitskyQuote: '«Joǵalıp ketiw qáwipinde turǵan kórkem ónerdi qutqarıwdı qáledim.»',
      savitskyQuoteAuthor: 'Igor Savickiy, muzey tiykarshısı',
      paragraph1:
        'Aral boyı shólligindegi Nókis qalasında súwretshi hám izertlewshi Igor Savickiy dúnya júzilik áhmiyetke iye kórkem óner ǵáziynesin jarattı. Ol sovet avangardınıń dúnyadaǵı ekinshi eń iri kollekciyasın jıynap qaldırdı.',
      paragraph2:
        'Kórkem óner menen bir qatarda, Savickiy qaraqalpaq xalqınıń joǵalıp ketiw aldında turǵan mádeniy miyrasın — keste, zergerlik hám kiyim-kesheklerdi saqlap qalıwǵa ómirin baǵıshladı.',
      learnMore: 'Muzey tariyxı menen tanıısıw',
    },
    whatsOn: {
      label: 'AFISHA',
      heading: 'Kórgezbeler hám ilajlar',
      nowOn: 'Házir muzeyde',
      upcoming: 'Jaqında',
      archive: 'Arxivten',
      allExhibitions: 'Barlıq kórgezbeler',
      viewDetails: 'Tolıǵıraq',
    },
    bridge: {
      label: 'Afisha — Kollekciya',
      title1: 'Kórgezbeden',
      title2: 'Mángilik',
      title3: 'Miyras',
      title4: 'Sarapına',
      title5: 'Qádem.',
      note1: 'Pikirler ótedi.',
      note2: 'Kórkem dóretpeler máńgi qaladı.',
    },
    collection: {
      label: 'Muzey kollekciyası',
      title: 'Kórkem ónerdiń tórt baǵdarı',
      intro:
        'Ásirler sáwbeti: avangard izlenisleri, qaraqalpaq xalıq ustalarınıń kórkem miyrası, áyyemgi Xorezm arxeologiyası hám zamanagóy kórkem óner.',
      explore: 'Kollekciyanı kóriw',
      volkovBadge: 'Avangard · Aleksandr Volkov',
      vesselBadge: 'Áyyemgi Xorezm · Terrakota ıdısı',
    },
    culture: {
      label: 'Qaraqalpaq xalıq óneri',
      titleLine1: 'Dástúr',
      titleLine2: 'Hár bir',
      titleLine3: 'Sızıqta.',
      desc1: 'Jip, reń hám geometriya.',
      desc2: 'Hár bir naǵısta saqlanǵan babalar tili.',
      link: 'Qaraqalpaq ónerin úyreniw',
      caption: 'Qaraqalpaq toqımashılıǵı · Matanıń bólegi',
    },
    desert: {
      coordinates: '41°33′N 60°37′E',
      region: 'Qaraqalpaqstan, Ózbekstan',
      quoteLine1: 'Shól keńislik',
      quoteLine2: 'inam etedi.',
    },
    museumToday: {
      label: '09 / Muzey búgin',
      title: 'Muzey búgin',
      subtitle: 'İnsan miyneti menen saqlanǵan yadnama.',
      kicker: 'Tiri arxiv',
      copyLine1: 'Restavraciya. Izertlew.',
      copyLine2: 'Bilimlendiriw. İnsanlar.',
      copyLine3: 'Muzey turaqlı túrde',
      copyLine4: 'rawajlanıp barmaqta.',
      cta: 'Tarixlardı oqıw',
      noteLine1: 'İnsanlar. Oraylar.',
      noteLine2: 'Erteńgi kún ushın',
      noteLine3: 'jańa kózqarastar.',
      vaultTitle: 'Qorlar qoynında',
      vaultMeta: 'Keleshek áwladlar ushın saqlanǵan ǵáziyneler.',
      restorationTitle: 'Restavraciya processinde',
      restorationMeta: 'Sheberlik. Miynet. Kórkem dóretpeler ómirin uzaytırıp.',
      bridgeMain: 'Bay ótken kún. Ashıq keleshek.',
      bridgeSecondary: 'Nókisten pútkil dúnyaǵa',
      conservationCaption: 'Restavraciya ustaxanası · Savickiy muzeyi',
    },
    finalHorizon: {
      marker: '10 / Keleshek',
      titleLine1: 'Nókisten',
      titleLine2: 'Pútkil dúnyaǵa',
      body: 'Oraylıq Aziya júreginde júzege kelgen, qadaǵan etilgen kórkem ónerdi saqlap qalǵan hám dúnya xalqın kútiwshi biybaha muzey.',
    },
    footer: {
      sloganLine1: 'Óz jurtına baylanıslı.',
      sloganLine2: 'Pútkil dúnyaǵa ashıq.',
      tagline: 'Kórkem óner · İnsanlar · Yadnama · Keleshek',
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

