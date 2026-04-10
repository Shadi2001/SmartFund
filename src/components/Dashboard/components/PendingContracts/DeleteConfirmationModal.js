import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, contractId, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">
              <i className="fas fa-exclamation-triangle me-2"></i>
              Confirm Deletion
            </h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
              disabled={isDeleting}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4">
            <div className="text-center mb-4">
              <div className="display-1 text-danger mb-3">
                <i className="fas fa-trash-alt"></i>
              </div>
              <h4>Are you sure you want to delete this contract?</h4>
              <p className="text-muted">This action cannot be undone.</p>
            </div>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-outline-secondary" 
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-danger" 
              onClick={() => onConfirm(contractId)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Deleting...
                </>
              ) : (
                <>Delete Contract</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;