const Location = require('../models/location');

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving locations' });
  }
};

module.exports = {
  getLocations
};
