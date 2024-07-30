import React, { useState } from 'react';
import axiosInstance from '../../axiosConfig'; // Import the configured Axios instance
import { API_ENDPOINTS } from '../../constants'; // Import API endpoints
import './addbanner.css'; // Import your CSS file

const AddBanner = ({ onBack, onBannerAdded }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Upload the file
      const uploadResponse = await axiosInstance.post(API_ENDPOINTS.BANNERS_UPLOAD + '1', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (!uploadResponse.data.success) {
        setMessage('Failed to upload banner');
        return;
      }

      const url = uploadResponse.data.path.key;

      // Add the banner
      const response = await axiosInstance.post(API_ENDPOINTS.BANNERS, {
        title,
        url,
        description
      });

      if (response.data.success) {
        setMessage('Banner added successfully!');
        onBannerAdded();
      } else {
        setMessage('Failed to add banner');
      }
    } catch (error) {
      setMessage('Error adding banner: ' + error.message);
    }
  };

  return (
    <div className="add-banner">
      <h1>Add Banner</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Video File:
          <input
            type="file"
            name="file"
            accept="video/*"
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

export default AddBanner;
