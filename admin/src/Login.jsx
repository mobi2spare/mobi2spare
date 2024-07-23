import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Login.css'; // Import your custom CSS file for styling

const Login = () => {
  const history = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8800/api/signin', {
        phoneNumber,
        password,
      });

      const { id, role, token, refreshToken, phone, ...user } = response.data.user;

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        id,
        role,
        token,
        refreshToken,
        phone,
        ...user,
      }));

      // Store tokens in cookies
      Cookies.set('token', token, { expires: 7, secure: true });
      Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true });
  //console.log(role)
      // Redirect to appropriate dashboard based on role
      if (role === 'Admin') {
        history('/admin/dashboard');
      } else {
        setError('Admin access denied!');
        //history('/user/dashboard'); // Replace with actual user dashboard route
      }
    } catch (error) {
      setError(error.response.data.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
