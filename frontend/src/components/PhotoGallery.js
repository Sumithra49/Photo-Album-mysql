import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get('https://photo-album-mysql.onrender.com/api/photos');
      setPhotos(res.data);
    } catch (err) {
      console.error('Error fetching photos', err);
    }
  };

  const deletePhoto = async (id) => {
    if (!window.confirm('Delete this photo?')) return;

    try {
      await axios.delete(`https://photo-album-mysql.onrender.com/api/photos/${id}`);
      fetchPhotos(); 
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div style={galleryStyle}>
      {photos.map(photo => (
        <div key={photo.id} style={cardStyle}>
          <img src={`https://photo-album-mysql.onrender.com${photo.image_url}`} alt={photo.title} style={imgStyle} />
          <h3>{photo.title}</h3>
          <p>{photo.description}</p>
          <button onClick={() => deletePhoto(photo.id)} style={delBtn}> Delete</button>
        </div>
      ))}
    </div>
  );
};

const galleryStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '1rem',
  padding: '1rem',
};

const cardStyle = {
  width: '250px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '1rem',
  backgroundColor: '#fff',
  textAlign: 'center',
};

const imgStyle = {
  width: '100%',
  height: '180px',
  objectFit: 'cover',
  borderRadius: '5px',
};

const delBtn = {
  marginTop: '10px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default PhotoGallery;
