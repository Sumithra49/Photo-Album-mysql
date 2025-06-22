const express = require('express');
const multer = require('multer');
const { uploadPhoto, getPhotos, deletePhoto } = require('../controllers/photoController');

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });


router.get('/', getPhotos);
router.post('/upload', upload.single('photo'), uploadPhoto);
router.delete('/:id', deletePhoto);

module.exports = router;
