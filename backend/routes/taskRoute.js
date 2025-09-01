const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTodo,
  pendingTodo,
} = require("../controllers/taskController");
const { verifyJWT } = require("../middleware/auth.Middleware");
const router = express.Router();

// Protect all task routes
router.use(verifyJWT);

// Routes
router.get("/", getTasks);                   // Get all tasks
router.post("/", createTask);                // Create a task
router.patch("/:id/status", completeTodo);   // Update status (completed/pending)

router.patch("/:id/pending", pendingTodo); 
router.put("/:id", updateTask);              // Update a task
router.delete("/:id", deleteTask);           // Delete a task

module.exports = router;
