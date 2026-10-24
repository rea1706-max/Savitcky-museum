'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import {
  pickKeywords,
  pickText,
  visibleImage,
  type CatalogArtist,
  type CatalogArtwork,
} from '@/lib/catalog';
import { formatDimensions, translateDate, translateMedium } from '@/lib/catalogText.mjs';
import styles from '../../Catalogue.module.css';

const rightsLabel = {
  cleared_public_domain: 'rightsCleared',
  cleared_cc0: 'rightsCleared',
  licensed: 'rightsCleared',
  permission_requested: 'rightsPending',
  unverified: 'rightsUnverified',
  restricted: 'rightsRestricted',
} as const;

// Numeric dates read the same in all four languages; Karakalpak month names are not in Intl.
const formatDate = (iso: string) => iso.split('-').reverse().join('.');

export default function ArtworkDetail({
  artwork,
  artist,
}: {
  artwork: CatalogArtwork;
  artist: CatalogArtist | null;
}) {
  const { locale, t } = useLanguage();
  const title = pickText(artwork.title, locale);
  const artistName = artist
    ? pickText(artist.name, locale)
    : artwork.artistNameAsDisplayed
      ? { text: artwork.artistNameAsDisplayed, lang: 'ru' as const }
      : null;
  const medium = translateMedium(pickText(artwork.medium, 'RU')?.text, locale);
  const date = translateDate(artwork.date, locale);
  const dimensions = formatDimensions(artwork.dimensions, locale);
  const keywords = pickKeywords(artwork, locale);
  const image = visibleImage(artwork);
  const untranslated = title && title.lang !== locale.toLowerCase();
  const sectionLabels = {
    'avant-garde': t.collectionPage.categories.avantGarde,
    'uzbek-art': t.collectionPage.categories.uzbekArt,
    'karakalpak-arts': t.collectionPage.categories.karakalpakArts,
    heritage: t.collectionPage.categories.heritage,
  };
  const section = artwork.category ? sectionLabels[artwork.category] : t.catalogue.noSection;

  return (
    <article className={styles.detail}>
      <Link href="/collection" className={styles.back}>
        ← {t.catalogue.back}
      </Link>

      <div className={styles.detailGrid}>
        <div className={`${styles.detailPlate} ${image ? '' : styles.plateEmpty}`}>
          {image ? (
            <Image
              src={image}
              alt={[title?.text, artistName?.text].filter(Boolean).join(' — ')}
              width={artwork.image.width ?? 1000}
              height={artwork.image.height ?? 1250}
              sizes="(max-width: 900px) 90vw, 46vw"
              priority
              className={styles.detailImage}
            />
          ) : (
            <div className={styles.plateNote}>
              <p>{t.catalogue.noImage}</p>
              {artwork.image.sourcePage && (
                <a href={artwork.image.sourcePage} target="_blank" rel="noopener noreferrer">
                  {t.catalogue.openSource} ↗
                </a>
              )}
            </div>
          )}
        </div>

        <div className={styles.detailCopy}>
          {artistName && (
            <p className={styles.workArtist} lang={artistName.lang}>
              {artistName.text}
            </p>
          )}
          {title && (
            <h1 lang={title.lang} className={styles.detailTitle}>
              {title.text}
            </h1>
          )}
          {untranslated && <p className={styles.untranslated}>{t.catalogue.untranslated}</p>}

          <dl className={styles.facts}>
            <div>
              <dt>{t.catalogue.date}</dt>
              <dd>{date ?? t.catalogue.undated}</dd>
            </div>
            {medium && (
              <div>
                <dt>{t.catalogue.medium}</dt>
                <dd lang={medium.lang}>{medium.text}</dd>
              </div>
            )}
            {dimensions && (
              <div>
                <dt>{t.catalogue.dimensions}</dt>
                <dd>{dimensions}</dd>
              </div>
            )}
            <div>
              <dt>{t.catalogue.section}</dt>
              <dd>{section}</dd>
            </div>
            {keywords && (
              <div>
                <dt>{t.catalogue.keywords}</dt>
                <dd lang={keywords.lang}>{keywords.words.join(', ')}</dd>
              </div>
            )}
          </dl>

          {artist && (
            <dl className={styles.facts}>
              {artist.lifeDates.display && (
                <div>
                  <dt>{t.catalogue.lifeDates}</dt>
                  <dd>{artist.lifeDates.display.replace(/\s+-\s+/g, ' – ')}</dd>
                </div>
              )}
              {artist.groups.length > 0 && (
                <div>
                  <dt>{t.catalogue.groups}</dt>
                  <dd lang="ru">{artist.groups.join(', ')}</dd>
                </div>
              )}
              {artist.education.length > 0 && (
                <div>
                  <dt>{t.catalogue.education}</dt>
                  <dd lang="ru">{artist.education.join(', ')}</dd>
                </div>
              )}
            </dl>
          )}

          <footer className={styles.provenance}>
            <p>
              {t.catalogue.imageRights}: {t.catalogue[rightsLabel[artwork.image.rightsStatus]]}
            </p>
            {artwork.image.credit && (
              <p lang="ru">
                {t.catalogue.imageCredit}: {artwork.image.credit}
              </p>
            )}
            <p>
              {t.catalogue.source}:{' '}
              <a href={artwork.source.url} target="_blank" rel="noopener noreferrer">
                {new URL(artwork.source.url).host}
              </a>{' '}
              · {t.catalogue.accessed} {formatDate(artwork.source.accessedAt)}
            </p>
            <p>{t.catalogue.sourceNote}</p>
          </footer>
        </div>
      </div>
    </article>
  );
}
