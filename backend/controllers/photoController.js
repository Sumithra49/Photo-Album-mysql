const Photo = require('../models/Photo');

exports.getPhotos = async (req, res) => {
  const photos = await Photo.findAll({ order: [['created_at', 'DESC']] });
  res.json(photos);
};

exports.uploadPhoto = async (req, res) => {
  const { title, description } = req.body;
  const image_url = `/uploads/${req.file.filename}`;
  const photo = await Photo.create({ title, description, image_url });
  res.json(photo);
};

exports.deletePhoto = async (req, res) => {
  const { id } = req.params;
  await Photo.destroy({ where: { id } });
  res.json({ message: 'Photo deleted' });
};
