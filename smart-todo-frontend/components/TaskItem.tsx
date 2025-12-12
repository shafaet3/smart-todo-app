"use client";

import { useTaskStore } from "@/stores/taskStore";
import { useState, memo } from "react";
import EditTaskDialog from "./EditTaskDialog";
import { Task } from "@/types/task";

interface Props {
  task: Task;
}

const TaskItem = memo(({ task }: Props) => {
  const { deleteTask, tasks } = useTaskStore();
  const currentTask = tasks.find((t) => t.id === task.id);

  const [open, setOpen] = useState(false);

  if (!currentTask) return null;

  return (
    <div className="flex justify-between items-center border p-3 rounded mb-2">
      <div>
        <p className="font-medium">{currentTask.task}</p>
       
      </div>

      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-yellow-500 text-white rounded"
          onClick={() => setOpen(true)}
        >
          Edit
        </button>

        <button
          className="px-3 py-1 bg-red-500 text-white rounded"
          onClick={() => deleteTask(currentTask.id)}
        >
          Delete
        </button>
      </div>

      {open && (
        <EditTaskDialog open={open} setOpen={setOpen} task={currentTask} />
      )}
    </div>
  );
});

export default TaskItem;
