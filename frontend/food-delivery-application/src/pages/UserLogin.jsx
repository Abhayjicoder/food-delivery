import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/auth.css';
import axios from 'axios';

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isUser = location.pathname === '/user/login';

  const handleToggle = () => {
    if (isUser) {
      navigate('/food-partner/login');
    } else {
      navigate('/user/login');
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await axios.post('http://localhost:3000/api/auth/user/login', { email, password },{withCredentials: true })// Add your form submission logic here
    console.log(response.data);
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <span className="auth-type-badge">{isUser ? 'User' : 'Food Partner'}</span>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">
            {isUser ? 'Sign in to continue ordering' : 'Sign in to your partner account'}
          </p>
        </div>

        <div className="user-toggle-container">
          <span className={`user-toggle-label ${!isUser ? 'active' : ''}`}>User</span>
          <div 
            className={`user-toggle-switch ${isUser ? '' : 'active'}`}
            onClick={handleToggle}
          >
            <div className="user-toggle-slider"></div>
          </div>
          <span className={`user-toggle-label ${isUser ? 'active' : ''}`}>Partner</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder={isUser ? "john@example.com" : "owner@restaurant.com"}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="password-toggle">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                required
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>

          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Don't have an account?{' '}
            <Link to={isUser ? "/user/register" : "/food-partner/register"} className="auth-footer-link">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
