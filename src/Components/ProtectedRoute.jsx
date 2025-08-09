import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading while auth state is being determined
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center"
      >
        <div className="text-center">
          <LoadingSpinner size="xl" color="pink" />
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </motion.div>
    );
  }

  // Redirect to login if authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect authenticated users away from auth pages
  if (!requireAuth && isAuthenticated && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default ProtectedRoute;
