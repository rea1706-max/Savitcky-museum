import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Savitsky Museum',
    short_name: 'Savitsky',
    description: 'The Savitsky Museum in Nukus, Karakalpakstan.',
    start_url: '/',
    display: 'standalone',
    background_color: '#191816',
    theme_color: '#191816',
    icons: [
      {
        src: '/brand/savitsky-logo-mark.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
