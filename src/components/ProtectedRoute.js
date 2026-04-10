import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);
  

  // Show loader only while validating before user is known
  if (loading && !user) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  // If no user after loading completes
  if (!user) {
    // Regardless of token, if we don't have a user after validation, go to login
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required, redirect based on actual role
  if (requiredRole && user.role !== requiredRole) {
    const fallback = user.role === 'admin' ? '/admin' : '/UserDashboard';
    return <Navigate to={fallback} replace />;
  }

  // Logged in (and role matches if required), render children
  return children;
};

export default ProtectedRoute; 