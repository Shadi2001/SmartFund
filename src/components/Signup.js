import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/signup.css';

export default function Signup() {
  const { signup, loading, error, verificationCodeSent, verifyCode } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userFirstName: '',
    userLastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    DateOfBirth: '',
    gender: '',
    income: '',
    creditID: '',
    address: '',
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Clear form fields when component mounts
  useEffect(() => {
    setForm({
      userFirstName: '',
      userLastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      DateOfBirth: '',
      gender: '',
      income: '',
      creditID: '',
      address: '',
    });
    // Delay enabling form to prevent autofill
    setTimeout(() => {
      setIsFormReady(true);
    }, 100);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(form);
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    const success = await verifyCode(verificationCode);
    if (success) {
      setVerificationSuccess(true);
      setTimeout(() => {
        navigate('/UserDashboard');
      }, 1500);
    }
  };

  const handleResendCode = () => {
    signup(form);
  };

  if (verificationSuccess) {
    return (
      <div className="success-container">
        <div className="success-card">
          <i className="fas fa-check-circle success-icon"></i>
          <h2 className="success-title">Verification Successful!</h2>
          <p className="success-message">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  if (verificationCodeSent) {
    return (
      <div className="verification-container">
        <div className="verification-card">
          <div className="verification-header">
            <h2 className="verification-title">
              <i className="fas fa-envelope-open-text me-2" style={{ color: '#0343f2' }}></i>
              Email Verification
            </h2>
            <div className="verification-info">
              <i className="fas fa-envelope me-2"></i>
              Verification code has been sent to <strong>{form.email}</strong>
            </div>
          </div>
          
          <form onSubmit={handleVerificationSubmit} className="verification-form">
            <div className="form-group">
              <label className="form-label">Verification Code</label>
              <input 
                type="text" 
                className="form-input" 
                value={verificationCode} 
                onChange={(e) => setVerificationCode(e.target.value)} 
                placeholder="Enter 6-digit code"
                maxLength="6"
                required 
              />
              <div className="form-text">Please check your email and enter the verification code</div>
            </div>
            
            {error && (
              <div className="alert alert-danger" style={{ 
                background: 'linear-gradient(135deg, #ef4444, #dc2626)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px',
                padding: '1rem 1.5rem'
              }}>
                <i className="fas fa-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}
            
            <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Verifying...
                </>
              ) : (
                <>
                  <i className="fas fa-check me-2"></i>
                  Verify Code
                </>
              )}
            </button>
            
            <button 
              type="button" 
              className="btn btn-outline-secondary w-100" 
              onClick={handleResendCode}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane me-2"></i>
                  Resend Code
                </>
              )}
            </button>
          </form>
          
          <div className="resend-section">
            <span style={{ color: '#64748b' }}>Didn't receive the code? </span>
            <button 
              className="resend-link"
              onClick={handleResendCode}
              disabled={loading}
            >
              Resend
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      {/* Subtle Background Pattern */}
      <div className="background-pattern"></div>
      
      {/* Geometric Shapes */}
      <div className="geometric-shapes">
        <div className="shape"><i className="fas fa-wallet"></i></div>
        <div className="shape"><i className="fas fa-chart-line"></i></div>
        <div className="shape"><i className="fas fa-hand-holding-usd"></i></div>
        <div className="shape"><i className="fas fa-piggy-bank"></i></div>
        <div className="shape"><i className="fas fa-piggy-bank"></i></div>
      </div>
      
      {/* Signup Card */}
      <div className="signup-card">
        <div className="signup-header">
          <h1 className="signup-title">
            <i className="fas fa-user-plus financial-icon"></i>
            Join SmartFund
          </h1>
          <p className="signup-subtitle">
            Create your account and start your <span className="brand-accent">financial journey</span> today
          </p>
        </div>
        
        <form onSubmit={handleSubmit} key="signup-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input 
                type="text" 
                className="form-input" 
                name="userFirstName" 
                value={form.userFirstName} 
                onChange={handleChange} 
                autoComplete="new-first-name" 
                readOnly={!isFormReady} 
                onFocus={() => setIsFormReady(true)} 
                placeholder="Enter first name"
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input 
                type="text" 
                className="form-input" 
                name="userLastName" 
                value={form.userLastName} 
                onChange={handleChange} 
                autoComplete="new-last-name" 
                readOnly={!isFormReady} 
                onFocus={() => setIsFormReady(true)} 
                placeholder="Enter last name"
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              autoComplete="new-email" 
              readOnly={!isFormReady} 
              onFocus={() => setIsFormReady(true)} 
              placeholder="Enter email address"
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              name="password" 
              value={form.password} 
              onChange={handleChange} 
              autoComplete="new-password" 
              readOnly={!isFormReady} 
              onFocus={() => setIsFormReady(true)} 
              placeholder="Create a strong password"
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              type="tel" 
              className="form-input" 
              name="phoneNumber" 
              value={form.phoneNumber} 
              onChange={handleChange} 
              autoComplete="new-tel" 
              readOnly={!isFormReady} 
              onFocus={() => setIsFormReady(true)} 
              placeholder="Enter phone number"
              required 
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Birthdate</label>
              <input 
                type="date" 
                className="form-input" 
                name="DateOfBirth" 
                value={form.DateOfBirth} 
                onChange={handleChange} 
                autoComplete="new-bday" 
                readOnly={!isFormReady} 
                onFocus={() => setIsFormReady(true)} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select 
                className="form-select" 
                name="gender" 
                value={form.gender} 
                onChange={handleChange} 
                autoComplete="new-gender" 
                readOnly={!isFormReady} 
                onFocus={() => setIsFormReady(true)} 
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Monthly Income</label>
              <input 
                type="number" 
                className="form-input" 
                name="income" 
                value={form.income} 
                onChange={handleChange} 
                autoComplete="new-income" 
                readOnly={!isFormReady} 
                onFocus={() => setIsFormReady(true)} 
                placeholder="Enter monthly income"
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Credit ID</label>
              <input 
                type="text" 
                className="form-input" 
                name="creditID" 
                value={form.creditID} 
                onChange={handleChange} 
                autoComplete="new-credit-id" 
                readOnly={!isFormReady} 
                onFocus={() => setIsFormReady(true)} 
                placeholder="Enter credit ID"
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Address</label>
            <input 
              type="text" 
              className="form-input" 
              name="address" 
              value={form.address} 
              onChange={handleChange} 
              autoComplete="new-address" 
              readOnly={!isFormReady} 
              onFocus={() => setIsFormReady(true)} 
              placeholder="Enter your address"
              required 
            />
          </div>
          
          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}
          
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Sending verification code...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus me-2"></i>
                Create Account
              </>
            )}
          </button>
        </form>
        
        <div className="links-section">
          <p style={{ marginBottom: '1rem', color: '#64748b' }}>
            Already have an account? 
            <Link to="/login">
              <button className="link-button">Sign In</button>
            </Link>
          </p>
          
          <Link to="/">
            <button className="link-button">
              <i className="fas fa-arrow-left me-1"></i>
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );   
}  