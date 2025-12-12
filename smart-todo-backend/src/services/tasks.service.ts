import { Task, mockTasks, updateMockTasks } from "../models/task.model";

export const getAllTasks = async (): Promise<Task[]> => {
  return mockTasks;
};

export const createTask = async (taskText: string): Promise<Task> => {
  const newTask: Task = { id: Date.now(), task: taskText };
  updateMockTasks([...mockTasks, newTask]);
  return newTask;
};

export const getTaskById = async (id: number): Promise<Task | undefined> => {
  return mockTasks.find(t => t.id === id);
};

export const updateTaskById = async (id: number, body: Partial<Task>): Promise<Task | null> => {
  const idx = mockTasks.findIndex(t => t.id === id);
  if (idx === -1) return null;
  const updated = { ...mockTasks[idx], ...body };
  const arr = [...mockTasks];
  arr[idx] = updated;
  updateMockTasks(arr);
  return updated;
};

export const deleteTaskById = async (id: number): Promise<boolean> => {
  const exists = mockTasks.some(t => t.id === id);
  if (!exists) return false;
  updateMockTasks(mockTasks.filter(t => t.id !== id));
  return true;
};
