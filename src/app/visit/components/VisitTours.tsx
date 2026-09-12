import React from 'react';
import Link from 'next/link';

const tours = [
  {
    id: 't1',
    name: 'Highlights Tour',
    duration: '90 minutes',
    groupSize: 'Up to 15',
    languages: 'English, Russian, Uzbek',
    price: '100,000 UZS per person',
    description: 'A curated walk through the museum\'s most significant avant-garde works and Karakalpak cultural objects. Ideal for first-time visitors.',
    available: 'Daily 10:00 and 14:00 (Tue–Sat)',
  },
  {
    id: 't2',
    name: 'Avant-Garde Deep Dive',
    duration: '2.5 hours',
    groupSize: 'Up to 10',
    languages: 'English, Russian',
    price: '150,000 UZS per person',
    description: 'An extended specialist tour focusing exclusively on the Russian and Turkestan avant-garde collection, including works not on permanent display.',
    available: 'Saturday 11:00 (advance booking required)',
  },
  {
    id: 't3',
    name: 'Karakalpak Heritage Tour',
    duration: '2 hours',
    groupSize: 'Up to 12',
    languages: 'Karakalpak, Uzbek, Russian',
    price: '120,000 UZS per person',
    description: 'Explore the decorative arts, textiles, jewelry and material culture of Karakalpakstan across two centuries of the museum\'s collection.',
    available: 'Tuesday and Thursday 11:00',
  },
];

export default function VisitTours() {
  return (
    <section
      className="px-6 md:px-12 py-16 md:py-20 bg-muted border-b border-border"
      aria-labelledby="tours-heading"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-10">
          <span className="text-label text-muted-foreground block mb-4">Guided Experiences</span>
          <h2
            id="tours-heading"
            className="font-display font-light text-foreground"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', letterSpacing: '-0.025em' }}
          >
            Tours
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {tours?.map((tour) => (
            <div key={tour?.id} className="bg-background p-8 flex flex-col">
              <div className="flex-1">
                <div className="rule-oxide mb-5" />
                <h3 className="font-display text-lg font-medium text-foreground mb-3 leading-snug">
                  {tour?.name}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
                  {tour?.description}
                </p>

                <dl className="space-y-3 mb-6">
                  {[
                    { label: 'Duration', value: tour?.duration },
                    { label: 'Group Size', value: tour?.groupSize },
                    { label: 'Languages', value: tour?.languages },
                    { label: 'Schedule', value: tour?.available },
                  ]?.map((item) => (
                    <div key={item?.label} className="flex gap-4">
                      <dt className="text-label text-muted-foreground w-24 flex-shrink-0">{item?.label}</dt>
                      <dd className="text-xs text-foreground font-medium">{item?.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="border-t border-border pt-5 mt-auto">
                <div className="flex items-center justify-between">
                  <span className="font-display text-base font-medium text-foreground">{tour?.price}</span>
                  <Link href="#" className="btn-ghost text-xs">
                    Book
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-5 border border-border bg-background">
          <p className="text-sm text-muted-foreground font-light">
            <strong className="font-medium text-foreground">Private & Educational Groups:</strong> The museum offers tailored tours for schools, universities and private groups. Contact us at{' '}
            <a href="mailto:tours@museum.kr.uz" className="text-foreground hover:text-accent transition-colors underline underline-offset-2">
              tours@museum.kr.uz
            </a>{' '}
            to arrange a bespoke visit.
          </p>
        </div>
      </div>
    </section>
  );
}