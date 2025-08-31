const { success } = require("zod");
const Employee = require("../models/employee");
const ApiError = require("../utils/ApiError");
const { asyncHandler } = require("../utils/AsyncHandler");
const { employeeCreateSchema } = require("../validators/employeeValidator");
const bcrypt = require("bcrypt");
/**
 * @desc    Get all employees
 * @route   GET /api/employee
 * @access  Admin/HR
 */
const getAllEmployees = asyncHandler(async (req, res, next) => {
  const allEmployees = await Employee.find();
  if (!allEmployees) {
    return next(new ApiError("users not Found", 404));
  }
  res.status(200).json({
    message: "users fetched",
    data: allEmployees,
    success: true,
    count: allEmployees.length,
  });
});

/**
 * @desc    Get single employee by ID
 * @route   GET /api/employee/:id
 * @access  Admin/HR
 */
const getEmployeeById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await Employee.findById(id);
  if (!user) {
    return next(new ApiError("user not found", 404));
  }
  res.status(200).json({ message: "user found", status: true, data: user });
});

/**
 * @desc    Update employee
 * @route   PUT /api/employee/:id
 * @access  Admin/HR
 */

const updateEmployee = asyncHandler(async (req, res, next) => {
  const { name, email, role, department, designation } = req.body;
  const { id } = req.params;
  const newEmployee = {};
  if (name) {
    newEmployee.name = name;
  }
  if (email) {
    newEmployee.email = email;
  }
  if (role) {
    newEmployee.role = role;
  }
  if (department) {
    newEmployee.department = department;
  }
  if (designation) {
    newEmployee.designation = designation;
  }
  const employee = await Employee.findByIdAndUpdate(id, newEmployee, {
    new: true,
    runValidators: true,
  }); //By default, update operations do not run schema validators (like required, minlength, maxlength, enum, etc.).
  if (!employee) {
    return next(new ApiError("Employee not found", 404));
  }
  res
    .status(200)
    .json({ message: "user updated", success: true, data: employee });
});

/**
 * @desc    Delete employee
 * @route   DELETE /api/employee/:id
 * @access  Admin/HR
 */
const deleteEmployee = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const employee = await Employee.findByIdAndDelete(id);
  if (!employee) {
    return next(new ApiError("Employee not found", 404));
  }
  res.status(200).json({
    message: "Employee deleted successfully",
    success: true,
    data: employee,
  });
});

/**
 * @desc   Create employee
 * @route   POST /api/employee
 * @access  Admin/HR
 */
const createEmployee = async (req, res, next) => {
  const validatedData = employeeCreateSchema.parse(req.body);
  console.log(validatedData);
  const { name, email, phone, password, position, role } = validatedData;

    const user = await Employee.findOne({ email });
  if (user) {
    throw new ApiError("User already Existed", 409);
  }
  const hassPassword = await bcrypt.hash(password, 10);
  const newEmployee = await Employee.create({
    name,
    email,
    phone,
    password: hassPassword,
    position,
    role,
  });

  if (!newEmployee) {
    return next(new ApiError("employee not created"));
  }

const {password:_ ,...dataWithoutPassword} = newEmployee.toObject();
  res
    .status(201)
    .json({ message: "User Created", success: true, data: dataWithoutPassword });
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  createEmployee
};
