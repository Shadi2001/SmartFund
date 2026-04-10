import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthContext';
import NotificationsDropdown from './NotificationsDropdown';
import SettingsDropdown from './SettingsDropdown';

const Header = ({ setSection }) => {
  const { user, loading } = useContext(AuthContext);

  // Helper function to get user's display name
  const getUserDisplayName = () => {
    if (loading) return "Loading...";
    if (!user) return "User";
    
    // Check for different possible name properties
    if (user.fullName) return user.fullName;
    if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
    if (user.userFirstName && user.userLastName) return `${user.userFirstName} ${user.userLastName}`;
    if (user.firstName) return user.firstName;
    if (user.userFirstName) return user.userFirstName;
    
    return "User";
  };

  return (
    <div style={{ background: "#0343f2", padding: "1rem 2rem", color: "white" }}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-4">
          <div>
            <h3 className="mb-0 fw-bold" style={{ color: 'white' }}>Smart Fund</h3>
            <p className="mb-0" style={{ fontSize: '0.9rem', opacity: 0.9, color: 'white' }}>
              Every smart idea deserves a chance to shine
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span>Welcome, {getUserDisplayName()}!</span>
          
          <NotificationsDropdown />
          <SettingsDropdown setSection={setSection} />
        </div>
      </div>
    </div>
  );
};

export default Header;
