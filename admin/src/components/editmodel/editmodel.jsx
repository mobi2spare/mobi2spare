import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig'; // Import the configured Axios instance
import { API_ENDPOINTS } from '../../constants'; // Import API endpoints
import './editmodel.css'; // Import your CSS file

const EditModelForm = ({ onCancel, onModelUpdated, model }) => {
  const [model_name, setModelName] = useState(model.model_name || '');
  const [brand_name, setBrandName] = useState(model.brand_name);
  const [brand_id, setBrandId] = useState(model.brand_id || '');
  const [selectedConfigurations, setSelectedConfigurations] = useState(model.ram_storage_ids || []);
  const [brands, setBrands] = useState([]);
  const [configurations, setConfigurations] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBrands();
    fetchConfigurations();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.BRANDS); // Use constant here
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
      const response = await axiosInstance.put(`${API_ENDPOINTS.MODELS}/${model.id}`, { // Use constants here
        model_name,
        brand_id,
        ram_storage_ids: selectedConfigurations
      });

      if (response.data.message === 'Model updated successfully!') {
        setSuccess('Model updated successfully!');
        onModelUpdated(); 
      } else {
        throw new Error('Failed to update model');
      }
    } catch (error) {
      console.error('Error updating model:', error.message);
      setError('Error updating model');
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
    <div className="edit-model-form">
      <h2>Edit Model</h2>
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
            <option value="">{brand_name}</option>
            {brands
              .filter(brand => brand.id !== brand_id) // Prevent showing the current brand as an option
              .map((brand) => (
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
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default EditModelForm;
