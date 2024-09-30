import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [otp, setOtp] = useState(''); // State for OTP
  const [message, setMessage] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false); // State to toggle between login and forgot password
  const [isOtpSent, setIsOtpSent] = useState(false); // State to check if OTP was sent
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isForgotPassword) {
      if (isOtpSent) {
        await handleVerifyOtp(); // If OTP is sent, verify it
      } else {
        await handleForgotPassword(); // If OTP is not sent, send it
      }
    } else {
      await handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5003/auth/login', formData);
      console.log("Login Response:", response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', response.data.email);
      localStorage.setItem('userName', response.data.name);
  
      setMessage(`Login successful!`);
  
      setTimeout(() => {
        setMessage(`Please wait, you are being redirected...`);
  
        setTimeout(() => {
          navigate('/userdashboard');
        }, 1000);
      }, 500);
    } catch (error) {
      setMessage('Login failed: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:5003/auth/forgot-password', { email: formData.email });
      setMessage(response.data.message); // Assuming your backend sends a success message
      setIsOtpSent(true); // Set OTP sent state to true
    } catch (error) {
      setMessage('Error sending reset email: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5003/auth/verify-otp', {
        email: formData.email,
        otp: otp // Send OTP for verification
      });
      setMessage(response.data.message); // Display success message
      // Optionally, navigate to a password reset page or prompt the user to reset their password
    } catch (error) {
      setMessage('Error verifying OTP: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setIsOtpSent(false); // Reset OTP sent state when toggling
    setMessage(''); // Clear the message when toggling
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2 className='login-header'>{isForgotPassword ? 'Forgot Password' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {!isForgotPassword && (
            <div className='form-group'>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {isForgotPassword && isOtpSent && ( // Render OTP input if OTP was sent
            <div className='form-group'>
              <label>Enter OTP:</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}
          <button className="login-btn" type="submit">{isForgotPassword ? (isOtpSent ? 'Verify OTP' : 'Send Reset Link') : 'Login'}</button>
        </form>
        {!isForgotPassword && (
          <p className="forgot-password" onClick={toggleForgotPassword}>Forgot Password?</p>
        )}
        {isForgotPassword && (
          <p className="back-to-login" onClick={toggleForgotPassword}>Back to Login</p>
        )}
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
