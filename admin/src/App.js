// App.js
// App.js
// App.js
import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
  const [selectedOption, setSelectedOption] = useState(option || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (!option) {
      navigate('/admin/dashboard/categorymanagement'); // Redirect to default route
    } else {
      setSelectedOption(option.replace(/\s+/g, '').toLowerCase());
    }
  }, [option, navigate]);

 //console.log("l");
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const formattedOption = option.replace(/\s+/g, '').toLowerCase();
    //console.log(formattedOption)
    navigate(`/admin/dashboard/${formattedOption}`);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  // Map option to component
  const renderComponent = () => {
    switch (selectedOption) {
      case 'All Requests':
        return <RequestManagement />;
      case 'Request Management':
        return <ApproveDeny />;
      case 'Category Management':
        return <CategoryManagement />;
      case 'Brand Management':
        return <BrandManagement />;
      case 'Model Management':
        return <ModelManagement />;
      case 'Banner Management':
        return <BannerManagement />;
      case 'User Management':
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
        
          {renderComponent()}
      </div>
    </div>
  );
};

export default App;
