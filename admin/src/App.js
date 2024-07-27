// App.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidenav from './components/sidenav/sidenav.jsx';
import Adminav from './components/adminav/adminav.jsx';
import RequestManagement from './components/requestview/requestview.jsx';
import ApproveDeny from './components/approvedeny/approvedeny.jsx';
import CategoryManagement from './components/categorymanagement/categorymanagement.jsx';
import BrandManagement from './components/brandmanagement/brandmanagement.jsx';
import ModelManagement from './components/modelmanagement/modelmanagement.jsx';
import BannerManagement from './components/bannermanagement/bannermanagement.jsx';
import UserManagement from './components/usermanagement/usermanagement.jsx';

const App = () => {
  const { option } = useParams();
  const [selectedOption, setSelectedOption] = useState(option || 'categorymanagement'); // Default to categorymanagement
  const navigate = useNavigate();

  useEffect(() => {
    // If the option changes, update the state and navigate to the new route
    if (option && option !== selectedOption) {
      setSelectedOption(option.replace(/\s+/g, '').toLowerCase());
    }
  }, [option, selectedOption]);

  useEffect(() => {
    // If the selectedOption changes, navigate to the new route
    if (selectedOption) {
      navigate(`/admin/dashboard/${selectedOption}`);
    }
  }, [selectedOption, navigate]);

  const handleOptionClick = (option) => {
    const formattedOption = option.replace(/\s+/g, '').toLowerCase();
    setSelectedOption(formattedOption);
  };

  const handleLogout = () => {
    navigate('/admin/signin');
  };

  // Map option to component
  const renderComponent = () => {
    switch (selectedOption) {
      case 'allrequests':
        return <RequestManagement />;
      case 'requestmanagement':
        return <ApproveDeny />;
      case 'categorymanagement':
        return <CategoryManagement />;
      case 'brandmanagement':
        return <BrandManagement />;
      case 'modelmanagement':
        return <ModelManagement />;
      case 'bannermanagement':
        return <BannerManagement />;
      case 'usermanagement':
        return <UserManagement />;
      default:
        return <CategoryManagement />;
    }
  };

  return (
    <div className="App">
      <Adminav onLogout={handleLogout} username="Admin" />
      <div className="main-content">
        <Sidenav onOptionClick={handleOptionClick} />
        <div className="content">
        {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default App;