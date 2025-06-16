
import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { ROUTE_PATHS, API_BASE_URL } from '../constants';
import GlassCard from '../components/common/GlassCard';

const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, language } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || ROUTE_PATHS.ADMIN_DASHBOARD;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.token) {
        login(data.token); // Store token in AppContext/localStorage
        navigate(from, { replace: true });
      } else {
        setError(language === 'EN' ? 'Login failed. Please try again.' : 'ലോഗിൻ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.');
      }
    } catch (err: any) {
      setError(err.message || (language === 'EN' ? 'Invalid username or password.' : 'തെറ്റായ ഉപയോക്തൃനാമമോ പാസ്‌വേഡോ.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-4 bg-gradient-to-br from-orange-100 via-amber-50 to-orange-100 dark:from-gray-800 dark:via-gray-900 dark:to-slate-800">
      <GlassCard className="w-full max-w-md p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-600 dark:text-orange-400 font-playfair">
          {language === 'EN' ? 'Admin Login' : 'അഡ്മിൻ ലോഗിൻ'}
        </h2>
        {error && <p className="mb-4 text-center text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-md">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {language === 'EN' ? 'Username' : 'ഉപയോക്തൃനാമം'}
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white/50 dark:bg-gray-700/50 dark:text-white sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {language === 'EN' ? 'Password' : 'പാസ്‌വേഡ്'}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white/50 dark:bg-gray-700/50 dark:text-white sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50"
            >
              {isLoading ? (language === 'EN' ? 'Logging in...' : 'ലോഗിൻ ചെയ്യുന്നു...') : (language === 'EN' ? 'Login' : 'ലോഗിൻ ചെയ്യുക')}
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default AdminLoginPage;
