const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "progress", "completed"],
      default: "pending",
    },
    dueDate: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    priority: {
      type: String,
      default : "Medium"
    },
  },
  { timestamps: true }
);

const Work = mongoose.model("Work", workSchema);
module.exports = Work;
