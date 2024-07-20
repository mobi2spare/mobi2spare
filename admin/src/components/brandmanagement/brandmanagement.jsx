import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './brandmanagement.css'; 
import AddBrand from '../addbrand/addbrand.jsx';
import EditBrand from '../editbrand/editbrand.jsx';

const BrandManagement = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [showEditBrand, setShowEditBrand] = useState(false);
  const [editBrandId, setEditBrandId] = useState(null);
  const [editBrandName, setEditBrandName] = useState('');

  useEffect(() => {
    fetchBrands();
  }, [showAddBrand, showEditBrand]); 

  const fetchBrands = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/brands/', {
        headers: {
          'Authorization': `Bearer ${process.env.TOKEN}`
        }
      });
      if (response.data.success) {
        setBrands(response.data.data);
      } else {
        setError('Failed to fetch brands');
      }
    } catch (error) {
      setError('Error fetching brands: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBrand = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this brand?');
    if (confirmed) {
      try {// Ensure this token is valid and not expired
        const response = await axios.delete(`http://localhost:8800/api/brands/${id}`, {
          headers: {
            'Authorization': `Bearer ${process.env.TOKEN}`
          }
        });
        if (response.data.success) {
          await fetchBrands();
          alert('Brand deleted successfully!');
        } else {
          setError('Failed to delete brand');
        }
      } catch (error) {
        setError('Error deleting brand: ' + error.message);
      }
    }
  };

  const handleAddBrand = () => {
    setShowAddBrand(true);
  };

  const handleEditBrand = (id, name) => {
    setEditBrandId(id);
    setEditBrandName(name);
    setShowEditBrand(true);
  };

  const handleBrandAdded = async () => {
    await fetchBrands();
    setShowAddBrand(false);
  };

  const handleBrandUpdated = async () => {
    await fetchBrands();
    setShowEditBrand(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (showAddBrand) {
    return <AddBrand
      onBack={() => setShowAddBrand(false)}
      onBrandAdded={handleBrandAdded}
    />;
  }

  if (showEditBrand) {
    return <EditBrand
      brandId={editBrandId}
      brandName={editBrandName}
      onBack={() => setShowEditBrand(false)}
      onBrandUpdated={handleBrandUpdated}
    />;
  }

  return (
    <div className="brand-management">
      <h1>Brand Management</h1>
      <button className="add-brand-btn" onClick={handleAddBrand}>Add Brand</button>
      <table className="brand-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Models</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {brands.map(brand => (
            <tr key={brand.id}>
              <td>{brand.id}</td>
              <td>{brand.name}</td>
              <td>
                <ul>
                  {brand.models.map(model => (
                    <li key={model && model.id}>{ model && model.model_name}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button className="edit-button" onClick={() => handleEditBrand(brand.id, brand.name)}>Edit</button>
              </td>
              <td>
                <button className="delete-button" onClick={() => handleDeleteBrand(brand.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrandManagement;
