import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; 

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Clear error message before submission
      setError('');
      setSuccess('');

      // Make the API call to backend /user/register
      const response = await axios.post('http://localhost:5003/user/register', formData);
      

      if (response.status === 201) {
        setSuccess('User registered successfully!');
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message); // Display specific error
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="signup-container">
      <h2 className='H2'>Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default Signup;
