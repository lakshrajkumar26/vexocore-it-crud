const express = require("express");
const { getTasks, createTask, updateTask, deleteTask ,completeTodo } = require("../controllers/taskController");
const {verifyJWT} = require("../middleware/auth.Middleware");
const router = express.Router();

// Protect all task routes
router.use(verifyJWT);

router.get("/", getTasks);          // Get all tasks for logged-in user
router.post("/", createTask);       // Create a new task
router.put("/:id", updateTask);     // Update a task
router.delete("/:id", deleteTask);  // Delete a task
router.put("/updatestatus/:todoId", updateTask);   

module.exports = router;
