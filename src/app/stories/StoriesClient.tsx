'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n';
import styles from './Stories.module.css';

/**
 * One slot of material. `image` is the photo or the video poster; once a clip is
 * ready, set `video` to its file and the slot plays it with native controls.
 */
type MediaSlot = {
  image: string;
  video?: string;
  shape: 'wide' | 'reel' | 'square' | 'portrait';
};

const videoSlots: MediaSlot[] = [
  { image: '/images/stories/museum-today-vaults.png', shape: 'wide' },
  { image: '/images/stories/museum-today-restoration.png', shape: 'reel' },
  { image: '/images/stories/museum-today-conservation.jpg', shape: 'reel' },
];

const peopleSlots: MediaSlot[] = [
  { image: '/images/culture/karakalpak-cultural-portrait-hq.png', shape: 'portrait' },
  { image: '/images/stories/museum-today-restoration.png', shape: 'portrait' },
  { image: '/images/exhibitions/museum-hall.png', shape: 'portrait' },
];

const materialImages: Record<string, string> = {
  '02': 'https://img.rocket.new/generatedImages/rocket_gen_img_46ebb1ed6-1788627712885.png',
  '03': 'https://img.rocket.new/generatedImages/rocket_gen_img_1465d2c38-1775556134679.png',
  '04': 'https://img.rocket.new/generatedImages/rocket_gen_img_128ad06ee-1770772414980.png',
  '05': 'https://img.rocket.new/generatedImages/rocket_gen_img_1f8cf00df-1764641083614.png',
  '06': 'https://img.rocket.new/generatedImages/rocket_gen_img_139a48f59-1773722663439.png',
  '07': '/images/collection/karakalpak-textile-macro.png',
};

const sectionOrder = ['videos', 'reviews', 'people', 'materials'] as const;

function Media({
  slot,
  label,
  alt,
  sizes,
}: {
  slot: MediaSlot;
  label: string;
  alt: string;
  sizes: string;
}) {
  return (
    <div className={`${styles.media} ${styles[slot.shape]}`}>
      {slot.video ? (
        <video src={slot.video} poster={slot.image} controls playsInline preload="none" />
      ) : (
        <Image src={slot.image} alt={alt} fill sizes={sizes} className={styles.cover} />
      )}
      <span className={styles.tag}>{label}</span>
    </div>
  );
}

export default function StoriesClient() {
  const { t } = useLanguage();
  const page = t.storiesPage;

  const sectionHead = (id: (typeof sectionOrder)[number]) => (
    <header className={styles.sectionHead}>
      <h2 id={`${id}-title`}>{page.sections[id].title}</h2>
      <p>{page.sections[id].note}</p>
    </header>
  );

  return (
    <div className={styles.page}>
      <Header />

      <main>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>{page.badge}</p>
          <h1>{page.title}</h1>
          <p className={styles.lead}>{page.intro}</p>
          <nav className={styles.sectionNav} aria-label={t.ui.storyFormats}>
            {sectionOrder.map((id) => (
              <a key={id} href={`#${id}`}>
                {page.sections[id].title}
              </a>
            ))}
          </nav>
        </header>

        <section id="videos" className={styles.section} aria-labelledby="videos-title">
          {sectionHead('videos')}
          <div className={styles.videoGrid}>
            {videoSlots.map((slot, index) => (
              <figure key={`${slot.image}-${index}`} className={styles.slot}>
                <Media
                  slot={slot}
                  label={page.slots.video}
                  alt={page.sections.videos.title}
                  sizes="(max-width: 767px) 92vw, 46vw"
                />
                <figcaption>{page.slots.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="reviews" className={styles.section} aria-labelledby="reviews-title">
          {sectionHead('reviews')}
          <div className={styles.reviewGrid}>
            {[0, 1, 2].map((index) => (
              <figure key={index} className={styles.review}>
                <span className={styles.quoteMark} aria-hidden="true">
                  “
                </span>
                <blockquote>{page.sections.reviews.note}</blockquote>
                <figcaption>
                  <span className={styles.tagInline}>{page.slots.review}</span>
                  {page.slots.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="people" className={styles.section} aria-labelledby="people-title">
          {sectionHead('people')}
          <div className={styles.peopleGrid}>
            {peopleSlots.map((slot) => (
              <figure key={slot.image} className={styles.slot}>
                <Media
                  slot={slot}
                  label={page.slots.person}
                  alt={page.sections.people.title}
                  sizes="(max-width: 767px) 92vw, 30vw"
                />
                <figcaption>{page.slots.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="materials" className={styles.section} aria-labelledby="materials-title">
          {sectionHead('materials')}
          <div className={styles.materialGrid}>
            {page.stories.map((story) => (
              <article key={story.number} className={styles.material}>
                <div className={`${styles.media} ${styles.square}`}>
                  <Image
                    src={materialImages[story.number] ?? materialImages['02']}
                    alt={`${story.title}. ${story.dek}`}
                    fill
                    sizes="(max-width: 767px) 92vw, (max-width: 1100px) 44vw, 30vw"
                    className={styles.cover}
                  />
                </div>
                <p className={styles.meta}>
                  <span>{story.type}</span>
                  <span>{story.length}</span>
                </p>
                <h3>{story.title}</h3>
                <p className={styles.dek}>{story.dek}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
