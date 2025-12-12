// types/task.ts
export type Priority = "High" | "Medium" | "Low";

export interface Task {
  id?: number;
  task: string;
  priority?: Priority;
  category?: string;
}
