'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

interface ContentItem {
  id: string;
  type: 'video' | 'article' | 'external';
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  duration?: string;
  readTime?: string;
  source?: string;
  href: string;
  featured?: boolean;
}

const items: ContentItem[] = [
{
  id: 'm1',
  type: 'video',
  tag: 'Reel',
  title: 'Inside the Vaults',
  excerpt: 'A rare look at the museum storage — thousands of works waiting for their moment in the light.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_45b2bc068-1788627713692.png",
  imageAlt: 'Museum storage vault with rows of framed avant-garde paintings on sliding racks, warm archival lighting, Nukus museum interior',
  duration: '1:42',
  href: '#',
  featured: true
},
{
  id: 'm2',
  type: 'article',
  tag: 'Museum Life',
  title: 'Restoration in Progress',
  excerpt: 'Our conservators are working on a 1930s Turkestan canvas — a process that takes months of patience.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_46ebb1ed6-1788627712885.png",
  imageAlt: 'Art conservator carefully cleaning an aged canvas painting with fine tools, close-up of restoration work in museum studio',
  readTime: '4 min',
  href: '#'
},
{
  id: 'm3',
  type: 'external',
  tag: 'Press',
  title: 'The Louvre of the Steppe',
  excerpt: 'The Guardian on why the Savitsky Museum is one of the world\'s most important cultural institutions.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_158ebab51-1773216198143.png",
  imageAlt: 'Karakalpak ornamental textile detail, deep crimson and gold geometric embroidery, traditional Central Asian craft',
  source: 'The Guardian',
  href: '#'
},
{
  id: 'm4',
  type: 'video',
  tag: 'Reel',
  title: 'Karakalpak Craft Today',
  excerpt: 'Local artisans continue the ornamental traditions that fill our decorative arts collection.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f8cf00df-1764641083614.png",
  imageAlt: 'Karakalpak artisan weaving traditional geometric pattern on loom, hands in motion, warm workshop light',
  duration: '2:18',
  href: '#'
},
{
  id: 'm5',
  type: 'article',
  tag: 'Research',
  title: 'Savitsky\'s Letters',
  excerpt: 'Newly digitised correspondence reveals how Savitsky negotiated with Soviet authorities to save suppressed art.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_128ad06ee-1770772414980.png",
  imageAlt: 'Stack of aged handwritten letters and archival documents, sepia tones, historical correspondence from Soviet era',
  readTime: '7 min',
  href: '#'
},
{
  id: 'm6',
  type: 'external',
  tag: 'Publication',
  title: 'Desert Archive — New Monograph',
  excerpt: 'A new scholarly publication documents the full scope of the Savitsky collection for the first time.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_139a48f59-1773722663439.png",
  imageAlt: 'Open art monograph book showing full-bleed reproductions of avant-garde paintings, editorial design, museum publication',
  source: 'Hatje Cantz',
  href: '#'
}];


function TypeIcon({ type }: {type: ContentItem['type'];}) {
  if (type === 'video') {
    return (
      <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
        <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" className="text-primary-foreground ml-0.5" aria-hidden="true">
          <path d="M1 1l10 6-10 6V1z" />
        </svg>
      </div>);

  }
  if (type === 'external') {
    return (
      <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-accent/80 backdrop-blur-sm flex items-center justify-center">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground" aria-hidden="true">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
        </svg>
      </div>);

  }
  return null;
}

