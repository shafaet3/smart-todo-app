import { Request, Response, NextFunction } from "express";
import * as TasksService from "../services/tasks.service";

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await TasksService.getAllTasks();
    res.json({ success: true, tasks });
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { task } = req.body;
    if (!task) return res.status(400).json({ success: false, message: "Task is required" });
    const newTask = await TasksService.createTask(task);
    res.status(201).json({ success: true, task: newTask });
  } catch (err) {
    next(err);
  }
};

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const task = await TasksService.getTaskById(id);
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });
    res.json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

export const patchTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const updated = await TasksService.updateTaskById(id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: "Task not found" });
    res.json({ success: true, task: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const ok = await TasksService.deleteTaskById(id);
    if (!ok) return res.status(404).json({ success: false, message: "Task not found" });
    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};
