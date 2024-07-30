// src/components/editcategory/EditCategory.jsx
import React, { useState } from 'react';
import axiosInstance from '../../axiosConfig'; // Import the configured Axios instance
import './editcategory.css';
import { API_ENDPOINTS } from '../../constants'; // Import API endpoints

const EditCategory = ({ categoryId, categoryName, onBack, onCategoryUpdated }) => {
  const [name, setName] = useState(categoryName);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.put(`${API_ENDPOINTS.CATEGORY}${categoryId}`, { name }); // Use the endpoint from constants

      if (response.data.success) {
        setMessage('Category updated successfully!');
        onCategoryUpdated(); // Trigger parent component to refetch categories
      } else {
        setMessage('Failed to update category');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error updating category: ' + error.message);
      }
    }
  };

  return (
    <div className="edit-category">
      <h1>Edit Category</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

export default EditCategory;
