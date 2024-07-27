import React, { useState } from 'react';
import './adminav.css';
import { getToken } from '../../tokenutility';

const Adminav = ({ onLogout, username }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const token=getToken();

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

  function openNav() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
    const menu = document.querySelector('.menu-icon')
    menu.style.display = 'none'
    const close = document.querySelector('.close-icon')
    close.style.display = 'flex'
    const content = document.querySelector('.content')
    content.style.display = 'none'
  }

  function closeNav() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
    const menu = document.querySelector('.menu-icon')
    menu.style.display = 'flex'
    const close = document.querySelector('.close-icon')
    close.style.display = 'none'
    const content = document.querySelector('.content')
    content.style.display = 'flex'
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed" style={{ backgroundColor: 'rgb(129, 36, 36)', borderRadius: '3px' }} className='menu-icon' onClick={() => openNav()}><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>

          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed" style={{ backgroundColor: 'rgb(129, 36, 36)', borderRadius: '3px' }} className='close-icon' onClick={() => closeNav()}><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>

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
