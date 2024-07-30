import React, { useState } from 'react';
import axiosInstance from '../../axiosConfig'; // Import your configured Axios instance
import { API_ENDPOINTS } from '../../constants'; // Import API endpoints
import './edituser.css'; // Import your CSS file

const EditUser = ({ userId, address, organizationName, onBack, onUserUpdated }) => {
  const [newAddress, setNewAddress] = useState(address);
  const [newOrganizationName, setNewOrganizationName] = useState(organizationName);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`${API_ENDPOINTS.USERS}/${userId}`, {
        address: newAddress,
        organization_name: newOrganizationName
      });

      if (response.data.message === 'User updated successfully') {
        setMessage('User updated successfully!');
        onUserUpdated();
      } else {
        setMessage('Failed to update user');
      }
    } catch (error) {
      setMessage('Error updating user: ' + error.message);
    }
  };

  return (
    <div className="edit-user">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            required
          />
        </label>
        <label>
          Organization Name:
          <input
            type="text"
            value={newOrganizationName}
            onChange={(e) => setNewOrganizationName(e.target.value)}
            required
          />
        </label>
        <div className="button-container">
          <button className="back-button" type="button" onClick={onBack}>Back</button>
          <button className="submit-button" type="submit">Submit</button>
        </div>
      </form>
      {message && <div className="popup">{message}</div>}
    </div>
  );
};

export default EditUser;
