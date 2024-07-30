// src/components/categorymanagement/CategoryManagement.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig'; // Import the configured Axios instance
import './categorymanagement.css';
import AddCategory from '../addcategory/addcategory.jsx';
import EditCategory from '../editcategory/editcategory.jsx';
import AddImageCategory from '../addimagecategory/addimagecategory.jsx';
import UpdateImageCategory from '../updateimagecategory/updateimagecategory.jsx';
import { API_ENDPOINTS } from '../../constants'; // Import API endpoints
import { useNavigate } from 'react-router-dom';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [showAddImageCategory, setShowAddImageCategory] = useState(false);
  const [showUpdateImageCategory, setShowUpdateImageCategory] = useState(false);
  const [imageCategoryId, setImageCategoryId] = useState(null);
  const [newCategoryId, setNewCategoryId] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchCategories();
  }, [showAddCategory, showEditCategory, showAddImageCategory, showUpdateImageCategory]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.CATEGORY); // Use the endpoint from constants

      if (response.data.success) {
        setCategories(response.data.data);
      } else {
        setError('Failed to fetch categories');
      }
    } catch (error) {
      setError('Error fetching categories: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = (categoryId, categoryName) => {
    setEditCategoryId(categoryId);
    setEditCategoryName(categoryName);
    setShowEditCategory(true);
  };

  const handleDeleteCategory = async (categoryId) => {
    const confirmed = window.confirm('Are you sure you want to delete this category?');

    if (confirmed) {
      try {
        const response = await axiosInstance.delete(`${API_ENDPOINTS.CATEGORY}${categoryId}`); // Use the endpoint from constants

        if (response.data.success) {
          await fetchCategories();
        } else {
          setError('Failed to delete category');
        }
      } catch (error) {
        setError('Error deleting category: ' + error.message);
      }
    }
  };

  const handleAddCategory = () => {
    setShowAddCategory(true);
  };

  const handleAddImage = (categoryId) => {
    setImageCategoryId(categoryId);
    setShowAddImageCategory(true);
  };

  const handleDeleteImage = async (categoryId) => {
    const confirmed = window.confirm('Are you sure you want to delete this image?');

    if (confirmed) {
      try {
        const response = await axiosInstance.delete(`${API_ENDPOINTS.CATEGORY_IMAGE}${categoryId}`); // Use the endpoint from constants

        if (response.data.message === 'Image deleted successfully!') {
          await fetchCategories();
        } else {
          setError('Failed to delete image');
        }
      } catch (error) {
        setError('Error deleting image: ' + error.message);
      }
    }
  };

  const handleUpdateImage = (categoryId) => {
    setImageCategoryId(categoryId);
    setShowUpdateImageCategory(true);
  };

  const handleCategoryAdded = async (categoryId) => {
    await fetchCategories();
    setShowAddCategory(false);
    setNewCategoryId(categoryId);
  };

  const handleCategoryUpdated = async () => {
    await fetchCategories();
    setShowEditCategory(false);
  };

  const handleImageAdded = async () => {
    await fetchCategories();
    setShowAddImageCategory(false);
  };

  const handleImageUpdated = async () => {
    await fetchCategories();
    setShowUpdateImageCategory(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (showAddCategory) {
    return <AddCategory
      onBack={() => setShowAddCategory(false)}
      onCategoryAdded={handleCategoryAdded}
      categoryId={newCategoryId}
    />;
  }

  if (showEditCategory) {
    return <EditCategory
      categoryId={editCategoryId}
      categoryName={editCategoryName}
      onBack={() => setShowEditCategory(false)}
      onCategoryUpdated={handleCategoryUpdated}
    />;
  }

  if (showAddImageCategory) {
    return <AddImageCategory
      categoryId={imageCategoryId}
      onBack={() => setShowAddImageCategory(false)}
      onImageAdded={handleImageAdded}
    />;
  }

  if (showUpdateImageCategory) {
    return <UpdateImageCategory
      categoryId={imageCategoryId}
      onBack={() => setShowUpdateImageCategory(false)}
      onImageUpdated={handleImageUpdated}
    />;
  }

  return (
    <div className="category-management">
      <div className="header">
        <h1>Category Management</h1>
        <button className="add-category-btn" onClick={handleAddCategory}>Add Category</button>
      </div>
      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Image Actions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                {category.image_path && category.image_path[0] && (
                  (() => {
                    const imagePath = `http://localhost:8800/${category.image_path[0].replace(/\\/g, '/')}`;
                    return <img src={imagePath} alt={category.name} className="category-image" />;
                  })()
                )}
              </td>
              <td className="image-actions">
                <div>
                  <button className="delete-image-button" onClick={() => handleDeleteImage(category.id)}>Delete Image</button>
                  <button className="update-image-button" onClick={() => handleUpdateImage(category.id)}>Update Image</button>
                </div>
              </td>
              <td className="category-actions">
                <button className="edit-button" onClick={() => handleEditCategory(category.id, category.name)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteCategory(category.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManagement;
