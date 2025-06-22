import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import PhotoGallery from './components/PhotoGallery';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUpload = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>📸 My Photo Album</h1>
      <UploadForm onUpload={handleUpload} />
      <PhotoGallery key={refreshKey} />
    </div>
  );
}

export default App;
