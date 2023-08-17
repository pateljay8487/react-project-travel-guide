const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  review: { type: String, required: true },
});

const attractionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  description: { type: String, required: true },
  ratings: [reviewSchema],
});

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  province: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  attractions: [attractionSchema],
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
