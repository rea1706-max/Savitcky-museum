'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  category: string;
  collection: string;
  onView: boolean;
  image: string;
  imageAlt: string;
  inventoryNo: string;
  span?: string;
  heightClass?: string;
}

/* BENTO GRID AUDIT:
   Array has 8 artworks: [W1 cs-2 rs-2, W2 cs-1 rs-1, W3 cs-1 rs-1, W4 cs-1 rs-1, W5 cs-1 rs-1, W6 cs-2 rs-1, W7 cs-1 rs-1, W8 cs-1 rs-1]
   Grid is 3 columns.

   Row 1: [col-1-2: W1 cs-2 rs-2] [col-3: W2 cs-1 rs-1]
   Row 2: [col-1-2: W1 cs-2 rs-2 continued] [col-3: W3 cs-1 rs-1]
   Row 3: [col-1: W4 cs-1] [col-2: W5 cs-1] [col-3: W6 — but W6 cs-2 would overflow]
   ADJUSTED: W6 cs-1 on row 3 col-3, then W6 becomes W6 cs-1. New layout:
   Row 3: [col-1: W4] [col-2: W5] [col-3: W6]
   Row 4: [col-1-2: W7 cs-2] [col-3: W8 cs-1]
   Placed 8/8 cards ✓
*/
const artworks: Artwork[] = [
  {
    id: 'w1',
    title: 'Pomegranate Tea House',
    artist: 'Alexander Volkov',
    year: '1924',
    medium: 'Oil on canvas',
    category: 'Avant-Garde',
    collection: 'Russian & Turkestan Avant-Garde',
    onView: true,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_443d76e0c-1788530962802.png',
    imageAlt:
      'Large expressionist painting with bold geometric forms in deep reds and ochres, Central Asian architectural setting, flat planes of vivid color',
    inventoryNo: 'KM-1924-0047',
    span: 'col-span-1 md:col-span-2 md:row-span-2',
    heightClass: 'h-[400px] md:h-full',
  },
  {
    id: 'w2',
    title: 'Composition No. 7',
    artist: 'Nikolai Karakhan',
    year: '1928',
    medium: 'Oil on canvas',
    category: 'Avant-Garde',
    collection: 'Russian & Turkestan Avant-Garde',
    onView: true,
    image: 'https://images.unsplash.com/photo-1610926035936-25e59896a846',
    imageAlt:
      'Abstract composition with intersecting geometric planes in blue and ochre, Constructivist style, dynamic diagonal lines',
    inventoryNo: 'KM-1928-0112',
    span: 'col-span-1',
    heightClass: 'h-[240px]',
  },
  {
    id: 'w3',
    title: 'Suzani Embroidery',
    artist: 'Traditional Karakalpak',
    year: 'c. 1880',
    medium: 'Silk on cotton',
    category: 'Karakalpak Arts',
    collection: 'Karakalpak Decorative & Applied Arts',
    onView: true,
    image: 'https://images.unsplash.com/photo-1702588208627-e0df7326d15f',
    imageAlt:
      'Intricate embroidered textile with repeating geometric floral motifs in crimson, gold and indigo on cream ground',
    inventoryNo: 'KM-1880-0008',
    span: 'col-span-1',
    heightClass: 'h-[240px]',
  },
  {
    id: 'w4',
    title: 'Terracotta Vessel',
    artist: 'Ancient Khorezm',
    year: 'c. 3rd century BCE',
    medium: 'Terracotta',
    category: 'Khorezm',
    collection: 'Ancient Khorezm & Archaeology',
    onView: true,
    image: 'https://images.unsplash.com/photo-1684887930045-2883e9662130',
    imageAlt:
      'Ancient ceramic vessel with incised geometric decoration, warm terracotta clay, clean museum background',
    inventoryNo: 'KM-0300-0001',
    span: 'col-span-1',
    heightClass: 'h-[260px]',
  },
  {
    id: 'w5',
    title: 'Uzbek Landscape',
    artist: 'Ural Tansykbaev',
    year: '1941',
    medium: 'Oil on canvas',
    category: 'Modern',
    collection: 'Uzbek & Karakalpak Art',
    onView: false,
    image: 'https://images.unsplash.com/photo-1722098220722-edb9985cf7b2',
    imageAlt:
      'Fauvist landscape painting with intense saturated greens and blues, expressive brushwork, Central Asian mountain terrain',
    inventoryNo: 'KM-1941-0089',
    span: 'col-span-1',
    heightClass: 'h-[260px]',
  },
  {
    id: 'w6',
    title: 'Silver Headdress',
    artist: 'Traditional Karakalpak',
    year: 'c. 1900',
    medium: 'Silver, coral, turquoise',
    category: 'Karakalpak Arts',
    collection: 'Karakalpak Decorative & Applied Arts',
    onView: true,
    image: 'https://images.unsplash.com/photo-1629455669416-6f85f4ca9ea9',
    imageAlt:
      'Ornate silver ceremonial headdress with coral and turquoise inlays, traditional Karakalpak jewelry, dark museum background',
    inventoryNo: 'KM-1900-0234',
    span: 'col-span-1',
    heightClass: 'h-[260px]',
  },
  {
    id: 'w7',
    title: 'Constructivist Study',
    artist: 'Viktor Ufimtsev',
    year: '1926',
    medium: 'Gouache on paper',
    category: 'Avant-Garde',
    collection: 'Russian & Turkestan Avant-Garde',
    onView: true,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_4e973cd02-1788530962174.png',
    imageAlt:
      'Constructivist gouache study with bold diagonal red and black forms on cream ground, geometric abstraction',
    inventoryNo: 'KM-1926-0178',
    span: 'col-span-1 md:col-span-2',
    heightClass: 'h-[280px]',
  },
  {
    id: 'w8',
    title: 'Khorezm Coin',
    artist: 'Ancient Khorezm',
    year: 'c. 2nd century BCE',
    medium: 'Silver',
    category: 'Khorezm',
    collection: 'Ancient Khorezm & Archaeology',
    onView: false,
    image: 'https://images.unsplash.com/photo-1714216822027-604d0dda20d0',
    imageAlt:
      'Ancient silver coin with relief portrait and inscription, archaeological artifact, dark background',
    inventoryNo: 'KM-0200-0003',
    span: 'col-span-1',
    heightClass: 'h-[280px]',
  },
];

