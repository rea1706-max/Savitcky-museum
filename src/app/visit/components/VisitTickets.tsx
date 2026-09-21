import React from 'react';
import Link from 'next/link';

const tickets = [
  {
    type: 'Adult',
    price: '50,000',
    currency: 'UZS',
    note: 'General admission',
    highlight: false,
  },
  {
    type: 'Student',
    price: '25,000',
    currency: 'UZS',
    note: 'Valid student ID required',
    highlight: false,
  },
  {
    type: 'Concession',
    price: '25,000',
    currency: 'UZS',
    note: 'Senior, disabled visitors',
    highlight: false,
  },
  {
    type: 'Child',
    price: 'Free',
    currency: '',
    note: 'Under 12 years',
    highlight: false,
  },
  {
    type: 'Guided Tour',
    price: '100,000',
    currency: 'UZS',
    note: 'Per person, includes admission',
    highlight: true,
  },
  {
    type: 'Group (10+)',
    price: '35,000',
    currency: 'UZS',
    note: 'Per person, advance booking',
    highlight: false,
  },
];

export default function VisitTickets() {
  return (
    <section
      className="px-6 md:px-12 py-16 md:py-20 bg-muted border-b border-border"
      aria-labelledby="tickets-heading"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Heading */}
          <div className="lg:col-span-4">
            <span className="text-label text-muted-foreground block mb-4">Admission</span>
            <h2
              id="tickets-heading"
              className="font-display font-light text-foreground mb-6"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', letterSpacing: '-0.025em' }}
            >
              Tickets &
              <br />
              Prices
            </h2>
            <div className="rule-oxide mb-6" />
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
              Tickets can be purchased at the museum entrance. Group bookings and guided tours
              should be arranged in advance.
            </p>
            <Link href="#" className="btn-primary">
              Book in Advance
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
              {tickets?.map((ticket) => (
                <div
                  key={ticket?.type}
                  className={`p-6 flex flex-col justify-between ${
                    ticket?.highlight ? 'bg-primary text-primary-foreground' : 'bg-background'
                  }`}
                >
                  <div>
                    <div
                      className={`text-label mb-3 ${ticket?.highlight ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}
                    >
                      {ticket?.type}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`font-display font-light ${ticket?.highlight ? 'text-primary-foreground' : 'text-foreground'}`}
                        style={{
                          fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {ticket?.price}
                      </span>
                      {ticket?.currency && (
                        <span
                          className={`text-label ${ticket?.highlight ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}
                        >
                          {ticket?.currency}
                        </span>
                      )}
                    </div>
                  </div>
                  <p
                    className={`text-xs font-light mt-3 ${ticket?.highlight ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}
                  >
                    {ticket?.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 border border-border bg-background">
              <p className="text-sm text-muted-foreground font-light">
                <strong className="font-medium text-foreground">Free admission:</strong> First
                Sunday of every month. Journalists and accredited researchers with valid
                press/academic ID.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
