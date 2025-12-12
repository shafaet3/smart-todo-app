import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Smart To-Do App</h1>
      <TaskForm />
      <TaskList />
    </main>
  );
}
