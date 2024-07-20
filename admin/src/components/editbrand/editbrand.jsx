import React, { useState } from 'react';
import axios from 'axios';

const EditBrand = ({ brandId, brandName, onBack, onBrandUpdated }) => {
  const [name, setName] = useState(brandName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateBrand = async () => {
    setLoading(true);
    try { // Ensure this token is valid and not expired
      const response = await axios.put(
        `http://localhost:8800/api/brands/${brandId}`,
        { name },
        {
          headers: {
            'Authorization': `Bearer ${process.env.TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.data.success) {
        onBrandUpdated();
        alert(response.data.message);
      } else {
        setError('Failed to update brand');
      }
    } catch (error) {
      setError('Error updating brand: ' + error.message);
    } finally {
      setLoading(false);
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
          <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update Brand'}</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default EditBrand;
