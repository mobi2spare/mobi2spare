import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig'; // Import your configured Axios instance
import { API_ENDPOINTS } from '../../constants'; // Import API endpoints
import EditUser from '../edituser/edituser.jsx'; // Import your EditUser component
import './usermanagement.css'; // Import your CSS file

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditUser, setShowEditUser] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserAddress, setEditUserAddress] = useState('');
  const [editUserOrganization, setEditUserOrganization] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [search]); // Depend on search for refetching

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(API_ENDPOINTS.USERS); // Use the constants for endpoints
      if (response.data) {
        setUsers(response.data.users);
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      setError('Error fetching users: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setEditUserAddress(user.address);
    setEditUserOrganization(user.organization_name);
    setShowEditUser(true);
  };

  const handleUserUpdated = () => {
    setShowEditUser(false);
    fetchUsers();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (showEditUser) {
    return <EditUser
      userId={editUserId}
      address={editUserAddress}
      organizationName={editUserOrganization}
      onBack={() => setShowEditUser(false)}
      onUserUpdated={handleUserUpdated}
    />;
  }

  return (
    <div className="user-management">
      <div className="header">
        <h1>User Management</h1>
        <input
          type="text"
          placeholder="Search by username"
          value={search}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Organization</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
            .map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.organization_name}</td>
                <td>{user.address}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditUser(user)}>Edit</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
