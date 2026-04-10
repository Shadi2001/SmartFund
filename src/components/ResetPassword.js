import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/reset-password.css';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    token: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);

  useEffect(() => {
    // Extract token and email from URL parameters
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    
    if (token && email) {
      setForm(prev => ({
        ...prev,
        email: decodeURIComponent(email),
        token: token
      }));
    } else {
      setError('Invalid reset link. Please request a new password reset.');
    }

    // Delay enabling form to prevent autofill
    setTimeout(() => {
      setIsFormReady(true);
    }, 100);
  }, [searchParams]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (form.newPassword !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Validate password strength
    if (form.newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/users/reset-password', {
        email: form.email,
        token: form.token,
        newPassword: form.newPassword
      });

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.data.message || 'Failed to reset password.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="reset-password-container">
        <div className="background-pattern"></div>
        
        <div className="geometric-shapes">
          <div className="shape"><i className="fas fa-check-circle"></i></div>
          <div className="shape"><i className="fas fa-shield-alt"></i></div>
          <div className="shape"><i className="fas fa-lock"></i></div>
          <div className="shape"><i className="fas fa-key"></i></div>
          <div className="shape"><i className="fas fa-user-shield"></i></div>
        </div>
        
        <div className="reset-password-card">
          <div className="reset-password-header">
            <h1 className="reset-password-title">
              <i className="fas fa-check-circle financial-icon"></i>
              Password Reset Successful
            </h1>
            <p className="reset-password-subtitle">
              Your password has been <span className="brand-accent">successfully reset</span>
            </p>
          </div>
          
          <div className="success-message">
            <i className="fas fa-check-circle me-2"></i>
            Redirecting to login page...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <div className="background-pattern"></div>
      
      <div className="geometric-shapes">
        <div className="shape"><i className="fas fa-lock"></i></div>
        <div className="shape"><i className="fas fa-key"></i></div>
        <div className="shape"><i className="fas fa-shield-alt"></i></div>
        <div className="shape"><i className="fas fa-user-shield"></i></div>
        <div className="shape"><i className="fas fa-unlock"></i></div>
      </div>
      
      <div className="reset-password-card">
        <div className="reset-password-header">
          <h1 className="reset-password-title">
            <i className="fas fa-key financial-icon"></i>
            Reset Password
          </h1>
          <p className="reset-password-subtitle">
            Create a new <span className="brand-accent">secure password</span> for your account
          </p>
        </div>
        
        <form onSubmit={handleSubmit} key="reset-password-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <input
                type="email"
                className="form-input"
                value={form.email}
                readOnly
                disabled
              />
              <i className="fas fa-envelope input-icon"></i>
            </div>
            <div className="form-text">This email address is associated with your account</div>
          </div>
          
          <div className="form-group">
            <label className="form-label">New Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                className="form-input"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
                readOnly={!isFormReady}
                onFocus={() => setIsFormReady(true)}
                required
              />
              <i className="fas fa-lock input-icon"></i>
            </div>
            <div className="form-text">Password must be at least 8 characters long</div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Confirm New Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                className="form-input"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
                readOnly={!isFormReady}
                onFocus={() => setIsFormReady(true)}
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
          
          <button type="submit" className="reset-password-button" disabled={loading}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Resetting Password...
              </>
            ) : (
              <>
                <i className="fas fa-key me-2"></i>
                Reset Password
              </>
            )}
          </button>
        </form>
        
        <div className="links-section">
          <button 
            type="button" 
            className="link-button"
            onClick={() => navigate('/login')}
          >
            <i className="fas fa-arrow-left me-1"></i>
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
