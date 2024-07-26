// Dashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Start from './start';
import Login from './Login';
import App from './App';
import RequestManagement from './components/requestview/requestview.jsx';
import ApproveDeny from './components/approvedeny/approvedeny.jsx';
import CategoryManagement from './components/categorymanagement/categorymanagement.jsx';
import BrandManagement from './components/brandmanagement/brandmanagement.jsx';
import ModelManagement from './components/modelmanagement/modelmanagement.jsx';
import BannerManagement from './components/bannermanagement/bannermanagement.jsx';
import AddCategory from './components/addcategory/addcategory.jsx';
import UserManagement from './components/usermanagement/usermanagement.jsx'

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Start />} />
      <Route path="/admin/signin" element={<Login />} />
      <Route path="/admin/dashboard" element={<App />}>
        <Route path="allrequests" element={<RequestManagement />} />
        <Route path="requestmanagement" element={<ApproveDeny />} />
        <Route path="categorymanagement" element={<CategoryManagement />} />
        <Route path="brandmanagement" element={<BrandManagement />} />
        <Route path="modelmanagement" element={<ModelManagement />} />
        <Route path="bannermanagement" element={<BannerManagement />} />
        <Route path="usermanagement" element={<UserManagement />} />
      </Route>
    </Routes>
  );
};

export default Dashboard;
