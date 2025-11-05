const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  parkingId: {
    type: String,
    ref: 'parking', 
    required: true
  },
  location: {
  type: String,
  required: true
}
,
  vehicleNumber: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  totalHours: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'completed', 'cancelled'],
    default: 'completed'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('booking', bookingSchema);