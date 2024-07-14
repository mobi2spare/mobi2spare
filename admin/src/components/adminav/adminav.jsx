import React, { useState } from 'react';
import './adminav.css';

const Adminav = ({ onLogout, username }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    onLogout();
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const updateUsername = (newUsername) => {};

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
        </div>
        <div className="navbar-right">
          <div className="dropdown">
            <button className="dropbtn" onClick={toggleDropdown}>
              {username} <span className="arrow">&#9660;</span>
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <div className="dropdown-item" onClick={openProfileModal}>
                  Profile
                </div>
                <div className="dropdown-item" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Adminav;
