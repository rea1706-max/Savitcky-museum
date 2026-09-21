import React from 'react';
import AppImage from '@/components/ui/AppImage';

export default function CollectionHero() {
  return (
    <section
      className="relative pt-[72px] md:pt-[88px] bg-primary overflow-hidden"
      aria-labelledby="collection-hero-heading"
    >
      <div className="relative h-[320px] md:h-[420px] overflow-hidden">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_18ab39334-1772064904874.png"
          alt="Museum gallery interior with large abstract paintings on warm white walls, polished floors, dramatic natural light through high windows"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/90" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-12 md:pb-16 pt-32">
        <div className="max-w-screen-xl mx-auto w-full">
          <span className="text-label text-primary-foreground/40 block mb-4">
            State Museum of Arts — Savitsky
          </span>
          <h1
            id="collection-hero-heading"
            className="font-display font-light text-primary-foreground"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              lineHeight: '0.9',
              letterSpacing: '-0.03em',
            }}
          >
            Explore
            <br />
            <em className="font-medium not-italic">The Collection</em>
          </h1>
          <p className="text-base text-primary-foreground/50 mt-4 font-light max-w-xl">
            82,000+ works across Russian avant-garde, Karakalpak decorative arts, Ancient Khorezm
            archaeology and modern Karakalpak painting.
          </p>
        </div>
      </div>
    </section>
  );
}
