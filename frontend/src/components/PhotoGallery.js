import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    photo: null
  });

  const fetchPhotos = async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/photos');
      setPhotos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;

    try {
      await axios.delete(`http://localhost:9000/api/photos/${id}`);
      fetchPhotos();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const handleEditClick = (photo) => {
    setEditingId(photo.id);
    setEditForm({
      title: photo.title,
      description: photo.description,
      photo: null
    });
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setEditForm({
      ...editForm,
      [name]: files ? files[0] : value
    });
  };

  const handleEditSubmit = async (id) => {
    const formData = new FormData();
    formData.append('title', editForm.title);
    formData.append('description', editForm.description);
    if (editForm.photo) {
      formData.append('photo', editForm.photo);
    }

    try {
      await axios.put(`http://localhost:9000/api/photos/${id}`, formData);
      setEditingId(null);
      fetchPhotos();
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div style={styles.gallery}>
      {photos.map((photo) => (
        <div key={photo.id} style={styles.card}>
          {editingId === photo.id ? (
            <>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
              />
              <input
                type="file"
                name="photo"
                onChange={handleEditChange}
              />
              <button onClick={() => handleEditSubmit(photo.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <img
                src={`http://localhost:9000${photo.image_url}`}
                alt={photo.title}
                style={styles.image}
              />
              <h3>{photo.title}</h3>
              <p>{photo.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
  <button
    style={{
      flex: 1,
      backgroundColor: '#0d6efd',
      color: '#fff',
      border: 'none',
      padding: '6px',
      borderRadius: '4px',
      cursor: 'pointer'
    }}
    onClick={() => handleEditClick(photo)}
  >
    Edit
  </button>
  <button
    style={{
      flex: 1,
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      padding: '6px',
      borderRadius: '4px',
      cursor: 'pointer'
    }}
    onClick={() => handleDelete(photo.id)}
  >
    Delete
  </button>
</div>

            </>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  gallery: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center'
  },
  card: {
    width: '220px',
    height: '340px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fdfdfd'
  },
  image: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '5px',
    alignSelf: 'center',
    marginBottom: '10px'
  }
};

export default PhotoGallery;
