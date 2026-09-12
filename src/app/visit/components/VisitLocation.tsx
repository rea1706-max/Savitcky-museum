import React from 'react';

export default function VisitLocation() {
  return (
    <section
      className="px-6 md:px-12 py-16 md:py-20 bg-background border-b border-border"
      aria-labelledby="location-heading"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Heading */}
          <div className="lg:col-span-4">
            <span className="text-label text-muted-foreground block mb-4">Getting Here</span>
            <h2
              id="location-heading"
              className="font-display font-light text-foreground mb-6"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', letterSpacing: '-0.025em' }}
            >
              Location &
              <br />
              Directions
            </h2>
            <div className="rule-oxide mb-6" />

            <address className="not-italic mb-8">
              <p className="text-sm font-semibold text-foreground mb-1">Savitsky Museum</p>
              <p className="text-sm text-muted-foreground font-light">2 Dostyq Street</p>
              <p className="text-sm text-muted-foreground font-light">Nukus, 230100</p>
              <p className="text-sm text-muted-foreground font-light">Karakalpakstan, Uzbekistan</p>
            </address>

            <div className="space-y-3 mb-8">
              <div>
                <div className="text-label text-muted-foreground mb-1">Phone</div>
                <a href="tel:+99861222xxxx" className="text-sm text-foreground hover:text-accent transition-colors">
                  +998 61 222 xxxx
                </a>
              </div>
              <div>
                <div className="text-label text-muted-foreground mb-1">Email</div>
                <a href="mailto:info@museum.kr.uz" className="text-sm text-foreground hover:text-accent transition-colors">
                  info@museum.kr.uz
                </a>
              </div>
              <div>
                <div className="text-label text-muted-foreground mb-1">Coordinates</div>
                <span className="text-sm text-muted-foreground font-light">41°33′N 60°37′E</span>
              </div>
            </div>
          </div>

          {/* Map + transport info */}
          <div className="lg:col-span-8">
            {/* Map placeholder */}
            <div
              className="bg-muted border border-border h-[280px] md:h-[360px] flex items-center justify-center mb-6 relative overflow-hidden"
              aria-label="Museum location map"
              role="img"
            >
              {/* Decorative grid suggesting a map */}
              <div className="absolute inset-0 grid-lines-overlay opacity-30" aria-hidden="true" />
              <div className="text-center relative z-10">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent mx-auto mb-3" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="text-label text-muted-foreground">Savitsky Museum</p>
                <p className="text-xs text-muted-foreground/60 mt-1">2 Dostyq Street, Nukus</p>
              </div>
            </div>

            {/* Transport options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4H5c-2 0-2 2 0 3.5L8 11l-1.8 8.2c-.2.8.8 1.4 1.5.9l4.3-3 4.3 3c.7.5 1.7-.1 1.5-.9z" />
                    </svg>
                  ),
                  mode: 'By Air',
                  detail: 'Nukus Airport (NCU) serves domestic flights from Tashkent. Taxis available outside arrivals.',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  ),
                  mode: 'By Train',
                  detail: 'Nukus Railway Station connects to Tashkent and other Uzbek cities. Journey from Tashkent approx. 18–20 hours.',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
                      <rect x="9" y="11" width="14" height="10" rx="1" />
                      <circle cx="12" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                    </svg>
                  ),
                  mode: 'Local Transport',
                  detail: 'Taxis and shared minibuses (marshrutka) operate throughout Nukus. Museum is centrally located.',
                },
              ]?.map((item) => (
                <div key={item?.mode} className="bg-background p-5">
                  <div className="text-muted-foreground mb-3">{item?.icon}</div>
                  <div className="text-label text-foreground mb-2">{item?.mode}</div>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">{item?.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}