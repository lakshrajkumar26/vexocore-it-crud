const { asyncHandler } = require("../utils/AsyncHandler");

//take a funtion and return a function 
const verifyRole = (...allowedRoles) => {
  return asyncHandler((req, res, next) => {
    const { role } = req.user;

    if (allowedRoles.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: "User not permitted" });
    }
  });
};

module.exports = {verifyRole };
