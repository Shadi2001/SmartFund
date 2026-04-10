import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../../DashboardContext';
import { AuthContext } from '../../../AuthContext';

const Navigation = ({ section, setSection }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { 
    sponsors, 
    sponsorsLoading, 
    fetchSponsors, 
    pendingContracts, 
    pendingContractsLoading, 
    fetchPendingContracts 
  } = useDashboard();

  const handleApplyForm = () => {
    navigate('/form');
  };

  return (
    <nav className="sidebar-nav">
      <button
        type="button"
        className={`sidebar-nav-item ${section === "fund" ? "active" : ""}`}
        onClick={() => {
          setSection("fund");
        }}
      >
        <i className="fas fa-chart-line"></i>
        Fund Dashboard
      </button>
      
      <button
        type="button"
        className={`sidebar-nav-item ${section === "sponsors" ? "active" : ""}`}
        onClick={() => {
          setSection("sponsors");
          if (sponsors.length === 0 && !sponsorsLoading) {
            fetchSponsors();
          }
        }}
      >
        <i className="fas fa-users"></i>
        Sponsors
      </button>
      
      <button
        type="button"
        className={`sidebar-nav-item ${section === "pending" ? "active" : ""}`}
        onClick={() => {
          setSection("pending");
          if (pendingContracts.length === 0 && !pendingContractsLoading) {
            fetchPendingContracts();
          }
        }}
      >
        <i className="fas fa-clock"></i>
        Pending Contracts
      </button>
      
      {/* Apply Form Button */}
      <button
        type="button"
        className={`sidebar-nav-item ${user?.loanStatus?.hasActiveLoan ? 'disabled' : ''}`}
        onClick={() => {
          if (!user?.loanStatus?.hasActiveLoan) {
            handleApplyForm();
          }
        }}
        style={{
          opacity: user?.loanStatus?.hasActiveLoan ? '0.5' : '1',
          cursor: user?.loanStatus?.hasActiveLoan ? 'not-allowed' : 'pointer',
          pointerEvents: user?.loanStatus?.hasActiveLoan ? 'none' : 'auto'
        }}
        title={user?.loanStatus?.hasActiveLoan ? 'You already have an active loan' : 'Apply for a new loan'}
      >
        <i className="fas fa-file-alt"></i>
        Apply Form
        {user?.loanStatus?.hasActiveLoan && (
          <span className="ms-2 text-muted" style={{ fontSize: '0.8rem' }}>
            (Active Loan)
          </span>
        )}
      </button>
    </nav>
  );
};

export default Navigation;
