import React, { useState } from 'react';
import axios from 'axios';
import './editbanner.css';
import { getToken } from '../../tokenutility';

const EditBanner = ({ bannerId, bannerTitle, bannerUrl, bannerDescription, onBack, onBannerUpdated }) => {
  const [title, setTitle] = useState(bannerTitle);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(bannerDescription);
  const [message, setMessage] = useState(null);
  const token = getToken();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedUrl = bannerUrl;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadResponse = await axios.post(`http://localhost:8800/api/banners/upload/${bannerId}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        if (!uploadResponse.data.success) {
          setMessage('Failed to upload banner');
          return;
        }

        updatedUrl = uploadResponse.data.path.key;
      }

      const response = await axios.put(`http://localhost:8800/api/banners/${bannerId}`, {
        title,
        url: updatedUrl,
        description
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setMessage('Banner updated successfully!');
        onBannerUpdated();
      } else {
        setMessage('Failed to update banner');
      }
    } catch (error) {
      setMessage('Error updating banner: ' + error.message);
    }
  };

  return (
    <div className="edit-banner">
      <h1>Edit Banner</h1>
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

export default EditBanner;
