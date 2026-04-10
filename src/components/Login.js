import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import '../assets/css/login.css';

export default function Login() {
  const { login, loading, error, user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showAdmin, setShowAdmin] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);

  // Mock accounts for quick demo/testing in the login UI.
  // These work only if your backend has corresponding users.
  const MOCK_ACCOUNTS = [
    {
      id: "mock_user",
      label: "Normal User",
      email: "user@smartfund.local",
      password: "UserPass123!",
    },
    {
      id: "mock_admin",
      label: "Admin",
      email: "admin@smartfund.local",
      password: "AdminPass123!",
    },
  ];

  const fillMockAccount = (account) => {
    if (!account) return;
    setIsFormReady(true); // ensure fields aren't blocked by readOnly
    setEmail(account.email);
    setPassword(account.password);
  };
  
  // Forgot password states
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/UserDashboard');
      }
    }
  }, [user, navigate]);

  // Clear form fields when component mounts
  useEffect(() => {
    setEmail('');
    setPassword('');
    // Delay enabling form to prevent autofill
    setTimeout(() => {
      setIsFormReady(true);
    }, 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await login(email, password);
    // Navigation is handled in useEffect
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotPasswordLoading(true);
    setForgotPasswordError('');
    setForgotPasswordSuccess(false);

    try {
      const response = await axios.post('http://localhost:3000/api/users/forgot-password', {
        email: forgotPasswordEmail
      });

      if (response.data.success) {
        setForgotPasswordSuccess(true);
        setForgotPasswordEmail('');
      } else {
        setForgotPasswordError(response.data.message || 'Failed to send reset link');
      }
    } catch (error) {
      setForgotPasswordError(error.response?.data?.message || 'Failed to send reset link. Please try again.');
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const resetForgotPassword = () => {
    setShowForgotPassword(false);
    setForgotPasswordEmail('');
    setForgotPasswordError('');
    setForgotPasswordSuccess(false);
  };

  // Rendering AdminDashboard here caused mismatched routing on refresh.
  // We now navigate to /admin and let routes render it.

  return (
    <div className="login-container">
      {/* Subtle Background Pattern */}
      <div className="background-pattern"></div>
      
      {/* Geometric Shapes */}
      <div className="geometric-shapes">
        <div className="shape"><i className="fas fa-wallet"></i></div>
        <div className="shape"><i className="fas fa-chart-line"></i></div>
        <div className="shape"><i className="fas fa-hand-holding-usd"></i></div>
        <div className="shape"><i className="fas fa-piggy-bank"></i></div>
        <div className="shape"><i className="fas fa-coins"></i></div>
      </div>
      
      {/* Login Card */}
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">
            <i className="fas fa-chart-line financial-icon"></i>
            SmartFund
          </h1>
          <p className="login-subtitle">
            {showForgotPassword 
              ? <>Reset your <span className="brand-accent">password</span> and regain access to your account</>
              : <>Access your <span className="brand-accent">financial dashboard</span> and manage your investments</>
            }
          </p>
        </div>
        
        {!showForgotPassword ? (
          <>
            <form onSubmit={handleSubmit} key="login-form">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="new-email"
                    readOnly={!isFormReady}
                    onFocus={() => setIsFormReady(true)}
                    placeholder="Enter your email address"
                    required
                  />
                  <i className="fas fa-envelope input-icon"></i>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    className="form-input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="new-password"
                    readOnly={!isFormReady}
                    onFocus={() => setIsFormReady(true)}
                    placeholder="Enter your password"
                    required
                  />
                  <i className="fas fa-lock input-icon"></i>
                </div>
              </div>
              
              {error && (
                <div className="error-message">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}
              
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Signing In...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="mock-accounts-section" role="note" aria-label="Mock accounts">
              <div className="mock-accounts-title">
                <i className="fas fa-user-shield me-2" />
                Mock Accounts
              </div>

              {MOCK_ACCOUNTS.map((account) => (
                <div key={account.id} className="mock-account-block">
                  <div className="mock-account-header">
                    <div className="mock-account-label">{account.label}</div>
                    <button
                      type="button"
                      className="mock-use-button"
                      onClick={() => fillMockAccount(account)}
                      disabled={loading}
                      title="Fill email and password"
                    >
                      <i className="fas fa-pen me-2"></i>
                      Fill
                    </button>
                  </div>

                  <div className="mock-credential">
                    <span className="mock-credential-label">Email:</span>{" "}
                    <span className="mock-credential-value">{account.email}</span>
                  </div>
                  <div className="mock-credential">
                    <span className="mock-credential-label">Password:</span>{" "}
                    <span className="mock-credential-value">{account.password}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="links-section">
              <div className="forgot-password-section">
                <button 
                  type="button" 
                  className="forgot-password-link"
                  onClick={() => setShowForgotPassword(true)}
                >
                  <i className="fas fa-key me-1"></i>
                  Forgot Password?
                </button>
              </div>
              
              <p style={{ marginBottom: '1rem', color: '#64748b' }}>
                Don't have an account? 
                <Link to="/signup">
                  <button className="link-button">Sign Up</button>
                </Link>
              </p>
              
              <Link to="/">
                <button className="link-button">
                  <i className="fas fa-arrow-left me-1"></i>
                  Back to Home
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleForgotPassword} key="forgot-password-form">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    className="form-input"
                    value={forgotPasswordEmail}
                    onChange={e => setForgotPasswordEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                  <i className="fas fa-envelope input-icon"></i>
                </div>
              </div>
              
              {forgotPasswordError && (
                <div className="error-message">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {forgotPasswordError}
                </div>
              )}
              
              {forgotPasswordSuccess && (
                <div className="success-message">
                  <i className="fas fa-check-circle me-2"></i>
                  Reset link has been sent to your email address
                </div>
              )}
              
              <button type="submit" className="login-button" disabled={forgotPasswordLoading}>
                {forgotPasswordLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending Reset Link...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane me-2"></i>
                    Send Reset Link
                  </>
                )}
              </button>
            </form>
            
            <div className="links-section">
              <button 
                type="button" 
                className="link-button"
                onClick={resetForgotPassword}
              >
                <i className="fas fa-arrow-left me-1"></i>
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}