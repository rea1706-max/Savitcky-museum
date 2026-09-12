import Image from 'next/image';
import Link from 'next/link';
import { CollectionArrow } from './CollectionConstellation';
import styles from './CollectionJourney.module.css';

export default function PatternCultureChapter() {
  return (
    <section data-material-chapter className={styles.culture} aria-labelledby="pattern-heading">
      <div data-fiber-space className={styles.fiberSpace} aria-hidden="true" />
      <div className={styles.cultureInner}>
        <svg
          data-woven-ornament
          className={styles.ornament}
          viewBox="0 0 1200 250"
          fill="none"
          aria-hidden="true"
        >
          <path data-weave-rule d="M0 42H1200" />
          <path data-weave-thread d="M350 42H600" />
          <path data-weave-node d="m600 29 13 13-13 13-13-13 13-13" />
          <path data-weave-connection d="M613 42H837" />
          <path data-weave-diagonal d="M600 55 725 192 850 55" />
          <path
            data-weave-second
            d="m850 29 13 13-13 13-13-13 13-13m-125 150 13 13-13 13-13-13 13-13"
          />
          <path data-weave-finish d="M863 42H1010M656 104l69-62 69 62" />
        </svg>
        <div className={styles.cultureComposition}>
          <div data-culture-copy className={styles.cultureCopy}>
            <p className={styles.chapterLabel}>Karakalpak Arts</p>
            <h2 id="pattern-heading">
              Tradition
              <br />
              Lives in
              <br />
              Detail.
            </h2>
            <p className={styles.cultureDescription}>
              Threads, colour and geometry.
              <br />A living language, held in every detail.
            </p>
            <Link href="/collection?category=karakalpak-arts" className={styles.link}>
              Explore Karakalpak Arts <CollectionArrow />
            </Link>
          </div>
          <figure data-textile-window className={styles.textileWindow}>
            <Image
              src="/images/collection/karakalpak-textile-macro.png"
              alt="Close detail of the supplied Karakalpak textile: red, black, ivory and ochre threads, with the individual woven fibres visible."
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              className={styles.textile}
            />
            <figcaption className={styles.textileCaption}>
              Karakalpak textile · Woven detail
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
