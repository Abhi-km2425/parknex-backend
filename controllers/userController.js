const userModel = require('../models/userModel');
// const user=require("../models/userModel")
const jwt = require("jsonwebtoken");
// Register user
exports.registerUser = async (req, res) => {
  try {
    const { Username, email, password } = req.body;
    
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(406).json("User Already Exists");
    }
    
    const newUser = new userModel({ Username, email, password });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(401).json(error);
  }
};

//login user

exports.userLoginController = async (req, res) => {
    console.log("Inside Login Controller");
    const { email, password } = req.body;
    
    try {
        const existingUser = await userModel.findOne({ email });
        console.log("User found:", existingUser);
        
        if (!existingUser) {
            return res.status(406).json("User does not exist");
        }
        
        if (existingUser.password !== password) {
            return res.status(406).json("Incorrect credentials");
        }
        
        const token = jwt.sign({ userEmail: email }, process.env.secretKey);
        console.log("Token generated for:", email,"token:",token);
        res.status(200).json({ existingUser, token });
        
    } catch (error) {
        res.status(500).json(error);
    }
}