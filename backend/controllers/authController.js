const { default: z } = require("zod");
const Employee = require("../models/employee");
const ApiError = require("../utils/ApiError");
const { asyncHandler } = require("../utils/AsyncHandler");
const {
  employeeCreateSchema,
  updateEmployeeSchema,
} = require("../validators/employeeValidator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET_KEY;

// const emailSchema =   z.string().email()
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const register = asyncHandler(async (req, res, next) => {
  const validatedData = employeeCreateSchema.parse(req.body);
  console.log("data getting after parsed", validatedData);

  const { name, email, phone, password, position, role } = validatedData;

  const user = await Employee.findOne({ email });

  if (user) {
    throw new ApiError("User already Existed", 409);
  }

  const hashPass = await bcrypt.hash(password, 10);

  const newEmployee = await Employee.create({
    name,
    email,
    phone,
    password: hashPass,
    position,
    role,
  });

  const { password: pass, ...dataWithoutPassword } = newEmployee.toObject();

  res.status(201).json({
    message: "User created succesfully",
    data: dataWithoutPassword,
    success: true,
  });
});

const login = asyncHandler(async (req, res, next) => {
  // const {password } = req.body;
  const validData = loginSchema.safeParse(req.body); //if parse needed try-cath || if safeParse not try-catch needed
  if (!validData.success) {
      console.log(validData.error.format());
    return next(new ApiError("invalid Email"));
  }
  console.log(validData.data);
  const { email, password } = validData.data;
  const user = await Employee.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError("No user found!", 404);
  }
  console.log(password, user.password);
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new ApiError("Invalid credentials", 401));
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const { password: pass, ...datawithoutPass } = user.toObject();

  res
    .cookie("token", token, {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    })
    .status(200)
    .json({
      message: "Login Successful",
      success: true,
      data: datawithoutPass,
      token,
    });
});

module.exports = { register, login };



