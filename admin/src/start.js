// Start.js
import React from 'react';
import { Link } from 'react-router-dom';
import './start.css'; // Adjust CSS as needed

const Start = () => {
  return (
    <div className="start-container">
      <div className="center">
        <h1>Welcome to Your App</h1>
        <Link to="/admin/signin" className="login-button">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Start;
