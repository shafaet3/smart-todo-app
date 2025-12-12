"use client";

interface ToastProps {
  message: string;
  type?: "success" | "error";
}

export default function Toast({ message, type = "success" }: ToastProps) {
  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow text-white animate-fade-in
        ${type === "error" ? "bg-red-600" : "bg-green-600"}
      `}
    >
      {message}
    </div>
  );
}
