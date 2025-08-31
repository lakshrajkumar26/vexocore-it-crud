const mongoose = require("mongoose");

const exployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "true",
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  designation: {
    type: String,
  },
  role: {
    type: String,
     enum: ["admin", "employee"], 
     default: "employee" 
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  dateOfJoining: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
} ,{ timestamps: true });

const Employee = mongoose.model("Employee",exployeeSchema)
module.exports = Employee;
