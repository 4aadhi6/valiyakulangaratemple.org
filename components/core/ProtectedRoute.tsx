
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import { ROUTE_PATHS } from '../../constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoadingData } = useContext(AppContext); // isAuthenticated is now derived from token
  const location = useLocation();

  if (isLoadingData) {
    // Optional: show a loading spinner or something while auth state is being determined
    return <div className="flex justify-center items-center h-screen"><p>Loading authentication status...</p></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.ADMIN_LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
