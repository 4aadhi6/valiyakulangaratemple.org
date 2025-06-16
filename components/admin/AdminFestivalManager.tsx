
import React, { useState, useContext, FormEvent, ChangeEvent, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { Language, Festival } from '../../types';
import * as templeDataService from '../../services/templeDataService';
import { PlusCircleIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const AdminFestivalManager: React.FC = () => {
  const { templeData, fetchTempleData, language, isLoadingData } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFestival, setCurrentFestival] = useState<Partial<Festival>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingFestivalId, setEditingFestivalId] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const openModalForNew = () => {
    setCurrentFestival({ name: '', nameMalayalam: '', date: '', description: '', descriptionMalayalam: '', image: 'https://picsum.photos/seed/newfestival/600/400', countdownTo: '' });
    setIsEditing(false);
    setEditingFestivalId(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (festival: Festival) => {
    setCurrentFestival({ ...festival });
    setIsEditing(true);
    setEditingFestivalId(festival.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFestival({});
    setEditingFestivalId(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentFestival(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentFestival.name) {
        alert(language === Language.EN ? "Festival name is required." : "ഉത്സവത്തിൻ്റെ പേര് ആവശ്യമാണ്.");
        return;
    }
    setFormLoading(true);

    let finalFestivalData = { ...currentFestival };
    if (finalFestivalData.countdownTo && !isNaN(new Date(finalFestivalData.countdownTo).getTime())) {
        finalFestivalData.countdownTo = new Date(finalFestivalData.countdownTo).toISOString();
    } else {
        finalFestivalData.countdownTo = undefined; 
    }
    
    try {
      if (isEditing && editingFestivalId) {
        await templeDataService.updateFestival(editingFestivalId, finalFestivalData as Festival);
      } else {
        await templeDataService.addFestival(finalFestivalData as Omit<Festival, 'id'>);
      }
      await fetchTempleData();
      closeModal();
    } catch (error) {
      console.error("Failed to save festival:", error);
      alert(language === Language.EN ? "Failed to save festival." : "ഉത്സവം സംരക്ഷിക്കുന്നതിൽ പരാജയപ്പെട്ടു.");
    } finally {
        setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(language === Language.EN ? 'Are you sure you want to delete this Festival?' : 'ഈ ഉത്സവം ഇല്ലാതാക്കാൻ നിങ്ങൾക്ക് ഉറപ്പുണ്ടോ?')) {
      setFormLoading(true);
      try {
        await templeDataService.deleteFestival(id);
        await fetchTempleData();
      } catch (error) {
        console.error("Failed to delete festival:", error);
        alert(language === Language.EN ? "Failed to delete festival." : "ഉത്സവം ഇല്ലാതാക്കുന്നതിൽ പരാജയപ്പെട്ടു.");
      } finally {
          setFormLoading(false);
      }
    }
  };
  
  const inputClass = "w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
  
  if (isLoadingData && templeData.festivals.length === 0) {
      return <p>{language === Language.EN ? "Loading festivals..." : "ഉത്സവങ്ങൾ ലോഡ് ചെയ്യുന്നു..."}</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {language === Language.EN ? 'Manage Festivals' : 'ഉത്സവങ്ങൾ കൈകാര്യം ചെയ്യുക'}
        </h3>
        <button
          onClick={openModalForNew}
          disabled={formLoading}
          className="flex items-center px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          {language === Language.EN ? 'Add Festival' : 'ഉത്സവം ചേർക്കുക'}
        </button>
      </div>

      <div className="space-y-4">
        {templeData.festivals.map((festival) => (
          <div key={festival.id} className="p-4 border dark:border-gray-700 rounded-lg flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-100">{language === Language.EN ? festival.name : festival.nameMalayalam}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{festival.date}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => openModalForEdit(festival)} disabled={formLoading} className="p-2 text-blue-500 hover:text-blue-700 disabled:opacity-50"><PencilSquareIcon className="h-5 w-5"/></button>
              <button onClick={() => handleDelete(festival.id)} disabled={formLoading} className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50"><TrashIcon className="h-5 w-5"/></button>
            </div>
          </div>
        ))}
         {templeData.festivals.length === 0 && !isLoadingData && <p className="text-center text-gray-500 dark:text-gray-400 py-4">{language === Language.EN ? "No festivals added yet." : "ഉത്സവങ്ങളൊന്നും ചേർത്തിട്ടില്ല."}</p>}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeModal}>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4" onClick={e => e.stopPropagation()}>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {isEditing ? (language === Language.EN ? 'Edit Festival' : 'ഉത്സവം തിരുത്തുക') : (language === Language.EN ? 'Add New Festival' : 'പുതിയ ഉത്സവം ചേർക്കുക')}
            </h4>
            
            <div><label htmlFor="name" className={labelClass}>{language === Language.EN ? 'Name (English)' : 'പേര് (ഇംഗ്ലീഷ്)'}</label><input type="text" name="name" id="name" value={currentFestival.name || ''} onChange={handleChange} className={inputClass} required disabled={formLoading} /></div>
            <div><label htmlFor="nameMalayalam" className={labelClass}>{language === Language.EN ? 'Name (Malayalam)' : 'പേര് (മലയാളം)'}</label><input type="text" name="nameMalayalam" id="nameMalayalam" value={currentFestival.nameMalayalam || ''} onChange={handleChange} className={inputClass} required disabled={formLoading} /></div>
            <div><label htmlFor="date" className={labelClass}>{language === Language.EN ? 'Date (e.g., March-April or Specific Date)' : 'തീയതി (ഉദാ: മാർച്ച്-ഏപ്രിൽ അല്ലെങ്കിൽ നിർദ്ദിഷ്ട തീയതി)'}</label><input type="text" name="date" id="date" value={currentFestival.date || ''} onChange={handleChange} className={inputClass} disabled={formLoading} /></div>
            <div><label htmlFor="description" className={labelClass}>{language === Language.EN ? 'Description (English)' : 'വിവരണം (ഇംഗ്ലീഷ്)'}</label><textarea name="description" id="description" value={currentFestival.description || ''} onChange={handleChange} rows={3} className={inputClass} disabled={formLoading} /></div>
            <div><label htmlFor="descriptionMalayalam" className={labelClass}>{language === Language.EN ? 'Description (Malayalam)' : 'വിവരണം (മലയാളം)'}</label><textarea name="descriptionMalayalam" id="descriptionMalayalam" value={currentFestival.descriptionMalayalam || ''} onChange={handleChange} rows={3} className={inputClass} disabled={formLoading} /></div>
            <div><label htmlFor="image" className={labelClass}>{language === Language.EN ? 'Image URL' : 'ചിത്രത്തിന്റെ URL'}</label><input type="url" name="image" id="image" value={currentFestival.image || ''} onChange={handleChange} className={inputClass} placeholder="https://picsum.photos/600/400" disabled={formLoading}/></div>
            <div><label htmlFor="countdownTo" className={labelClass}>{language === Language.EN ? 'Countdown To (YYYY-MM-DDTHH:MM format, optional)' : 'കൗണ്ട്ഡൗൺ (YYYY-MM-DDTHH:MM ഫോർമാറ്റ്, ഓപ്ഷണൽ)'}</label>
                 <input 
                    type="datetime-local" 
                    name="countdownTo" 
                    id="countdownTo" 
                    value={currentFestival.countdownTo ? currentFestival.countdownTo.substring(0, 16) : ''} // Format for datetime-local
                    onChange={handleChange} 
                    className={inputClass} 
                    disabled={formLoading}
                 />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button type="button" onClick={closeModal} disabled={formLoading} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50">
                {language === Language.EN ? 'Cancel' : 'റദ്ദാക്കുക'}
              </button>
              <button type="submit" disabled={formLoading} className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50">
                {formLoading ? (language === Language.EN ? 'Saving...' : 'സേവ് ചെയ്യുന്നു...') : (language === Language.EN ? (isEditing ? 'Save Changes' : 'Add Festival') : (isEditing ? 'മാറ്റങ്ങൾ സംരക്ഷിക്കുക' : 'ഉത്സവം ചേർക്കുക'))}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminFestivalManager;
