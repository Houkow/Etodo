const jwt = require("jsonwebtoken");
const secretKey = "MY_SUPER_SECRET_KEY";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided ❌" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token ❌" });

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
