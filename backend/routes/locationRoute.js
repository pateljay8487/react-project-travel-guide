const express = require("express");
const Location = require("../models/location");
const locationRouter = express.Router();

// Get all locations
locationRouter.get("/", async (req, res) => {
  try {
    const locations = await Location.find({});
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving locations" });
  }
});

// Get a specific location by ID
locationRouter.get("/:id", async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving location" });
  }
});

// Create a new location
locationRouter.post("/", async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating location" });
  }
});

// Update a location by ID
locationRouter.put("/:id", async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating location" });
  }
});

// Delete a location by ID
locationRouter.delete("/:id", async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json({ message: "Location deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting location" });
  }
});

// Add a new review to an attraction
locationRouter.post("/:locationId/attractions/:attractionId/reviews", async (req, res) => {
  const { rating, review } = req.body;
  try {
    const location = await Location.findById(req.params.locationId);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    const attraction = location.attractions.id(req.params.attractionId);
    if (!attraction) {
      return res.status(404).json({ message: "Attraction not found" });
    }

    attraction.ratings.push({ rating, review });
    await location.save();

    res.json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding review" });
  }
});

module.exports = locationRouter;
