'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import { useLanguage } from '@/lib/i18n';

const pathProps = { fill: 'none', vectorEffect: 'non-scaling-stroke' as const };

export default function OpeningSequence() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void import('./openingAnimation').then(({ createOpeningAnimation }) => {
      if (!disposed && rootRef.current) cleanup = createOpeningAnimation(rootRef.current);
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <Header openingSequence />
      <div
        id="opening-hero"
        style={{
          position: 'relative',
          width: '100%',
          height: '100svh',
          overflow: 'hidden',
          background: '#191816',
        }}
        aria-label={t.ui.openingSequence}
      >
        {/* ── LAYER 1: USTYURT BACKGROUND ── */}
        <div
          data-landscape
          style={{
            position: 'absolute',
            inset: 0,
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
            zIndex: 1,
          }}
        >
          <Image
            src="/assets/images/ustyurt-hero.jpg-1788636504270.webp"
            alt={t.ui.ustyurtAlt}
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 40%',
              display: 'block',
              filter: 'saturate(0.82) brightness(0.94)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(20,17,14,.08) 0%, rgba(20,17,14,.14) 50%, rgba(20,17,14,.28) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ── LAYER 2: SUBTLE DESERT OVERLAY ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(232,223,207,0.04)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* A continuous ivory wash echoes panel 03 without clearing the landscape. */}
        <div
          data-ivory
          style={{
            position: 'absolute',
            inset: 0,
            background: '#E8DFCF',
            opacity: 0,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* A fixed portrait plane; the supplied photograph stays undistorted. */}
        <div
          data-aperture
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            opacity: 0,
            clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
            pointerEvents: 'none',
          }}
        >
          <div
            data-portrait-plane
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            {/* Preserve the high-resolution portrait without stretching its proportions. */}
            <Image
              data-art-image
              src="/images/culture/karakalpak-cultural-portrait-hq.png"
              alt={t.ui.portraitAlt}
              width={1227}
              height={1281}
              quality={100}
              sizes="100vw"
              priority
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                maxWidth: 'none',
                objectFit: 'cover',
                objectPosition: '56% 0%',
              }}
            />
          </div>
          <div
            data-portrait-veil
            style={{ position: 'absolute', inset: 0, background: '#F2EBDD', opacity: 0.025 }}
          />
        </div>

        <svg
          data-ornament
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 4,
            overflow: 'visible',
            pointerEvents: 'none',
            color: '#F2EBDD',
            visibility: 'hidden',
          }}
          stroke="currentColor"
          strokeWidth="1.1"
          aria-hidden="true"
        >
          <g data-arm="top">
            <path {...pathProps} data-path="spine-top" data-draw="spine" opacity="0.86" />
            <path {...pathProps} data-path="node-top" data-draw="diamonds" opacity="0.9" />
            <path {...pathProps} data-path="node-upper" data-draw="diamonds" opacity="0.9" />
            <path
              {...pathProps}
              data-path="upper-connection"
              data-draw="diagonals"
              opacity="0.62"
              strokeWidth="0.85"
            />
          </g>
          <path
            {...pathProps}
            data-center-outline
            data-path="center"
            data-draw="diamonds"
            opacity="0.92"
          />
          <g data-arm="bottom">
            <path {...pathProps} data-path="spine-bottom" data-draw="spine" opacity="0.86" />
            <path {...pathProps} data-path="node-lower" data-draw="diamonds" opacity="0.9" />
            <path {...pathProps} data-path="node-bottom" data-draw="diamonds" opacity="0.9" />
            <path
              {...pathProps}
              data-path="lower-connection"
              data-draw="diagonals"
              opacity="0.62"
              strokeWidth="0.85"
            />
          </g>
          {(['left', 'right'] as const).map((side) => (
            <g data-arm={side} key={side}>
              <path
                {...pathProps}
                data-path={side + '-line'}
                data-draw="horizontals"
                opacity="0.88"
              />
              <path
                {...pathProps}
                data-path={side + '-upper'}
                data-draw="diagonals"
                opacity="0.64"
                strokeWidth="0.9"
              />
              <path
                {...pathProps}
                data-path={side + '-lower'}
                data-draw="diagonals"
                opacity="0.56"
                strokeWidth="0.85"
              />
              <path {...pathProps} data-path={side + '-node'} data-draw="nodes" opacity="0.9" />
              <path {...pathProps} data-path={side + '-end'} data-draw="nodes" opacity="0.86" />
              <path
                {...pathProps}
                data-path={side + '-junction'}
                data-draw="nodes"
                opacity="0.64"
                strokeWidth="0.9"
              />
            </g>
          ))}
          <path {...pathProps} data-aperture-border opacity="0" strokeWidth="1.2" />
        </svg>

        {/* ── LAYER 6: HERO TEXT GROUP ── */}
        <div
          data-hero-copy
          style={{
            position: 'absolute',
            bottom: '10vh',
            left: '8vw',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            width: '84vw',
            maxWidth: '84vw',
          }}
        >
          {/* Location */}
          <div data-hero-detail style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div
              style={{ width: '22px', height: '1.5px', background: '#9D3028', marginBottom: '6px' }}
            />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(242,235,221,0.92)',
                lineHeight: 2.0,
                textShadow: '0 1px 8px rgba(20,17,14,0.55)',
              }}
            >
              {t.opening.city}
              <br />
              {t.opening.region}
              <br />
              {t.opening.country}
            </span>
          </div>

          {/* SAVITSKY masked reveal */}
          <div
            data-hero-title
            style={{
              width: '100%',
              paddingRight: '0.08em',
              overflow: 'hidden',
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                fontWeight: 400,
                fontSize: 'clamp(82px, 11.2vw, 176px)',
                lineHeight: 0.9,
                letterSpacing: '-0.035em',
                color: '#F2EBDD',
                margin: 0,
                whiteSpace: 'nowrap',
              }}
            >
              {t.ui.brandLine1}
            </h1>
          </div>

          {/* Subtitle */}
          <div data-hero-detail>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: 'clamp(10px, 1.1vw, 12px)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(242,235,221,0.92)',
                margin: 0,
                maxWidth: '360px',
                lineHeight: 1.85,
                textShadow: '0 1px 8px rgba(20,17,14,0.55)',
              }}
            >
              {t.hero.subtitle}
            </p>
          </div>
        </div>

        {/* ── SCROLL INDICATOR ── */}
        <div
          data-scroll-cue
          style={{
            position: 'absolute',
            bottom: '8vh',
            right: '8vw',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
          aria-label={t.ui.scrollToExplore}
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '9px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(242,235,221,0.55)',
            }}
          >
            {t.opening.scroll}
          </span>
          <svg width="18" height="30" viewBox="0 0 18 30" fill="none" aria-hidden="true">
            <rect
              x="0.5"
              y="0.5"
              width="17"
              height="29"
              rx="8.5"
              stroke="rgba(242,235,221,0.35)"
              strokeWidth="1"
            />
            <rect
              x="8"
              y="5"
              width="2"
              height="6"
              rx="1"
              fill="rgba(242,235,221,0.55)"
              className="scroll-dot-anim"
            />
          </svg>
        </div>

        {/* ── SCENE 03: METADATA ── */}
        <div
          data-art-caption
          style={{
            position: 'absolute',
            bottom: '10vh',
            left: '8vw',
            zIndex: 25,
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            opacity: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#191816',
            }}
          >
            {t.opening.heritage}
          </span>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#8A7258',
            }}
          >
            {t.opening.costume}
          </span>
        </div>

        {/* ── EDITORIAL COPY (far right) ── */}
        <div
          data-art-caption
          style={{
            position: 'absolute',
            top: '18%',
            right: '6vw',
            zIndex: 25,
            maxWidth: '130px',
            opacity: 0,
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#8A7258',
              lineHeight: 1.9,
              margin: 0,
            }}
          >
            {t.desert.quoteLine1}
            <br />
            {t.desert.quoteLine2}
          </p>
        </div>
      </div>

      <style>{`
        .scroll-dot-anim {
          animation: scrollDotMove 2.2s ease-in-out infinite;
        }
        @keyframes scrollDotMove {
          0%, 100% { transform: translateY(0); opacity: 0.55; }
          50% { transform: translateY(8px); opacity: 0.9; }
        }
        @media (max-width: 639px) {
          [data-hero-copy] { width: 84vw !important; max-width: 84vw !important; }
          [data-hero-title] h1 { font-size: 16.5vw !important; }
          [data-art-caption] { max-width: 105px !important; }
          [data-scroll-cue] { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-dot-anim { animation: none; }
        }
      `}</style>
    </div>
  );
}
