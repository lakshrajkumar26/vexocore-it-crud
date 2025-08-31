const ApiError = require("../utils/ApiError");
const { asyncHandler } = require("../utils/AsyncHandler");
const Employee = require("./../models/employee");

const logout = (req, res) => {
  res.json({ message: "Logout successful" });
};


const myProfile = asyncHandler( async(req,res,next)=>{
    const {userId,role} = req.user
    console.log(userId);
    const searchUser =  await Employee.findById(userId)
    if(!searchUser) {next(new ApiError("User not Found",404))}
    res.status(200).json({mesage:"user found",data : searchUser,success :true});
})

module.exports = {myProfile,logout};