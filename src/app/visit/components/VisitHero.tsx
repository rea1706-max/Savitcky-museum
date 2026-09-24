'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';
import { useLanguage } from '@/lib/i18n';

export default function VisitHero() {
  const { t } = useLanguage();

  return (
    <section
      className="relative pt-[72px] md:pt-[88px] overflow-hidden bg-primary"
      aria-labelledby="visit-hero-heading"
    >
      <div className="relative h-[280px] md:h-[360px] overflow-hidden">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_16c8d6924-1765746942795.png"
          alt="Museum exterior facade in warm afternoon light"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/95" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-12 pt-32">
        <div className="max-w-screen-xl mx-auto w-full">
          <span className="text-label text-primary-foreground/40 block mb-4">
            {t.visitPage.eyebrow}
          </span>
          <h1
            id="visit-hero-heading"
            className="font-display font-light text-primary-foreground"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: '0.92',
              letterSpacing: '-0.03em',
            }}
          >
            {t.visitPage.titleLine1}
            <br />
            <em className="font-medium not-italic">{t.visitPage.titleLine2}</em>
          </h1>
          <p className="text-base text-primary-foreground/50 mt-4 font-light max-w-lg">
            {t.visitPage.intro}
          </p>
        </div>
      </div>
    </section>
  );
}
