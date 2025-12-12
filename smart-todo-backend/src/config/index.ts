import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().optional().default("4000"),
  NODE_ENV: z.enum(["development", "production", "test"]).optional().default("development"),
  GEMINI_API_KEY: z.string().min(1),
  RATE_LIMIT_WINDOW_MS: z.string().optional().default("60000"),
  RATE_LIMIT_MAX: z.string().optional().default("100")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.format());
  process.exit(1);
}

export const config = {
  port: Number(parsed.data.PORT),
  nodeEnv: parsed.data.NODE_ENV,
  geminiApiKey: parsed.data.GEMINI_API_KEY,
  rateLimitWindowMs: Number(parsed.data.RATE_LIMIT_WINDOW_MS),
  rateLimitMax: Number(parsed.data.RATE_LIMIT_MAX)
};
