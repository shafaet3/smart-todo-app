//UPDATED CODE 12 DEC 2025 FROM GEMINI API DOCS
import { GoogleGenAI } from "@google/genai";
import { config } from "../config";
import { getGeminiPrompt } from "../prompt/geminiPrompt";
import { jsonSchema, taskListSchema } from "../schema/taskSchema";

const GEMINI_API_KEY = config.geminiApiKey;

export const prioritizeTasks = async (tasks: string[]) => {
  try {
    // Handle empty input early
    if (!tasks || tasks.length === 0) {
      const error = new Error("Task list cannot be empty.");
      (error as any).status = 400;
      throw error;
    }

    // Build prompt
    const prompt = getGeminiPrompt(tasks);

    // Initialize Gemini client
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    // Call the Gemini model
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: jsonSchema,
      },
    });

    if (!response?.text) {
      const error = new Error("Invalid response from AI model.");
      (error as any).status = 502;
      throw error;
    }

    // Parse the JSON returned by Gemini safely
    let parsed;
    try {
      parsed = JSON.parse(response.text);
    } catch (e) {
      const error = new Error("AI returned invalid JSON format.");
      (error as any).status = 500;
      throw error;
    }

    // Validate with Zod schema
    const validated = taskListSchema.safeParse(parsed);
    if (!validated.success) {
      const error = new Error("AI response schema validation failed.");
      (error as any).status = 500;
      (error as any).details = validated.error;
      throw error;
    }

    return validated.data;

  } catch (err: any) {
    console.error("AI_TASK_ERROR:", err);
    err.status = err.status || 500;
    throw err; // send error to error middleware
  }
};
