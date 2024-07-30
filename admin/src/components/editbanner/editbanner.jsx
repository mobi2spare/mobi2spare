import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig'; // Import the configured Axios instance
import { API_ENDPOINTS } from '../../constants'; // Import API endpoints
import './editbanner.css';

const EditBanner = ({ bannerId, bannerTitle, bannerUrl, bannerDescription, onBack, onBannerUpdated }) => {
  // State initialization
  const [title, setTitle] = useState(bannerTitle);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(bannerDescription);
  const [currentUrl, setCurrentUrl] = useState(bannerUrl);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Update state when props change
    setTitle(bannerTitle);
    setDescription(bannerDescription);
    setCurrentUrl(bannerUrl);
  }, [bannerTitle, bannerUrl, bannerDescription]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let updatedUrl = currentUrl;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        // Upload the file
        const uploadResponse = await axiosInstance.post(`${API_ENDPOINTS.BANNERS_UPLOAD}${bannerId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (!uploadResponse.data.success) {
          setMessage('Failed to upload banner');
          return;
        }

        updatedUrl = uploadResponse.data.path.key;
      }

      // Update the banner
      const response = await axiosInstance.put(`${API_ENDPOINTS.BANNERS}${bannerId}`, {
        title,
        url: updatedUrl,
        description
      }, {
        headers: {
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
          Current Video:
          {currentUrl && (
            <video width="320" height="240" controls>
              <source src={`http://localhost:8800/${currentUrl.replace(/\\/g, '/')}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </label>
        <label>
          New Video File (optional):
          <input
            type="file"
            name="file"
            accept="video/*"
            onChange={handleFileChange}
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

export default EditBanner;
