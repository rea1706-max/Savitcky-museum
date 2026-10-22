'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import {
  KarakalpakVerticalOrnament,
  KarakalpakWatermark,
  RhombusBadge,
  RhombusNode,
} from '@/app/components/KarakalpakOrnament';

const scheduleData = [
  { dayKey: 'Monday', time: null, isClosed: true },
  { dayKey: 'Tuesday', time: '09:00 – 18:00', isClosed: false },
  { dayKey: 'Wednesday', time: '09:00 – 18:00', isClosed: false },
  { dayKey: 'Thursday', time: '09:00 – 18:00', isClosed: false },
  { dayKey: 'Friday', time: '09:00 – 18:00', isClosed: false },
  { dayKey: 'Saturday', time: '09:00 – 18:00', isClosed: false },
  { dayKey: 'Sunday', time: '09:00 – 18:00', isClosed: false },
];

export default function VisitHours() {
  const { t } = useLanguage();
  const todayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  const weekdayKeys = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const currentDayKey = weekdayKeys[todayIndex];

  const todaySchedule = scheduleData.find((s) => s.dayKey === currentDayKey);
  const localizedTodayName = t.visitPage.days[currentDayKey] || currentDayKey;

  return (
    <section
      id="hours"
      className="px-6 md:px-12 py-16 md:py-20 bg-background border-b border-border scroll-mt-20"
      aria-labelledby="hours-heading"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          {/* Column 1: Eyebrow, Heading, and Today Card with Watermark */}
          <div className="lg:col-span-4">
            <span className="text-label text-muted-foreground block mb-4">
              {t.visitPage.hoursEyebrow}
            </span>
            <h2
              id="hours-heading"
              className="font-display font-light text-foreground mb-6"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', letterSpacing: '-0.025em' }}
            >
              {t.visitPage.hoursTitle}
            </h2>
            <div className="rule-oxide mb-6" />

            {/* Today card with Karakalpak ornament watermark (Ref. Photo 5) */}
            <div className="relative overflow-hidden bg-[#E8E2D5]/80 border border-[#D3CABB] p-6 shadow-sm">
              <div className="relative z-10">
                <div className="text-label text-muted-foreground uppercase tracking-widest text-[11px] mb-2 font-medium">
                  {t.visitPage.today}
                </div>
                <div className="font-display text-2xl md:text-3xl font-medium text-foreground tracking-tight mb-2">
                  {localizedTodayName}
                </div>
                <div className="text-lg md:text-xl text-[#245255] font-semibold tracking-tight">
                  {todaySchedule?.isClosed ? t.visitPage.closed : todaySchedule?.time}
                </div>
              </div>

              {/* Watermark ornament in card background */}
              <KarakalpakWatermark
                className="absolute -right-2 -bottom-8 w-32 h-52 pointer-events-none"
                color="#8C6542"
              />
            </div>
          </div>

          {/* Column 2: Weekly Schedule Table */}
          <div className="lg:col-span-4">
            <div className="divide-y divide-border/80 border-t border-b border-border/80">
              {scheduleData.map((item) => {
                const isToday = item.dayKey === currentDayKey;
                const localizedDay = t.visitPage.days[item.dayKey] || item.dayKey;

                return (
                  <div
                    key={item.dayKey}
                    className={`flex items-center justify-between py-3 px-2.5 transition-colors ${
                      isToday
                        ? 'bg-[#E5DFD1]/65 font-medium shadow-[inset_2px_0_0_0_#245255]'
                        : 'hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isToday && (
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[#245255] flex-shrink-0"
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={`text-sm ${
                          isToday ? 'font-medium text-foreground' : 'text-foreground/90 font-normal'
                        }`}
                      >
                        {localizedDay}
                      </span>
                      {isToday && (
                        <span className="text-label text-[#245255] text-[10px] font-semibold tracking-wider uppercase ml-1">
                          {t.visitPage.today.toLowerCase()}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs ${
                          item.isClosed
                            ? 'text-muted-foreground font-normal'
                            : isToday
                            ? 'text-foreground font-medium'
                            : 'text-foreground/80 font-light'
                        }`}
                      >
                        {item.isClosed ? t.visitPage.closed : item.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-3 border border-border/80 bg-muted/60">
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                {t.visitPage.publicHolidaysNote}
              </p>
            </div>
          </div>

          {/* Vertical Ornament Divider (Ref. Photo 4 & 5) */}
          <div className="hidden lg:flex lg:col-span-1 justify-center self-stretch py-1">
            <KarakalpakVerticalOrnament className="h-full w-9 max-h-[480px]" strokeColor="#9A6B4F" />
          </div>

          {/* Column 3: Useful Practical Information alongside Diamond Icons */}
          <div className="lg:col-span-3 flex flex-col">
            <span className="text-label text-muted-foreground block mb-5 text-[11px] tracking-widest uppercase font-medium">
              {t.visitPage.practicalInfo}
            </span>

            <div className="space-y-4">
              {/* 1. Address / Location */}
              <a
                href="#location"
                className="group flex items-start gap-3.5 p-2.5 -m-2.5 rounded transition-all hover:bg-muted/60"
              >
                <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center">
                  <div className="absolute inset-0 border border-[#9A6B4F]/60 group-hover:border-accent rotate-45 transition-colors bg-background" />
                  <div className="relative z-10 text-[#5C4F44] group-hover:text-accent transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-foreground tracking-wide group-hover:text-accent transition-colors">
                    {t.visitPage.quick.addressTitle}
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                    {t.visitPage.quick.addressDetail}
                  </div>
                </div>
              </a>

              {/* Connector node */}
              <div className="pl-3.5 py-0.5" aria-hidden="true">
                <div className="w-1.5 h-1.5 border border-[#9A6B4F]/50 rotate-45 bg-[#9A6B4F]/20" />
              </div>

              {/* 2. Opening Hours */}
              <a
                href="#hours"
                className="group flex items-start gap-3.5 p-2.5 -m-2.5 rounded transition-all hover:bg-muted/60"
              >
                <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center">
                  <div className="absolute inset-0 border border-[#9A6B4F]/60 group-hover:border-accent rotate-45 transition-colors bg-background" />
                  <div className="relative z-10 text-[#5C4F44] group-hover:text-accent transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-foreground tracking-wide group-hover:text-accent transition-colors">
                    {t.visitPage.quick.hoursTitle}
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                    {t.visitPage.quick.hoursDetail}
                  </div>
                </div>
              </a>

              {/* Connector node */}
              <div className="pl-3.5 py-0.5" aria-hidden="true">
                <div className="w-1.5 h-1.5 border border-[#9A6B4F]/50 rotate-45 bg-[#9A6B4F]/20" />
              </div>

              {/* 3. Tickets */}
              <a
                href="#tickets"
                className="group flex items-start gap-3.5 p-2.5 -m-2.5 rounded transition-all hover:bg-muted/60"
              >
                <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center">
                  <div className="absolute inset-0 border border-[#9A6B4F]/60 group-hover:border-accent rotate-45 transition-colors bg-background" />
                  <div className="relative z-10 text-[#5C4F44] group-hover:text-accent transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-foreground tracking-wide group-hover:text-accent transition-colors">
                    {t.visitPage.quick.ticketsTitle}
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                    {t.visitPage.quick.ticketsDetail}
                  </div>
                </div>
              </a>

              {/* Connector node */}
              <div className="pl-3.5 py-0.5" aria-hidden="true">
                <div className="w-1.5 h-1.5 border border-[#9A6B4F]/50 rotate-45 bg-[#9A6B4F]/20" />
              </div>

              {/* 4. Accessibility */}
              <a
                href="#faq"
                className="group flex items-start gap-3.5 p-2.5 -m-2.5 rounded transition-all hover:bg-muted/60"
              >
                <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center">
                  <div className="absolute inset-0 border border-[#9A6B4F]/60 group-hover:border-accent rotate-45 transition-colors bg-background" />
                  <div className="relative z-10 text-[#5C4F44] group-hover:text-accent transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="4" r="2" />
                      <path d="M6 8h6l2 7h5" />
                      <path d="M14 15a5 5 0 1 1-7-4.5" />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-foreground tracking-wide group-hover:text-accent transition-colors">
                    {t.visitPage.quick.accessTitle}
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                    {t.visitPage.quick.accessDetail}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

