// src/components/editbrand/EditBrand.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../tokenutility';
import './editbrand.css'; // Assuming you have CSS for styling
import { API_ENDPOINTS } from '../../constants'; // Import API endpoints

const EditBrand = ({ brandId, brandName, onBack, onBrandUpdated }) => {
  const [name, setName] = useState(brandName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = getToken(); // Retrieve the token from a utility function

  const handleUpdateBrand = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await axios.put(
        `${API_ENDPOINTS.BRANDS}${brandId}`, // Updated API endpoint
        { name },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.data.success) {
        onBrandUpdated(); // Notify parent component about the update
        alert(response.data.message); // Notify the user about success
      } else {
        setError('Failed to update brand'); // Show error if update fails
      }
    } catch (error) {
      setError('Error updating brand: ' + error.message); // Handle unexpected errors
    } finally {
      setLoading(false); // Always stop loading indicator
    }
  };

  return (
    <div className="edit-brand-container">
      <h2>Edit Brand</h2>
      <form onSubmit={e => { e.preventDefault(); handleUpdateBrand(); }}>
        <label htmlFor="name">Brand Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="button-group">
          <button type="button" onClick={onBack}>Back</button>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Brand'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>} {/* Display any error messages */}
      </form>
    </div>
  );
};

export default EditBrand;
