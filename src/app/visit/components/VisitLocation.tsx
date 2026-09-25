'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';

const transitIcons = [
  <svg
    key="air"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4H5c-2 0-2 2 0 3.5L8 11l-1.8 8.2c-.2.8.8 1.4 1.5.9l4.3-3 4.3 3c.7.5 1.7-.1 1.5-.9z" />
  </svg>,
  <svg
    key="train"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>,
  <svg
    key="local"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
    <rect x="9" y="11" width="14" height="10" rx="1" />
    <circle cx="12" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
  </svg>,
];

export default function VisitLocation() {
  const { t } = useLanguage();

  return (
    <section
      id="location"
      className="px-6 md:px-12 py-16 md:py-20 bg-background border-b border-border scroll-mt-20"
      aria-labelledby="location-heading"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Heading */}
          <div className="lg:col-span-4" id="contacts">
            <span className="text-label text-muted-foreground block mb-4">
              {t.visitPage.locationEyebrow}
            </span>
            <h2
              id="location-heading"
              className="font-display font-light text-foreground mb-6"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', letterSpacing: '-0.025em' }}
            >
              {t.visitPage.locationTitle}
            </h2>
            <div className="rule-oxide mb-6" />

            <address className="not-italic mb-8">
              <p className="text-sm font-semibold text-foreground mb-1">{t.hero.museumName}</p>
              <p className="text-sm text-muted-foreground font-light">{t.info.locationValue}</p>
            </address>

            <div className="space-y-3 mb-8">
              <div>
                <div className="text-label text-muted-foreground mb-1">
                  {t.visitPage.phoneLabel}
                </div>
                <a
                  href="tel:+998612222556"
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  +998 61 222 25 56
                </a>
              </div>
              <div>
                <div className="text-label text-muted-foreground mb-1">
                  {t.visitPage.emailLabel}
                </div>
                <a
                  href="mailto:info@museum.kr.uz"
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  info@museum.kr.uz
                </a>
              </div>
              <div>
                <div className="text-label text-muted-foreground mb-1">
                  {t.visitPage.coordinatesLabel}
                </div>
                <span className="text-sm text-muted-foreground font-light">
                  {t.desert.coordinates}
                </span>
              </div>
            </div>
          </div>

          {/* Map + transport info */}
          <div className="lg:col-span-8">
            <div className="mb-6">
              {/* Interactive Live Map */}
              <div className="relative w-full h-[340px] md:h-[400px] border border-border bg-[#F5F1E9] overflow-hidden shadow-sm">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=59.610582%2C42.464731&z=16&pt=59.610582%2C42.464731,pm2rdm"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen={true}
                  className="w-full h-full border-0"
                  title="Интерактивная карта Государственного музея искусств им. И.В. Савицкого"
                />

                {/* Floating address badge in the corner */}
                <div className="absolute top-3 left-3 z-10 hidden sm:flex items-center gap-2 bg-background/95 backdrop-blur-md border border-border px-3 py-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-medium text-foreground">
                    Музей Савицкого · ул. Т. Кайыпбергенова, 52 / ул. Дослык, 2
                  </span>
                </div>
              </div>

              {/* Exact address & Route planning actions */}
              <div className="mt-4 p-4 border border-border bg-muted/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-foreground tracking-wide uppercase">
                    {t.hero.museumName}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Нукус, ул. Т. Кайыпбергенова, 52 / ул. Дослык, 2 · Координаты: 42°27′49″ с.ш. 59°36′20″ в.д.
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
                  <a
                    href="https://yandex.ru/maps/?rtext=~42.464731,59.610582&rtt=auto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs py-2 px-3.5 inline-flex items-center gap-1.5 shadow-sm"
                    title="Построить маршрут к музею в Яндекс Картах"
                  >
                    <span>Проложить маршрут в Яндекс Картах</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>

                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=42.464731,59.610582"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-xs py-2 px-3.5 inline-flex items-center gap-1.5 border border-border bg-background hover:bg-muted transition-colors shadow-sm"
                    title="Построить маршрут к музею в Google Maps"
                  >
                    <span>Google Maps</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Transport options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
              {t.visitPage.transit.map((item, index) => (
                <div key={item.mode} className="bg-background p-5">
                  <div className="text-muted-foreground mb-3">
                    {transitIcons[index] || transitIcons[0]}
                  </div>
                  <div className="text-label text-foreground mb-2">{item.mode}</div>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
