
import React, { useContext, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { Language, Pooja } from '../../types';
import Section from '../common/Section';
import GlassCard from '../common/GlassCard';
import ResponsiveImage from '../common/ResponsiveImage';
import Modal from '../common/Modal';

const PoojaDetailModal: React.FC<{ pooja: Pooja; isOpen: boolean; onClose: () => void; language: Language }> = ({ pooja, isOpen, onClose, language }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={language === Language.EN ? pooja.name : pooja.nameMalayalam} size="lg">
      <div className="space-y-4">
        <ResponsiveImage src={pooja.image} alt={language === Language.EN ? pooja.name : pooja.nameMalayalam} aspectRatio="aspect-video" />
        <div>
          <h4 className="font-semibold text-lg text-orange-600 dark:text-orange-400">{language === Language.EN ? "Description" : "വിവരണം"}</h4>
          <p className="text-gray-700 dark:text-gray-300">{language === Language.EN ? pooja.description : pooja.descriptionMalayalam}</p>
        </div>
        <div>
          <h4 className="font-semibold text-lg text-orange-600 dark:text-orange-400">{language === Language.EN ? "Uses & Benefits" : "ഉപയോഗങ്ങളും പ്രയോജനങ്ങളും"}</h4>
          <p className="text-gray-700 dark:text-gray-300">{pooja.uses}</p>
        </div>
        {pooja.price && (
          <div>
            <h4 className="font-semibold text-lg text-orange-600 dark:text-orange-400">{language === Language.EN ? "Offering Price" : "വഴിപാട് നിരക്ക്"}</h4>
            <p className="text-gray-700 dark:text-gray-300">{pooja.price}</p>
          </div>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400">
            {language === Language.EN ? "For bookings and more details, please contact the temple office." : "ബുക്കിംഗിനും കൂടുതൽ വിവരങ്ങൾക്കും ദയവായി ക്ഷേത്രം ഓഫീസുമായി ബന്ധപ്പെടുക."}
        </p>
      </div>
    </Modal>
  );
};

const PoojasSection: React.FC = () => {
  const { templeData, language } = useContext(AppContext);
  const [selectedPooja, setSelectedPooja] = useState<Pooja | null>(null);

  return (
    <Section 
      id="poojas" 
      title={language === Language.EN ? "Available Poojas" : "ലഭ്യമായ പൂജകൾ"}
      subtitle={language === Language.EN ? "Seek Divine Blessings Through Sacred Rituals" : "പുണ്യകർമ്മങ്ങളിലൂടെ ദിവ്യാനുഗ്രഹം തേടുക"}
      bgColor="bg-white dark:bg-gray-900"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {templeData.poojas.map((pooja) => (
          <GlassCard key={pooja.id} className="flex flex-col group" onClick={() => setSelectedPooja(pooja)}>
            <ResponsiveImage src={pooja.image} alt={language === Language.EN ? pooja.name : pooja.nameMalayalam} aspectRatio="aspect-[4/3]" className="mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-orange-700 dark:text-orange-400 group-hover:text-orange-500 transition-colors">
              {language === Language.EN ? pooja.name : pooja.nameMalayalam}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex-grow">
              {language === Language.EN ? pooja.description.substring(0,100) + '...' : pooja.descriptionMalayalam.substring(0,70) + '...'}
            </p>
            {pooja.price && <p className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3">{language === Language.EN ? 'Price: ' : 'നിരക്ക്: '}{pooja.price}</p>}
            <button 
                className="mt-auto w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                onClick={(e) => { e.stopPropagation(); setSelectedPooja(pooja);}}
            >
              {language === Language.EN ? "View Details" : "വിശദാംശങ്ങൾ കാണുക"}
            </button>
          </GlassCard>
        ))}
      </div>
      {selectedPooja && (
        <PoojaDetailModal 
          pooja={selectedPooja} 
          isOpen={!!selectedPooja} 
          onClose={() => setSelectedPooja(null)} 
          language={language}
        />
      )}
    </Section>
  );
};

export default PoojasSection;
