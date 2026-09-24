'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import '@/styles/museum-tokens.css';

export default function InfoStrip() {
  const { t } = useLanguage();

  return (
    <div
      data-museum-info
      className="w-full relative z-10 py-5 flex items-center justify-center"
      style={{ background: 'var(--museum-charcoal)' }}
    >
      {/* Subtle ornament divider top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'var(--museum-earth)', opacity: 0.12 }}
        aria-hidden="true"
      />
      {/* Subtle ornament divider bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'var(--museum-earth)', opacity: 0.12 }}
        aria-hidden="true"
      />

      {/* Centered info frame */}
      <div
        className="inline-flex items-center gap-6 md:gap-10 px-8 py-3 border"
        style={{
          background: 'var(--museum-charcoal)',
          borderColor: 'color-mix(in srgb, var(--museum-earth) 40%, transparent)',
          color: 'var(--museum-silver)',
        }}
      >
        {/* Green dot + hours */}
        <span className="text-metadata flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
            style={{ background: 'var(--museum-ochre)' }}
            aria-hidden="true"
          />
          {t.info.hoursValue}
        </span>

        {/* Separator */}
        <span className="text-metadata hidden sm:block" style={{ color: 'var(--museum-earth)' }}>
          ·
        </span>

        {/* Collection */}
        <span className="hidden sm:block text-metadata">{t.info.collectionValue}</span>

        {/* Separator */}
        <span className="text-metadata hidden md:block" style={{ color: 'var(--museum-earth)' }}>
          ·
        </span>

        {/* Location */}
        <span className="hidden md:block text-metadata" style={{ color: 'var(--museum-earth)' }}>
          {t.info.locationValue}
        </span>
      </div>
    </div>
  );
}
