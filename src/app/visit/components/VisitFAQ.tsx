'use client';

import React, { useState } from 'react';

const faqs = [
  {
    id: 'f1',
    question: 'Can I take photographs in the museum?',
    answer: 'Personal, non-commercial photography without flash is permitted in most areas of the museum. Photography of specific works may be restricted — look for signage or ask a gallery attendant. Tripods and professional equipment require prior written permission.',
  },
  {
    id: 'f2',
    question: 'Is the museum accessible for visitors with disabilities?',
    answer: 'The main museum building is wheelchair accessible with ramp access, lifts between floors and accessible restrooms. Please contact us in advance if you require specific assistance. Audio guides are available in English and Russian. Tactile exhibits are available in selected galleries.',
  },
  {
    id: 'f3',
    question: 'Is there a cloakroom or luggage storage?',
    answer: 'A cloakroom is available near the main entrance and is free to use. Large bags, backpacks and luggage must be deposited before entering the galleries.',
  },
  {
    id: 'f4',
    question: 'Does the museum have a café or restaurant?',
    answer: 'A small café is located in the museum courtyard serving tea, coffee and light refreshments. The café is open during museum hours, weather permitting.',
  },
  {
    id: 'f5',
    question: 'Is there a museum shop?',
    answer: 'The museum shop is located near the main entrance and carries exhibition catalogues, art books, postcards, reproductions and Karakalpak craft items. Selected publications are available in English, Russian and Uzbek.',
  },
  {
    id: 'f6',
    question: 'How long does a typical visit take?',
    answer: 'A standard visit to the permanent collection takes approximately 1.5 to 2 hours. Visitors wishing to explore the collection in depth, or attending a special exhibition, should allow 2.5 to 3 hours. The Highlights Tour (90 minutes) is recommended for first-time visitors.',
  },
  {
    id: 'f7',
    question: 'Can I visit without booking in advance?',
    answer: 'Walk-in visitors are welcome. Tickets can be purchased at the entrance. Guided tours and group visits should be booked in advance. During peak season (April–October) and on public holidays, we recommend arriving early.',
  },
  {
    id: 'f8',
    question: 'Does the museum offer research or archive access?',
    answer: 'The museum archive and study room are accessible to accredited researchers by appointment. Contact our research department at research@museum.kr.uz with your institutional affiliation and research purpose. Access to specific works and archival materials is subject to approval.',
  },
];

export default function VisitFAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      className="px-6 md:px-12 py-16 md:py-20 bg-background"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Heading */}
          <div className="lg:col-span-4">
            <span className="text-label text-muted-foreground block mb-4">Before You Arrive</span>
            <h2
              id="faq-heading"
              className="font-display font-light text-foreground mb-6"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', letterSpacing: '-0.025em' }}
            >
              Visitor
              <br />
              FAQ
            </h2>
            <div className="rule-oxide mb-6" />
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Further questions? Contact us at{' '}
              <a href="mailto:info@museum.kr.uz" className="text-foreground hover:text-accent transition-colors">
                info@museum.kr.uz
              </a>
            </p>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-8">
            <dl className="divide-y divide-border border-t border-border">
              {faqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div key={faq.id}>
                    <dt>
                      <button
                        onClick={() => toggle(faq.id)}
                        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${faq.id}`}
                      >
                        <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors leading-snug">
                          {faq.question}
                        </span>
                        <span
                          className={`flex-shrink-0 w-5 h-5 flex items-center justify-center border border-border mt-0.5 transition-all duration-300 ${
                            isOpen ? 'bg-primary text-primary-foreground border-primary' : 'text-muted-foreground'
                          }`}
                          aria-hidden="true"
                        >
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                          >
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      </button>
                    </dt>
                    <dd
                      id={`faq-answer-${faq.id}`}
                      className={`overflow-hidden transition-all duration-400 ease-museum ${
                        isOpen ? 'max-h-96 pb-5' : 'max-h-0'
                      }`}
                      aria-hidden={!isOpen}
                    >
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}