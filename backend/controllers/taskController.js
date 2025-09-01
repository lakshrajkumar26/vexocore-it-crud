const Task = require("../models/Task");
const ApiError = require("../utils/ApiError");
const { asyncHandler } = require("../utils/AsyncHandler");

// Get all tasks of the logged-in user
// const getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({ user: req.user._id });
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const getTasks = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;

  const tasks = await Task.find({ user: userId });
  if (!tasks) {
    next(new ApiError("no Tasks available", 404));
  }
  res
    .status(200)
    .json({ message: "Data fetched successfully", data: tasks, success: true });
});

// Create a new task
const createTask = asyncHandler(
    async(req, res,next) => {
  const { text,completed } = req.body;
  const { userId } = req.user;
 
    const task = await Task.create({ user: userId, text ,completed});

    res.status(201).json(task);
  

})

// Update task by ID
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




const completeTodo = asyncHandler(async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const todo = await Task.findByIdAndUpdate(
      todoId,
      { completed: true },
      { new: true }
    );

    if (!todo) return next(new ApiError("todo not found", 404));

    res.status(200).json({ message: "todo Completed", data: todo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete task by ID
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { getTasks, createTask, updateTask, deleteTask, completeTodo };
