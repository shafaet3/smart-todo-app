import { Router } from "express";
import * as TasksController from "../controllers/tasks.controller";

const router = Router();

router.get("/", TasksController.getTasks);
router.post("/", TasksController.createTask);
router.get("/:id", TasksController.getTask);
router.patch("/:id", TasksController.patchTask);
router.delete("/:id", TasksController.deleteTask);

export default router;
