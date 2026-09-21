'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function InstitutionalStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    const elements = sectionRef?.current?.querySelectorAll('.reveal-hidden');
    elements?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-12 py-24 md:py-32 bg-background relative overflow-hidden"
      aria-labelledby="statement-heading"
    >
      {/* Grid lines */}
      <div className="absolute inset-0 grid-lines-overlay opacity-50" aria-hidden="true" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Large statement text */}
          <div className="lg:col-span-7 reveal-hidden">
            <span className="text-label text-muted-foreground mb-8 block">About the Museum</span>
            <h2
              id="statement-heading"
              className="font-display font-light text-foreground leading-tight mb-10"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
                letterSpacing: '-0.025em',
                lineHeight: '1.1',
              }}
            >
              In the middle of the desert,
              <br />
              <em className="font-medium not-italic text-accent">against all odds,</em>
              <br />
              one man assembled
              <br />a world-class collection.
            </h2>
            <div className="pattern-divider mb-10 opacity-40" aria-hidden="true" />
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-6 font-light">
              The Savitsky Museum holds the world&apos;s second-largest collection of Russian
              avant-garde art — works suppressed under Stalin, saved by Igor Savitsky and brought to
              Nukus, Karakalpakstan. The Guardian called it the &ldquo;Louvre of Uzbekistan.&rdquo;
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-xl font-light">
              Alongside 10,000 avant-garde works, the museum preserves Karakalpak decorative arts,
              textiles, jewelry, and artefacts from Ancient Khorezm. 82,000 objects in total.
            </p>
          </div>

          {/* Portrait + archive annotation */}
          <div className="lg:col-span-5 reveal-hidden" style={{ transitionDelay: '200ms' }}>
            <div className="relative card-offset">
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_16895185a-1778547039065.png"
                  alt="Archival portrait photograph, warm sepia tones, serious scholarly figure in dim studio light, dark background, intellectual atmosphere"
                  fill
                  className="object-cover artwork-hover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              {/* Archive annotation */}
              <div className="absolute bottom-0 left-0 right-0 bg-primary/80 backdrop-blur-sm p-4">
                <div className="archive-label inline-block mb-2">Archive</div>
                <p className="text-sm text-primary-foreground/80 font-light">
                  Igor Savitsky, 1913–1984
                </p>
                <p className="text-label text-primary-foreground/50 mt-1">
                  Painter · Archaeologist · Collector
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px mt-px bg-border">
              <div className="bg-background p-5">
                <div className="font-display text-3xl font-light text-foreground mb-1">1966</div>
                <div className="text-label text-muted-foreground">Museum Founded</div>
              </div>
              <div className="bg-background p-5">
                <div className="font-display text-3xl font-light text-foreground mb-1">10,000</div>
                <div className="text-label text-muted-foreground">Avant-garde works</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
