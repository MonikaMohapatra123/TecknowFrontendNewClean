import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';
  const token = localStorage.getItem('token'); // Get the JWT token from localStorage
  const expirationTime = localStorage.getItem('expirationTime');
  const isSessionValid = expirationTime && new Date().getTime() < expirationTime;

  if (!isAuthenticated || !isSessionValid || !token) {
    // If not authenticated, session has expired, or no token, clear localStorage and redirect to login
    localStorage.removeItem('authenticated');
    localStorage.removeItem('token'); // Remove the JWT token
    localStorage.removeItem('expirationTime');
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
