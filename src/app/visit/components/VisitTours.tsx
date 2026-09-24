'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

export default function VisitTours() {
  const { t } = useLanguage();

  return (
    <section
      id="tours"
      className="px-6 md:px-12 py-16 md:py-20 bg-muted border-b border-border"
      aria-labelledby="tours-heading"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-10">
          <span className="text-label text-muted-foreground block mb-4">
            {t.visitPage.toursEyebrow}
          </span>
          <h2
            id="tours-heading"
            className="font-display font-light text-foreground"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', letterSpacing: '-0.025em' }}
          >
            {t.visitPage.toursTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {t.visitPage.tours.map((tour) => (
            <div key={tour.id} className="bg-background p-8 flex flex-col">
              <div className="flex-1">
                <div className="rule-oxide mb-5" />
                <h3 className="font-display text-lg font-medium text-foreground mb-3 leading-snug">
                  {tour.name}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
                  {tour.description}
                </p>

                <dl className="space-y-3 mb-6">
                  <div className="flex gap-4">
                    <dt className="text-label text-muted-foreground w-28 flex-shrink-0">
                      {t.visitPage.tourLabels.duration}
                    </dt>
                    <dd className="text-xs text-foreground font-medium">{tour.duration}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-label text-muted-foreground w-28 flex-shrink-0">
                      {t.visitPage.tourLabels.groupSize}
                    </dt>
                    <dd className="text-xs text-foreground font-medium">{tour.groupSize}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-label text-muted-foreground w-28 flex-shrink-0">
                      {t.visitPage.tourLabels.languages}
                    </dt>
                    <dd className="text-xs text-foreground font-medium">{tour.languages}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-label text-muted-foreground w-28 flex-shrink-0">
                      {t.visitPage.tourLabels.schedule}
                    </dt>
                    <dd className="text-xs text-foreground font-medium">{tour.available}</dd>
                  </div>
                </dl>
              </div>

              <div className="border-t border-border pt-5 mt-auto">
                <div className="flex items-center justify-between">
                  <span className="font-display text-base font-medium text-foreground">
                    {tour.price}
                  </span>
                  <Link href={`mailto:${t.visitPage.contactTours}?subject=${encodeURIComponent(tour.name)}`} className="btn-ghost text-xs">
                    {t.visitPage.tourLabels.book}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-5 border border-border bg-background">
          <p className="text-sm text-muted-foreground font-light">
            <strong className="font-medium text-foreground">{t.visitPage.tourGroupNote}</strong>{' '}
            <a
              href={`mailto:${t.visitPage.contactTours}`}
              className="text-foreground hover:text-accent transition-colors underline underline-offset-2"
            >
              {t.visitPage.contactTours}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
