'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const timelineItems = [
  { year: '1913', event: 'Born in Kiev, Ukraine' },
  { year: '1950', event: 'First visits Karakalpakstan with the Khorezm Archaeological Expedition' },
  { year: '1956', event: 'Begins systematic collection of avant-garde works' },
  { year: '1966', event: 'Founds the museum in Nukus' },
  { year: '1970s', event: 'Secretly acquires suppressed Soviet-era artworks' },
  { year: '1984', event: 'Dies in Nukus. The collection passes to Marinika Babanazarova' },
  { year: '2003', event: 'New museum building opens, collection expanded publicly' },
];

export default function SavitskyStory() {
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
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll('.reveal-hidden');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="savitsky"
      className="bg-primary noise-overlay relative overflow-hidden"
      aria-labelledby="savitsky-heading"
    >
      <div className="px-6 md:px-12 py-16 md:py-24 max-w-screen-xl mx-auto relative z-10">
        {/* Oversized year */}
        <div
          className="absolute top-8 right-6 md:right-12 select-none pointer-events-none"
          aria-hidden="true"
        >
          <span
            className="font-display font-light text-primary-foreground/5"
            style={{
              fontSize: 'clamp(6rem, 20vw, 18rem)',
              lineHeight: '0.85',
              letterSpacing: '-0.04em',
            }}
          >
            1966
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: Image */}
          <div className="lg:col-span-5 reveal-hidden">
            <div
              className="relative card-offset"
              style={{ '--tw-shadow': 'none' } as React.CSSProperties}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_174e4529b-1776427853383.png"
                  alt="Desert landscape with ancient ruins silhouetted against warm amber sky at dusk, archaeological site in remote Uzbekistan, dust and heat"
                  fill
                  className="object-cover artwork-hover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
              <div className="absolute top-4 left-4">
                <div className="archive-label bg-primary/80 text-primary-foreground/60 border-primary-foreground/20">
                  Karakalpakstan, 1950s
                </div>
              </div>
            </div>
          </div>

          {/* Right: Narrative + Timeline */}
          <div className="lg:col-span-7 reveal-hidden" style={{ transitionDelay: '200ms' }}>
            <span className="text-label text-primary-foreground/40 mb-4 block">The Founder</span>
            <h2
              id="savitsky-heading"
              className="font-display font-light text-primary-foreground mb-8 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.025em' }}
            >
              Igor Savitsky
              <br />
              <em className="font-medium not-italic text-accent">saved what Stalin</em>
              <br />
              wanted destroyed.
            </h2>

            <p className="text-base text-primary-foreground/60 leading-relaxed font-light mb-4 max-w-xl">
              A Russian painter and archaeologist, Savitsky came to Karakalpakstan in 1950 for a
              Khorezm expedition. He never truly left. Over three decades, he assembled a collection
              of avant-garde works purged from Soviet cultural memory — paying artists and their
              families modest sums, often from his own salary.
            </p>
            <p className="text-base text-primary-foreground/60 leading-relaxed font-light mb-12 max-w-xl">
              Many artists whose works he saved had been arrested, imprisoned, or erased. Their
              paintings survived because they were far from Moscow, in the desert.
            </p>

            {/* Timeline */}
            <div className="space-y-0 mb-10">
              {timelineItems.map((item, i) => (
                <div
                  key={item.year}
                  className="flex gap-6 group"
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="w-px flex-1 bg-primary-foreground/10 group-first:hidden"
                      aria-hidden="true"
                    />
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div
                      className="w-px flex-1 bg-primary-foreground/10 group-last:hidden"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="pb-5 pt-0.5 flex gap-6 items-start">
                    <span className="text-label text-accent w-12 flex-shrink-0">{item.year}</span>
                    <span className="text-sm text-primary-foreground/50 font-light leading-relaxed">
                      {item.event}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="#"
              className="btn-outline border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Discover Igor Savitsky
              <svg
                width="12"
                height="12"
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
    </section>
  );
}
