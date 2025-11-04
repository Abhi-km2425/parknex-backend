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

//path booking cancel
router.put('/cancel-booking/:id', jwtMiddleware, cancelBooking);

module.exports = router;