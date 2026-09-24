import React from 'react';
import type { Metadata, Viewport } from 'next';
import { DM_Sans, Cormorant_Garamond, Playfair_Display } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n';
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Savitsky Museum — Avant-Garde & Karakalpak Heritage',
  description:
    "The world's second-largest Russian avant-garde collection in Nukus, Karakalpakstan. 82,000 works spanning avant-garde, Karakalpak arts, and Ancient Khorezm.",
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
  openGraph: {
    title: 'Savitsky Museum — Nukus',
    description: 'An extraordinary collection in the Uzbek desert.',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${cormorant.variable} ${playfair.variable}`}
    >
      <body className={dmSans.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
