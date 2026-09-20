'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const stories = [
  {
    id: 's1',
    type: 'Collection Story',
    readTime: '8 min',
    title: 'The Avant-Garde in Nukus',
    excerpt:
      'How Constructivism, Cubism and Futurism survived Stalin in the Uzbek desert — and what their survival means for art history.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1465d2c38-1775556134679.png',
    imageAlt:
      'Abstract expressionist canvas with bold geometric planes in deep reds and ochres, avant-garde composition, museum gallery context',
    featured: true,
    href: '/stories',
  },
  {
    id: 's2',
    type: 'Archive',
    readTime: '5 min',
    title: 'Inside the Savitsky Archive',
    excerpt:
      "Photographs, correspondence and objects from Savitsky's personal collection — a portrait of an obsessive collector.",
    image: 'https://images.unsplash.com/photo-1572519618746-41752dff5b91',
    imageAlt:
      'Archival documents and photographs spread on wooden table, warm candlelight, sepia-toned historical materials, handwritten notes',
    featured: false,
    href: '/stories',
  },
  {
    id: 's3',
    type: 'Culture',
    readTime: '6 min',
    title: 'Patterns of Karakalpakstan',
    excerpt:
      'The geometric vocabulary of Karakalpak textiles as a living design system — tradition as structural intelligence.',
    image: 'https://images.unsplash.com/photo-1652722426884-647880c63bf1',
    imageAlt:
      'Close-up of Karakalpak embroidery geometric pattern, rich crimson threads on cream ground, intricate needlework',
    featured: false,
    href: '/stories',
  },
  {
    id: 's4',
    type: 'Archaeology',
    readTime: '10 min',
    title: 'Ancient Khorezm',
    excerpt:
      "The fortresses of the Khorezm civilization — one of the ancient world's great cultures, now archaeological sites in the Karakalpak desert.",
    image: 'https://images.unsplash.com/photo-1584114130913-0852aeb8fe8c',
    imageAlt:
      'Ancient archaeological ruins at sunset, crumbling mud-brick walls casting long shadows, warm desert light, remote landscape',
    featured: false,
    href: '/stories',
  },
];

export default function StoriesJournal() {
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
    const elements = sectionRef?.current?.querySelectorAll('.reveal-hidden');
    elements?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  const featured = stories?.find((s) => s?.featured);
  const grid = stories?.filter((s) => !s?.featured);

  return (
    <section
      ref={sectionRef}
      id="stories"
      className="px-6 md:px-12 py-16 md:py-24 bg-background"
      aria-labelledby="stories-heading"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal-hidden">
          <div>
            <span className="text-label text-muted-foreground mb-3 block">Journal</span>
            <h2
              id="stories-heading"
              className="font-display font-light text-foreground"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.025em' }}
            >
              Stories
            </h2>
          </div>
          <Link href="/stories" className="btn-ghost self-start md:self-end">
            All Stories
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

        {/* Featured story */}
        {featured && (
          <Link href={featured?.href} className="block group mb-px reveal-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-border">
              <div className="lg:col-span-8 overflow-hidden bg-muted h-[320px] md:h-[480px]">
                <AppImage
                  src={featured?.image}
                  alt={featured?.imageAlt}
                  fill
                  className="object-cover artwork-hover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
              <div className="lg:col-span-4 bg-muted p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="artwork-tag">{featured?.type}</span>
                    <span className="text-label text-muted-foreground">
                      {featured?.readTime} read
                    </span>
                  </div>
                  <h3
                    className="font-display font-medium text-foreground mb-4 leading-tight group-hover:text-accent transition-colors"
                    style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.02em' }}
                  >
                    {featured?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {featured?.excerpt}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-label text-foreground group-hover:text-accent transition-colors">
                  Read Story
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
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid stories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {grid?.map((story, i) => (
            <Link
              key={story?.id}
              href={story?.href}
              className="group bg-background reveal-hidden"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="overflow-hidden h-[220px] bg-muted">
                <AppImage
                  src={story?.image}
                  alt={story?.imageAlt}
                  fill
                  className="object-cover artwork-hover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="artwork-tag">{story?.type}</span>
                  <span className="text-label text-muted-foreground">{story?.readTime}</span>
                </div>
                <h3 className="font-display text-base font-medium text-foreground mb-3 leading-snug group-hover:text-accent transition-colors">
                  {story?.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light line-clamp-3">
                  {story?.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
