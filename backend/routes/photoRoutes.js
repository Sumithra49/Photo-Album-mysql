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


router.get('/', getPhotos);


router.post('/upload', upload.single('photo'), uploadPhoto);


router.put('/:id', upload.single('photo'), updatePhoto);


router.delete('/:id', deletePhoto);

module.exports = router;
