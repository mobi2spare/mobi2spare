import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './bannermanagement.css'; // Import your CSS file
import AddBanner from '../addbanner/addbanner.jsx'; // Import your AddBanner component
import EditBanner from '../editbanner/editbanner.jsx'; // Import your EditBanner component
import { getToken } from '../../tokenutility'; // Import getToken utility function
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddBanner, setShowAddBanner] = useState(false);
  const [showEditBanner, setShowEditBanner] = useState(false);
  const [editBannerId, setEditBannerId] = useState(null);
  const [editBannerTitle, setEditBannerTitle] = useState('');
  const [editBannerDescription, setEditBannerDescription] = useState('');
  const [editBannerUrl, setEditBannerUrl] = useState('');
  const token = getToken();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchBanners();
  }, [showAddBanner, showEditBanner]); // Depend on showAddBanner and showEditBanner for re-fetching

  const fetchBanners = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:8800/api/banners', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setBanners(response.data.data);
      } else {
        setError('Failed to fetch banners');
      }
    } catch (err) {
      setError('Error fetching banners: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBanner = (banner) => {
    setEditBannerId(banner.id);
    setEditBannerTitle(banner.title);
    setEditBannerDescription(banner.description);
    setEditBannerUrl(banner.url);
    setShowEditBanner(true);
  };

  const handleDeleteBanner = async (bannerId) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        const response = await axios.delete(`http://localhost:8800/api/banners/${bannerId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          fetchBanners();
        } else {
          setError('Failed to delete banner');
        }
      } catch (err) {
        setError('Error deleting banner: ' + err.message);
      }
    }
  };

  const handleAddBanner = () => {
    setShowAddBanner(true);
  };

  const handleBannerAdded = () => {
    fetchBanners();
    setShowAddBanner(false);
  };

  const handleBannerUpdated = () => {
    fetchBanners();
    setShowEditBanner(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (showAddBanner) {
    return <AddBanner
      onBack={() => setShowAddBanner(false)}
      onBannerAdded={handleBannerAdded}
    />;
  }

  if (showEditBanner) {
    return <EditBanner
      bannerId={editBannerId}
      title={editBannerTitle}
      description={editBannerDescription}
      url={editBannerUrl}
      onBack={() => setShowEditBanner(false)}
      onBannerUpdated={handleBannerUpdated}
    />;
  }

  return (
    <div className="banner-management">
      <div className="header">
        <h1>Banner Management</h1>
        <button className="add-banner-btn" onClick={handleAddBanner}>Add Banner</button>
      </div>
      <table className="banner-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Video</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map(banner => (
            <tr key={banner.id}>
              <td>{banner.id}</td>
              <td>{banner.title}</td>
              <td>{banner.description}</td>
              <td>
                <video width="320" height="240" controls>
                  <source src={`http://localhost:8800/${banner.url.replace(/\\/g, '/')}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </td>
              <td>
                <button className="edit-button" onClick={() => handleEditBanner(banner)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteBanner(banner.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BannerManagement;
