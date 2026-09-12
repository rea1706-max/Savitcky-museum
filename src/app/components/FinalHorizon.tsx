import React from 'react';
import AppImage from '@/components/ui/AppImage';

export default function FinalHorizon() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: 'clamp(280px, 45vw, 560px)' }}
      aria-label="Desert horizon">
      
      <AppImage
        src="https://images.unsplash.com/photo-1712587357056-0c05be13c08d"
        alt="Vast desert salt flat at dusk, pale horizon line, enormous sky fading from warm amber to cool grey, absolute emptiness and scale"
        fill
        className="object-cover"
        sizes="100vw" />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/40" />

      {/* Final statement */}
      <div className="absolute inset-0 flex items-end justify-center pb-12 md:pb-16 z-10">
        <div className="text-center">
          <p
            className="font-display font-light text-primary-foreground/80 tracking-widest uppercase"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.75rem)', letterSpacing: '0.25em' }}>
            
            From Nukus
          </p>
          <p
            className="font-display font-light text-primary-foreground/50 tracking-widest uppercase mt-1"
            style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1rem)', letterSpacing: '0.35em' }}>
            
            To the World
          </p>
        </div>
      </div>
    </section>);

}