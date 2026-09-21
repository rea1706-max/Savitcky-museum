'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function LandscapeInterlude() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));
      const inner = imgRef.current.querySelector('.parallax-inner') as HTMLElement;
      if (inner) {
        inner.style.transform = `translateY(${(clampedProgress - 0.5) * 60}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={imgRef}
      className="relative w-full overflow-hidden"
      style={{ height: 'clamp(320px, 55vw, 700px)' }}
      aria-label="Karakalpakstan landscape"
    >
      <div className="parallax-inner absolute inset-[-60px]">
        <AppImage
          src="https://images.unsplash.com/photo-1656007467557-b87e3ed6ca62"
          alt="Vast arid desert plain at dawn, horizon line very low, enormous pale sky, cracked salt flat in foreground, absolute silence and scale, deep shadows"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Very subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/10" />

      {/* Geographic marker */}
      <div className="absolute bottom-10 left-6 md:left-12 z-10">
        <div className="flex items-center gap-3">
          <div className="w-px h-10 bg-primary-foreground/40" aria-hidden="true" />
          <div>
            <p className="text-label text-primary-foreground/60">41°33′N 60°37′E</p>
            <p className="text-sm text-primary-foreground/40 font-light mt-0.5">
              Karakalpakstan, Uzbekistan
            </p>
          </div>
        </div>
      </div>

      {/* Right side quiet text */}
      <div className="absolute bottom-10 right-6 md:right-12 z-10 text-right hidden md:block">
        <p
          className="font-display font-light text-primary-foreground/30 leading-tight"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
        >
          The desert provides
          <br />
          the space.
        </p>
      </div>
    </section>
  );
}
