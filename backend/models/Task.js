const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
//   description: {
//     type: String,
//   },
  completed: {
    type: Boolean,
    // enum: ["pending", "completed"],
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;