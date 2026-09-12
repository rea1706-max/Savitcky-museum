import React from 'react';

interface KKOrnamentDividerProps {
  light?: boolean;
  className?: string;
}

export default function KKOrnamentDivider({ light = false, className = '' }: KKOrnamentDividerProps) {
  const lineColor = light ? 'rgba(241,235,221,0.15)' : 'rgba(24,23,20,0.12)';
  const accentColor = light ? 'rgba(166,64,45,0.5)' : 'rgba(166,64,45,0.4)';
  const dotColor = light ? 'rgba(241,235,221,0.2)' : 'rgba(24,23,20,0.15)';

  return (
    <div className={`relative flex items-center gap-4 w-full ${className}`} aria-hidden="true">
      {/* Left line with small ticks */}
      <div className="flex-1 flex items-center gap-0">
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${lineColor})` }} />
        <div className="flex items-center gap-3 mx-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-px h-2" style={{ background: dotColor }} />
          ))}
        </div>
      </div>

      {/* Central ornament — Karakalpak diamond motif */}
      <svg width="56" height="20" viewBox="0 0 56 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer diamond */}
        <rect x="22" y="2" width="12" height="12" transform="rotate(45 28 8)" stroke={accentColor} strokeWidth="0.8" fill="none" />
        {/* Inner diamond */}
        <rect x="25" y="5" width="6" height="6" transform="rotate(45 28 8)" fill={accentColor} opacity="0.7" />
        {/* Side dots */}
        <circle cx="8" cy="10" r="1.5" fill={dotColor} />
        <circle cx="48" cy="10" r="1.5" fill={dotColor} />
        {/* Connecting lines */}
        <line x1="0" y1="10" x2="18" y2="10" stroke={lineColor} strokeWidth="0.5" />
        <line x1="38" y1="10" x2="56" y2="10" stroke={lineColor} strokeWidth="0.5" />
        {/* Small corner marks */}
        <path d="M18 7 L18 10 L21 10" stroke={accentColor} strokeWidth="0.5" fill="none" opacity="0.6" />
        <path d="M38 7 L38 10 L35 10" stroke={accentColor} strokeWidth="0.5" fill="none" opacity="0.6" />
      </svg>

      {/* Right line with small ticks */}
      <div className="flex-1 flex items-center gap-0">
        <div className="flex items-center gap-3 mx-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-px h-2" style={{ background: dotColor }} />
          ))}
        </div>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${lineColor}, transparent)` }} />
      </div>
    </div>
  );
}
