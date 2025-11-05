const mongoose = require("mongoose");

const parkingSpotSchema = new mongoose.Schema({
  location: { type: String, required: true },
  address: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  availableSpots: { type: Number, required: true },
  peakHours: { type: String, required: true },
  rating: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ParkingSpot", parkingSpotSchema);
