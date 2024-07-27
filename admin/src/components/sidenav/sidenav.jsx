import React from 'react';
import './sidenav.css';

const Sidenav = ({ onOptionClick }) => {
  const options = [
    'Category Management',
    'All Requests',
    'Request Management',
    'Brand Management',
    'Model Management'
  ];

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
    <div className="sidebar">
      <ul className="sidebar-list">
        {options.map((option, index) => (
          <li
            key={index}
            className="sidebar-item"
            onClick={() => { return onOptionClick(option), closeNav() }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidenav;
