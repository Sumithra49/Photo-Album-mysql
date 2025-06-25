const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  uploadPhoto,
  getPhotos,
  deletePhoto,
  updatePhoto
} = require('../controllers/photoController');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads')); // Safer path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// GET all photos
router.get('/', getPhotos);

// POST upload a new photo
router.post('/upload', upload.single('photo'), uploadPhoto);

// PUT update a photo (title/desc and optionally image)
router.put('/:id', upload.single('photo'), updatePhoto);

// DELETE a photo
router.delete('/:id', deletePhoto);

module.exports = router;
