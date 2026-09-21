import React from 'react';

const schedule = [
  { day: 'Monday', time: null, note: 'Closed' },
  { day: 'Tuesday', time: '09:00 – 18:00', note: null },
  { day: 'Wednesday', time: '09:00 – 18:00', note: null },
  { day: 'Thursday', time: '09:00 – 18:00', note: null },
  { day: 'Friday', time: '09:00 – 18:00', note: null },
  { day: 'Saturday', time: '09:00 – 18:00', note: null },
  { day: 'Sunday', time: '10:00 – 17:00', note: 'Last entry 16:30' },
];

const today = new Date()?.toLocaleDateString('en-US', { weekday: 'long' });

export default function VisitHours() {
  return (
    <section
      className="px-6 md:px-12 py-16 md:py-20 bg-background border-b border-border"
      aria-labelledby="hours-heading"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Label + heading */}
          <div className="lg:col-span-4">
            <span className="text-label text-muted-foreground block mb-4">Opening Times</span>
            <h2
              id="hours-heading"
              className="font-display font-light text-foreground mb-6"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', letterSpacing: '-0.025em' }}
            >
              Opening
              <br />
              Hours
            </h2>
            <div className="rule-oxide mb-6" />
            <div className="bg-muted border border-border p-4">
              <div className="text-label text-muted-foreground mb-1">Today</div>
              <div className="font-display text-xl font-medium text-foreground">{today}</div>
              <div className="text-sm text-turquoise font-medium mt-1">
                {schedule?.find((s) => s?.day === today)?.time || 'Closed'}
              </div>
            </div>
          </div>

          {/* Schedule table */}
          <div className="lg:col-span-8">
            <div className="divide-y divide-border">
              {schedule?.map((item) => {
                const isToday = item?.day === today;
                return (
                  <div
                    key={item?.day}
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
                      <span
                        className={`text-sm font-medium ${
                          isToday ? 'text-foreground' : 'text-foreground'
                        } ${item?.time === null ? 'text-muted-foreground' : ''}`}
                      >
                        {item?.day}
                        {isToday && <span className="text-label text-turquoise ml-2">Today</span>}
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-sm font-light ${
                          item?.time === null ? 'text-muted-foreground' : 'text-foreground'
                        }`}
                      >
                        {item?.time || item?.note}
                      </span>
                      {item?.note && item?.time && (
                        <span className="text-xs text-muted-foreground block mt-0.5">
                          {item?.note}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 border border-border bg-muted">
              <p className="text-sm text-muted-foreground font-light">
                <strong className="font-medium text-foreground">Public Holidays:</strong> The museum
                may have adjusted hours on Uzbek national holidays. Please check our website or call
                ahead before visiting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
