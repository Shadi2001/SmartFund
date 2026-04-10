import React from 'react';
import { useAdminDashboard } from '../../AdminDashboardContext';
import AdminNotificationsDropdown from './AdminNotificationsDropdown';

const Header = () => {
  const { 
    logout
  } = useAdminDashboard();

  return (
    <div
      style={{
        background: "#0343f2",
        padding: "1.5rem 0",
        position: "relative",
      }}
    >
      <div className="container " >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1
              className="text-white fw-bold mb-2"
              style={{ fontSize: "2rem" }}
            >
              Admin Dashboard
            </h1>
            <div
              className="text-white"
              style={{ fontSize: "1rem", maxWidth: 600 }}
            >
              Manage users, funds, and system statistics.
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button style={{color: "white", border:"white 2px solid"}} className="btn btn-primary" onClick={logout}>
              Logout
            </button>
            <AdminNotificationsDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
