// hooks/useTasks.ts
import { useEffect } from "react";
import { useTaskStore } from "@/stores/taskStore";

export const useTasks = () => {
  const { tasks, loading, error, fetchTasks, addTask, updateTask, deleteTask } =
    useTaskStore();

  useEffect(() => {
    // load on mount
    fetchTasks().catch((e) => console.error(e));
  }, [fetchTasks]);

  return { tasks, loading, error, addTask, updateTask, deleteTask, refresh: fetchTasks };
};
