const mongoose = require("mongoose");
const Task = require("../models/Task");
const ApiError = require("../utils/ApiError");
const { asyncHandler } = require("../utils/AsyncHandler");

// Get all tasks
const getTasks = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;

  const tasks = await Task.find({ user: userId });
  if (!tasks || tasks.length === 0) {
    return next(new ApiError("No tasks available", 404));
  }

  res.status(200).json({
    message: "Data fetched successfully",
    data: tasks,
    success: true,
  });
});

// Create task
const createTask = asyncHandler(async (req, res, next) => {
  const { text, completed } = req.body;
  const { userId } = req.user;

  const task = await Task.create({ user: userId, text, completed });
  if (!task) return next(new ApiError("Task not created", 400));

  res.status(201).json({ message: "Task created", data: task, success: true });
});

// Update task
const updateTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid task ID format", 400));
  }

  const task = await Task.findOneAndUpdate(
    { _id: id, user: req.user.userId },
    req.body,
    { new: true }
  );

  if (!task) return next(new ApiError("Task not found", 404));

  res.status(200).json({ message: "Task updated", data: task });
});

// Mark complete
const completeTodo = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid task ID format", 400));
  }

  const todo = await Task.findOneAndUpdate(
    { _id: id, user: req.user.userId },
    { completed: true },
    { new: true }
  );

  if (!todo) return next(new ApiError("Todo not found", 404));

  res.status(200).json({ message: "Todo completed", data: todo });
});

// Mark Pending
const pendingTodo = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid task ID format", 400));
  }

  const todo = await Task.findOneAndUpdate(
    { _id: id, user: req.user.userId },
    { completed: false },
    { new: true }
  );

  if (!todo) return next(new ApiError("Todo not found", 404));

  res.status(200).json({ message: "Todo completed", data: todo });
});


// Delete task
const deleteTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid task ID format", 400));
  }

  const task = await Task.findOneAndDelete({ _id: id, user: req.user.userId });
  if (!task) return next(new ApiError("Task not found", 404));

  res.json({ message: "Task deleted successfully" });
});

module.exports = { getTasks, createTask, updateTask, deleteTask, completeTodo ,pendingTodo };
