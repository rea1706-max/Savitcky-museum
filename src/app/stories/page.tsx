import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './Stories.module.css';

export const metadata: Metadata = {
  title: 'Stories — Savitsky Museum',
  description: 'Films, publications, research and histories from the Savitsky Museum in Nukus.',
};

const stories = [
  {
    number: '02',
    type: 'Conservation',
    length: '04 min read',
    title: 'Restoration in Progress',
    dek: 'The patient work that gives a fragile painted surface a longer tomorrow.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_46ebb1ed6-1788627712885.png',
    alt: 'A conservator working carefully on the painted surface of a historic artwork.',
    className: styles.cardWide,
  },
  {
    number: '03',
    type: 'Collection story',
    length: '08 min read',
    title: 'The Avant-Garde in Nukus',
    dek: 'How a remote museum became a sanctuary for a radical generation of artists.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1465d2c38-1775556134679.png',
    alt: 'Avant-garde artwork from the Savitsky Museum collection.',
    className: styles.cardTall,
  },
  {
    number: '04',
    type: 'Research',
    length: '07 min read',
    title: 'Savitsky’s Letters',
    dek: 'Notes, appeals and field records reveal the human story behind the collection.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_128ad06ee-1770772414980.png',
    alt: 'Historic handwritten letters and archival documents arranged for research.',
    className: styles.cardStandard,
  },
  {
    number: '05',
    type: 'Reel',
    length: '02:18',
    title: 'Karakalpak Craft Today',
    dek: 'A short encounter with the makers carrying textile memory into the present.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f8cf00df-1764641083614.png',
    alt: 'A Karakalpak craftsperson working with traditional materials.',
    className: styles.cardStandard,
  },
  {
    number: '06',
    type: 'Publication',
    length: 'New release',
    title: 'Desert Archive',
    dek: 'The new monograph traces the museum’s ideas, images and unlikely geography.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_139a48f59-1773722663439.png',
    alt: 'The Desert Archive museum monograph displayed on a dark surface.',
    className: styles.cardWide,
  },
  {
    number: '07',
    type: 'History',
    length: '06 min read',
    title: 'Patterns of Karakalpakstan',
    dek: 'Reading family, landscape and protection in the geometry of woven cloth.',
    image: '/images/collection/karakalpak-textile-macro.png',
    alt: 'Close detail of a richly patterned Karakalpak textile.',
    className: styles.cardTall,
  },
];

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

export default function StoriesPage() {
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
              <p className={styles.eyebrow}>
                <span>10</span> / STORIES
              </p>
              <h1 id="stories-title">
                <span>Stories</span>
                <span>From the archive</span>
              </h1>
              <p className={styles.heroIntro}>
                Films. Research. Publications. People.
                <br />
                The museum continues beyond the walls.
              </p>
              <a className={styles.exploreLink} href="#story-index">
                Browse the journal <ArrowDown />
              </a>
            </div>

            <figure className={styles.heroVisual}>
              <Image
                src="https://img.rocket.new/generatedImages/rocket_gen_img_45b2bc068-1788627713692.png"
                alt="Museum storage vault with rows of framed paintings on archival racks."
                fill
                priority
                sizes="(max-width: 767px) 92vw, 58vw"
                className={styles.cover}
              />
              <figcaption>
                <span>01 / FEATURED REEL</span>
                <span>01:42</span>
              </figcaption>
              <div className={styles.heroStoryTitle}>
                <PlayMark />
                <div>
                  <p>Inside the Vaults</p>
                  <span>A collection that lives on</span>
                </div>
              </div>
            </figure>

            <aside className={styles.heroAside}>
              <span>Living archive</span>
              <i />
              <p>Nukus · Karakalpakstan</p>
            </aside>
          </div>
        </section>

        <section id="story-index" className={styles.journal} aria-labelledby="journal-title">
          <div className={styles.journalHeading}>
            <p>Archive index · 2026</p>
            <h2 id="journal-title">The journal</h2>
            <div className={styles.categories} aria-label="Story formats">
              <span>Reels</span>
              <span>Research</span>
              <span>Publications</span>
              <span>History</span>
            </div>
          </div>

          <div className={styles.storyGrid}>
            {stories.map((story) => (
              <article key={story.number} className={`${styles.card} ${story.className}`}>
                <div className={styles.cardHeader}>
                  <span>{story.number}</span>
                  <p>{story.type}</p>
                  <small>{story.length}</small>
                </div>
                <div className={styles.cardImage}>
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    sizes="(max-width: 767px) 86vw, (max-width: 1100px) 44vw, 31vw"
                    className={styles.cover}
                  />
                  {story.type === 'Reel' ? <PlayMark /> : null}
                </div>
                <div className={styles.cardCopy}>
                  <h3>{story.title}</h3>
                  <p>{story.dek}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.closing} aria-label="Stories archive statement">
          <div className={styles.closingPattern} aria-hidden="true" />
          <p>Every object carries more than one history.</p>
          <span>New stories from Nukus, added throughout the year.</span>
        </section>
      </main>

      <Footer />
    </div>
  );
}
