import React from 'react';
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import { DM_Sans, Cormorant_Garamond, Playfair_Display } from 'next/font/google';
import { LanguageProvider, type Locale } from '@/lib/i18n';
import '../styles/tailwind.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://savitsky.87-192-248-137.sslip.io'
  ),
  title: 'Savitsky Museum — Avant-Garde & Karakalpak Heritage',
  description:
    "The world's second-largest Russian avant-garde collection in Nukus, Karakalpakstan. 82,000 works spanning avant-garde, Karakalpak arts, and Ancient Khorezm.",
  openGraph: {
    title: 'Savitsky Museum — Nukus',
    description: 'An extraordinary collection in the Uzbek desert.',
    siteName: 'Savitsky Museum',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savitsky Museum — Nukus',
    description: 'An extraordinary collection in the Uzbek desert.',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieLocale = (await cookies()).get('savitsky_locale')?.value;
  const initialLocale = ['EN', 'RU', 'UZ', 'KK'].includes(cookieLocale ?? '')
    ? (cookieLocale as Locale)
    : undefined;
  const initialLanguage =
    initialLocale === 'RU'
      ? 'ru'
      : initialLocale === 'UZ'
        ? 'uz'
        : initialLocale === 'KK'
          ? 'kaa'
          : 'en';

  return (
    <html
      lang={initialLanguage}
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${cormorant.variable} ${playfair.variable}`}
    >
      <body className={dmSans.className}>
        <LanguageProvider initialLocale={initialLocale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
