'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n';

const scheduleData = [
  { dayKey: 'Monday', time: null, isClosed: true },
  { dayKey: 'Tuesday', time: '09:00 – 18:00', isClosed: false },
  { dayKey: 'Wednesday', time: '09:00 – 18:00', isClosed: false },
  { dayKey: 'Thursday', time: '09:00 – 18:00', isClosed: false },
  { dayKey: 'Friday', time: '09:00 – 18:00', isClosed: false },
  { dayKey: 'Saturday', time: '09:00 – 18:00', isClosed: false },
  { dayKey: 'Sunday', time: '10:00 – 17:00', isClosed: false },
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

  return (
    <section
      className="px-6 md:px-12 py-16 md:py-20 bg-background border-b border-border"
      aria-labelledby="hours-heading"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Label + heading */}
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
            <div className="bg-muted border border-border p-4">
              <div className="text-label text-muted-foreground mb-1">{t.visitPage.today}</div>
              <div className="font-display text-xl font-medium text-foreground">
                {t.visitPage.days[currentDayKey] || currentDayKey}
              </div>
              <div className="text-sm text-turquoise font-medium mt-1">
                {todaySchedule?.isClosed ? t.visitPage.closed : todaySchedule?.time}
              </div>
            </div>
          </div>

          {/* Schedule table */}
          <div className="lg:col-span-8">
            <div className="divide-y divide-border">
              {scheduleData.map((item) => {
                const isToday = item.dayKey === currentDayKey;
                const localizedDay = t.visitPage.days[item.dayKey] || item.dayKey;

                return (
                  <div
                    key={item.dayKey}
                    className={`flex items-center justify-between py-4 ${
                      isToday ? 'bg-muted -mx-4 px-4' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {isToday && (
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-turquoise flex-shrink-0"
                          aria-hidden="true"
                        />
                      )}
                      <span className="text-sm font-medium text-foreground">
                        {localizedDay}
                        {isToday && (
                          <span className="text-label text-turquoise ml-2">
                            {t.visitPage.today}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-sm ${
                          item.isClosed
                            ? 'text-muted-foreground font-normal'
                            : 'text-foreground font-light'
                        }`}
                      >
                        {item.isClosed ? t.visitPage.closed : item.time}
                      </span>
                      {item.dayKey === 'Sunday' && (
                        <span className="text-xs text-muted-foreground block mt-0.5">
                          {t.visitPage.lastEntry}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 border border-border bg-muted">
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {t.visitPage.publicHolidaysNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
