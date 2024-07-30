import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig'; // Import the configured Axios instance
import { API_ENDPOINTS } from '../../constants'; // Import API endpoints
import './addmodel.css'; // Import your CSS file

const AddModelForm = ({ onCancel, onModelAdded }) => {
  const [model_name, setModelName] = useState('');
  const [brand_id, setBrandId] = useState('');
  const [selectedConfigurations, setSelectedConfigurations] = useState([]);
  const [brands, setBrands] = useState([]);
  const [configurations, setConfigurations] = useState([]);
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  useEffect(() => {
    fetchBrands();
    fetchConfigurations();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.BRANDS);
      if (response.data.success) {
        setBrands(response.data.data);
      } else {
        throw new Error('Failed to fetch brands');
      }
    } catch (error) {
      console.error('Error fetching brands:', error.message);
      setError('Failed to fetch brands');
    }
  };

  const fetchConfigurations = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.PHONE_CONFIG); // Use constant here
      if (response.data.success) {
        setConfigurations(response.data.data);
      } else {
        throw new Error('Failed to fetch configurations');
      }
    } catch (error) {
      console.error('Error fetching configurations:', error.message);
      setError('Failed to fetch configurations');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(API_ENDPOINTS.MODELS, { // Use constant here
        model_name,
        brand_id,
        ram_storage_ids: selectedConfigurations
      });
      if (response.data.message === 'Model created successfully!') {
        setShowSuccessPopup(true);
        onModelAdded(); // Trigger the parent component to refresh data
      } else {
        throw new Error('Failed to add model');
      }
    } catch (error) {
      console.error('Error adding model:', error.message);
      setError('Error adding model');
      setShowErrorPopup(true);
    }
  };

  const handleChangeConfiguration = (configId) => {
    setSelectedConfigurations(prevSelected =>
      prevSelected.includes(configId)
        ? prevSelected.filter(id => id !== configId)
        : [...prevSelected, configId]
    );
  };

  return (
    <div className="add-model-form">
      <h2>Add New Model</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Model Name:
          <input
            type="text"
            value={model_name}
            onChange={(e) => setModelName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Brand:
          <select
            value={brand_id}
            onChange={(e) => setBrandId(e.target.value)}
            required
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          RAM Storage:
          {configurations.map((config) => (
            <div key={config.id}>
              <label>
                <input
                  type="checkbox"
                  value={config.id}
                  checked={selectedConfigurations.includes(config.id)}
                  onChange={() => handleChangeConfiguration(config.id)}
                />
                {config.name}
              </label>
            </div>
          ))}
        </label>
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>Back</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {showSuccessPopup && (
        <Popup
          message="Model added successfully!"
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
      {showErrorPopup && (
        <Popup
          message="Failed to add model. Please try again."
          onClose={() => setShowErrorPopup(false)}
        />
      )}
    </div>
  );
};

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddModelForm;
