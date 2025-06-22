const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectionToDb, sequelize } = require('./config/db');
const photoRoutes = require('./routes/photoRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectionToDb(); // ✅ Call DB connection check

sequelize.sync({ alter: true }) // ✅ Auto-create tables
  .then(() => {
    console.log("✅ Tables synced with Clever Cloud DB");
  })
  .catch((err) => {
    console.error("❌ Sync failed:", err);
  });

app.use('/api/photos', photoRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
