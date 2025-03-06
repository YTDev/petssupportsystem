const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; //Assumes format "Bearer Token"(??)

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
