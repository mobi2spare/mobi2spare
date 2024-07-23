import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './modelmanagement.css';
import AddModelForm from '../addmodel/addmodel';
import EditModelForm from '../editmodel/editmodel'; // New edit model form component
import { getToken } from '../../tokenutility';

const ModelManagement = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModelForm, setShowAddModelForm] = useState(false);
  const [showEditModelForm, setShowEditModelForm] = useState(false); // State to show edit form
  const [editModelData, setEditModelData] = useState(null); // Data for edit model
  const token = getToken();

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/models/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setModels(response.data.data);
      } else {
        setError('Failed to fetch models');
      }
    } catch (error) {
      setError('Error fetching models: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditModel = (id) => {
    const selectedModel = models.find(model => model.id === id);
    setEditModelData(selectedModel);
    setShowEditModelForm(true);
  };

  const handleDeleteModel = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this model?');
    if (confirmed) {
      try {
        const response = await axios.delete(`http://localhost:8800/api/models/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data.message === 'Model and associated RAM storage mappings deleted successfully!') {
          await fetchModels(); // Refresh models after deletion
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
    setShowAddModelForm(false); // Close the add model form
    fetchModels(); // Refresh models after addition
  };

  const handleEditFormCancel = () => {
    setShowEditModelForm(false);
    setEditModelData(null); // Clear edit model data
  };

  const handleModelUpdated = () => {
    setShowEditModelForm(false); // Close edit form
    setEditModelData(null); // Clear edit model data
    fetchModels(); // Refresh models after update
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="model-management">
      {!showAddModelForm && !showEditModelForm && (
        <div>
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
              {models.map((model) => (
                <tr key={model.id}>
                  <td>{model.id}</td>
                  <td>{model.model_name}</td>
                  <td>{model.brand_name}</td>
                  <td>
                    <ul>
                      {model.configurations.map((config, index) => (
                        <li key={index}>
                          {config.configuration && (
                            <span>
                              {config.configuration}
                            </span>
                          )}
                        </li>
                      ))}
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
          token={token}
        />
      )}
    </div>
  );
};

export default ModelManagement;
