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

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {options.map((option, index) => (
          <li
            key={index}
            className="sidebar-item"
            onClick={() => onOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidenav;
