import React from 'react';
import { useRef, useEffect } from 'react';
import { useDashboard } from '../../DashboardContext';

const SponsorsSection = () => {
  const { 
    selectedLoanData, 
    sponsors, 
    sponsorsLoading, 
    fetchSponsors 
  } = useDashboard();

  // Fetch sponsors if not loaded (only once to avoid loops when none exist)
  const hasAttemptedFetch = useRef(false);
  useEffect(() => {
    if (!hasAttemptedFetch.current && !sponsorsLoading && (sponsors?.length || 0) === 0) {
      hasAttemptedFetch.current = true;
      fetchSponsors();
    }
  }, [sponsorsLoading, sponsors?.length, fetchSponsors]);

  return (
    <div className="bg-white rounded shadow p-4">
      <h5 className="mb-4" style={{ color: "#828282", fontWeight: 600 }}>
        Active Loan Sponsors
        {selectedLoanData && (
          <span className="ms-2" style={{ fontSize: '0.9rem', color: '#2e00d5' }}>
            - {selectedLoanData.loan?.loanTypeName || 'Selected Loan'}
          </span>
        )}
      </h5>
      
      {selectedLoanData && selectedLoanData.sponsors && selectedLoanData.sponsors.length > 0 ? (
        // Show sponsors from selected loan
        <div className="d-flex flex-column gap-3">
          {selectedLoanData.sponsors.map((s) => {
            const sponsor = s || {};
            const key = sponsor.id || sponsor._id || sponsor.email || Math.random().toString(36).slice(2);
            const displayName = sponsor.name || sponsor.fullName || sponsor.displayName || 'Unknown Sponsor';
            const displayEmail = sponsor.email || sponsor.contactEmail || 'No email provided';
            return (
            <div 
              key={key}
              className="d-flex align-items-center p-4 rounded shadow-sm"
              style={{ 
                background: "white",
                border: "1px solid #e9ecef",
                borderRadius: "12px",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                cursor: "pointer"
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
              {/* Sponsor Avatar */}
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center me-4"
                style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #0343f2, #2e00d5)",
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  flexShrink: 0
                }}
              >
                {(displayName || "S").charAt(0).toUpperCase()}
              </div>
              
              {/* Sponsor Info */}
              <div className="flex-grow-1">
                <h6 
                  className="mb-1 fw-bold"
                  style={{ color: "#2e00d5", fontSize: "1.1rem" }}
                >
                  {displayName}
                </h6>
                <p 
                  className="mb-0 text-muted"
                  style={{ fontSize: "0.95rem" }}
                >
                  <i className="fas fa-envelope me-2"></i>
                  {displayEmail}
                </p>
              </div>

              {/* Right Arrow */}
              <div className="ms-3">
                <i 
                  className="fas fa-chevron-right"
                  style={{ color: "#cbd5e0", fontSize: "1.1rem" }}
                ></i>
              </div>
            </div>
            );
          })}
        </div>
      ) : sponsorsLoading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading sponsors...</p>
        </div>
      ) : (sponsors?.length || 0) === 0 ? (
        <div className="text-center py-4">
          <div style={{ fontSize: "4rem", color: "#e0e0e0", marginBottom: "1rem" }}>
            <i className="fas fa-users"></i>
          </div>
          <p className="text-muted">No active sponsors found.</p>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            {selectedLoanData ? 'No sponsors assigned to this loan.' : 'Sponsors will appear here once they are assigned to your loan.'}
          </p>
        </div>
      ) : (
        // Show general sponsors from API
        <div className="d-flex flex-column gap-3">
          {sponsors.map((sponsor) => (
            <div 
              key={sponsor.id}
              className="d-flex align-items-center p-4 rounded shadow-sm"
              style={{ 
                background: "white",
                border: "1px solid #e9ecef",
                borderRadius: "12px",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                cursor: "pointer"
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
              {/* Sponsor Avatar */}
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center me-4"
                style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #0343f2, #2e00d5)",
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  flexShrink: 0
                }}
              >
                {(sponsor.name || "S").charAt(0).toUpperCase()}
              </div>
              
              {/* Sponsor Info */}
              <div className="flex-grow-1">
                <h6 
                  className="mb-1 fw-bold"
                  style={{ color: "#2e00d5", fontSize: "1.1rem" }}
                >
                  {sponsor.name || "Unknown Sponsor"}
                </h6>
                <p 
                  className="mb-0 text-muted"
                  style={{ fontSize: "0.95rem" }}
                >
                  <i className="fas fa-envelope me-2"></i>
                  {sponsor.email || "No email provided"}
                </p>
              </div>

              {/* Right Arrow */}
              <div className="ms-3">
                <i 
                  className="fas fa-chevron-right"
                  style={{ color: "#cbd5e0", fontSize: "1.1rem" }}
                ></i>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SponsorsSection;
