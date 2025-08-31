const {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  createEmployee,
} = require("../controllers/employeeController");
const router = require("express").Router();
const { verifyJWT } = require("../middleware/auth.Middleware");
const { verifyRole } = require("../middleware/roleBased.Middleware");

router.use(verifyJWT);
router.use(verifyRole("admin","hr"));

router.get("/", getAllEmployees);
router.post("/", createEmployee);
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);


module.exports = router;
