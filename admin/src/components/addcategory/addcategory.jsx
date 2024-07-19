import React, { useState } from 'react';
import axios from 'axios';
import './addcategory.css';

const AddCategory = ({ onBack, onCategoryAdded }) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJHZW5lcmFsVXNlciIsImlhdCI6MTcyMTA3MTU4NiwiZXhwIjoxNzIzNjYzNTg2fQ.cjXbALdWVBGlWe_jYrUZqPyuihVe3IcdarRBT6h3jms';

    try {
      const formData = new FormData();
      console.log(file);
      formData.append('file', file);

      const uploadResponse = await axios.post(`http://localhost:8800/api/category/upload/1`, formData, {
        headers: {
          'Authorization': `Bearer ${process.env.TOKEN}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (!uploadResponse.data.success) {
        setMessage('Failed to upload image');
        return;
      }

      const imagePath = uploadResponse.data.path.key;

      const response = await axios.post('http://localhost:8800/api/category', { name, imagePath }, {
        headers: {
          'Authorization': `Bearer ${process.env.TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      setMessage(response.data.message);
      onCategoryAdded(); 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error creating category: ' + error.message);
      }
    }
  };

  return (
    <div className="add-category">
      <h1>Add Category</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Image:
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            required
          />
        </label>
        <div className="button-container">
          <button className="back-button" onClick={onBack}>Back</button>
          <button className="submit-button" type="submit">Submit</button>
        </div>
      </form>
      {message && <div className="popup">{message}</div>}
    </div>
  );
};

export default AddCategory;
