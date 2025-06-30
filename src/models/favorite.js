const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  movieId: { type: Number, required: true, unique: true },
  title: String,
  overview: String,
  backdrop_path: String,
  providers: Array,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
