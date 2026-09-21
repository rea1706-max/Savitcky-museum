'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const hours = [
  { day: 'Monday', time: 'Closed' },
  { day: 'Tuesday', time: '09:00 – 18:00' },
  { day: 'Wednesday', time: '09:00 – 18:00' },
  { day: 'Thursday', time: '09:00 – 18:00' },
  { day: 'Friday', time: '09:00 – 18:00' },
  { day: 'Saturday', time: '09:00 – 18:00' },
  { day: 'Sunday', time: '10:00 – 17:00' },
];

export default function PlanVisitSection() {
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

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-12 py-16 md:py-24 bg-muted"
      aria-labelledby="visit-heading"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal-hidden">
          <div>
            <span className="text-label text-muted-foreground mb-3 block">Visitor Information</span>
            <h2
              id="visit-heading"
              className="font-display font-light text-foreground"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.025em' }}
            >
              Plan Your Visit
            </h2>
          </div>
          <Link href="/visit" className="btn-primary self-start md:self-end">
            Full Visitor Guide
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border reveal-hidden">
          {/* Opening Hours */}
          <div className="bg-background p-8">
            <h3 className="text-label text-muted-foreground mb-6">Opening Hours</h3>
            <ul className="space-y-3">
              {hours?.map((h) => (
                <li key={h?.day} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">{h?.day}</span>
                  <span
                    className={`text-sm font-light ${h?.time === 'Closed' ? 'text-muted-foreground' : 'text-foreground'}`}
                  >
                    {h?.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tickets */}
          <div className="bg-background p-8">
            <h3 className="text-label text-muted-foreground mb-6">Admission</h3>
            <ul className="space-y-4 mb-8">
              {[
                { label: 'Adult', price: '50,000 UZS' },
                { label: 'Student / Concession', price: '25,000 UZS' },
                { label: 'Child (under 12)', price: 'Free' },
                { label: 'Guided Tour', price: '100,000 UZS' },
              ]?.map((ticket) => (
                <li
                  key={ticket?.label}
                  className="flex justify-between items-center border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <span className="text-sm font-medium text-foreground">{ticket?.label}</span>
                  <span className="text-sm font-display font-medium text-foreground">
                    {ticket?.price}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/visit" className="btn-primary w-full justify-center">
              Book Tickets
            </Link>
          </div>

          {/* Location */}
          <div className="bg-background p-8 md:col-span-2 lg:col-span-1">
            <h3 className="text-label text-muted-foreground mb-6">Location</h3>
            <address className="not-italic mb-6">
              <p className="text-sm font-medium text-foreground mb-1">Savitsky Museum</p>
              <p className="text-sm text-muted-foreground font-light">2 Dostyq Street</p>
              <p className="text-sm text-muted-foreground font-light">Nukus, 230100</p>
              <p className="text-sm text-muted-foreground font-light">Karakalpakstan, Uzbekistan</p>
            </address>
            <div
              className="bg-muted border border-border h-32 flex items-center justify-center mb-6"
              aria-label="Map placeholder"
            >
              <div className="text-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground mx-auto mb-2"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-label text-muted-foreground">Nukus, Karakalpakstan</span>
              </div>
            </div>
            <Link href="/visit" className="btn-ghost">
              Getting to Nukus
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
