// import dotenv module
require("dotenv").config() //to load environment

//1.import express
const express = require("express")

//2. import cors to connect with frontend
const cors = require("cors")

//3. import connection
require("./connection")

// import routes
const router = require("./router")

//4. create server
const parkNexServer = express()

//5. use cors to connect with frontend
parkNexServer.use(cors())

//6. parse the Json data - middleware
parkNexServer.use(express.json())

// tell server to use router
parkNexServer.use(router)


//7. default route
parkNexServer.get('/', (req, res) => {
  res.send('ParkNex Server Running!');
});

//8. Set port
const PORT = 4000 || process.env.PORT

//9. tell server to listen the port
parkNexServer.listen(PORT, ()=>{
console.log(`Server Running Successfully at port Number : ${PORT}`);
})