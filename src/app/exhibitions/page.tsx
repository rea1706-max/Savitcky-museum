import type { Metadata } from 'next';
import ExhibitionsArchive from './ExhibitionsArchive';
import { exhibitions, museumToday } from '@/lib/exhibitions';

export const metadata: Metadata = {
  title: 'Exhibitions — Savitsky Museum',
  description:
    'Explore exhibitions from the Savitsky Museum archive, in Nukus and at museums around the world.',
};
export const revalidate = 3600;

export default function ExhibitionsPage() {
  return (
    <ExhibitionsArchive
      exhibitions={exhibitions.filter((exhibition) => exhibition.publicationStatus === 'published')}
      today={museumToday()}
    />
  );
}
