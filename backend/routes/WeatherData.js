const express = require('express');
const router = express.Router();
const WeatherData = require('../models/WeatherData');

// Route to save weather data
router.post('/', async (req, res) => {
  try {
    const { city, temperature, description } = req.body;

    const weatherData = new WeatherData({
      city,
      temperature,
      description
    });

    await weatherData.save();

    res.status(201).json({ message: 'Weather data saved successfully' });
  } catch (error) {
    console.error('Error saving weather data:', error);
    res.status(500).json({ message: 'Failed to save weather data' });
  }
});

module.exports = router;