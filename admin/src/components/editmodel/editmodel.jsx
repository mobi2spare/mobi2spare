import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './editmodel.css';
import { getToken } from '../../tokenutility';

const EditModelForm = ({ onCancel, onModelUpdated, model }) => {
  const [model_name, setModelName] = useState(model.model_name);
  const [brand_id, setBrandId] = useState(model.brand_id);
  const [selectedConfigurations, setSelectedConfigurations] = useState(model.ram_storage_ids || []);
  const [brands, setBrands] = useState([]);
  const [configurations, setConfigurations] = useState([]);
  const token = getToken();

  useEffect(() => {
    fetchBrands();
    fetchConfigurations();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/brands/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setBrands(response.data.data);
    } catch (error) {
      console.error('Error fetching brands:', error.message);
    }
  };

  const fetchConfigurations = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/phoneconfig/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setConfigurations(response.data.data);
    } catch (error) {
      console.error('Error fetching configurations:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8800/api/models/${model.id}`, {
        model_name,
        brand_id,
        ram_storage_ids: selectedConfigurations
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.message === 'Model updated successfully!') {
        onModelUpdated(); // Trigger the parent component to refresh data
      } else {
        console.error('Failed to update model');
      }
    } catch (error) {
      console.error('Error updating model:', error);
    }
  };

  const handleChangeConfiguration = (configId) => {
    // Toggle selection of configuration ID
    if (selectedConfigurations.includes(configId)) {
      setSelectedConfigurations(selectedConfigurations.filter(id => id !== configId));
    } else {
      setSelectedConfigurations([...selectedConfigurations, configId]);
    }
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
    </div>
  );
};

export default EditModelForm;
