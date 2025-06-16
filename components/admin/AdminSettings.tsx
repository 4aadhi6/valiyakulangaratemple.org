
import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { Language } from '../../types';

const AdminSettings: React.FC = () => {
  const { language, theme, toggleTheme, setLanguage } = useContext(AppContext);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          {language === Language.EN ? 'Site Display Settings' : 'സൈറ്റ് ഡിസ്പ്ലേ ക്രമീകരണങ്ങൾ'}
        </h3>
        <div className="space-y-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <span className="text-gray-700 dark:text-gray-300">
              {language === Language.EN ? 'Current Theme:' : 'നിലവിലെ തീം:'} 
              <span className="font-semibold ml-1">{theme === 'light' ? (language === Language.EN ? 'Light' : 'ലൈറ്റ്') : (language === Language.EN ? 'Dark' : 'ഡാർക്ക്')}</span>
            </span>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
            >
              {language === Language.EN ? `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode` : `മോഡ് ${theme === 'light' ? 'ഡാർക്ക്' : 'ലൈറ്റ്'} ആക്കുക`}
            </button>
          </div>

          {/* Language Switch */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
             <span className="text-gray-700 dark:text-gray-300">
              {language === Language.EN ? 'Current Language:' : 'നിലവിലെ ഭാഷ:'}
              <span className="font-semibold ml-1">{language === Language.EN ? 'English' : 'മലയാളം'}</span>
            </span>
            <button
              onClick={() => setLanguage(language === Language.EN ? Language.ML : Language.EN)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
            >
              {language === Language.EN ? 'Switch to Malayalam' : 'ഇംഗ്ലീഷിലേക്ക് മാറുക'}
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          {language === Language.EN ? 'Gemini API Status' : 'ജെമിനി API സ്റ്റാറ്റസ്'}
        </h3>
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            {process.env.API_KEY ? (
                <p className="text-green-600 dark:text-green-400">{language === Language.EN ? 'Gemini API Key is configured.' : 'ജെമിനി API കീ കോൺഫിഗർ ചെയ്‌തിരിക്കുന്നു.'}</p>
            ) : (
                <p className="text-red-500 dark:text-red-400">{language === Language.EN ? 'Gemini API Key (process.env.API_KEY) is NOT configured. AI features will be limited.' : 'ജെമിനി API കീ (process.env.API_KEY) കോൺഫിഗർ ചെയ്തിട്ടില്ല. AI സവിശേഷതകൾ പരിമിതമായിരിക്കും.'}</p>
            )}
        </div>
      </div>
      
      {/* Placeholder for more settings */}
      {/* 
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          {language === Language.EN ? 'Other Settings' : 'മറ്റ് ക്രമീകരണങ്ങൾ'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {language === Language.EN ? 'More site-wide settings can be added here as needed.' : 'ആവശ്യാനുസരണം കൂടുതൽ സൈറ്റ് ക്രമീകരണങ്ങൾ ഇവിടെ ചേർക്കാവുന്നതാണ്.'}
        </p>
      </div>
      */}
    </div>
  );
};

export default AdminSettings;
