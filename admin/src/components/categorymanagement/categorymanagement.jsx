import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './categorymanagement.css';
import AddCategory from '../addcategory/addcategory.jsx';
import EditCategory from '../editcategory/editcategory.jsx';
import AddImageCategory from '../addimagecategory/addimagecategory.jsx';
import UpdateImageCategory from '../updateimagecategory/updateimagecategory.jsx';
import { getToken } from '../../tokenutility';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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
  const token = getToken();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchCategories();
  }, [showAddCategory, showEditCategory, showAddImageCategory, showUpdateImageCategory]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/category', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setCategories(response.data.data);
      } else {
        setError('Failed to fetch categories');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Unauthorized request. Please check your token.');
      } else {
        setError('Error fetching categories: ' + error.message);
      }
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

        const response = await axios.delete(`http://localhost:8800/api/category/${categoryId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

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
    setShowAddCategory(true);// Navigate to addcategory within the current categorymanagement
  };

  const handleAddImage = (categoryId) => {
    setImageCategoryId(categoryId);
    setShowAddImageCategory(true); // Navigate to addimage within the current categorymanagement
  };

  const handleDeleteImage = async (categoryId) => {
    const confirmed = window.confirm('Are you sure you want to delete this image?');

    if (confirmed) {
      try {

        const response = await axios.delete(`http://localhost:8800/api/category/image/${categoryId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

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
    setShowUpdateImageCategory(true);// Navigate to editimage within the current categorymanagement
  };

  const handleCategoryAdded = async (categoryId) => {
    await fetchCategories();
    setShowAddCategory(false);
    setNewCategoryId(categoryId);// Navigate back to the main categorymanagement view
  };

  const handleCategoryUpdated = async () => {
    await fetchCategories();
    setShowEditCategory(false);// Navigate back to the main categorymanagement view
  };

  const handleImageAdded = async () => {
    await fetchCategories();
    setShowAddImageCategory(false);// Navigate back to the main categorymanagement view
  };

  const handleImageUpdated = async () => {
    await fetchCategories();
    setShowUpdateImageCategory(false);// Navigate back to the main categorymanagement view
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
