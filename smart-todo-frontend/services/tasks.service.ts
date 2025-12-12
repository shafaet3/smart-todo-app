// services/tasks.service.ts
import apiClient from "@/lib/apiClient";
import { Task } from "@/types/task";

const base = "/api/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const res = await apiClient.get(`${base}/`);
  // backend returns { success: true, tasks: Task[] }
  return res.data.tasks as Task[];
};

export const createTask = async (task: string): Promise<Task> => {
  const res = await apiClient.post(`${base}/`, { task });
  return res.data.task as Task;
};

export const getTask = async (id: number): Promise<Task> => {
  const res = await apiClient.get(`${base}/${id}`);
  return res.data.task as Task;
};

export const patchTask = async (id: number, body: Partial<Task>): Promise<Task> => {
  const res = await apiClient.patch(`${base}/${id}`, body);
  return res.data.task as Task;
};

export const deleteTask = async (id: number): Promise<void> => {
  await apiClient.delete(`${base}/${id}`);
};
