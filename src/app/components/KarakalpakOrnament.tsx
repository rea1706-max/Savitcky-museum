import React from 'react';

interface KarakalpakVerticalOrnamentProps {
  className?: string;
  strokeColor?: string;
  accentColor?: string;
}

/**
 * Karakalpak geometric vertical avant-garde ornament divider
 * Faithful vector recreation matching the museum's design system & reference photos.
 */
export function KarakalpakVerticalOrnament({
  className = '',
  strokeColor = '#9A6B4F',
  accentColor = '#A6402D',
}: KarakalpakVerticalOrnamentProps) {
  return (
    <svg
      viewBox="0 0 100 620"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="kk-line-fade-top" x1="50" y1="0" x2="50" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Top vertical axis with gradient fade */}
      <line x1="50" y1="0" x2="50" y2="80" stroke="url(#kk-line-fade-top)" strokeWidth="1" />
      <line x1="50" y1="80" x2="50" y2="100" stroke={strokeColor} strokeWidth="1" />

      {/* Top Diamond Cluster */}
      {/* 1. Upper small diamond */}
      <polygon
        points="50,94 56,102 50,110 44,102"
        stroke={strokeColor}
        strokeWidth="0.9"
        fill="none"
      />

      {/* 2. Overlapping nested diamond */}
      <polygon
        points="50,106 60,118 50,130 40,118"
        stroke={strokeColor}
        strokeWidth="0.9"
        fill="none"
      />

      {/* 3. Main large double diamond */}
      <polygon
        points="50,118 76,152 50,186 24,152"
        stroke={strokeColor}
        strokeWidth="1.1"
        fill="none"
      />
      {/* Inner concentric diamond */}
      <polygon
        points="50,132 65,152 50,172 35,152"
        stroke={strokeColor}
        strokeWidth="0.85"
        fill="none"
      />
      {/* Center point */}
      <circle cx="50" cy="152" r="1.8" fill={strokeColor} />

      {/* 4. Lower diamond with center point */}
      <polygon
        points="50,186 60,199 50,212 40,199"
        stroke={strokeColor}
        strokeWidth="0.9"
        fill="none"
      />
      <circle cx="50" cy="199" r="1.5" fill={strokeColor} />

      {/* 5. Tiny diamond tip */}
      <polygon
        points="50,212 54,217 50,222 46,217"
        stroke={strokeColor}
        strokeWidth="0.8"
        fill="none"
      />

      {/* Middle connecting vertical axis */}
      <line x1="50" y1="222" x2="50" y2="305" stroke={strokeColor} strokeWidth="1" />

      {/* Solid filled diamond node */}
      <polygon
        points="50,305 55,311 50,317 45,311"
        fill={strokeColor}
      />

      {/* Vertical axis continuation */}
      <line x1="50" y1="317" x2="50" y2="368" stroke={strokeColor} strokeWidth="1" />

      {/* Diagonal avant-garde crossing line */}
      <line x1="0" y1="285" x2="95" y2="475" stroke={strokeColor} strokeWidth="0.8" strokeOpacity="0.75" />

      {/* Lower Diamond Cluster */}
      {/* 6. Large diamond with solid filled center */}
      <polygon
        points="50,368 76,402 50,436 24,402"
        stroke={strokeColor}
        strokeWidth="1.1"
        fill="none"
      />
      {/* Solid filled center diamond */}
      <polygon
        points="50,392 59,402 50,412 41,402"
        fill={strokeColor}
      />

      {/* 7. Lower diamond with center point */}
      <polygon
        points="50,436 60,449 50,462 40,449"
        stroke={strokeColor}
        strokeWidth="0.9"
        fill="none"
      />
      <circle cx="50" cy="449" r="1.5" fill={strokeColor} />

      {/* 8. Tiny diamond tip */}
      <polygon
        points="50,462 54,467 50,472 46,467"
        stroke={strokeColor}
        strokeWidth="0.8"
        fill="none"
      />

      {/* Vertical line continuation to base */}
      <line x1="50" y1="472" x2="50" y2="585" stroke={strokeColor} strokeWidth="1" />

      {/* Lower diagonal crossing line */}
      <line x1="5" y1="425" x2="90" y2="550" stroke={strokeColor} strokeWidth="0.8" strokeOpacity="0.65" />

      {/* Terminal base dot */}
      <circle cx="50" cy="585" r="2.5" fill={strokeColor} />
    </svg>
  );
}

/**
 * Karakalpak Watermark Ornament for subtle decorative card backgrounds
 */
export function KarakalpakWatermark({
  className = '',
  color = '#8C6542',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="0.85" opacity="0.35">
        <line x1="80" y1="10" x2="80" y2="290" />
        {/* Top diamond set */}
        <polygon points="80,20 90,32 80,44 70,32" />
        <polygon points="80,38 96,56 80,74 64,56" />
        <polygon points="80,50 115,90 80,130 45,90" strokeWidth="1" />
        <polygon points="80,68 100,90 80,112 60,90" />
        <circle cx="80" cy="90" r="2" fill={color} />
        <polygon points="80,130 92,144 80,158 68,144" />
        <circle cx="80" cy="144" r="1.5" fill={color} />
        
        {/* Diagonal crossing */}
        <line x1="20" y1="130" x2="140" y2="250" strokeWidth="0.75" />
        
        {/* Lower cluster */}
        <polygon points="80,170 115,210 80,250 45,210" strokeWidth="1" />
        <polygon points="80,198 92,210 80,222 68,210" fill={color} fillOpacity="0.5" />
        <polygon points="80,250 92,264 80,278 68,264" />
        <circle cx="80" cy="264" r="1.5" fill={color} />
        <circle cx="80" cy="290" r="2.5" fill={color} />
      </g>
    </svg>
  );
}

/**
 * Rhombus Icon Badge with diamond frame
 * For senior-designer practical navigation & indicators (Photo 5 reference)
 */
export function RhombusBadge({
  icon,
  label,
  href,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}) {
  const content = (
    <div
      className="group relative flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
      title={label}
      aria-label={label}
    >
      {/* Outer Diamond Frame */}
      <div className="relative w-11 h-11 md:w-12 md:h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <div
          className="absolute inset-0 border border-[#9A6B4F]/50 group-hover:border-accent bg-background group-hover:bg-[#EFEAE1] transition-all duration-300 rotate-45 shadow-sm group-hover:shadow"
        />
        {/* Upright Icon inside */}
        <div className="relative z-10 text-[#5C4F44] group-hover:text-accent transition-colors duration-300">
          {icon}
        </div>
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={label}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={label}
    >
      {content}
    </button>
  );
}

/**
 * Small diamond separator node between badges
 */
export function RhombusNode() {
  return (
    <div className="flex flex-col items-center justify-center my-1.5" aria-hidden="true">
      <div className="w-1.5 h-1.5 border border-[#9A6B4F]/60 rotate-45 bg-[#9A6B4F]/20" />
    </div>
  );
}
