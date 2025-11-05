const express = require('express');
const { registerUser, userLoginController } = require('./controllers/userController');
const jwtMiddleware = require('./middlewares/jwtMiddleware');
const { createBooking, getUserBookings, cancelBooking } = require('./controllers/bookingController');
const { createParkingSpot, getAllParkingSpots, deleteParkingspot, updateParkingSpot } = require('./controllers/adminController');
const adminJwtMiddleware = require('./middlewares/adminJwtMiddleware');

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

// Cancel booking route
router.put('/cancel-booking/:id',cancelBooking);

//.............admin....................
router.post('/add-parking',adminJwtMiddleware,createParkingSpot)

//get 
router.get('/get-parking',getAllParkingSpots)

//delete
router.delete('/delete-slot/:id',deleteParkingspot)

//edit
router.put('/update-slot/:id', adminJwtMiddleware, updateParkingSpot);


//.............public rout ui............
router.get('/all-parking', getAllParkingSpots);

module.exports = router;