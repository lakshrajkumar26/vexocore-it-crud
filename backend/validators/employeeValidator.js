const {z} = require("zod");

const employeeCreateSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  position: z.string().optional(),
  role: z.enum(["admin", "employee"]).default("employee"),
  password: z.string().min(6, "Password must be at least 6 characters").trim(),
  dateOfJoining: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional(),
})

const updateEmployeeSchema = z.object({
   name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().min(10).optional(),
  position: z.string().optional(),
  role: z.enum(["admin", "employee"]).optional(),
  password: z.string().min(6).trim().optional(),
  dateOfJoining: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional(),
});

module.exports = {employeeCreateSchema,updateEmployeeSchema}