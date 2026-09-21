'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

/**
 * DesertInterlude — the atmospheric "41°33′N 60°37′E" block.
 * Moved off the main scroll; used as a textural interlude between sections.
 * Preserves the original photo, coordinates, and "The desert provides the space" text.
 */
export default function DesertInterlude() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      const inner = imgRef.current.querySelector('.parallax-inner') as HTMLElement;
      if (inner) {
        inner.style.transform = `translateY(${(clamped - 0.5) * 70}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={imgRef}
      className="relative w-full overflow-hidden"
      style={{ height: 'clamp(340px, 58vw, 720px)' }}
      aria-label="Desert landscape — Karakalpakstan"
    >
      {/* Parallax image */}
      <div className="parallax-inner absolute inset-[-70px]">
        <AppImage
          src="https://images.unsplash.com/photo-1656007467557-b87e3ed6ca62"
          alt="Vast arid desert plain at dawn, horizon line very low, enormous pale sky, cracked salt flat in foreground, absolute silence and scale, deep shadows"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-transparent" />

      {/* Karakalpak ornament border — top */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 md:px-12 pt-6" aria-hidden="true">
        <div
          className="h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(241,235,221,0.2) 30%, rgba(166,64,45,0.3) 50%, rgba(241,235,221,0.2) 70%, transparent)',
          }}
        />
      </div>

      {/* Geographic marker — bottom left */}
      <div className="absolute bottom-10 left-6 md:left-12 z-10">
        <div className="flex items-start gap-4">
          <div className="w-px h-14 bg-primary-foreground/30 mt-1" aria-hidden="true" />
          <div>
            <p className="text-label text-primary-foreground/50 tracking-widest">41°33′N 60°37′E</p>
            <p className="text-sm text-primary-foreground/35 font-light mt-1">
              Karakalpakstan, Uzbekistan
            </p>
          </div>
        </div>
      </div>

      {/* Right side — atmospheric text */}
      <div className="absolute bottom-10 right-6 md:right-12 z-10 text-right hidden md:block">
        <p
          className="font-display font-light text-primary-foreground/35 leading-tight"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.75rem)', letterSpacing: '-0.02em' }}
        >
          The desert provides
          <br />
          the space.
        </p>
      </div>

      {/* Karakalpak ornament border — bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 pb-6" aria-hidden="true">
        <div
          className="h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(241,235,221,0.2) 30%, rgba(166,64,45,0.3) 50%, rgba(241,235,221,0.2) 70%, transparent)',
          }}
        />
      </div>
    </section>
  );
}
