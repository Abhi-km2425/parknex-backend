const jwt = require("jsonwebtoken");

const adminJwtMiddleware = (req, res, next) => {
  console.log("🔐 Inside Admin JWT Middleware");

  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const jwtResponse = jwt.verify(token, process.env.secretKey);
    console.log("✅ Verified JWT:", jwtResponse);

    const userEmail = jwtResponse.userEmail;
    if (userEmail !== "admin@gmail.com") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    req.adminEmail = userEmail;
    next();
  } catch (error) {
    console.error("❌ JWT verification failed:", error);
    res.status(401).json({ message: "Authorization failed", error });
  }
};

module.exports = adminJwtMiddleware;
