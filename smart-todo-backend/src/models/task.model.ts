export interface Task {
  id: number;
  task: string;
  priority?: "High" | "Medium" | "Low";
  category?: string;
}

export let mockTasks: Task[] = [
  // seed example
  // { id: 1, task: "Buy milk" },
  // { id: 2, task: "Finish report" }
];

export const updateMockTasks = (newTasks: Task[]) => {
  mockTasks = newTasks;
};
