'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { pickText, type ArtworkSummary } from '@/lib/catalog';
import { translateDate } from '@/lib/catalogText.mjs';
import styles from '../Catalogue.module.css';

const PAGE = 48;

export default function CollectionWorks({
  works,
  category,
}: {
  works: ArtworkSummary[];
  category: string;
}) {
  const { locale, t } = useLanguage();
  const [shown, setShown] = useState(PAGE);
  const visible = category === 'all' ? works : works.filter((work) => work.category === category);

  // A new section starts from its first page.
  useEffect(() => setShown(PAGE), [category]);

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
        <>
          <ul className={styles.workList}>
            {visible.slice(0, shown).map((work) => {
              const title = pickText(work.title, locale);
              const artist = pickText(work.artistName, locale);
              return (
                <li key={work.id}>
                  <Link href={`/collection/works/${work.id}`} className={styles.workCard}>
                    <div className={`${styles.plate} ${work.image ? '' : styles.plateEmpty}`}>
                      {work.image ? (
                        <Image
                          src={work.image}
                          alt={[title?.text, artist?.text].filter(Boolean).join(' — ')}
                          fill
                          sizes="(max-width: 639px) 45vw, (max-width: 1100px) 30vw, 18vw"
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
                        {translateDate(work.date, locale) ?? t.catalogue.undated}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          {shown < visible.length && (
            <div className={styles.more}>
              <button type="button" onClick={() => setShown((count) => count + PAGE)}>
                {t.collectionPage.loadMore}
              </button>
              <p>
                {Math.min(shown, visible.length)} {t.collectionPage.of} {visible.length}
              </p>
            </div>
          )}
        </>
      ) : (
        <p className={styles.worksEmpty}>{t.catalogue.empty}</p>
      )}
    </section>
  );
}
