import type { Metadata } from 'next';
import StoriesClient from './StoriesClient';

export const metadata: Metadata = {
  title: 'Stories — Savitsky Museum',
  description: 'Films, publications, research and histories from the Savitsky Museum in Nukus.',
};

export default function StoriesPage() {
  return <StoriesClient />;
}
