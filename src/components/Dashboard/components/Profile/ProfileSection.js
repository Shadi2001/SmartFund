import React from 'react';
import { useDashboard } from '../../DashboardContext';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthContext';
import { ToastContext } from '../../../ToastContext';
import { useContext as useReactContext } from 'react';


const ProfileSection = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const { ShowHideToast } = useContext(ToastContext);
  const { 
    userProfileData, 
    profileLoading, 
    isEditingProfile, 
    editFormData, 
    profileImage, 
    profileImagePreview,
    setIsEditingProfile,
    setEditFormData,
    setProfileImagePreview,
    fetchUserProfile
  } = useDashboard();
  
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImagePreview(reader.result);
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelEditProfile = () => {
    setEditFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      password: user?.password || '',
      phoneNumber: user?.phoneNumber || '',
      DateOfBirth: user?.DateOfBirth || '',
      gender: user?.gender || '',
      income: user?.income || '',
      creditID: user?.creditID || '',
      address: user?.address || ''
    });
    setIsEditingProfile(false);
    setProfileImagePreview(null);
    setSelectedFile(null);
  };

  const handleSaveProfile = async () => {
    const baseline = userProfileData || user || {};
    const result = await updateUserProfile(editFormData, selectedFile, baseline);
    
    if (result.success) {
      // Reset the form and fetch updated profile
      setIsEditingProfile(false);
      setProfileImagePreview(null);
      setSelectedFile(null);
      await fetchUserProfile();
      ShowHideToast('Profile updated successfully!');
    } else {
      ShowHideToast(result.error || 'Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h5 className="mb-4 text-center" style={{ color: "#828282", fontWeight: 600 }}>
        Profile Information
      </h5>
      {profileLoading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading profile data...</p>
        </div>
      ) : (userProfileData || user) ? (
        <div className="row align-items-start" style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* Profile Image Column */}
          <div className="col-md-4 text-center mb-4 mb-md-0">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={profileImagePreview || (userProfileData?.profileImage || profileImage)}
                alt="Profile"
                className="rounded-circle"
                style={{ width: 160, height: 160, objectFit: 'cover', border: '4px solid #e0e0e0', background: '#f5f6fa' }}
                onError={(e) => {
                  e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
                }}
              />
              {isEditingProfile && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    style={{ display: 'none' }}
                    id="profileImageInput"
                  />
                  <label htmlFor="profileImageInput" style={{ width: '40px', height: '40px', position: 'absolute', bottom: 0, right: 0, background: '#0343f2', color: 'white', borderRadius: '50%', padding: 8, cursor: 'pointer', border: '2px solid white' }} title="Change profile image">
                    <i className="fas fa-camera"></i>
                  </label>
                </>
              )}
            </div>
            <div className="mt-3">
              <span style={{ color: '#828282', fontSize: 14 }}>
                {isEditingProfile ? 'Click camera to change image' : 'Profile Image'}
              </span>
            </div>
          </div>
          {/* Profile Fields Column */}
          <div className="col-md-8">
            {isEditingProfile ? (
              <form>
                {/* Credentials */}
                <div className="mb-3 border-bottom pb-2">
                  <h6 style={{ color: '#2e00d5', fontWeight: 600 }}>Credentials</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label"><strong>First Name</strong></label>
                      <input type="text" name="firstName" value={editFormData.firstName} onChange={handleProfileInputChange} className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label"><strong>Last Name</strong></label>
                      <input type="text" name="lastName" value={editFormData.lastName} onChange={handleProfileInputChange} className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label"><strong>Email</strong></label>
                      <input type="email" name="email" value={editFormData.email} onChange={handleProfileInputChange} className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label"><strong>Password</strong></label>
                      <input type="password" name="password" value={editFormData.password} onChange={handleProfileInputChange} className="form-control" />
                    </div>
                  </div>
                </div>
                {/* Contact Info */}
                <div className="mb-3 border-bottom pb-2">
                  <h6 style={{ color: '#2e00d5', fontWeight: 600 }}>Contact Info</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label"><strong>Phone Number</strong></label>
                      <input type="text" name="phoneNumber" value={editFormData.phoneNumber} onChange={handleProfileInputChange} className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label"><strong>Credit ID</strong></label>
                      <input type="text" name="creditID" value={editFormData.creditID} onChange={handleProfileInputChange} className="form-control" />
                    </div>
                  </div>
                </div>
                {/* Personal Info */}
                <div className="mb-3">
                  <h6 style={{ color: '#2e00d5', fontWeight: 600 }}>Personal Info</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label"><strong>Date of Birth</strong></label>
                      <input type="date" name="DateOfBirth" value={editFormData.DateOfBirth} onChange={handleProfileInputChange} className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label"><strong>Gender</strong></label>
                      <select name="gender" value={editFormData.gender} onChange={handleProfileInputChange} className="form-control">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label"><strong>Monthly Income</strong></label>
                      <input type="number" name="income" value={editFormData.income} onChange={handleProfileInputChange} className="form-control" />
                    </div>
                    <div className="col-md-12">
                      <label className="form-label"><strong>Address</strong></label>
                      <input type="text" name="address" value={editFormData.address} onChange={handleProfileInputChange} className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-4 justify-content-end">
                  <button type="button" className="btn btn-primary" onClick={handleSaveProfile}>Save</button>
                  <button type="button" className="btn btn-secondary" onClick={handleCancelEditProfile}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                {/* Credentials */}
                <div className="mb-3 border-bottom pb-2">
                  <h6 style={{ color: '#2e00d5', fontWeight: 600 }}>Credentials</h6>
                  <div className="row g-3">
                    <div className="col-md-6"><strong>First Name:</strong> {(userProfileData || user).firstName || "-"}</div>
                    <div className="col-md-6"><strong>Last Name:</strong> {(userProfileData || user).lastName || "-"}</div>
                    <div className="col-md-6"><strong>Email:</strong> {(userProfileData || user).email || "-"}</div>
                    <div className="col-md-6"><strong>Password:</strong> {(userProfileData || user).password ? '********' : '-'}</div>
                  </div>
                </div>
                {/* Contact Info */}
                <div className="mb-3 border-bottom pb-2">
                  <h6 style={{ color: '#2e00d5', fontWeight: 600 }}>Contact Info</h6>
                  <div className="row g-3">
                    <div className="col-md-6"><strong>Phone Number:</strong> {(userProfileData || user).phoneNumber || '-'}</div>
                    <div className="col-md-6"><strong>Credit ID:</strong> {(userProfileData || user).creditID || '-'}</div>
                  </div>
                </div>
                {/* Personal Info */}
                <div className="mb-3">
                  <h6 style={{ color: '#2e00d5', fontWeight: 600 }}>Personal Info</h6>
                  <div className="row g-3">
                    <div className="col-md-6"><strong>Date of Birth:</strong> {(userProfileData || user).DateOfBirth ? new Date((userProfileData || user).DateOfBirth).toLocaleDateString() : '-'}</div>
                    <div className="col-md-6"><strong>Gender:</strong> {(userProfileData || user).gender || '-'}</div>
                    <div className="col-md-6"><strong>Monthly Income:</strong> ${(userProfileData || user).income ? (userProfileData || user).income.toLocaleString() : '-'}</div>
                    <div className="col-md-12"><strong>Address:</strong> {(userProfileData || user).address || '-'}</div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-outline-primary mt-2" onClick={handleEditProfile}>Edit</button>
                  <button className="btn btn-outline-secondary mt-2 ms-2" onClick={fetchUserProfile}>Refresh</button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div>No user data available.</div>
      )}
    </div>
  );
};

export default ProfileSection;
