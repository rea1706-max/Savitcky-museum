import React from 'react';
import Link from 'next/link';

const footerLinks = {
  Explore: [
    { label: 'About the Museum', href: '/#about' },
    { label: "What's On", href: '/#whats-on' },
    { label: 'Collection', href: '/#collection' },
    { label: 'Stories', href: '/stories' },
  ],
  Collection: [
    { label: 'Explore All Works', href: '/collection' },
    { label: 'Avant-Garde', href: '/collection' },
    { label: 'Karakalpak Arts', href: '/collection' },
    { label: 'Heritage & History', href: '/collection' },
  ],
  Visit: [
    { label: 'Plan Your Visit', href: '/visit' },
    { label: 'Opening Hours', href: '/visit' },
    { label: 'Getting Here', href: '/visit' },
    { label: 'Accessibility', href: '/visit' },
  ],
  Connect: [
    { label: 'Contact', href: '#' },
    { label: 'Press & Media', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
  ],
};

/* Premium Karakalpak-inspired SVG logomark — geometric sun/star motif */
function MuseumLogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer octagon */}
      <polygon
        points="20,2 30,7 38,17 38,23 30,33 20,38 10,33 2,23 2,17 10,7"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      {/* Inner diamond */}
      <polygon
        points="20,10 28,20 20,30 12,20"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.7"
      />
      {/* Cross axes */}
      <line x1="20" y1="10" x2="20" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="10" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      {/* Diagonal accents */}
      <line x1="13" y1="13" x2="27" y2="27" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      <line x1="27" y1="13" x2="13" y2="27" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      {/* Center dot */}
      <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.8" />
      {/* Corner ornament dots */}
      <circle cx="20" cy="10" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="20" cy="30" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="10" cy="20" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="30" cy="20" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground kk-pattern-dark relative overflow-hidden">
      {/* Top section — narrower statement panel */}
      <div className="border-b border-primary-foreground/10 px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-2xl">
          <p
            className="font-display font-light text-primary-foreground/18 select-none"
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 4.5rem)',
              lineHeight: '0.9',
              letterSpacing: '-0.03em',
            }}
            aria-hidden="true"
          >
            FROM NUKUS
            <br />
            TO THE WORLD
          </p>
          {/* Karakalpak ornament accent line */}
          <div className="mt-6 w-24 h-px bg-primary-foreground/20" />
          <div className="mt-1 flex gap-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-2 h-2 rotate-45 border border-primary-foreground/15" />
            ))}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 mb-5">
              <div className="text-primary-foreground/70">
                <MuseumLogoMark size={32} />
              </div>
              <div>
                <div className="font-display font-medium text-primary-foreground tracking-widest uppercase text-sm">
                  Savitsky Museum
                </div>
                <div className="text-label text-primary-foreground/50 mt-0.5">
                  Nukus, Karakalpakstan
                </div>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/45 leading-relaxed max-w-xs mb-5">
              State Museum of Arts of the Republic of Karakalpakstan named after I.V. Savitsky.
              82,000 works. Second largest Russian avant-garde collection in the world.
            </p>
            <p className="text-label text-primary-foreground/35">museum.kr.uz</p>
          </div>

          {/* Link columns */}
          <div className="md:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks)?.map(([groupName, links]) => (
              <div key={groupName}>
                <h3 className="text-label text-primary-foreground/35 mb-4">{groupName}</h3>
                <ul className="space-y-3">
                  {links?.map((link) => (
                    <li key={link?.label}>
                      <Link
                        href={link?.href}
                        className="text-sm font-medium text-primary-foreground/55 hover:text-primary-foreground transition-colors"
                      >
                        {link?.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Karakalpak ornament divider */}
        <div className="pattern-divider opacity-15 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-label text-primary-foreground/25">
            © 2026 Savitsky Museum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
