const router = require("express").Router();
const { verifyJWT } = require("../middleware/auth.Middleware");
const { verifyRole } = require("../middleware/roleBased.Middleware");
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");
router.use(verifyJWT);
router.use(verifyRole("admin","hr"));


const authMiddleware = require("../middleware/auth.Middleware");


// Protect all task routes
router.use(authMiddleware);

router.get("/", getTasks);          // Get all tasks for logged-in user
router.post("/", createTask);       // Create a new task
router.put("/:id", updateTask);     // Update a task
router.delete("/:id", deleteTask);  // Delete a task

module.exports = router;