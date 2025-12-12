// lib/validators.ts
import { z } from "zod";

export const taskSchema = z.object({
  task: z.string().min(1, "Task cannot be empty").max(240),
});

export const aiItemSchema = z.object({
  task: z.string(),
  priority: z.enum(["High", "Medium", "Low"]),
  category: z.string(),
});

// AI might return { prioritizedTasks: [...] } or plain array depending on backend.
// The frontend expects an array of items; the backend returns array for /api/prioritize.
export const aiResponseSchema = z.array(aiItemSchema);
