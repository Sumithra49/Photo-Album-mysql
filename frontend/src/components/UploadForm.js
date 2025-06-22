import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ onUpload }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      alert("Please choose a photo.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('photo', photo);

    try {
      await axios.post('https://photo-album-mysql.onrender.com/api/photos/upload', formData);
      alert('Photo uploaded!');
      onUpload(); 
      setTitle('');
      setDescription('');
      setPhoto(null);
    } catch (err) {
      alert(' Upload failed');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Upload a Photo</h2>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} required />
      <button type="submit">Upload</button>
    </form>
  );
};

const formStyle = {
  maxWidth: '400px',
  margin: '1rem auto',
  padding: '1rem',
  background: '#fff',
  border: '1px solid #ddd',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

export default UploadForm;
