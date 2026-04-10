import React, { useState } from 'react';
import { useAdminDashboard } from '../../AdminDashboardContext';
import ClientsList from './ClientsList';
import UserDetails from './UserDetails';
import { formatDate, formatIncome, getStatusColor, getRoleBadge } from './utils';

const ClientsSection = () => {
  const { usersData, usersLoading, completedLoansData, completedLoansLoading, activeLoansData, activeLoansLoading, fetchCompletedLoans, fetchActiveLoans, fetchUserById } = useAdminDashboard();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleCardClick = async (user) => {
    // Try to fetch full user details, fallback to list user if not available
    const detailed = await fetchUserById(user._id);
    setSelectedUser(detailed || user);
    setShowUserDetails(true);
    setActiveTab('profile');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'completed' && selectedUser) {
      fetchCompletedLoans(selectedUser._id);
    }
    if (tab === 'active' && selectedUser) {
      fetchActiveLoans(selectedUser._id);
    }
  };

  const closeUserDetails = () => {
    setShowUserDetails(false);
    setSelectedUser(null);
    setActiveTab('profile');
  };

  if (showUserDetails && selectedUser) {
    return (
      <UserDetails
        selectedUser={selectedUser}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onClose={closeUserDetails}
        activeLoansLoading={activeLoansLoading}
        activeLoansData={activeLoansData}
        completedLoansLoading={completedLoansLoading}
        completedLoansData={completedLoansData}
        formatDate={formatDate}
        formatIncome={formatIncome}
        getStatusColor={getStatusColor}
        getRoleBadge={getRoleBadge}
      />
    );
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <h5 className="mb-4" style={{ color: "#828282", fontWeight: 600 }}>
        Clients ({usersData.length})
      </h5>
      <ClientsList
        usersData={usersData}
        usersLoading={usersLoading}
        onCardClick={handleCardClick}
      />
    </div>
  );
};

export default ClientsSection;
