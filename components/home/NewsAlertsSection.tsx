
import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { Language } from '../../types';
import Section from '../common/Section';
import GlassCard from '../common/GlassCard';

const NewsAlertsSection: React.FC = () => {
  const { templeData, language } = useContext(AppContext);

  const sortedNews = [...templeData.newsAlerts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Section 
      id="news" 
      title={language === Language.EN ? "News & Alerts" : "വാർത്തകളും അറിയിപ്പുകളും"}
      subtitle={language === Language.EN ? "Stay Updated with Recent Happenings and Announcements" : "സമീപകാല സംഭവങ്ങളും അറിയിപ്പുകളും ഉപയോഗിച്ച് അപ്‌ഡേറ്റ് ചെയ്യുക"}
      bgColor="bg-orange-50 dark:bg-slate-800"
    >
      {sortedNews.length === 0 ? (
         <p className="text-center text-gray-600 dark:text-gray-400">
           {language === Language.EN ? "No news or alerts at the moment. Please check back later." : "ഇപ്പോൾ വാർത്തകളോ അറിയിപ്പുകളോ ലഭ്യമല്ല. ദയവായി പിന്നീട് പരിശോധിക്കുക."}
        </p>
      ) : (
        <div className="space-y-6">
          {sortedNews.map((item) => (
            <GlassCard key={item.id} className="p-6 hover:shadow-orange-200 dark:hover:shadow-orange-700/50">
              <h3 className="text-xl font-semibold mb-2 text-orange-700 dark:text-orange-400">
                {language === Language.EN ? item.title : item.titleMalayalam}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                {new Date(item.date).toLocaleDateString(language === Language.EN ? 'en-US' : 'ml-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {language === Language.EN ? item.content : item.contentMalayalam}
              </p>
            </GlassCard>
          ))}
        </div>
      )}
    </Section>
  );
};

export default NewsAlertsSection;
