import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Landing from "./components/Landing/landing";
import Dashboard from "./components/Dashboard/Dashboard";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import Form from "./components/Form";
import ResetPassword from "./components/ResetPassword";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PaymentSuccess from "./components/Dashboard/components/FundDashboard/PaymentSuccess";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/payment-success/:paymentId" element={<PaymentSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/UserDashboard" element={<ProtectedRoute requiredRole="user"><Dashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>} />
      </Routes>

      
      
    </>
  );
} 

export default App;
