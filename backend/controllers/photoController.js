const fs = require('fs');
const path = require('path');
const Photo = require('../models/Photo');

// GET all photos
exports.getPhotos = async (req, res) => {
  try {
    const photos = await Photo.findAll({ order: [['created_at', 'DESC']] });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch photos', details: err.message });
  }
};

// POST a new photo
exports.uploadPhoto = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const image_url = `/uploads/${req.file.filename}`;

    const photo = await Photo.create({ title, description, image_url });
    res.status(201).json(photo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload photo', details: err.message });
  }
};

// DELETE a photo
exports.deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await Photo.findByPk(id);

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    // Delete image file from disk
    const filePath = path.join(__dirname, '..', photo.image_url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Photo.destroy({ where: { id } });
    res.json({ message: 'Photo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete photo', details: err.message });
  }
};

// PUT (update) a photo
exports.updatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const photo = await Photo.findByPk(id);

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    // If new file is uploaded, replace image_url
    let image_url = photo.image_url;
    if (req.file) {
      // Delete old image
      const oldPath = path.join(__dirname, '..', photo.image_url);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      image_url = `/uploads/${req.file.filename}`;
    }

    await photo.update({ title, description, image_url });

    res.json({ message: 'Photo updated successfully', photo });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update photo', details: err.message });
  }
};
