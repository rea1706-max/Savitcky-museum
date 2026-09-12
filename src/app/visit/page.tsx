import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VisitHero from '@/app/visit/components/VisitHero';
import VisitHours from '@/app/visit/components/VisitHours';
import VisitTickets from '@/app/visit/components/VisitTickets';
import VisitLocation from '@/app/visit/components/VisitLocation';
import VisitTours from '@/app/visit/components/VisitTours';
import VisitFAQ from '@/app/visit/components/VisitFAQ';

export default function VisitPage() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      <VisitHero />
      <VisitHours />
      <VisitTickets />
      <VisitLocation />
      <VisitTours />
      <VisitFAQ />
      <Footer />
    </main>
  );
}