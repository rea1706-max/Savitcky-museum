/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        ultramarine: 'var(--ultramarine)',
        turquoise: 'var(--turquoise)',
        earth: 'var(--earth)',
        sand: 'var(--sand)',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
      },
      borderRadius: {
        sm: 'calc(var(--radius) + 2px)',
        md: 'calc(var(--radius) + 4px)',
        lg: 'calc(var(--radius) + 8px)',
        xl: 'calc(var(--radius) + 12px)',
        '2xl': 'calc(var(--radius) + 16px)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
      },
      transitionTimingFunction: {
        'museum': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'fade-slide-up': 'fadeSlideUp 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'section-fade-up': 'sectionFadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};