import React, { useState } from 'react';
import axios from 'axios';
import './addbanner.css';
import { getToken } from '../../tokenutility';

const AddBanner = ({ onBack, onBannerAdded }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(null);
  const token = getToken();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await axios.post('http://localhost:8800/api/banners/upload/1', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (!uploadResponse.data.success) {
        setMessage('Failed to upload banner');
        return;
      }

      const url = uploadResponse.data.path.key;
      console.log(url);

      const response = await axios.post('http://localhost:8800/api/banners/', {
        title,
        url,
        description
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
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
          <button className="back-button" onClick={onBack}>Back</button>
          <button className="submit-button" type="submit">Submit</button>
        </div>
      </form>
      {message && <div className="popup">{message}</div>}
    </div>
  );
};

export default AddBanner;
