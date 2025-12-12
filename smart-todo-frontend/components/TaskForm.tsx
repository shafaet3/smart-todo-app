"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTaskStore } from "@/stores/taskStore";

const schema = z.object({
  task: z.string().min(1, "Task is required"),
});

type FormData = z.infer<typeof schema>;

export default function TaskForm() {
  const addTask = useTaskStore((state) => state.addTask);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { task: "" },
  });

  const taskValue = watch("task");

  const onSubmit = async (data: FormData) => {
    await addTask(data.task);
    reset({ task: "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 mb-5">
      <div className="flex flex-col flex-1">
        <input
          {...register("task")}
          value={taskValue}
          onChange={(e) => reset({ task: e.target.value })}
          placeholder="Enter task"
          className="border rounded px-3 py-2 w-full"
        />

        {errors.task && (
          <p className="text-red-500 text-sm mt-1">{errors.task.message}</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-3 w-35"
        >
          Add Task
        </button>
      </div>


    </form>
  );
}
