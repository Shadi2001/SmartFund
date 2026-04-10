import React from 'react';
import { useAdminDashboard } from '../../AdminDashboardContext';

const UserProfile = () => {
  const { user } = useAdminDashboard();

  return (
    <div className="user-profile-section">
      <div className="d-flex align-items-center">
        <img
          src={user?.profilePhoto || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt="Admin Avatar"
          className="user-avatar me-3"
          onError={(e) => {
            e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
          }}
        />
        <div>
          <h6 className="mb-1" style={{ color: '#495057', fontWeight: 600 }}>
            {user?.fullName || user?.firstName || 'Admin User'}
          </h6>
          <p className="mb-0" style={{ fontSize: '0.8rem', color: '#6c757d' }}>
            Administrator
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
