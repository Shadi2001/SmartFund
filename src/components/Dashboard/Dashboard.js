import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { DashboardProvider } from "./DashboardContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import FundDashboard from "./components/FundDashboard/FundDashboard";
import SponsorsSection from "./components/Sponsors/SponsorsSection";
import PendingContractsSection from "./components/PendingContracts/PendingContractsSection";
import ProfileSection from "./components/Profile/ProfileSection";
import QRModal from "./components/shared/QRModal";
import Chatbot from "./components/Chatbot/Chatbot";


const Dashboard = () => {
  const [section, setSection] = useState("fund");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Safety redirect: if an admin ends up here, bounce to /admin
  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  return (
    <DashboardProvider>
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
            width: 100%;
            color: #495057;
            text-decoration: none;
            background: transparent;
            border: none;
            transition: all 0.3s ease;
            border-left: 4px solid transparent;
            text-align: left;
            font: inherit;
            outline: none;
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
          
          /* Fix button hover states to maintain white text/icons */
          .btn-primary:hover,
          .btn-primary:focus,
          .btn-primary:active,
          .btn-primary.show,
          .btn-primary.dropdown-toggle {
            color: white !important;
            background-color: #0056b3 !important;
            border-color: #0056b3 !important;
          }
          
          .btn-primary:hover i,
          .btn-primary:focus i,
          .btn-primary:active i,
          .btn-primary.show i,
          .btn-primary.dropdown-toggle i {
            color: white !important;
          }
          
          /* Fix outline button hover states */
          .btn-outline-primary:hover,
          .btn-outline-primary:focus,
          .btn-outline-primary:active,
          .btn-outline-primary.show,
          .btn-outline-primary.dropdown-toggle {
            color: white !important;
            background-color: #0056b3 !important;
            border-color: #0056b3 !important;
          }
          
          .btn-outline-primary:hover i,
          .btn-outline-primary:focus i,
          .btn-outline-primary:active i,
          .btn-outline-primary.show i,
          .btn-outline-primary.dropdown-toggle i {
            color: white !important;
          }
          
          /* Fix other button variants that might have blue colors */
          .btn-info:hover,
          .btn-info:focus,
          .btn-info:active,
          .btn-info.show,
          .btn-info.dropdown-toggle {
            color: white !important;
            background-color: #138496 !important;
            border-color: #138496 !important;
          }
          
          .btn-info:hover i,
          .btn-info:focus i,
          .btn-info:active i,
          .btn-info.show i,
          .btn-info.dropdown-toggle i {
            color: white !important;
          }
          
          /* Fix Form loan type buttons hover states */
          .btn-outline-primary.active,
          .btn-outline-primary.active:hover,
          .btn-outline-primary.active:focus,
          .btn-outline-primary.active:active {
            color: white !important;
            background-color: #0343f2 !important;
            border-color: #0343f2 !important;
          }
          
          .btn-outline-primary.active i,
          .btn-outline-primary.active:hover i,
          .btn-outline-primary.active:focus i,
          .btn-outline-primary.active:active i {
            color: white !important;
          }
          
          /* Ensure loan type buttons maintain white text/icons on hover when not active */
          .btn-outline-primary:hover i,
          .btn-outline-primary:focus i,
          .btn-outline-primary:active i {
            color:rgb(255, 255, 255) !important;
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
      
      <div className="dashboard-page">
        {/* Sidebar */}
        <Sidebar section={section} setSection={setSection} />
        
        {/* Main Content */}
        <div className="main-content">
          {/* Top Header Bar */}
          <Header setSection={setSection} />
          
          {/* Content Container */}
          <div style={{ padding: "2rem" }}>
            {section === "fund" && <FundDashboard />}
            {section === "sponsors" && <SponsorsSection />}
            {section === "pending" && <PendingContractsSection />}
            {section === "profile" && <ProfileSection />}
          </div>
        </div>
        
        {/* QR Payment Modal */}
        <QRModal />
        
        {/* Chatbot */}
        <Chatbot />
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;
