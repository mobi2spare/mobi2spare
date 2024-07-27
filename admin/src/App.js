
import React, { useState } from 'react';
import './App.css';
import Sidenav from './components/sidenav/sidenav.jsx';
import Adminav from './components/adminav/adminav.jsx';
import RequestManagement from './components/requestview/requestview.jsx';
import ApproveDeny from './components/approvedeny/approvedeny.jsx';
import CategoryManagement from './components/categorymanagement/categorymanagement.jsx';
import BrandManagement from './components/brandmanagement/brandmanagement.jsx';
import ModelManagement from './components/modelmanagement/modelmanagement.jsx';
import BannerManagement from './components/bannermanagement/bannermanagement.jsx';
import UserManagement from './components/usermanagement/usermanagement.jsx';
// import dotenv from 'dotenv';
// dotenv.config();

function App() {

  const [selectedOption, setSelectedOption] = useState('Category Management');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="App">
      <Adminav onLogout={handleLogout} username="Admin" />
      <div className="main-content">
        <Sidenav onOptionClick={handleOptionClick} />
        <div className="content">
          {selectedOption === 'All Requests' && <RequestManagement />}
          {selectedOption === 'Request Management' && <ApproveDeny />}
          {selectedOption === 'Category Management' && <CategoryManagement />}
          {selectedOption === 'Banner Management' && <BannerManagement />}
          {selectedOption === 'User Management' && <UserManagement />}
          {selectedOption === 'Brand Management' && <BrandManagement />}
          {selectedOption === 'Model Management' && <ModelManagement />}
        </div>
      </div>
    </div>
  );
}

export default App;