import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../AuthContext';

const ReuploadModal = ({ isOpen, onClose, contractId, rejectedDocuments, onReuploadSuccess }) => {
  const { uploadImage } = useContext(AuthContext);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [previews, setPreviews] = useState({});
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Document type mapping for display names
  const documentTypeLabels = {
    'Identity': 'Identity Document',
    'Proof of Address': 'Proof of Address',
    'Proof of Income': 'Proof of Income',
    'Admission Letter': 'Admission Letter',
    'Official Fee Structure': 'Official Fee Structure',
    'Diagnosis Reports': 'Diagnosis Reports',
    'Doctor\'s Prescription': 'Doctor\'s Prescription',
    'Detailed Quotation': 'Detailed Quotation',
    'Business Plan': 'Business Plan',
    'Project Quotations': 'Project Quotations',
    'Proof of Business': 'Proof of Business',
    'Collateral Documents': 'Collateral Documents'
  };

  const handleFileChange = (documentType) => async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFiles(prev => ({ ...prev, [documentType]: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => ({ ...prev, [documentType]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReupload = async () => {
    setUploading(true);
    setError('');

    try {
      const uploadPromises = Object.entries(selectedFiles).map(async ([documentType, file]) => {
        const doc = await uploadImage(file, contractId, documentType);
        return { documentType, success: !!doc, doc };
      });

      const results = await Promise.all(uploadPromises);
      const failedUploads = results.filter(result => !result.success);
      
      if (failedUploads.length > 0) {
        setError(`Failed to upload: ${failedUploads.map(f => f.documentType).join(', ')}`);
      } else {
        // Success - close modal and notify parent
        onReuploadSuccess();
        handleClose();
      }
    } catch (err) {
      setError('An error occurred during upload. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedFiles({});
    setPreviews({});
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-warning text-dark">
            <h5 className="modal-title">
              <i className="fas fa-upload me-2"></i>
              Reupload Rejected Documents
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleClose}
              disabled={uploading}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4">
            <div className="mb-4">
              <p className="text-muted">
                Please reupload the documents that were rejected. Only select the documents you want to replace.
              </p>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="fas fa-exclamation-circle me-2"></i>
                {error}
              </div>
            )}

            {rejectedDocuments && rejectedDocuments.length > 0 ? (
              <div className="row g-3">
                {rejectedDocuments.map((rejectedDoc, index) => (
                  <div key={index} className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">
                          {documentTypeLabels[rejectedDoc.name] || rejectedDoc.name}
                          <span className="text-danger ms-1">*</span>
                        </h6>
                        
                        {rejectedDoc.rejectionReason && (
                          <div className="alert alert-warning alert-sm py-2 mb-3">
                            <i className="fas fa-exclamation-triangle me-2"></i>
                            <strong>Rejection Reason:</strong> {rejectedDoc.rejectionReason}
                          </div>
                        )}
                        
                        <div className="mb-3">
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileChange(rejectedDoc.name)(e)}
                            disabled={uploading}
                          />
                        </div>

                        {previews[rejectedDoc.name] && (
                          <div className="text-center">
                            {previews[rejectedDoc.name].startsWith('data:image/') ? (
                              <img 
                                src={previews[rejectedDoc.name]} 
                                alt="Preview" 
                                className="img-thumbnail" 
                                style={{ maxHeight: '150px', maxWidth: '100%' }}
                              />
                            ) : (
                              <div className="p-3 bg-light rounded">
                                <i className="fas fa-file-pdf fa-2x text-danger"></i>
                                <p className="mt-2 mb-0 small">PDF Document</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <i className="fas fa-info-circle fa-3x text-muted mb-3"></i>
                <p className="text-muted">No rejected documents found for this contract.</p>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-outline-secondary" 
              onClick={handleClose}
              disabled={uploading}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-warning" 
              onClick={handleReupload}
              disabled={uploading || Object.keys(selectedFiles).length === 0}
            >
              {uploading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Uploading...
                </>
              ) : (
                <>
                  <i className="fas fa-upload me-2"></i>
                  Reupload Documents
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReuploadModal;
