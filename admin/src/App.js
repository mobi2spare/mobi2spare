import React, { useState } from 'react';
import './App.css';
import Sidenav from './components/sidenav/sidenav.jsx';
import Adminav from './components/adminav/adminav.jsx';
import RequestManagement from './components/requestview/requestview.jsx';

function App() {

  const [selectedOption, setSelectedOption] = useState('');

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
          {selectedOption === 'Request Management' && <RequestManagement />}
        </div>
      </div>
    </div>
  );
}

export default App;
