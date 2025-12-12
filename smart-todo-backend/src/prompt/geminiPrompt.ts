// src/prompt/geminiPrompts.js

export const getGeminiPrompt = (tasks: string[]): string =>{
    const prompt = `You are a task prioritization expert. Return ONLY valid JSON — no code blocks. Analyze these tasks and output: { "prioritizedTasks": [ { "task": string, "priority": "High" | "Medium" | "Low", "category": string } ] } Tasks: ${JSON.stringify(tasks)} ;`;
    return prompt;
}

