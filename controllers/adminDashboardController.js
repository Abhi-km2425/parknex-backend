const bookingModel = require('../models/bookingModel');
const userModel = require('../models/userModel');


//get todays bookings from user
exports.getTodayBookings = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const bookings = await bookingModel.find({
      createdAt: { $gte: start, $lte: end },
      status: "confirmed"
    });

    res.status(200).json({
      total: bookings.length,
      bookings
    });
  } catch (error) {
    console.error("Error fetching today's bookings:", error);
    res.status(500).json({ error: "Failed to fetch today's bookings" });
  }
};




//get available users from usermodel


exports.getActiveUsers = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const bookings = await bookingModel.find({
      createdAt: { $gte: start, $lte: end },
      status: "confirmed"
    });

    const uniqueUserIds = new Set(bookings.map(b => b.userId.toString()));
    res.status(200).json({ total: uniqueUserIds.size });
  } catch (error) {
    console.error("Error fetching active users:", error);
    res.status(500).json({ error: "Failed to fetch active users" });
  }
};

//todays revenue
exports.getTodayRevenue = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const bookings = await bookingModel.find({
      createdAt: { $gte: start, $lte: end },
      status: "confirmed"
    });

    const total = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    res.status(200).json({ total });
  } catch (error) {
    console.error("Error calculating today's revenue:", error);
    res.status(500).json({ error: "Failed to calculate today's revenue" });
  }
};
