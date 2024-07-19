import React, { useState } from 'react';
import axios from 'axios';
import './updateimagecategory.css'; // Create this CSS file for styling

const UpdateImageCategory = ({ categoryId, onBack, onImageUpdated }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJHZW5lcmFsVXNlciIsImlhdCI6MTcyMTA3MTU4NiwiZXhwIjoxNzIzNjYzNTg2fQ.cjXbALdWVBGlWe_jYrUZqPyuihVe3IcdarRBT6h3jms';
      const uploadResponse = await axios.post(`http://localhost:8800/api/category/upload/${categoryId}`, formData, {
        headers: {
          'Authorization': `Bearer ${process.env.TOKEN}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (uploadResponse.data.success) {
        const imagePath = uploadResponse.data.path.key;
        const putResponse = await axios.put(`http://localhost:8800/api/category/image/${categoryId}`, { imagePath }, {
          headers: {
            'Authorization': `Bearer ${process.env.TOKEN}`,
            'Content-Type': 'application/json'
          }
        });

        if (putResponse.data.message==='Category image updated successfully!') {
          setMessage('Image updated successfully!');
          onImageUpdated();
        } else {
          setMessage('Failed to update image');
        }
      } else {
        setMessage('Failed to upload image');
      }
    } catch (error) {
      setMessage('Error updating image: ' + error.message);
    }
  };

  return (
    <div className="update-image-category">
      <h2>Update Category Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Submit</button>
        <button type="button" onClick={onBack}>Back</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateImageCategory;
