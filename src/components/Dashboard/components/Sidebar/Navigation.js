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
      <a
        href="#"
        className={`sidebar-nav-item ${section === "fund" ? "active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          setSection("fund");
        }}
      >
        <i className="fas fa-chart-line"></i>
        Fund Dashboard
      </a>
      
      <a
        href="#"
        className={`sidebar-nav-item ${section === "sponsors" ? "active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          setSection("sponsors");
          if (sponsors.length === 0 && !sponsorsLoading) {
            fetchSponsors();
          }
        }}
      >
        <i className="fas fa-users"></i>
        Sponsors
      </a>
      
      <a
        href="#"
        className={`sidebar-nav-item ${section === "pending" ? "active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          setSection("pending");
          if (pendingContracts.length === 0 && !pendingContractsLoading) {
            fetchPendingContracts();
          }
        }}
      >
        <i className="fas fa-clock"></i>
        Pending Contracts
      </a>
      
      {/* Apply Form Button */}
      <a
        href="#"
        className={`sidebar-nav-item ${user?.loanStatus?.hasActiveLoan ? 'disabled' : ''}`}
        onClick={(e) => {
          e.preventDefault();
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
      </a>
    </nav>
  );
};

export default Navigation;
