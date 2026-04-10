import React, { useState } from "react";
import { AdminDashboardProvider } from "./AdminDashboardContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import StatsSection from "./components/Stats/StatsSection";
import ClientsSection from "./components/Clients/ClientsSection";
import OverdueSection from "./components/Overdue/OverdueSection";
import ReviewSection from "./components/Review/ReviewSection";
import InfoSection from "./components/Info/InfoSection";

const AdminDashboard = () => {
  const [section, setSection] = useState("stats");

  return (
    <AdminDashboardProvider>
      <style>
        {`
          @keyframes fadeInSlide {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .tab-content {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .sidebar {
            width: 280px;
            background: white;
            height: 100vh;
            position: fixed;
            left: 0;
            top: 0;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
            z-index: 1000;
            overflow-y: auto;
          }
          
          .main-content {
            margin-left: 280px;
            min-height: 100vh;
            background: #f5f6fa;
          }
          
          .sidebar-header {
            background: white;
            padding: 2rem 1.5rem;
            color: #0343f2;
            text-align: center;
            border-bottom: 1px solid #e9ecef;
          }
          
          .sidebar-nav {
            padding: 1rem 0;
          }
          
          .sidebar-nav-item {
            display: flex;
            align-items: center;
            padding: 1rem 1.5rem;
            color: #495057;
            text-decoration: none;
            transition: all 0.3s ease;
            border-left: 4px solid transparent;
          }
          
          .sidebar-nav-item:hover,
          .sidebar-nav-item.active {
            background: #f8f9fa;
            color: #2e00d5;
            border-left-color: #2e00d5;
          }
          
          .sidebar-nav-item i {
            margin-right: 12px;
            width: 20px;
            text-align: center;
          }
          
          .user-profile-section {
            padding: 2rem 1.5rem;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
          }
          
          .user-avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #e0e0e0;
            cursor: pointer;
            transition: transform 0.2s ease;
          }
          
          .user-avatar:hover {
            transform: scale(1.05);
          }
          
          @media (max-width: 768px) {
            .sidebar {
              transform: translateX(-100%);
              transition: transform 0.3s ease;
            }
            
            .sidebar.open {
              transform: translateX(0);
            }
            
            .main-content {
              margin-left: 0;
            }
            
            .mobile-toggle {
              display: block;
            }
          }
        `}
      </style>
      
      <div className="admin-dashboard-page">
        {/* Sidebar */}
        <Sidebar section={section} setSection={setSection} />
        
        {/* Main Content */}
        <div className="main-content">
          {/* Top Header Bar */}
          <Header setSection={setSection} />
          
          {/* Content Container */}
          <div style={{ padding: "1rem" }}>
            {section === "stats" && <StatsSection />}
            {section === "clients" && <ClientsSection />}
            {section === "info" && <InfoSection />}
            {section === "Overdue" && <OverdueSection />}
            {section === "review" && <ReviewSection />}
          </div>
        </div>
      </div>
    </AdminDashboardProvider>
  );
};

export default AdminDashboard;
