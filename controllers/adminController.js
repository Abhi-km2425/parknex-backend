const ParkingSpot = require("../models/parkingSpotModel");
const { findByIdAndDelete } = require("../models/userModel");

// @desc    Create a new parking spot
// @route   POST /api/admin/parking-spots
// @access  Admin only
exports.createParkingSpot = async (req, res) => {
  try {
    const { location, address, pricePerHour, availableSpots, peakHours, rating } = req.body;

    // Basic validation
    if (!location || !address || !pricePerHour || !availableSpots || !peakHours) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newSpot = new ParkingSpot({
      location,
      address,
      pricePerHour,
      availableSpots,
      peakHours,
      rating: rating || 0
    });

    const savedSpot = await newSpot.save();
    res.status(201).json(savedSpot);
    console.log(savedSpot,"succefully added parking slot by admin");
    
  } catch (error) {
    console.error("Error creating parking spot:", error);
    res.status(500).json({ message: "Failed to create parking spot", error });
  }
};


//get controller
exports.getAllParkingSpots = async (req, res) => {
  try {
    const spots = await ParkingSpot.find();
    res.status(200).json(spots);
    console.log(spots,"admin added slots recived");
    
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch parking spots", error });
  }
};


//delete controller
exports.deleteParkingspot=async(req,res)=>{
  const {id}=req.params
  try {
   const  deletedparkingspot=await ParkingSpot.findByIdAndDelete(id)
    res.status(200).json("slot deleted",deletedparkingspot)
  } catch (error) {
    res.status(400).json("Delete error:",error)
  }
}