interface CollectionGridProps {
  category?: string;
}

const categoryNames: Record<string, string[]> = {
  'avant-garde': ['Avant-Garde'],
  'karakalpak-arts': ['Karakalpak Arts'],
  heritage: ['Khorezm'],
};

export default function CollectionGrid({ category = 'all' }: CollectionGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const selectedCategories = categoryNames[category];
  const visibleArtworks = selectedCategories
    ? artworks.filter((artwork) => selectedCategories.includes(artwork.category))
    : artworks;

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
      { threshold: 0.08 }
    );
    const elements = sectionRef.current?.querySelectorAll('.reveal-hidden');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="px-6 md:px-12 py-12 bg-background max-w-screen-xl mx-auto">
      {/* Result count */}
      <div className="flex items-center justify-between mb-8 reveal-hidden">
        <p className="text-label text-muted-foreground">
          Showing <span className="text-foreground font-medium">{visibleArtworks.length}</span> of
          82,000+ works
        </p>
      </div>

      {/* BENTO GRID
           Row 1: [col-1-2: W1 cs-2 rs-2] [col-3: W2 cs-1 rs-1]
           Row 2: [col-1-2: W1 continued] [col-3: W3 cs-1 rs-1]
           Row 3: [col-1: W4] [col-2: W5] [col-3: W6]
           Row 4: [col-1-2: W7 cs-2] [col-3: W8 cs-1]
           Placed 8/8 ✓
        */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        {visibleArtworks.map((artwork, index) => (
          /* Card: artwork.id — span: artwork.span */
          <Link
            key={artwork.id}
            href="#"
            className={`group relative overflow-hidden bg-muted reveal-hidden ${artwork.span || 'col-span-1'}`}
            style={{ transitionDelay: `${index * 80}ms` }}
            onMouseEnter={() => setHoveredId(artwork.id)}
            onMouseLeave={() => setHoveredId(null)}
            aria-label={`${artwork.title} by ${artwork.artist}, ${artwork.year}`}
          >
            {/* Image */}
            <div className={`overflow-hidden ${artwork.heightClass || 'h-[280px]'} relative`}>
              <AppImage
                src={artwork.image}
                alt={artwork.imageAlt}
                fill
                className={`object-cover transition-all duration-700 ease-museum ${
                  hoveredId === artwork.id ? 'scale-105 grayscale-0' : 'grayscale-[20%]'
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Hover metadata overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent transition-opacity duration-500 ${
                  hoveredId === artwork.id ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* On-view indicator */}
              {artwork.onView && (
                <div className="absolute top-3 left-3">
                  <span className="status-active text-xs bg-primary/70 backdrop-blur-sm px-2 py-1">
                    On View
                  </span>
                </div>
              )}

              {/* Hover: metadata reveal */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-5 transition-transform duration-500 ease-museum ${
                  hoveredId === artwork.id ? 'translate-y-0' : 'translate-y-full'
                }`}
              >
                <div className="archive-label inline-block mb-2 bg-primary/70 text-primary-foreground/60 border-primary-foreground/20">
                  {artwork.inventoryNo}
                </div>
                <h3 className="font-display text-base font-medium text-primary-foreground leading-tight mb-1">
                  {artwork.title}
                </h3>
                <p className="text-xs text-primary-foreground/70 font-light">
                  {artwork.artist} · {artwork.year}
                </p>
                <p className="text-xs text-primary-foreground/50 mt-0.5">{artwork.medium}</p>
              </div>
            </div>

            {/* Below-image metadata (always visible) */}
            <div className="bg-background px-4 py-3 border-t border-border">
              <p className="text-xs font-medium text-foreground truncate">{artwork.title}</p>
              <p className="text-xs text-muted-foreground font-light mt-0.5">
                {artwork.artist} · {artwork.year}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Load more */}
      <div className="flex justify-center mt-12 reveal-hidden">
        <button className="btn-outline px-12">Load More Works</button>
      </div>
    </div>
  );
}
