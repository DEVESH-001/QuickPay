// backend/middleware.js
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId; // Attach the decoded userId to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { authMiddleware };
