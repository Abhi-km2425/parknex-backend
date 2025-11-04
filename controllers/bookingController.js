const bookingModel = require('../models/bookingModel');
const userModel = require('../models/userModel');

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const userEmail = req.payload;
    const { parkingId, vehicleNumber, startTime, endTime, totalHours, totalPrice } = req.body;

    // Check user exists
    const user = await userModel.findOne({ email: userEmail });
    if (!user) return res.status(404).json("User not found");

    // Create booking (no parking validation yet)
    const newBooking = new bookingModel({
      userId: user._id,
      parkingId, // Store as string for now
      vehicleNumber,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      totalHours,
      totalPrice,
      status: 'confirmed'
    });

    await newBooking.save();
    res.status(201).json(newBooking);

  } catch (error) {
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



//cancel booking
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

    res.status(200).json("Booking cancelled");
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ error: error.message });
  }
};
