import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../AuthContext';

const UserProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const handlePhotoUpload = async () => {
    if (!photoFile) return;
    
    setUploadingPhoto(true);
    try {
      const result = await updateUserProfile({}, photoFile);
      if (result.success) {
        setShowPhotoModal(false);
        setPhotoFile(null);
        // The updateUserProfile function in context handles updating the user context and refreshing the page
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleClose = () => {
    setShowPhotoModal(false);
    setPhotoFile(null);
  };

  return (
    <div className="user-profile-section">
      <div className="d-flex align-items-center">
        <img
          onClick={() => setShowPhotoModal(true)}
          src={user?.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
          alt="Admin Avatar"
          className="user-avatar me-3"
          onError={(e) => {
            e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
          }}
          style={{ cursor: 'pointer' }}
        />
        <div>
          <h6 className="mb-0 ">{user?.name || 'Admin'}</h6>
          <small className="text-light">Administrator</small>
        </div>
      </div>

      {/* Photo Upload Modal */}
      {showPhotoModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Profile Photo</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="photoInput" className="form-label">
                    Select New Photo
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="photoInput"
                    accept="image/*"
                    onChange={(e) => setPhotoFile(e.target.files[0])}
                    disabled={uploadingPhoto}
                  />
                </div>
                {photoFile && (
                  <div className="mb-3">
                    <label className="form-label">Preview:</label>
                    <div>
                      <img
                        src={URL.createObjectURL(photoFile)}
                        alt="Preview"
                        style={{
                          width: '100px',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '50%',
                          border: '2px solid #ddd'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                  disabled={uploadingPhoto}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePhotoUpload}
                  disabled={!photoFile || uploadingPhoto}
                >
                  {uploadingPhoto ? 'Uploading...' : 'Upload Photo'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
