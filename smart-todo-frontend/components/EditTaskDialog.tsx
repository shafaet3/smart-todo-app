"use client";

import { Task } from "@/types/task";
import { useTaskStore } from "@/stores/taskStore";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  task: Task;
}

export default function EditTaskDialog({ open, setOpen, task }: Props) {
  const updateTask = useTaskStore((state) => state.updateTask);

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: { task: task.task },
  });

  useEffect(() => {
    reset({ task: task.task });
  }, [task, reset]);

  const onSubmit = async (data: any) => {
    await updateTask(task.id, { task: data.task }); // ✅ FIXED
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow w-80">
        <h2 className="text-lg font-semibold mb-3">Edit Task</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("task")}
            value={watch("task")}
            className="border px-3 py-2 w-full mb-3 rounded"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
