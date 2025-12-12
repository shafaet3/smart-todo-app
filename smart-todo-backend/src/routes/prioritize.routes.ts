import { Router } from "express";
import { prioritize } from "../controllers/prioritize.controller";

const router = Router();

router.post("/", prioritize);

export default router;
