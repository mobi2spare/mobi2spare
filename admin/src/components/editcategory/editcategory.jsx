import React, { useState } from 'react';
import axios from 'axios';
import './editcategory.css';
import { getToken } from '../../tokenutility';

const EditCategory = ({ categoryId, categoryName, onBack, onCategoryUpdated }) => {
  const [name, setName] = useState(categoryName);
  const [message, setMessage] = useState(null);
  const token=getToken();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8800/api/category/${categoryId}`, { name }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

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
          <button className="back-button" onClick={onBack}>Back</button>
          <button className="submit-button" type="submit">Submit</button>
        </div>
      </form>
      {message && <div className="popup">{message}</div>}
    </div>
  );
};

export default EditCategory;
