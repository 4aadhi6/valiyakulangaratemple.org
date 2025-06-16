
import React, { useState, useContext, FormEvent, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { Language, TempleData, TempleInfo } from '../../types';
import * as templeDataService from '../../services/templeDataService';


interface AdminContentEditorProps {
  section: 'info'; // This component is specifically for TempleInfo now
  fields: Array<keyof TempleInfo>; 
}

const AdminContentEditor: React.FC<AdminContentEditorProps> = ({ section, fields }) => {
  const { templeData, fetchTempleData, language, isLoadingData } = useContext(AppContext);
  
  const [formData, setFormData] = useState<Partial<TempleInfo>>({});
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize form data when templeData.info is loaded or changes
    if (templeData.info) {
        const initialSectionData = templeData.info;
        setFormData(initialSectionData);
    }
  }, [templeData.info]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, field: keyof TempleInfo) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage('');
    try {
      await templeDataService.updateTempleInfo(formData);
      await fetchTempleData(); // Refetch all data to update context
      setStatusMessage(language === Language.EN ? 'Content updated successfully!' : 'ഉള്ളടക്കം വിജയകരമായി അപ്ഡേറ്റ് ചെയ്തു!');
    } catch (error) {
        console.error("Failed to update temple info:", error);
        setStatusMessage(language === Language.EN ? 'Failed to update content.' : 'ഉള്ളടക്കം അപ്ഡേറ്റ് ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു.');
    } finally {
        setIsLoading(false);
        setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const getFieldLabel = (field: keyof TempleInfo): string => {
    if (language === Language.ML) {
      if (field === 'history') return 'ചരിത്രം (ഇംഗ്ലീഷ്)';
      if (field === 'historyMalayalam') return 'ചരിത്രം (മലയാളം)';
      if (field === 'specialties') return 'സവിശേഷതകൾ (ഇംഗ്ലീഷ്)';
      if (field === 'specialtiesMalayalam') return 'സവിശേഷതകൾ (മലയാളം)';
    }
    // Default to English labels
    if (field === 'history') return 'History (English)';
    if (field === 'historyMalayalam') return 'History (Malayalam)';
    if (field === 'specialties') return 'Specialties (English)';
    if (field === 'specialtiesMalayalam') return 'Specialties (Malayalam)';
    return field; // Fallback to the field name itself (it's already a string)
  };
  
  // Helper to get the correct field name based on whether it's the base (English) or Malayalam version
  const getFieldNameForLang = (baseField: keyof TempleInfo, lang: Language): keyof TempleInfo => {
    if (lang === Language.ML) {
      return `${baseField}Malayalam` as keyof TempleInfo;
    }
    return baseField; // This assumes 'history' and 'specialties' are the English fields
  }


  if (isLoadingData && !templeData.info.history) { // Check if initial data is still loading
      return <p>{language === Language.EN ? "Loading content editor..." : "ഉള്ളടക്ക എഡിറ്റർ ലോഡ് ചെയ്യുന്നു..."}</p>;
  }


  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((baseField) => {
          // Ensure we only render pairs: e.g., 'history' and 'historyMalayalam'
          // This mapping logic assumes 'fields' contains only the base English names like 'history', 'specialties'
          if (baseField.endsWith('Malayalam')) return null; // Skip direct rendering of Malayalam fields, handle them via pair

          const englishField = baseField;
          const malayalamField = `${baseField}Malayalam` as keyof TempleInfo;

          return (
            <React.Fragment key={baseField}>
              <div>
                <label htmlFor={englishField} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {getFieldLabel(englishField)}
                </label>
                <textarea
                  id={englishField}
                  name={englishField}
                  rows={8}
                  value={formData[englishField] || ''}
                  onChange={(e) => handleChange(e, englishField)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-gray-50 dark:bg-gray-700 dark:text-white sm:text-sm"
                  disabled={isLoading}
                />
              </div>
              {/* Ensure Malayalam field exists in TempleInfo type, which it does */}
              {Object.keys(templeData.info).includes(malayalamField) && (
                 <div>
                    <label htmlFor={malayalamField} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {getFieldLabel(malayalamField)}
                    </label>
                    <textarea
                    id={malayalamField}
                    name={malayalamField}
                    rows={8}
                    value={formData[malayalamField] || ''}
                    onChange={(e) => handleChange(e, malayalamField)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-gray-50 dark:bg-gray-700 dark:text-white sm:text-sm"
                    disabled={isLoading}
                    />
                </div>
              )}
            </React.Fragment>
          );
        })}
        {statusMessage && <p className={`text-sm ${statusMessage.includes('Failed') || statusMessage.includes('പരാജയപ്പെട്ടു') ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>{statusMessage}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2.5 bg-orange-500 text-white font-medium text-sm rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50"
        >
          {isLoading ? (language === Language.EN ? 'Saving...' : 'സേവ് ചെയ്യുന്നു...') : (language === Language.EN ? 'Save Changes' : 'മാറ്റങ്ങൾ സംരക്ഷിക്കുക')}
        </button>
      </form>
    </div>
  );
};

export default AdminContentEditor;
