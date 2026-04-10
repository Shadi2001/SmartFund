import React from 'react';
import ProfileTab from './ProfileTab';
import ActiveLoansTab from './ActiveLoansTab';
import CompletedLoansTab from './CompletedLoansTab';

const UserDetails = ({ 
  selectedUser, 
  activeTab, 
  onTabChange, 
  onClose, 
  activeLoansLoading, 
  activeLoansData, 
  completedLoansLoading, 
  completedLoansData,
  formatDate,
  formatIncome,
  getStatusColor,
  getRoleBadge
}) => {
  if (!selectedUser) return null;

  return (
    <div className="bg-white rounded shadow p-4 clients-scope">
      {/* Header with back button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <button 
            className="btn btn-outline-secondary btn-sm me-3"
            onClick={onClose}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Back to Clients
          </button>
          <h5 className="d-inline" style={{ color: "#828282", fontWeight: 600 }}>
            {selectedUser.userFirstName} {selectedUser.userLastName}
          </h5>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4" id="userTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => onTabChange('profile')}
            type="button"
            role="tab"
          >
            <i className="fas fa-user me-2"></i>
            Profile
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => onTabChange('active')}
            type="button"
            role="tab"
          >
            <i className="fas fa-clock me-2"></i>
            Active Loans
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => onTabChange('completed')}
            type="button"
            role="tab"
          >
            <i className="fas fa-check-circle me-2"></i>
            Completed Loans
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content" id="userTabsContent">
        <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`}>
          <ProfileTab 
            selectedUser={selectedUser}
            formatDate={formatDate}
            formatIncome={formatIncome}
            getStatusColor={getStatusColor}
            getRoleBadge={getRoleBadge}
          />
        </div>
        <div className={`tab-pane fade ${activeTab === 'active' ? 'show active' : ''}`}>
          <ActiveLoansTab 
            activeLoansLoading={activeLoansLoading}
            activeLoansData={activeLoansData}
            formatDate={formatDate}
          />
        </div>
        <div className={`tab-pane fade ${activeTab === 'completed' ? 'show active' : ''}`}>
          <CompletedLoansTab 
            completedLoansLoading={completedLoansLoading}
            completedLoansData={completedLoansData}
            formatDate={formatDate}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetails; 