export default function MuseumToday() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection observer for section reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Track active card on scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handleScroll = () => {
      const cards = track.querySelectorAll('.museum-card');
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.left - 80);
        if (dist < minDist) {minDist = dist;closest = i;}
      });
      setActiveIndex(closest);
    };
    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse drag scroll
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (trackRef.current?.offsetLeft || 0));
    setScrollLeft(trackRef.current?.scrollLeft || 0);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };
  const onMouseUp = () => setIsDragging(false);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll('.museum-card');
    const card = cards[index] as HTMLElement;
    if (card) {
      track.scrollTo({ left: card.offsetLeft - 80, behavior: 'smooth' });
    }
  };

  const featured = items.find((i) => i.featured);
  const rest = items.filter((i) => !i.featured);

  return (
    <section
      ref={sectionRef}
      id="stories"
      className="py-16 md:py-24 bg-primary overflow-hidden relative"
      aria-labelledby="museum-today-heading">
      
      {/* Karakalpak ornament background — very subtle */}
      <div className="absolute inset-0 kk-pattern-dark opacity-60 pointer-events-none" aria-hidden="true" />

      {/* Section header */}
      <div
        className={`px-6 md:px-12 mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-label text-primary-foreground/40 mb-3 block">Музей сегодня</span>
            <h2
              id="museum-today-heading"
              className="font-display font-light text-primary-foreground"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.025em' }}>
              
              Museum Today
            </h2>
            <p className="text-sm text-primary-foreground/50 mt-3 font-light max-w-md">
              Life at the museum — short films, research notes, and press from around the world.
            </p>
          </div>
          {/* Scroll indicator */}
          <div className="hidden md:flex items-center gap-3 text-primary-foreground/40">
            <span className="text-label">Drag to explore</span>
            <svg width="32" height="12" viewBox="0 0 32 12" fill="none" aria-hidden="true">
              <path d="M0 6h28M22 1l6 5-6 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
        style={{ paddingLeft: '5vw', paddingRight: '5vw', scrollSnapType: 'x mandatory' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        role="list"
        aria-label="Museum Today content feed">
        
        {/* Featured card — wider */}
        {featured &&
        <Link
          href={featured.href}
          className="museum-card flex-none relative overflow-hidden group"
          style={{
            width: 'clamp(280px, 38vw, 520px)',
            scrollSnapAlign: 'start',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}
          role="listitem"
          draggable={false}>
          
            <div className="relative overflow-hidden" style={{ height: 'clamp(380px, 55vw, 600px)' }}>
              <AppImage
              src={featured.image}
              alt={featured.imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 80vw, 38vw"
              priority />
            
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
              <TypeIcon type={featured.type} />
              {/* Featured badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-label text-primary-foreground/80 bg-accent/90 px-3 py-1">
                  Featured
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <span className="artwork-tag border-primary-foreground/20 text-primary-foreground/50 mb-3 inline-block">
                  {featured.tag}
                </span>
                <h3
                className="font-display font-medium text-primary-foreground mb-2 leading-tight group-hover:text-accent transition-colors"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', letterSpacing: '-0.02em' }}>
                
                  {featured.title}
                </h3>
                <p className="text-sm text-primary-foreground/60 font-light leading-relaxed line-clamp-2">
                  {featured.excerpt}
                </p>
                {featured.duration &&
              <p className="text-label text-primary-foreground/40 mt-3">{featured.duration}</p>
              }
              </div>
            </div>
          </Link>
        }

        {/* Rest of cards */}
        {rest.map((item, i) =>
        <Link
          key={item.id}
          href={item.href}
          className="museum-card flex-none relative overflow-hidden group"
          style={{
            width: 'clamp(220px, 26vw, 360px)',
            scrollSnapAlign: 'start',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
            transition: `opacity 0.8s ease ${(i + 1) * 120}ms, transform 0.8s ease ${(i + 1) * 120}ms`
          }}
          role="listitem"
          draggable={false}>
          
            <div className="relative overflow-hidden" style={{ height: 'clamp(300px, 42vw, 480px)' }}>
              <AppImage
              src={item.image}
              alt={item.imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 70vw, 26vw" />
            
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <TypeIcon type={item.type} />
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="artwork-tag border-primary-foreground/20 text-primary-foreground/50">
                    {item.tag}
                  </span>
                  {item.source &&
                <span className="text-label text-accent/80">{item.source}</span>
                }
                </div>
                <h3
                className="font-display font-medium text-primary-foreground mb-2 leading-tight group-hover:text-accent transition-colors"
                style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', letterSpacing: '-0.015em' }}>
                
                  {item.title}
                </h3>
                <p className="text-xs text-primary-foreground/50 font-light leading-relaxed line-clamp-2">
                  {item.excerpt}
                </p>
                {item.readTime &&
              <p className="text-label text-primary-foreground/30 mt-2">{item.readTime} read</p>
              }
                {item.duration &&
              <p className="text-label text-primary-foreground/30 mt-2">{item.duration}</p>
              }
              </div>
            </div>
          </Link>
        )}

        {/* End spacer */}
        <div className="flex-none w-12" aria-hidden="true" />
      </div>

      {/* Dot navigation */}
      <div
        className={`flex items-center justify-center gap-2 mt-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        role="tablist"
        aria-label="Navigate content">
        
        {items.map((_, i) =>
        <button
          key={i}
          onClick={() => scrollTo(i)}
          className={`transition-all duration-300 ${
          activeIndex === i ?
          'w-6 h-1.5 bg-accent' : 'w-1.5 h-1.5 bg-primary-foreground/20 hover:bg-primary-foreground/40'}`
          }
          aria-label={`Go to item ${i + 1}`}
          role="tab"
          aria-selected={activeIndex === i} />

        )}
      </div>

      {/* Bottom ornament divider */}
      <div className="px-6 md:px-12 mt-12" aria-hidden="true">
        <KKOrnamentDivider light />
      </div>
    </section>);

}

export function KKOrnamentDivider({ light = false }: {light?: boolean;}) {
  const color = light ? 'rgba(241,235,221,0.15)' : 'rgba(24,23,20,0.12)';
  const accentColor = light ? 'rgba(166,64,45,0.5)' : 'rgba(166,64,45,0.4)';
  return (
    <div className="relative flex items-center gap-4 w-full" aria-hidden="true">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color} 40%, ${color} 60%, transparent)` }} />
      <svg width="48" height="16" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="4" width="8" height="8" transform="rotate(45 24 8)" stroke={accentColor} strokeWidth="1" fill="none" />
        <rect x="22" y="6" width="4" height="4" transform="rotate(45 24 8)" fill={accentColor} />
        <line x1="0" y1="8" x2="16" y2="8" stroke={color} strokeWidth="0.5" />
        <line x1="32" y1="8" x2="48" y2="8" stroke={color} strokeWidth="0.5" />
        <circle cx="8" cy="8" r="1.5" fill={color} />
        <circle cx="40" cy="8" r="1.5" fill={color} />
      </svg>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color} 40%, ${color} 60%, transparent)` }} />
    </div>);

}