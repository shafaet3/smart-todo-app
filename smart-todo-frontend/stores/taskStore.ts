// stores/taskStore.ts
import { create } from "zustand";
import { Task } from "@/types/task";
import * as TasksService from "@/services/tasks.service";

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error?: string | null;

  fetchTasks: () => Promise<void>;
  addTask: (task: string) => Promise<void>;
  updateTask: (id: number, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await TasksService.getTasks();
      set({ tasks });
    } catch (err: any) {
      console.error("fetchTasks error", err);
      set({ error: err?.message ?? "Failed to fetch tasks" });
    } finally {
      set({ loading: false });
    }
  },

  addTask: async (taskText) => {
    set({ loading: true, error: null });
    try {
      const newTask = await TasksService.createTask(taskText);
      set({ tasks: [...get().tasks, newTask] });
    } catch (err: any) {
      console.error("addTask error", err);
      set({ error: err?.message ?? "Failed to add task" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  updateTask: async (id, body) => {
    set({ loading: true, error: null });
    try {
      const updated = await TasksService.patchTask(id, body);
      set({
        tasks: get().tasks.map((t) => (t.id === id ? updated : t)),
      });
    } catch (err: any) {
      console.error("updateTask error", err);
      set({ error: err?.message ?? "Failed to update task" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteTask: async (id) => {
    // optimistic removal
    const previous = get().tasks;
    set({ tasks: previous.filter((t) => t.id !== id), error: null });
    try {
      await TasksService.deleteTask(id);
    } catch (err: any) {
      // rollback on failure
      set({ tasks: previous, error: err?.message ?? "Failed to delete task" });
      throw err;
    }
  },
}));
