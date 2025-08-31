const Employee = require("../models/employee");
const jwt = require("jsonwebtoken");
const {asyncHandler} = require("../utils/AsyncHandler");
const ApiError = require("../utils/ApiError");

const verifyJWT =  asyncHandler((req,res,next) => {
 
   const token = req.headers?.authorization?.split(" ")[1];
   if(!token) {return next(new ApiError("token not found",404))}
   const decode =jwt.verify(token,process.env.JWT_SECRET_KEY);
   if(!decode){next(new ApiError("invalid Token",404))};
   
   req.user = decode;
   next();
})

module.exports={verifyJWT};


