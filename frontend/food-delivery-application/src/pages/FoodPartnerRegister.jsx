import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/auth.css';
import axios from 'axios';

const FoodPartnerRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isUser = location.pathname === '/user/register';

  const handleToggle = () => {
    if (isUser) {
      navigate('/food-partner/register');
    } else {
      navigate('/user/register');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ownerName = e.target.ownerName.value;
    const email = e.target.email.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const password = e.target.password.value;

    const response = await axios.post('http://localhost:3000/api/auth/foodpartner/register', { fullname: ownerName, email, contactname: contactName, phoneno:phone, address, password },{withCredentials: true })// Add your form submission logic here
    console.log(response.data);
    navigate('/food-partner/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <span className="auth-type-badge">{isUser ? 'User' : 'Food Partner'}</span>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">
            {isUser ? 'Join us to order delicious meals' : 'Register your restaurant and grow your business'}
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
          {isUser ? (
            <>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="ownerName" className="form-label">Owner Name</label>
                <input
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  className="form-input"
                  placeholder="Owner Full Name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="owner@restaurant.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactName" className="form-label">Contact Name</label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  className="form-input"
                  placeholder="Contact Person Name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  placeholder="+1 234 567 8900"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-input"
                  placeholder="Street Address, City, State"
                  required
                />
              </div>
            </>
          )}

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
            {isUser ? 'Create Account' : 'Register Restaurant'}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Already have an account?{' '}
            <Link to={isUser ? "/user/login" : "/food-partner/login"} className="auth-footer-link">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
