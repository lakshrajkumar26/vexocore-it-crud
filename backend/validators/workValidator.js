const { z } = require("zod");

const createWorkSchema = z.object({
  assignedTo: z.string().min(1, "AssignedTo is required"),
  assignedBy: z.string().optional(), // will come from token in most cases
  title: z.string().min(3, "Title must have at least 3 characters"),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
});

const updateWorkStatusSchema = z.object({
  status: z.enum(["pending", "progress", "completed"]),
});

module.exports = { createWorkSchema, updateWorkStatusSchema };
