'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

export default function VisitTickets() {
  const { t } = useLanguage();

  return (
    <section
      id="tickets"
      className="px-6 md:px-12 py-16 md:py-20 bg-muted border-b border-border scroll-mt-20"
      aria-labelledby="tickets-heading"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Heading */}
          <div className="lg:col-span-4">
            <span className="text-label text-muted-foreground block mb-4">
              {t.visitPage.ticketsEyebrow}
            </span>
            <h2
              id="tickets-heading"
              className="font-display font-light text-foreground mb-6"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', letterSpacing: '-0.025em' }}
            >
              {t.visitPage.ticketsTitle}
            </h2>
            <div className="rule-oxide mb-6" />
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
              {t.visitPage.ticketsDesc}
            </p>
            <Link href="#contacts" className="btn-primary">
              {t.visitPage.bookAdvance}
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

          {/* Ticket grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
              {t.visitPage.tickets.map((ticket) => (
                <div
                  key={ticket.type}
                  className="p-6 flex flex-col justify-between bg-background transition-colors duration-200 hover:bg-background/90"
                >
                  <div>
                    <div className="text-label mb-3 text-muted-foreground">
                      {ticket.type}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="font-display font-light text-foreground"
                        style={{
                          fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {ticket.price}
                      </span>
                      {ticket.currency && (
                        <span className="text-label text-muted-foreground">
                          {ticket.currency}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs font-light mt-3 text-muted-foreground">
                    {ticket.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 border border-border bg-background">
              <p className="text-sm text-muted-foreground font-light">
                {t.visitPage.freeAdmissionNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
