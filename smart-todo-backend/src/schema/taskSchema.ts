// src/schema/taskSchema.js
import { z } from "zod";

// Single task schema
export const taskSchema = z.object({
    task: z.string().describe("The task to be prioritized."),
    priority: z.enum(["High", "Medium", "Low"]).describe("Priority level of the task."),
    category: z.string().describe("Category of the task."),
});

// List schema
export const taskListSchema = z.array(taskSchema);
// JSON schema
export const jsonSchema = z.toJSONSchema(taskListSchema);

