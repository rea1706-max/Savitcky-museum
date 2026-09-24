'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n';
import styles from './Stories.module.css';

const storyMedia: Record<string, { image: string; className: string }> = {
  '02': {
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_46ebb1ed6-1788627712885.png',
    className: styles.cardWide,
  },
  '03': {
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1465d2c38-1775556134679.png',
    className: styles.cardTall,
  },
  '04': {
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_128ad06ee-1770772414980.png',
    className: styles.cardStandard,
  },
  '05': {
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f8cf00df-1764641083614.png',
    className: styles.cardStandard,
  },
  '06': {
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_139a48f59-1773722663439.png',
    className: styles.cardWide,
  },
  '07': {
    image: '/images/collection/karakalpak-textile-macro.png',
    className: styles.cardTall,
  },
};

function ArrowDown() {
  return (
    <svg viewBox="0 0 24 30" fill="none" aria-hidden="true">
      <path d="M12 0v27M4 19l8 8 8-8" />
    </svg>
  );
}

function PlayMark() {
  return (
    <span className={styles.playMark} aria-hidden="true">
      <svg viewBox="0 0 18 20">
        <path d="m2 2 14 8L2 18V2Z" />
      </svg>
    </span>
  );
}

export default function StoriesClient() {
  const { t } = useLanguage();

  return (
    <div className={styles.page}>
      <Header />

      <main>
        <section className={styles.hero} aria-labelledby="stories-title">
          <div className={styles.noise} aria-hidden="true" />
          <div className={styles.heroRule} aria-hidden="true">
            <span />
            <i />
          </div>
          <svg className={styles.heroOrnament} viewBox="0 0 520 760" fill="none" aria-hidden="true">
            <path d="M260 0v760M260 116l42 42-42 42-42-42 42-42Zm0 248 74 74-74 74-74-74 74-74Zm0 287 18 18-18 18-18-18 18-18Z" />
          </svg>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{t.storiesPage.badge}</p>
              <h1 id="stories-title">
                <span>{t.storiesPage.titleLine1}</span>
                <span>{t.storiesPage.titleLine2}</span>
              </h1>
              <p className={styles.heroIntro}>
                {t.storiesPage.introLine1}
                <br />
                {t.storiesPage.introLine2}
              </p>
              <a className={styles.exploreLink} href="#story-index">
                {t.storiesPage.browseJournal} <ArrowDown />
              </a>
            </div>

            <figure className={styles.heroVisual}>
              <Image
                src="https://img.rocket.new/generatedImages/rocket_gen_img_45b2bc068-1788627713692.png"
                alt={t.ui.storiesHeroAlt}
                fill
                priority
                sizes="(max-width: 767px) 92vw, 58vw"
                className={styles.cover}
              />
              <figcaption>
                <span>{t.storiesPage.featuredReel}</span>
                <span>01:42</span>
              </figcaption>
              <div className={styles.heroStoryTitle}>
                <PlayMark />
                <div>
                  <p>{t.storiesPage.featuredTitle}</p>
                  <span>{t.storiesPage.featuredSubtitle}</span>
                </div>
              </div>
            </figure>

            <aside className={styles.heroAside}>
              <span>{t.storiesPage.livingArchive}</span>
              <i />
              <p>{t.storiesPage.location}</p>
            </aside>
          </div>
        </section>

        <section id="story-index" className={styles.journal} aria-labelledby="journal-title">
          <div className={styles.journalHeading}>
            <p>{t.storiesPage.archiveIndex}</p>
            <h2 id="journal-title">{t.storiesPage.journalTitle}</h2>
            <div className={styles.categories} aria-label={t.ui.storyFormats}>
              <span>{t.storiesPage.categories.reels}</span>
              <span>{t.storiesPage.categories.research}</span>
              <span>{t.storiesPage.categories.publications}</span>
              <span>{t.storiesPage.categories.history}</span>
            </div>
          </div>

          <div className={styles.storyGrid}>
            {t.storiesPage.stories.map((story) => {
              const media = storyMedia[story.number] || {
                image:
                  'https://img.rocket.new/generatedImages/rocket_gen_img_46ebb1ed6-1788627712885.png',
                className: styles.cardStandard,
              };

              return (
                <article key={story.number} className={`${styles.card} ${media.className}`}>
                  <div className={styles.cardHeader}>
                    <span>{story.number}</span>
                    <p>{story.type}</p>
                    <small>{story.length}</small>
                  </div>
                  <div className={styles.cardImage}>
                    <Image
                      src={media.image}
                      alt={`${story.title}. ${story.dek}`}
                      fill
                      sizes="(max-width: 767px) 86vw, (max-width: 1100px) 44vw, 31vw"
                      className={styles.cover}
                    />
                    {story.number === '05' ? <PlayMark /> : null}
                  </div>
                  <div className={styles.cardCopy}>
                    <h3>{story.title}</h3>
                    <p>{story.dek}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.closing} aria-label={t.ui.storiesClosing}>
          <div className={styles.closingPattern} aria-hidden="true" />
          <p>{t.storiesPage.closingStatement}</p>
          <span>{t.storiesPage.closingSub}</span>
        </section>
      </main>

      <Footer />
    </div>
  );
}
