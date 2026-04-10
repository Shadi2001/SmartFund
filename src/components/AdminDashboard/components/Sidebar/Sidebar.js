import React from 'react';
import { useAdminDashboard } from '../../AdminDashboardContext';
import UserProfile from './UserProfile';

const Sidebar = ({ section, setSection }) => {
  const { pendingContracts } = useAdminDashboard();

  const navItems = [
    {
      id: "stats",
      label: "Stats",
      icon: "fas fa-chart-bar",
      badge: null
    },
    {
      id: "clients",
      label: "Clients",
      icon: "fas fa-users",
      badge: null
    },
    
    {
      id: "review",
      label: "Review",
      icon: "fas fa-file-contract",
      badge: pendingContracts.length === 0 ? null : pendingContracts.length
    }
    ,
    {
      id: "Overdue",
      label: "Overdue",
      icon: "fa-solid fa-circle-exclamation",
      badge: null
    },
    {
      id: "info",
      label: "Info",
      icon: "fas fa-info-circle",
      badge: null
    },
    
  ];

  return (
    <div className="sidebar">
     

      {/* User Profile Section */}
      <UserProfile />

      {/* Navigation */}
      <div className="sidebar-nav">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar-nav-item ${section === item.id ? 'active' : ''}`}
            onClick={() => setSection(item.id)}
            style={{ cursor: 'pointer' }}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
            {item.badge && item.badge > 0 && (
              <span 
                className="badge bg-danger ms-auto"
                style={{ fontSize: '0.7rem' }}
              >
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
