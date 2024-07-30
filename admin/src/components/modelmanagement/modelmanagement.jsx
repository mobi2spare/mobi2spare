// src/components/modelmanagement/ModelManagement.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig'; // Import the configured Axios instance
import './modelmanagement.css'; // Import your CSS file
import AddModelForm from '../addmodel/addmodel'; // Import your AddModelForm component
import EditModelForm from '../editmodel/editmodel'; // Import your EditModelForm component
import { FaSearch } from 'react-icons/fa'; // Import search icon
import { API_ENDPOINTS } from '../../constants'; // Import API endpoints

const ModelManagement = () => {
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModelForm, setShowAddModelForm] = useState(false);
  const [showEditModelForm, setShowEditModelForm] = useState(false);
  const [editModelData, setEditModelData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchModels();
  }, []);

  useEffect(() => {
    filterModels();
  }, [searchTerm, models]);

  const fetchModels = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(API_ENDPOINTS.MODELS);
      if (response.data.success) {
        setModels(response.data.data);
        setFilteredModels(response.data.data);
      } else {
        setError('Failed to fetch models');
      }
    } catch (error) {
      setError('Error fetching models: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterModels = () => {
    if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = models.filter(model =>
        model.model_name.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredModels(filtered);
    } else {
      setFilteredModels(models);
    }
  };

  const handleEditModel = (id) => {
    const selectedModel = models.find(model => model.id === id);

    if (selectedModel) {
      const ram_storage_ids = selectedModel.configurations
        ? selectedModel.configurations.map(config => config.ram_storage_id)
        : [];

      setEditModelData({
        ...selectedModel,
        ram_storage_ids
      });
      setShowEditModelForm(true);
    }
  };

  const handleDeleteModel = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this model?');
    if (confirmed) {
      try {
        const response = await axiosInstance.delete(`${API_ENDPOINTS.MODELS}/${id}`);
        if (response.data.message === 'Model and associated RAM storage mappings deleted successfully!') {
          await fetchModels();
        } else {
          setError('Failed to delete model');
        }
      } catch (error) {
        setError('Error deleting model: ' + error.message);
      }
    }
  };

  const handleAddModelClick = () => {
    setShowAddModelForm(true);
  };

  const handleModelAdded = () => {
    setShowAddModelForm(false);
    fetchModels();
  };

  const handleEditFormCancel = () => {
    setShowEditModelForm(false);
    setEditModelData(null);
  };

  const handleModelUpdated = () => {
    setShowEditModelForm(false);
    setEditModelData(null);
    fetchModels();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="model-management">
      {!showAddModelForm && !showEditModelForm && (
        <div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by model name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <FaSearch className="search-icon" />
          </div>
          <div className="add-model-button-container">
            <button className="add-model-button" onClick={handleAddModelClick}>
              Add Model
            </button>
          </div>
          <h1>Model Management</h1>
          <table className="model-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Model Name</th>
                <th>Brand Name</th>
                <th>Configurations</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.map((model) => (
                <tr key={model.id}>
                  <td>{model.id}</td>
                  <td>{model.model_name}</td>
                  <td>{model.brand_name}</td>
                  <td>
                    <ul>
                      {model.configurations && model.configurations.length > 0 ? (
                        model.configurations.map((config, index) => (
                          <li key={index}>
                            {config.configuration ? (
                              <span>{config.configuration}</span>
                            ) : (
                              <span>No Configuration</span>
                            )}
                          </li>
                        ))
                      ) : (
                        <li>No Configurations</li>
                      )}
                    </ul>
                  </td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditModel(model.id)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => handleDeleteModel(model.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showAddModelForm && <AddModelForm onCancel={() => setShowAddModelForm(false)} onModelAdded={handleModelAdded} />}
      {showEditModelForm && (
        <EditModelForm
          onCancel={handleEditFormCancel}
          onModelUpdated={handleModelUpdated}
          model={editModelData}
        />
      )}
    </div>
  );
};

export default ModelManagement;
