import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../../DashboardContext";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const PendingContractsSection = () => {
  const {
    pendingContracts,
    pendingContractsLoading,
    fetchPendingContracts,
    deleteContract,
  } = useDashboard();
  const navigate = useNavigate();

  // State for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contractToDelete, setContractToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Track whether we've already attempted to fetch data using a ref
  const hasAttemptedFetch = useRef(false);

  // Fetch pending contracts only once if not loaded
  useEffect(() => {
    if (
      !hasAttemptedFetch.current &&
      !pendingContractsLoading &&
      pendingContracts.length === 0
    ) {
      hasAttemptedFetch.current = true;
      fetchPendingContracts();
    }
  }, [pendingContractsLoading, pendingContracts.length, fetchPendingContracts]);

  // Handle delete button click
  const handleDeleteClick = (e, contract) => {
    e.stopPropagation(); // Prevent the contract card click event
    const id =
      contract._id ||
      contract.id ||
      contract.contractId ||
      contract.contractID ||
      contract.contract?.id ||
      contract.contract?._id;
    setContractToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async (contractId) => {
    setIsDeleting(true);
    const success = await deleteContract(contractId);
    setIsDeleting(false);
    if (success) {
      setIsDeleteModalOpen(false);
      setContractToDelete(null);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 style={{ color: "#828282", fontWeight: 600 }}>Pending Contracts</h5>
        {/* Refresh button positioned in opposite corner */}
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            hasAttemptedFetch.current = false;
            fetchPendingContracts();
          }}
          title="Refresh pending contracts"
        >
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>

      {pendingContractsLoading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading pending contracts...</p>
        </div>
      ) : pendingContracts.length === 0 ? (
        <div className="text-center py-4">
          <div
            style={{ fontSize: "4rem", color: "#e0e0e0", marginBottom: "1rem" }}
          >
            <i className="fas fa-file-contract"></i>
          </div>
          <p className="text-muted">No pending contracts found.</p>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            Pending contracts will appear here once they are available.
          </p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {pendingContracts.map((contract, index) => (
            <div
              key={contract._id || index}
              className="d-flex align-items-center p-4 rounded shadow-sm"
              style={{
                background: "white",
                border: "1px solid #e9ecef",
                borderRadius: "12px",
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                cursor:
                  contract.status &&
                  contract.status.toLowerCase().replace(/_/g, " ") ===
                    "pending document upload"
                    ? "pointer"
                    : "",
              }}
              onClick={() => {
                const status = contract.status
                  ? contract.status.toLowerCase().replace(/_/g, " ")
                  : "";

                // Only navigate if status is "pending document upload"
                if (status === "pending document upload") {
                  const id =
                    contract._id ||
                    contract.id ||
                    contract.contractId ||
                    contract.contract?.id ||
                    contract.contract?._id;
                  const rawLoanTypeName =
                    contract.typeTerm?.name || contract.loanType || "";
                  // Normalize loan type names to canonical values used by Form
                  const normalizeLoanType = (value) => {
                    if (!value) return "";
                    const v = String(value).toLowerCase();
                    if (v.includes("education")) return "Educational Loan";
                    if (v.includes("medical")) return "Medical Loan";
                    if (v.includes("micro") || v.includes("project"))
                      return "Micro Projects Loan";
                    return value; // fallback to original
                  };
                  const loanTypeName = normalizeLoanType(rawLoanTypeName);
                  const term =
                    contract.loanTerm ||
                    (contract.loanTermMonths && contract.loanTermMonths > 24
                      ? "long-term"
                      : "short-term");

                  const params = new URLSearchParams({ step: "2" });
                  if (id) params.set("contractId", String(id));
                  if (loanTypeName) params.set("loanType", loanTypeName);
                  if (term) params.set("loanTerm", term);
                  navigate(`/form?${params.toString()}`, {
                    state: {
                      step: 2,
                      contractId: id,
                      loanType: loanTypeName,
                      loanTerm: term,
                    },
                  });
                }
                // Do nothing for other statuses
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(4px)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
              }}
            >
              {/* Contract Icon */}
              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-4 position-relative"
                style={{
                  width: "60px",
                  height: "60px",
                  background:
                    contract.status &&
                    contract.status.toLowerCase().replace(/_/g, " ") ===
                      "pending document upload"
                      ? "linear-gradient(135deg, #28a745, #20c997)"
                      : "linear-gradient(135deg, #ffc107, #ff9800)",
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                <i className="fas fa-file-contract"></i>
                {/* Document upload indicator */}
                {contract.status &&
                  contract.status.toLowerCase().replace(/_/g, " ") ===
                    "pending document upload" && (
                    <div
                      className="position-absolute"
                      style={{
                        top: "-5px",
                        right: "-5px",
                        width: "20px",
                        height: "20px",
                        background: "#dc3545",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                        border: "2px solid white",
                      }}
                      title="Ready for document upload"
                    >
                      <i className="fas fa-upload"></i>
                    </div>
                  )}
              </div>

              {/* Contract Info */}
              <div className="flex-grow-1">
                <h6
                  className="mb-1 fw-bold"
                  style={{ color: "#ff9800", fontSize: "1.1rem" }}
                >
                  {contract.typeTerm?.name || "Contract"} - $
                  {contract.loanAmount?.toLocaleString() || "0"}
                </h6>
                <div
                  className="row g-2 text-muted"
                  style={{ fontSize: "0.85rem" }}
                >
                  <div className="col-md-6">
                    <i className="fas fa-calendar me-2"></i>
                    Start:{" "}
                    {contract.startDate
                      ? new Date(contract.startDate).toLocaleDateString()
                      : "N/A"}
                  </div>
                  <div className="col-md-6">
                    <i className="fas fa-clock me-2"></i>
                    Term: {contract.loanTermMonths || "N/A"} months
                  </div>
                  <div className="col-md-12">
                    <i className="fas fa-info-circle me-2"></i>
                    Status:{" "}
                    <span
                      className="fw-bold"
                      style={{
                        color:
                          contract.status &&
                          contract.status.toLowerCase().replace(/_/g, " ") ===
                            "pending document upload"
                            ? "#28a745"
                            : "#ff9800",
                      }}
                    >
                      {contract.status
                        ? contract.status
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())
                        : "Unknown"}
                    </span>
                    {contract.status &&
                    contract.status.toLowerCase().replace(/_/g, " ") ===
                      "pending document upload" ? (
                      <span className="badge bg-success ms-2">
                        <i className="fas fa-upload me-1"></i>
                        Ready for Documents
                      </span>
                    ) : (
                      <span className="badge bg-secondary ms-2">
                        <i className="fas fa-lock me-1"></i>
                        Not Available
                      </span>
                    )}
                  </div>
                  {(contract.sponsor1 || contract.sponsor2) && (
                    <div className="col-md-12">
                      <i className="fas fa-users me-2"></i>
                      Sponsors:{" "}
                      {contract.sponsor1
                        ? `${contract.sponsor1.firstName} ${contract.sponsor1.lastName}`
                        : ""}
                      {contract.sponsor1 && contract.sponsor2 ? ", " : ""}
                      {contract.sponsor2
                        ? `${contract.sponsor2.firstName} ${contract.sponsor2.lastName}`
                        : ""}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="ms-3 d-flex align-items-center">
                {/* Delete Button */}
                <button
                  className="btn btn-sm btn-outline-danger me-2"
                  onClick={(e) => handleDeleteClick(e, contract)}
                  title="Delete Contract"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>

                {/* Right Arrow */}
                <i
                  className="fas fa-chevron-right"
                  style={{ color: "#cbd5e0", fontSize: "1.1rem" }}
                ></i>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setContractToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        contractId={contractToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default PendingContractsSection;
