
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { Language, Festival } from '../../types';
import Section from '../common/Section';
import GlassCard from '../common/GlassCard';
import ResponsiveImage from '../common/ResponsiveImage';

interface CountdownProps {
  targetDate: string;
  language: Language;
}

const FestivalCountdown: React.FC<CountdownProps> = ({ targetDate, language }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });
  
  const timerComponents = [
    { labelEn: 'Days', labelMl: 'ദിവസങ്ങൾ', value: timeLeft.days },
    { labelEn: 'Hours', labelMl: 'മണിക്കൂർ', value: timeLeft.hours },
    { labelEn: 'Minutes', labelMl: 'മിനിറ്റ്', value: timeLeft.minutes },
    { labelEn: 'Seconds', labelMl: 'സെക്കൻഡ്', value: timeLeft.seconds },
  ];

  if (+new Date(targetDate) < +new Date()) {
    return <p className="text-center text-xl font-semibold text-green-600 dark:text-green-400">{language === Language.EN ? 'The festival has concluded!' : 'ഉത്സവം സമാപിച്ചു!'}</p>;
  }

  return (
    <div className="flex justify-center space-x-2 sm:space-x-4 text-center my-4">
      {timerComponents.map((part, index) => (
        <div key={index} className="bg-orange-100 dark:bg-gray-700 p-2 sm:p-4 rounded-lg shadow-md w-16 sm:w-20">
          <div className="text-xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400">{part.value}</div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{language === Language.EN ? part.labelEn : part.labelMl}</div>
        </div>
      ))}
    </div>
  );
};


const FestivalsSection: React.FC = () => {
  const { templeData, language } = useContext(AppContext);

  return (
    <Section 
      id="festivals" 
      title={language === Language.EN ? "Temple Festivals" : "ക്ഷേത്രോത്സവങ്ങൾ"}
      subtitle={language === Language.EN ? "Celebrations of Faith, Culture, and Togetherness" : "വിശ്വാസത്തിന്‍റെയും സംസ്കാരത്തിന്‍റെയും കൂട്ടായ്മയുടെയും ആഘോഷങ്ങൾ"}
      bgColor="bg-orange-50 dark:bg-slate-800"
    >
      <div className="space-y-12">
        {templeData.festivals.map((festival) => (
          <GlassCard key={festival.id} className="overflow-hidden md:flex md:space-x-6 items-center">
            <div className="md:w-1/2 lg:w-2/5">
                 <ResponsiveImage src={festival.image} alt={language === Language.EN ? festival.name : festival.nameMalayalam} aspectRatio="aspect-video" className="mb-4 md:mb-0"/>
            </div>
            <div className="md:w-1/2 lg:w-3/5 p-4 md:p-0">
              <h3 className="text-2xl font-semibold mb-2 text-orange-700 dark:text-orange-400 font-playfair">
                {language === Language.EN ? festival.name : festival.nameMalayalam}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {language === Language.EN ? `Date: ${festival.date}` : `തീയതി: ${festival.date}`}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {language === Language.EN ? festival.description : festival.descriptionMalayalam}
              </p>
              {festival.countdownTo && new Date(festival.countdownTo) >= new Date() && (
                <div>
                  <h4 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-200">
                    {language === Language.EN ? "Countdown to Festival:" : "ഉത്സവത്തിലേക്കുള്ള കൗണ്ട്ഡൗൺ:"}
                  </h4>
                  <FestivalCountdown targetDate={festival.countdownTo} language={language} />
                </div>
              )}
               {festival.countdownTo && new Date(festival.countdownTo) < new Date() && (
                 <p className="text-center text-lg font-semibold text-green-600 dark:text-green-400">{language === Language.EN ? 'This festival has recently concluded.' : 'ഈ ഉത്സവം അടുത്തിടെ സമാപിച്ചു.'}</p>
               )}
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
};

export default FestivalsSection;
