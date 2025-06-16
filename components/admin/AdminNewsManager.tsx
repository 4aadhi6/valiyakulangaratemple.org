
import React, { useState, useContext, FormEvent, ChangeEvent, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { Language, NewsAlert } from '../../types';
import * as templeDataService from '../../services/templeDataService';
import { PlusCircleIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const AdminNewsManager: React.FC = () => {
  const { templeData, fetchTempleData, language, isLoadingData } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<NewsAlert>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const openModalForNew = () => {
    setCurrentItem({ title: '', titleMalayalam: '', content: '', contentMalayalam: '', date: new Date().toISOString().substring(0,10) });
    setIsEditing(false);
    setEditingItemId(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (item: NewsAlert) => {
    setCurrentItem({ ...item, date: item.date.substring(0,10) }); // Format for input type="date"
    setIsEditing(true);
    setEditingItemId(item.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem({});
    setEditingItemId(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentItem.title || !currentItem.date) { // Basic validation
        alert(language === Language.EN ? "Title and Date are required." : "തലക്കെട്ടും തീയതിയും ആവശ്യമാണ്.");
        return;
    }
    setFormLoading(true);
    
    const finalItem = { ...currentItem, date: new Date(currentItem.date).toISOString() } as Omit<NewsAlert, 'id'> | NewsAlert;

    try {
      if (isEditing && editingItemId) {
        await templeDataService.updateNewsAlert(editingItemId, finalItem as NewsAlert);
      } else {
        await templeDataService.addNewsAlert(finalItem as Omit<NewsAlert, 'id'>);
      }
      await fetchTempleData();
      closeModal();
    } catch (error) {
      console.error("Failed to save news item:", error);
      alert(language === Language.EN ? "Failed to save news item." : "വാർത്ത സംരക്ഷിക്കുന്നതിൽ പരാജയപ്പെട്ടു.");
    } finally {
        setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(language === Language.EN ? 'Are you sure you want to delete this news item?' : 'ഈ വാർത്ത ഇല്ലാതാക്കാൻ നിങ്ങൾക്ക് ഉറപ്പുണ്ടോ?')) {
      setFormLoading(true);
      try {
        await templeDataService.deleteNewsAlert(id);
        await fetchTempleData();
      } catch (error) {
        console.error("Failed to delete news item:", error);
        alert(language === Language.EN ? "Failed to delete news item." : "വാർത്ത ഇല്ലാതാക്കുന്നതിൽ പരാജയപ്പെട്ടു.");
      } finally {
          setFormLoading(false);
      }
    }
  };
  
  const inputClass = "w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
  
  // Sorted news for display
  const sortedNewsAlerts = [...templeData.newsAlerts].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (isLoadingData && templeData.newsAlerts.length === 0) {
      return <p>{language === Language.EN ? "Loading news..." : "വാർത്തകൾ ലോഡ് ചെയ്യുന്നു..."}</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {language === Language.EN ? 'Manage News & Alerts' : 'വാർത്തകളും അറിയിപ്പുകളും കൈകാര്യം ചെയ്യുക'}
        </h3>
        <button
          onClick={openModalForNew}
          disabled={formLoading}
          className="flex items-center px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          {language === Language.EN ? 'Add News Item' : 'വാർത്ത ചേർക്കുക'}
        </button>
      </div>

      <div className="space-y-4">
        {sortedNewsAlerts.map((item) => (
          <div key={item.id} className="p-4 border dark:border-gray-700 rounded-lg flex justify-between items-start bg-gray-50 dark:bg-gray-700/50">
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-100">{language === Language.EN ? item.title : item.titleMalayalam}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{new Date(item.date).toLocaleDateString(language === Language.EN ? 'en-US' : 'ml-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{language === Language.EN ? item.content.substring(0,100) + '...' : item.contentMalayalam.substring(0,70) + '...'}</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 flex-shrink-0 ml-2">
              <button onClick={() => openModalForEdit(item)} disabled={formLoading} className="p-2 text-blue-500 hover:text-blue-700 disabled:opacity-50"><PencilSquareIcon className="h-5 w-5"/></button>
              <button onClick={() => handleDelete(item.id)} disabled={formLoading} className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50"><TrashIcon className="h-5 w-5"/></button>
            </div>
          </div>
        ))}
        {templeData.newsAlerts.length === 0 && !isLoadingData && <p className="text-center text-gray-500 dark:text-gray-400 py-4">{language === Language.EN ? "No news items added yet." : "വാർത്തകളൊന്നും ചേർത്തിട്ടില്ല."}</p>}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeModal}>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4" onClick={e => e.stopPropagation()}>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {isEditing ? (language === Language.EN ? 'Edit News Item' : 'വാർത്ത തിരുത്തുക') : (language === Language.EN ? 'Add New News Item' : 'പുതിയ വാർത്ത ചേർക്കുക')}
            </h4>
            
            <div><label htmlFor="title" className={labelClass}>{language === Language.EN ? 'Title (English)' : 'തലക്കെട്ട് (ഇംഗ്ലീഷ്)'}</label><input type="text" name="title" id="title" value={currentItem.title || ''} onChange={handleChange} className={inputClass} required disabled={formLoading} /></div>
            <div><label htmlFor="titleMalayalam" className={labelClass}>{language === Language.EN ? 'Title (Malayalam)' : 'തലക്കെട്ട് (മലയാളം)'}</label><input type="text" name="titleMalayalam" id="titleMalayalam" value={currentItem.titleMalayalam || ''} onChange={handleChange} className={inputClass} required disabled={formLoading} /></div>
            <div><label htmlFor="content" className={labelClass}>{language === Language.EN ? 'Content (English)' : 'ഉള്ളടക്കം (ഇംഗ്ലീഷ്)'}</label><textarea name="content" id="content" value={currentItem.content || ''} onChange={handleChange} rows={4} className={inputClass} disabled={formLoading} /></div>
            <div><label htmlFor="contentMalayalam" className={labelClass}>{language === Language.EN ? 'Content (Malayalam)' : 'ഉള്ളടക്കം (മലയാളം)'}</label><textarea name="contentMalayalam" id="contentMalayalam" value={currentItem.contentMalayalam || ''} onChange={handleChange} rows={4} className={inputClass} disabled={formLoading} /></div>
            <div><label htmlFor="date" className={labelClass}>{language === Language.EN ? 'Date' : 'തീയതി'}</label><input type="date" name="date" id="date" value={currentItem.date || ''} onChange={handleChange} className={inputClass} required disabled={formLoading} /></div>

            <div className="flex justify-end space-x-3 pt-4">
              <button type="button" onClick={closeModal} disabled={formLoading} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50">
                {language === Language.EN ? 'Cancel' : 'റദ്ദാക്കുക'}
              </button>
              <button type="submit" disabled={formLoading} className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50">
                {formLoading ? (language === Language.EN ? 'Saving...' : 'സേവ് ചെയ്യുന്നു...') : (language === Language.EN ? (isEditing ? 'Save Changes' : 'Add News') : (isEditing ? 'മാറ്റങ്ങൾ സംരക്ഷിക്കുക' : 'വാർത്ത ചേർക്കുക'))}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminNewsManager;
