import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login" replace />;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = JSON.parse(atob(base64));

    const userRole = decodedPayload.role;

   
    if (userRole === 'admin') {
      return children;
    }

   
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (err) {
    console.error('Token decode error:', err);
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
