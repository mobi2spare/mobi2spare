// src/components/addcategory/AddCategory.jsx
import React, { useState } from 'react';
import axiosInstance from '../../axiosConfig'; // Import the configured Axios instance
import './addcategory.css';
import { API_ENDPOINTS } from '../../constants'; // Import API endpoints

const AddCategory = ({ onBack, onCategoryAdded }) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Upload the image
      const uploadResponse = await axiosInstance.post(`${API_ENDPOINTS.CATEGORY_UPLOAD}1`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (!uploadResponse.data.success) {
        setMessage('Failed to upload image');
        return;
      }
      
      const imagePath = uploadResponse.data.path.key;

      // Create the category
      const response = await axiosInstance.post(API_ENDPOINTS.CATEGORY, { name, imagePath }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setMessage(response.data.message);
      onCategoryAdded();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error creating category: ' + error.message);
      }
    }
  };

  return (
    <div className="add-category">
      <h1>Add Category</h1>
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
        <label>
          Image:
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
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

export default AddCategory;
