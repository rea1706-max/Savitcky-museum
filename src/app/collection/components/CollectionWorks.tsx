'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { pickText, type ArtworkSummary } from '@/lib/catalog';
import styles from '../Catalogue.module.css';

export default function CollectionWorks({
  works,
  category,
}: {
  works: ArtworkSummary[];
  category: string;
}) {
  const { locale, t } = useLanguage();
  const visible = category === 'all' ? works : works.filter((work) => work.category === category);

  return (
    <section className={styles.works} aria-labelledby="collection-works-heading" aria-live="polite">
      <div className={styles.worksHeader}>
        <h2 id="collection-works-heading">{t.catalogue.heading}</h2>
        <p>
          <strong>{visible.length}</strong> {t.catalogue.count}
        </p>
        <span aria-hidden="true" />
      </div>

      {visible.length ? (
        <ul className={styles.workList}>
          {visible.map((work) => {
            const title = pickText(work.title, locale);
            const artist = pickText(work.artistName, locale);
            const medium = pickText(work.medium, locale);
            return (
              <li key={work.id}>
                <Link href={`/collection/works/${work.id}`} className={styles.workCard}>
                  <div className={`${styles.plate} ${work.image ? '' : styles.plateEmpty}`}>
                    {work.image ? (
                      <Image
                        src={work.image}
                        alt={title?.text ?? ''}
                        fill
                        sizes="(max-width: 639px) 90vw, (max-width: 1100px) 44vw, 28vw"
                        className={styles.plateImage}
                      />
                    ) : (
                      <p className={styles.plateNote}>{t.catalogue.noImage}</p>
                    )}
                  </div>
                  <div className={styles.workMeta}>
                    {artist && (
                      <p className={styles.workArtist} lang={artist.lang}>
                        {artist.text}
                      </p>
                    )}
                    {title && (
                      <h3 lang={title.lang} className={styles.workTitle}>
                        {title.text}
                      </h3>
                    )}
                    <p className={styles.workFacts}>
                      <span>{work.date ?? t.catalogue.undated}</span>
                      {medium && <span lang={medium.lang}>{medium.text}</span>}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={styles.worksEmpty}>{t.catalogue.empty}</p>
      )}
    </section>
  );
}
