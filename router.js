const express = require('express');
const { registerUser, userLoginController } = require('./controllers/userController');
const jwtMiddleware = require('./middlewares/jwtMiddleware');
const { createBooking, getUserBookings, cancelBooking } = require('./controllers/bookingController');

const router = express.Router();



//.........................................................//
//.......................USER.............................//
 
//user register 
router.post('/register', registerUser);

//user login 
router.post('/login', userLoginController);

//USER booking
router.post('/bookings', jwtMiddleware, createBooking);

//get bookings
router.get("/get-bookings", jwtMiddleware, getUserBookings);

//path booking
router.patch('/bookings/:id', jwtMiddleware, cancelBooking); // Simpler URL

module.exports = router;