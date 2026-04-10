import React from 'react';
import { useAdminDashboard } from '../../AdminDashboardContext';

const ReviewSection = () => {
  const {
    pendingContracts,
    selectedContract,
    contractDocuments,
    loading,
    error,
    showRejectionModal,
    rejectingDocument,
    rejectionReason,
    adminNotes,
    fetchPendingContracts,
    setSelectedContract,
    setShowRejectionModal,
    setRejectingDocument,
    setRejectionReason,
    setAdminNotes,
    handleDocumentAction,
    handleDocumentRejection,
  } = useAdminDashboard();

  // Ensure pendingContracts is always an array
  const safePendingContracts = Array.isArray(pendingContracts)
    ? pendingContracts
    : [];

  return (
    <>
      <div className="bg-white rounded shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5
            className="mb-0"
            style={{ color: "#828282", fontWeight: 600 }}
          >
            Contract Review
          </h5>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={fetchPendingContracts}
            disabled={loading}
          >
            <i className="fas fa-sync-alt "></i>
            
          </button>
        </div>
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Loading contracts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <i className="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
            <h5 className="text-danger">Error</h5>
            <p className="text-muted">{error}</p>
            <button
              className="btn btn-primary"
              onClick={fetchPendingContracts}
            >
              <i className="fas fa-redo me-2"></i>Retry
            </button>
          </div>
        ) : selectedContract ? (
          <div>
            <button
              className="btn btn-outline-primary mb-4"
              onClick={() => setSelectedContract(null)}
            >
              <i className="fas fa-arrow-left me-2"></i>Back to List
            </button>
            <div
              className="p-4 rounded shadow-sm"
              style={{ background: "#f8f9fa" }}
            >
              <h6
                className="mb-3 fw-bold"
                style={{ color: "#ff9800", fontSize: "1.2rem" }}
              >
                {selectedContract.loanDetails?.typeTermName || "Contract"} -
                $
                {selectedContract.loanDetails?.amount?.toLocaleString() ||
                  "0"}
              </h6>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <i className="fas fa-user me-2"></i>
                  Applicant: {selectedContract.borrower?.firstName}{" "}
                  {selectedContract.borrower?.lastName}
                </div>
                <div className="col-md-6">
                  <i className="fas fa-calendar me-2"></i>
                  Date:{" "}
                  {new Date(
                    selectedContract.createdAt
                  ).toLocaleDateString()}
                </div>
                <div className="col-md-6">
                  <i className="fas fa-clock me-2"></i>
                  Status:{" "}
                  <span className="fw-bold text-warning">
                    {selectedContract.status}
                  </span>
                </div>
              </div>
              <h6 className="mb-3 fw-bold">Documents</h6>
              {console.log("Contract documents:", contractDocuments)} {/* Debug log */}
              {loading ? (
                <div className="text-center py-4">
                  <div
                    className="spinner-border text-primary"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 text-muted">Loading documents...</p>
                </div>
              ) : contractDocuments.length === 0 ? (
                <div className="text-center py-4">
                  <i className="fas fa-file-alt fa-3x text-muted mb-3"></i>
                  <h6 className="text-muted">No documents uploaded</h6>
                  <p className="text-muted">
                    This contract has no pending documents for review.
                  </p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {contractDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className="p-3 rounded shadow-sm bg-white"
                    >
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div>
                          <i className="fas fa-file-alt me-2 text-primary"></i>
                          <span className="fw-bold">{doc.type}</span>
                          <div className="text-muted small">
                            Uploaded:{" "}
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() =>
                              handleDocumentAction(doc.id, "approve")
                            }
                          >
                            <i className="fas fa-check me-1"></i>Approve
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDocumentAction(doc.id, "reject")
                            }
                          >
                            <i className="fas fa-times me-1"></i>Reject
                          </button>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="position-relative">
                          {console.log("Document data:", doc)} {/* Debug log */}
                          {doc.documentFile && doc.documentFile.url ? (
                            <img
                              src={doc.documentFile.url}
                              alt={doc.type}
                              className="img-fluid rounded shadow-sm cursor-pointer"
                              style={{
                                maxHeight: "400px",
                                maxWidth: "100%",
                                objectFit: "contain",
                                backgroundColor: "#f8f9fa",
                                border: "1px solid #e9ecef",
                                transition: "transform 0.2s ease-in-out",
                                cursor: "pointer",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                  "scale(1.02)";
                                e.currentTarget.style.boxShadow =
                                  "0 4px 15px rgba(0,0,0,0.15)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.boxShadow =
                                  "0 2px 8px rgba(0,0,0,0.1)";
                              }}
                              onClick={(e) => {
                                // Open image in new tab for full view
                                window.open(doc.documentFile.url, "_blank");
                              }}
                              onError={(e) => {
                                console.error("Image failed to load:", doc.documentFile.url);
                                e.target.style.display = "none";
                              }}
                              title="Click to view full size"
                            />
                          ) : (
                            <div className="p-4 bg-light rounded">
                              <i className="fas fa-exclamation-triangle text-warning fa-2x mb-2"></i>
                              <p className="text-muted">Document file not available</p>
                              <small className="text-muted">Document data: {JSON.stringify(doc)}</small>
                            </div>
                          )}
                          {doc.documentFile && doc.documentFile.url && (
                            <div className="position-absolute top-0 end-0 m-2">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() =>
                                  window.open(doc.documentFile.url, "_blank")
                                }
                                title="Open in new tab"
                              >
                                <i className="fas fa-external-link-alt"></i>
                              </button>
                            </div>
                          )}
                        </div>
                        <small className="text-muted mt-2 d-block">
                          Click image or button to view full size
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {safePendingContracts.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-check-circle fa-3x text-success mb-3"></i>
                <h5 className="text-muted">No pending contracts</h5>
                <p className="text-muted">
                  All contracts have been reviewed.
                </p>
              </div>
            ) : (
              safePendingContracts.map((contract, index) => (
                <div
                  key={contract.id || index}
                  className="d-flex align-items-center p-4 rounded shadow-sm"
                  style={{
                    background: "white",
                    border: "1px solid #e9ecef",
                    borderRadius: "12px",
                    transition:
                      "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedContract(contract)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateX(4px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.05)";
                  }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-4"
                    style={{
                      width: "60px",
                      height: "60px",
                      background:
                        "linear-gradient(135deg, #ffc107, #ff9800)",
                      color: "white",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      flexShrink: 0,
                    }}
                  >
                    <i className="fas fa-file-contract"></i>
                  </div>

                  <div className="flex-grow-1">
                    <h6
                      className="mb-1 fw-bold"
                      style={{ color: "#ff9800", fontSize: "1.1rem" }}
                    >
                      {contract.loanDetails?.typeTermName || "Contract"} - $
                      {contract.loanDetails?.amount?.toLocaleString() ||
                        "0"}
                    </h6>
                    <div
                      className="row g-2 text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <div className="col-md-6">
                        <i className="fas fa-user me-2"></i>
                        Applicant: {contract.borrower?.firstName}{" "}
                        {contract.borrower?.lastName}
                      </div>
                      <div className="col-md-6">
                        <i className="fas fa-calendar me-2"></i>
                        Date:{" "}
                        {new Date(contract.createdAt).toLocaleDateString()}
                      </div>
                      <div className="col-md-12">
                        <i className="fas fa-info-circle me-2"></i>
                        Status:{" "}
                        <span
                          className="fw-bold"
                          style={{ color: "#ff9800" }}
                        >
                          {contract.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ms-3">
                    <i
                      className="fas fa-chevron-right"
                      style={{ color: "#cbd5e0", fontSize: "1.1rem" }}
                    ></i>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">
                  <i className="fas fa-times-circle me-2"></i>
                  Reject Document
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setShowRejectionModal(false);
                    setRejectingDocument(null);
                    setRejectionReason("");
                    setAdminNotes("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-muted mb-3">
                  Please provide a reason for rejecting this document and any
                  additional admin notes.
                </p>

                <div className="mb-3">
                  <label
                    htmlFor="rejectionReason"
                    className="form-label fw-bold"
                  >
                    Rejection Reason <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="rejectionReason"
                    className="form-control"
                    rows="3"
                    placeholder="Enter the reason for rejection..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="adminNotes" className="form-label fw-bold">
                    Admin Notes
                  </label>
                  <textarea
                    id="adminNotes"
                    className="form-control"
                    rows="3"
                    placeholder="Enter any additional admin notes (optional)..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowRejectionModal(false);
                    setRejectingDocument(null);
                    setRejectionReason("");
                    setAdminNotes("");
                  }}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDocumentRejection}
                  disabled={loading || !rejectionReason.trim()}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Rejecting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-times me-2"></i>
                      Reject Document
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewSection;
