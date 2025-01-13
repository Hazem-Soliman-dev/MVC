const jwt = require("jsonwebtoken");
const secretKey =
  "cx#I6MgD('8-3{cuZ*-(o5/OwfAwpgrnxcD*}?YNf^W.$3Cj4:_4L_=@RBDn)+5";

exports.createAccessToken = (data) => {
  return jwt.sign(data, secretKey, { expiresIn: "1h" });
};

exports.authMW = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
      const verified = jwt.verify(token, secretKey);
      req.user = verified;
      next();
    } else {
      return res.status(401).json({ error: "Access denied, token missing" });
    }
  } catch (err) {
    // Handle different JWT errors
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token has expired, please log in again" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token, access denied" });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

exports.adminMW = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
      const verified = jwt.verify(token, secretKey);
      req.user = verified;
      console.log(req.user.userType);
      if (req.user.userType === "Admin") {
        next();
      } else {
        return res
          .status(401)
          .json({ error: "Access denied, admin privileges required" });
      }
    } else {
      return res.status(401).json({ error: "Access denied, token missing" });
    }
  } catch (err) {
    // Handle different JWT errors
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token has expired, please log in again" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token, access denied" });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
