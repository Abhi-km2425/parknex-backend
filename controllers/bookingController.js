const { default: mongoose } = require('mongoose');
const bookingModel = require('../models/bookingModel');
const parkingSpotModel = require('../models/parkingSpotModel');
const userModel = require('../models/userModel');

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const userEmail = req.payload;
    const { parkingId, location, vehicleNumber, startTime, endTime, totalHours, totalPrice } = req.body;

    // Check user exists
    const user = await userModel.findOne({ email: userEmail });
    if (!user) return res.status(404).json("User not found");

    // Check parking spot availability
    const spot = await parkingSpotModel.findById(parkingId);
    if (!spot || spot.availableSpots <= 0) {
      return res.status(400).json({ message: "No available spots at this location" });
    }

    // Create booking
    const newBooking = new bookingModel({
      userId: user._id,
      parkingId,
      location,
      vehicleNumber,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      totalHours,
      totalPrice,
      status: 'confirmed'
    });

    await newBooking.save();

    // Reduce available spots
    await parkingSpotModel.findByIdAndUpdate(parkingId, {
      $inc: { availableSpots: -1 }
    });

    console.log("Received booking data:", newBooking);
    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: error.message });
  }
};




// Get user's bookings
exports.getUserBookings = async (req, res) => {

  try {
    const userEmail = req.payload;
    const user = await userModel.findOne({ email: userEmail });
    const bookings = await bookingModel.find({ userId: user._id });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await bookingModel.findById(bookingId);
    if (!booking) return res.status(404).json("Booking not found");

    if (booking.status !== "confirmed") {
      return res.status(400).json("Only confirmed bookings can be cancelled");
    }

    booking.status = "cancelled";
    await booking.save();

    // Defensive check for parkingId validity
    if (!mongoose.Types.ObjectId.isValid(booking.parkingId)) {
      console.warn("Invalid parkingId:", booking.parkingId);
      return res.status(400).json("Invalid parking ID format");
    }

    // Restore slot availability
    const result = await parkingSpotModel.findOneAndUpdate(
{ _id: new mongoose.Types.ObjectId(booking.parkingId) },
      { $inc: { availableSpots: 1 } }
    );
console.log("Slot update result:", result);
    if (!result) {
      console.warn("Parking spot not found for ID:", booking.parkingId);
      return res.status(404).json("Parking spot not found");
    }

    res.status(200).json("Booking cancelled and slot restored");
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ error: error.message });
  }
};
