import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/collection`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/stories`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/visit`, lastModified: new Date(), priority: 0.8 },
  ];
}
