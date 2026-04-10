import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../../DashboardContext';
import { AuthContext } from '../../../AuthContext';

const SettingsDropdown = ({ setSection }) => {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { 
    userProfileData, 
    profileLoading, 
    fetchUserProfile 
  } = useDashboard();

  // Effect to handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSettingsDropdown) {
        const settingsDropdown = event.target.closest('.position-relative');
        if (!settingsDropdown) {
          setShowSettingsDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettingsDropdown]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="position-relative">
      <button
       
        style={{ 
          background: "transparent", 
          color: "white", 
          border: "none",
          padding: "8px 12px"
        }}
        onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
      >
        <i className="fas fa-cog"></i>
      </button>
      
      {/* Settings Dropdown Menu */}
      {showSettingsDropdown && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            width: 200,
            background: 'white',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            borderRadius: 8,
            zIndex: 10,
            color: '#222',
            marginTop: '8px'
          }}
          className="p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              setSection("profile");
              setShowSettingsDropdown(false);
              if (!userProfileData && !profileLoading) {
                fetchUserProfile();
              }
            }}
            className=" w-100 text-start"
            style={{
              background: 'none',
              border: 'none',
              color: '#495057',
              padding: '8px 12px',
              borderRadius: '4px',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <i className="fas fa-user me-2"></i>
            My Profile
          </button>
          <hr className="my-2" />
          <button
            onClick={() => {
              setShowSettingsDropdown(false);
              handleLogout();
            }}
            className=" w-100 text-start"
            style={{
              background: 'none',
              border: 'none',
              color: '#dc3545',
              padding: '8px 12px',
              borderRadius: '4px',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <i className="fas fa-sign-out-alt me-2"></i>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;
