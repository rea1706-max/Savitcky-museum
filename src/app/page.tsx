import React from 'react';
import ClosingFooter from '@/app/components/ClosingFooter';
import OpeningSequence from '@/app/components/OpeningSequence';
import InfoStrip from '@/app/components/InfoStrip';
import AboutMuseum from '@/app/components/AboutMuseum';
import WhatsOnSection from '@/app/components/WhatsOnSection';
import CollectionJourney from '@/app/components/CollectionJourney';
import MuseumToday from '@/app/components/MuseumToday';
import FinalHorizon from '@/app/components/FinalHorizon';
import {
  exhibitions,
  homepageExhibitionSettings,
  featuredExhibition,
  museumToday,
} from '@/lib/exhibitions';

export const revalidate = 3600;

export default function HomePage() {
  const today = museumToday();
  const featured = featuredExhibition(exhibitions, homepageExhibitionSettings, today);
  return (
    <main className="bg-background min-h-screen">
      <OpeningSequence />
      <InfoStrip />
      <AboutMuseum />
      <CollectionJourney>
        {featured && <WhatsOnSection exhibition={featured} today={today} />}
      </CollectionJourney>
      <MuseumToday />
      <FinalHorizon />
      <ClosingFooter />
    </main>
  );
}
