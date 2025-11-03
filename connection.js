const mongoose = require("mongoose");

const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString).then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.log(`MongoDB connection Failed Due to : ${err}`);
});