import Image from 'next/image';
import Link from 'next/link';
import { CollectionArrow } from './CollectionConstellation';
import { useLanguage } from '@/lib/i18n';
import styles from './CollectionJourney.module.css';

export default function PatternCultureChapter() {
  const { t } = useLanguage();

  return (
    <section data-material-chapter className={styles.culture} aria-labelledby="pattern-heading">
      <div data-culture-frame className={styles.cultureFrame}>
        <figure data-textile-field className={styles.textileField}>
          <Image
            src="/images/collection/karakalpak-textile-macro.png"
            alt={t.culture.caption}
            fill
            sizes="100vw"
            quality={100}
            className={styles.textile}
          />
          <figcaption className={styles.textileCaption}>{t.culture.caption}</figcaption>
        </figure>
        <div data-red-fiber className={styles.redFiber} aria-hidden="true" />
        <div data-fiber-tone className={styles.fiberTone} aria-hidden="true" />
        <div data-culture-grain className={styles.cultureGrain} aria-hidden="true" />
        <svg
          data-woven-ornament
          className={styles.ornament}
          viewBox="0 0 1200 800"
          fill="none"
          aria-hidden="true"
        >
          <path data-weave-rule d="M0 18H1200" />
          <circle data-weave-point cx="720" cy="18" r="5" />
          <path data-weave-node d="m720 2 16 16-16 16-16-16 16-16" />
          <path data-weave-thread d="M720 34v96" />
          <path data-weave-connection d="m720 74-46 46 46 46 46-46-46-46" />
          <path data-weave-diagonal d="M720 166v126m0-88-76 76 76 76 76-76-76-76" />
          <path
            data-weave-second
            d="m720 262 18 18-18 18-18-18 18-18m0 94v126m0-95-54 54 54 54 54-54-54-54"
          />
          <path
            data-weave-finish
            d="M720 482v166m0-107-84 84 84 84 84-84-84-84M636 625h-118m286 0h118"
          />
          <path data-weave-red d="m720 589 36 36-36 36-36-36 36-36" />
        </svg>
        <div data-culture-copy className={styles.cultureCopy}>
          <p data-culture-label className={styles.chapterLabel}>
            {t.culture.label}
          </p>
          <h2 data-culture-heading id="pattern-heading">
            <span>{t.footer.groups.collection.karakalpak}</span>
          </h2>
          <p data-culture-statement className={styles.cultureStatement}>
            {t.culture.titleLine1}
            <br />
            {t.culture.titleLine2} {t.culture.titleLine3}
          </p>
          <p data-culture-desc className={styles.cultureDescription}>
            {t.culture.desc1}
            <br />
            {t.culture.desc2}
          </p>
          <Link
            data-culture-link
            href="/collection?category=karakalpak-arts"
            className={styles.link}
          >
            {t.culture.link} <CollectionArrow />
          </Link>
        </div>
        <p data-culture-aside className={styles.cultureAside}>
          {t.culture.aside1}
          <br />
          {t.culture.aside2}
        </p>
      </div>
    </section>
  );
}
