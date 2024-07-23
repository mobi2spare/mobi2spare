// App.js
// App.js
// App.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Sidenav from './components/sidenav/sidenav.jsx';
import Adminav from './components/adminav/adminav.jsx';
import RequestManagement from './components/requestview/requestview.jsx';
import ApproveDeny from './components/approvedeny/approvedeny.jsx';
import CategoryManagement from './components/categorymanagement/categorymanagement.jsx';
import BrandManagement from './components/brandmanagement/brandmanagement.jsx';
import ModelManagement from './components/modelmanagement/modelmanagement.jsx';

const App = () => {
  const { option } = useParams();
  const [selectedOption, setSelectedOption] = useState(option || '');
  const navigate = useNavigate();
 //console.log("l");
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const formattedOption = option.replace(/\s+/g, '').toLowerCase();
    //console.log(formattedOption)
    navigate(`/admin/dashboard/${formattedOption}`);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // Implement logout functionality
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
      default:
        return null;
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




// import React, { useState } from 'react';
// import './App.css';
// import Sidenav from './components/sidenav/sidenav.jsx';
// import Adminav from './components/adminav/adminav.jsx';
// import RequestManagement from './components/requestview/requestview.jsx';
// import ApproveDeny from './components/approvedeny/approvedeny.jsx';
// import CategoryManagement from './components/categorymanagement/categorymanagement.jsx';
// import BrandManagement from './components/brandmanagement/brandmanagement.jsx';
// import ModelManagement from './components/modelmanagement/modelmanagement.jsx';


// function App() {

//   const [selectedOption, setSelectedOption] = useState('');

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//   };

//   const handleLogout = () => {
//     console.log('Logout clicked');
//   };

//   return (
//     <div className="App">
//       <Adminav onLogout={handleLogout} username="Admin" />
//       <div className="main-content">
//         <Sidenav onOptionClick={handleOptionClick} />
//         <div className="content">
//           {selectedOption === 'All Requests' && <RequestManagement />}
//           {selectedOption === 'Request Management' && <ApproveDeny />}
//           {selectedOption === 'Category Management' && <CategoryManagement />}
//           {selectedOption === 'Brand Management' && <BrandManagement />}
//           {selectedOption === 'Model Management' && <ModelManagement />}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
