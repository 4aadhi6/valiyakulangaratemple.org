
import React, { useContext } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { ROUTE_PATHS } from '../constants';
import { Language } from '../types';
import { Cog6ToothIcon, PhotoIcon, BookOpenIcon, CalendarDaysIcon, MegaphoneIcon, ArrowLeftOnRectangleIcon, QueueListIcon } from '@heroicons/react/24/outline';

import AdminContentEditor from '../components/admin/AdminContentEditor';
import AdminGalleryManager from '../components/admin/AdminGalleryManager';
import AdminPoojaManager from '../components/admin/AdminPoojaManager';
import AdminFestivalManager from '../components/admin/AdminFestivalManager';
import AdminNewsManager from '../components/admin/AdminNewsManager';
import AdminSettings from '../components/admin/AdminSettings'; // For theme/language global settings if any

const AdminDashboardPage: React.FC = () => {
  const { language, logout } = useContext(AppContext);
  const location = useLocation();

  const adminNavLinks = [
    { name: 'Dashboard', nameMl: 'ഡാഷ്‌ബോർഡ്', path: ROUTE_PATHS.ADMIN_DASHBOARD, icon: <QueueListIcon className="h-5 w-5 mr-3" /> },
    { name: 'Temple Info', nameMl: 'ക്ഷേത്ര വിവരം', path: ROUTE_PATHS.ADMIN_HISTORY, icon: <BookOpenIcon className="h-5 w-5 mr-3" /> },
    { name: 'Poojas', nameMl: 'പൂജകൾ', path: ROUTE_PATHS.ADMIN_POOJAS, icon: <MegaphoneIcon className="h-5 w-5 mr-3" /> }, // Placeholder, choose better icon
    { name: 'Festivals', nameMl: 'ഉത്സവങ്ങൾ', path: ROUTE_PATHS.ADMIN_FESTIVALS, icon: <CalendarDaysIcon className="h-5 w-5 mr-3" /> },
    { name: 'Gallery', nameMl: 'ഗാലറി', path: ROUTE_PATHS.ADMIN_GALLERY, icon: <PhotoIcon className="h-5 w-5 mr-3" /> },
    { name: 'News/Alerts', nameMl: 'വാർത്തകൾ', path: ROUTE_PATHS.ADMIN_NEWS, icon: <MegaphoneIcon className="h-5 w-5 mr-3" /> },
    { name: 'Settings', nameMl: 'ക്രമീകരണങ്ങൾ', path: ROUTE_PATHS.ADMIN_SETTINGS, icon: <Cog6ToothIcon className="h-5 w-5 mr-3" /> },
  ];
  
  const getSectionTitle = () => {
    const currentLink = adminNavLinks.find(link => location.pathname.includes(link.path.replace('/admin', '')));
    if (currentLink) {
      return language === Language.EN ? currentLink.name : currentLink.nameMl;
    }
    if(location.pathname === ROUTE_PATHS.ADMIN_DASHBOARD) return language === Language.EN ? 'Dashboard' : 'ഡാഷ്‌ബോർഡ്';
    return language === Language.EN ? 'Admin Panel' : 'അഡ്മിൻ പാനൽ';
  };


  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-10rem)] bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 p-4 shadow-lg md:shadow-none md:border-r dark:border-gray-700">
        <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-6 font-playfair">
          {language === Language.EN ? 'Admin Menu' : 'അഡ്മിൻ മെനു'}
        </h2>
        <nav className="space-y-2">
          {adminNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                ${location.pathname === link.path || (link.path !== ROUTE_PATHS.ADMIN_DASHBOARD && location.pathname.startsWith(link.path))
                  ? 'bg-orange-100 dark:bg-orange-700/30 text-orange-600 dark:text-orange-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              {link.icon}
              {language === Language.EN ? link.name : link.nameMl}
            </Link>
          ))}
          <button
            onClick={logout}
            className="flex items-center w-full mt-4 px-3 py-2.5 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700/50 transition-colors"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
            {language === Language.EN ? 'Logout' : 'പുറത്ത് പോവുക'}
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
         <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 font-playfair">
           {getSectionTitle()}
        </h1>
        <Routes>
          <Route path="/" element={<AdminDashboardHome />} /> {/* Default for /admin */}
          <Route path="/dashboard" element={<AdminDashboardHome />} />
          <Route path="/history" element={<AdminContentEditor section="info" fields={['history', 'specialties']} />} />
          <Route path="/poojas" element={<AdminPoojaManager />} />
          <Route path="/festivals" element={<AdminFestivalManager />} />
          <Route path="/gallery" element={<AdminGalleryManager />} />
          <Route path="/news" element={<AdminNewsManager />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </main>
    </div>
  );
};

const AdminDashboardHome: React.FC = () => {
    const { language } = useContext(AppContext);
    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                {language === Language.EN ? 'Welcome to the Admin Dashboard' : 'അഡ്മിൻ ഡാഷ്‌ബോർഡിലേക്ക് സ്വാഗതം'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
                {language === Language.EN 
                    ? 'Select a section from the menu to manage temple content. You can update information about history, poojas, festivals, upload images to the gallery, and post news or alerts.' 
                    : 'ക്ഷേത്രത്തിലെ ഉള്ളടക്കം കൈകാര്യം ചെയ്യുന്നതിന് മെനുവിൽ നിന്ന് ഒരു വിഭാഗം തിരഞ്ഞെടുക്കുക. നിങ്ങൾക്ക് ചരിത്രം, പൂജകൾ, ഉത്സവങ്ങൾ എന്നിവയെക്കുറിച്ചുള്ള വിവരങ്ങൾ അപ്‌ഡേറ്റ് ചെയ്യാനും ഗാലറിയിലേക്ക് ചിത്രങ്ങൾ അപ്‌ലോഡ് ചെയ്യാനും വാർത്തകളോ അറിയിപ്പുകളോ പോസ്റ്റ് ചെയ്യാനും കഴിയും.'}
            </p>
            {/* Can add quick stats or links here */}
        </div>
    );
}


export default AdminDashboardPage;
