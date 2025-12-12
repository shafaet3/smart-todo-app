// lib/apiClient.ts
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const timeout = Number(process.env.NEXT_PUBLIC_API_TIMEOUT || 15000);

export const apiClient = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

// Standard response interceptor to unwrap data or propagate a normalized error
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalize the error shape
    const err = error?.response?.data ?? {
      message: error?.message ?? "Network error",
      status: error?.response?.status ?? 500,
    };
    return Promise.reject(err);
  }
);

export default apiClient;
