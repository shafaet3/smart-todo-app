"use client";

import { useEffect, useState, useCallback } from "react";
import { useTaskStore } from "@/stores/taskStore";
import TaskItem from "./TaskItem";
import Toast from "./Toast";
import { prioritize } from "@/services/ai.service";

export default function TaskList() {
  const { tasks, fetchTasks, loading, error } = useTaskStore();

  const [aiResult, setAiResult] = useState<any[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToastMessage(message);
    setToastType(type);

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const Spinner = () => (
    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
  );

  // Fetch tasks on load
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  //Zustand store error show toast
  useEffect(() => {
    if (error) showToast(error, "error");
  }, [error]);

  const handlePrioritize = useCallback(async () => {
    try {
      if (tasks.length === 0) {
        showToast("No tasks to prioritize", "error");
        return;
      }

      setLoadingAI(true);

      const results = await prioritize(tasks.map((t) => t.task));
      setAiResult(results);

      showToast("Tasks prioritized successfully!", "success");
    } catch (err: any) {
      console.error("AI ERROR:", err);

      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "AI failed to prioritize tasks.";

      showToast(msg, "error");
    } finally {
      setLoadingAI(false);
    }
  }, [tasks]);

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="mt-4">
      {/* Toast */}
      {toastMessage && <Toast message={toastMessage} type={toastType} />}

      <button
        onClick={handlePrioritize}
        disabled={loadingAI}
        className={`bg-purple-600 text-white px-4 py-2 rounded mb-5 flex items-center ${loadingAI ? "opacity-70 cursor-not-allowed" : ""
          }`}
      >
        {loadingAI && <Spinner />}
        {loadingAI ? "Prioritizing..." : "Prioritize Tasks"}
      </button>

      {tasks.length === 0 && <p className="text-gray-500">No tasks yet</p>}

      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}

      {aiResult.length > 0 && (
        <div className="mt-6 border p-4 rounded bg-white shadow">
          <h2 className="text-xl font-semibold mb-3">AI Prioritized Tasks</h2>

          {aiResult.map((item, index) => (
            <div key={index} className="border-b py-2">
              <p><strong>{item.task}</strong></p>
              <p className="text-sm text-gray-600">
                Priority: {item.priority} | Category: {item.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
