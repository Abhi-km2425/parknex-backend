const jwt = require("jsonwebtoken")

const jwtMiddleware = (req, res, next) => {
    console.log('Inside JWT Middleware');
    if (req.method === 'OPTIONS') {
    return next();
  }
      if (!req.headers["authorization"]) {
        return res.status(401).json("No token provided");
    }else{
 const token = req.headers["authorization"].split(" ")[1]
    try {
        const jwtResponse = jwt.verify(token, process.env.secretKey)
        console.log(jwtResponse);
        
        console.log("JWT Verified:", jwtResponse);
        req.payload = jwtResponse.userEmail
        next()
    } catch (error) {
        res.status(401).json("Authorization Failed")
    }
    }
   
}

module.exports = jwtMiddleware