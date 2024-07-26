// src/components/edituser/EditUser.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './edituser.css'; // Import your CSS file
import { getToken } from '../../tokenutility';

const EditUser = ({ userId, address, organizationName, onBack, onUserUpdated }) => {
  const [newAddress, setNewAddress] = useState(address);
  const [newOrganizationName, setNewOrganizationName] = useState(organizationName);
  const [message, setMessage] = useState(null);
  const token = getToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8800/api/users/${userId}`, {
        address: newAddress,
        organization_name: newOrganizationName
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.message==='User updated successfully') {
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
          <button className="back-button" onClick={onBack}>Back</button>
          <button className="submit-button" type="submit">Submit</button>
        </div>
      </form>
      {message && <div className="popup">{message}</div>}
    </div>
  );
};

export default EditUser;
