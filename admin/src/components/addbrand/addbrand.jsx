import React, { useState } from 'react';
import axios from 'axios';
import './addbrand.css';
import { getToken } from '../../tokenutility';

const AddBrand = ({ onBack, onBrandAdded }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token=getToken();

  const handleAddBrand = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8800/api/brands/',
        { name },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.data.message==='Brand created successfully!') {
        onBrandAdded();
        alert(response.data.message);
      } else {
        setError('Failed to add brand');
      }
    } catch (error) {
      setError('Error adding brand: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-brand-container">
      <h2>Add Brand</h2>
      <form onSubmit={e => { e.preventDefault(); handleAddBrand(); }}>
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
          <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Brand'}</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AddBrand;
