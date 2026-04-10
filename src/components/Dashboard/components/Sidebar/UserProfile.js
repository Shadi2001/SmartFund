import React, { useContext } from 'react';
import { useDashboard } from '../../DashboardContext';
import { AuthContext } from '../../../AuthContext';

const UserProfile = ({ setSection }) => {
  const { user, loading } = useContext(AuthContext);
  const { 
    userProfileData, 
    profileLoading, 
    fetchUserProfile, 
    profileImage, 
    profileImagePreview 
  } = useDashboard();

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

  // Helper function to get user's email
  const getUserEmail = () => {
    if (loading) return "Loading...";
    if (!user) return "user@example.com";
    return user.email || "user@example.com";
  };

  return (
    <div className="user-profile-section">
      <div className="d-flex align-items-center mb-3">
        <img
          onClick={() => {
            setSection("profile");
            if (!userProfileData && !profileLoading) {
              fetchUserProfile();
            }
          }}
          src={profileImagePreview || (userProfileData?.profileImage || profileImage)}
          alt="User Avatar"
          className="user-avatar me-3"
          onError={(e) => {
            e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
          }}
        />
        <div>
          <h6 className="mb-1">{getUserDisplayName()}</h6>
          <small className="text-muted">{getUserEmail()}</small>
        </div>
      </div>
      <div className="mb-3">
        <h6 className="mb-0 fw-bold" style={{ color: '#000000' }}>Dashboard</h6>
      </div>
    </div>
  );
};

export default UserProfile;
