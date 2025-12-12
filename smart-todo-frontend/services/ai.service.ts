// services/ai.service.ts
import apiClient from "@/lib/apiClient";
import { aiResponseSchema } from "@/lib/validators";
import { Task } from "@/types/task";

export const prioritize = async (tasks: string[]): Promise<Task[]> => {
  const res = await apiClient.post("/api/prioritize/", { tasks });

  // Backend returns { success: true, data: [...] } (see your backend code)
  const maybe = res.data.data ?? res.data; // defensive
  // Validate and return
  return aiResponseSchema.parse(maybe);
};
