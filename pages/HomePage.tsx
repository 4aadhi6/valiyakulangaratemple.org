
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Language, NewsAlert } from '../types';

import LandingSection from '../components/home/LandingSection';
import HistorySection from '../components/home/HistorySection';
import PoojasSection from '../components/home/PoojasSection';
import FestivalsSection from '../components/home/FestivalsSection';
import GallerySection from '../components/home/GallerySection';
import NewsAlertsSection from '../components/home/NewsAlertsSection';
import ContactSection from '../components/home/ContactSection';
import MarqueeText from '../components/common/MarqueeText';

const HomePage: React.FC = () => {
  const { templeData, language, isLoadingData } = useContext(AppContext);

  if (isLoadingData) {
    // Or a more integrated skeleton loader for each section
    return <div className="min-h-screen flex items-center justify-center"><p>Loading temple details...</p></div>;
  }

  const marqueeItems = templeData.newsAlerts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by most recent
    .slice(0, 5) // Take top 5
    .map((alert: NewsAlert) => language === Language.ML ? alert.titleMalayalam : alert.title);


  return (
    <div>
      <LandingSection />
      {marqueeItems.length > 0 && <MarqueeText items={marqueeItems} />}
      <HistorySection />
      <PoojasSection />
      <FestivalsSection />
      <GallerySection />
      <NewsAlertsSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
