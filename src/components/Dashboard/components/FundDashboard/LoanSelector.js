import React, { useState, useEffect, useContext } from 'react';
import { useDashboard } from '../../DashboardContext';
import { ToastContext } from '../../../ToastContext';

const LoanSelector = () => {
  const [showUserLoans, setShowUserLoans] = useState(false);
  const { ShowHideToast } = useContext(ToastContext);
  const { 
    userLoans, 
    userLoansLoading, 
    fetchUserLoans, 
    fetchLoanDetails, 
    selectedLoan, 
    selectedLoanLoading 
  } = useDashboard();

  // Effect to handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserLoans) {
        const dropdown = document.querySelector('.user-loans-dropdown');
        if (dropdown && !dropdown.contains(event.target)) {
          setShowUserLoans(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserLoans]);

  const toggleUserLoans = () => {
    if (!showUserLoans && userLoans.length === 0) {
      fetchUserLoans();
    }
    setShowUserLoans(!showUserLoans);
  };

  return (
    <div className="position-relative user-loans-dropdown">
      <div
        onClick={toggleUserLoans}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '8px 0',
          color: '#495057',
          fontSize: '1rem',
          fontWeight: '500',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#212529';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#495057';
        }}
      >
        <span style={{ marginRight: '8px' }}>LOANS</span>
        <i 
          className="fas fa-chevron-down" 
          style={{ 
            fontSize: "0.8rem",
            color: '#000',
            transition: 'transform 0.3s ease',
            transform: showUserLoans ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        ></i>
      </div>
      
      {/* Dropdown Content */}
      {showUserLoans && (
        <div 
          className="position-absolute w-100 mt-2"
          style={{ 
            zIndex: 1000,
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef',
            minWidth: '200px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-3" onClick={(e) => e.stopPropagation()}>
            {userLoansLoading ? (
              <div className="text-center py-2">
                <div className="spinner-border spinner-border-sm text-secondary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-muted mb-0" style={{ fontSize: "0.85rem" }}>Loading loans...</p>
              </div>
            ) : userLoans.length === 0 ? (
              <div className="text-center py-2">
                <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>No loans found</p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-1">
                {userLoans.map((loan) => (
                  <div 
                    key={loan.extractedId || Math.random()}
                    className="d-flex justify-content-between align-items-center py-2 px-2"
                    style={{
                      borderBottom: userLoans.length - 1 > userLoans.indexOf(loan) ? '1px solid #f1f3f4' : 'none',
                      borderRadius: '4px',
                      transition: 'background-color 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      const loanId = loan.extractedId;
                      
                      if (loanId && !loanId.startsWith('temp_')) {
                        fetchLoanDetails(loanId);
                      } else {
                        ShowHideToast('Unable to load loan details. Please try again.');
                      }
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div>
                      <div className="fw-bold text-uppercase" style={{ color: '#495057', fontSize: '0.8rem' }}>
                        {loan.loanTypeName || 'Unknown Loan Type'}
                      </div>
                      <div className="fw-bold text-uppercase" style={{ color: '#495050', fontSize: '0.5rem' }}>
                        {loan.userRole || 'Unknown Role Type'}
                      </div>
                    </div>
                    <div className="fw-bold" style={{ color: '#495057', fontSize: '0.8rem' }}>
                      {loan.startDate ? new Date(loan.startDate).toLocaleDateString() : 'N/A'}
                    </div>
                    {selectedLoanLoading && selectedLoan === loan.extractedId && (
                      <div className="spinner-border spinner-border-sm text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanSelector;
