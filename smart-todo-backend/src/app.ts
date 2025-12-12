import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import "express-async-errors"; // to allow throwing from async route handlers
import tasksRouter from "./routes/tasks.routes";
import prioritizeRouter from "./routes/prioritize.routes";
import { config } from "./config";
import { errorHandler } from "./middlewares/error.middleware";
import { notFound } from "./middlewares/notFound.middleware";

const app = express();

// middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: config.rateLimitWindowMs,
    max: config.rateLimitMax
  })
);

// routes
app.use("/api/tasks", tasksRouter);
app.use("/api/prioritize", prioritizeRouter);

// 404 & error
app.use(notFound);
app.use(errorHandler);

export default app;
