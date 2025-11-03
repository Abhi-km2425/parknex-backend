const express = require('express');
const { registerUser, userLoginController } = require('./controllers/userController');
const jwtMiddleware = require('./middlewares/jwtMiddleware');

const router = express.Router();


//user register 
router.post('/register', registerUser);

//user login 
router.post('/login', userLoginController);

module.exports = router;