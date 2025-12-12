import { Request, Response, NextFunction } from "express";
import { prioritizeTasks } from "../services/ai.service";
import { z } from "zod";

const bodySchema = z.object({
  tasks: z.array(z.string()).nonempty()
});

export const prioritize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = bodySchema.parse(req.body);
    const result = await prioritizeTasks(parsed.tasks);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
