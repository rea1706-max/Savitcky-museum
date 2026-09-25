'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';

export default function VisitFAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { t } = useLanguage();

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="px-6 md:px-12 py-16 md:py-20 bg-background scroll-mt-20"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Heading */}
          <div className="lg:col-span-4">
            <span className="text-label text-muted-foreground block mb-4">
              {t.visitPage.faqEyebrow}
            </span>
            <h2
              id="faq-heading"
              className="font-display font-light text-foreground mb-6"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', letterSpacing: '-0.025em' }}
            >
              {t.visitPage.faqTitle}
            </h2>
            <div className="rule-oxide mb-6" />
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              {t.visitPage.faqContact}
            </p>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-8">
            <dl className="divide-y divide-border border-t border-border">
              {t.visitPage.faqs.map((faq) => {
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
                            isOpen
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'text-muted-foreground'
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
