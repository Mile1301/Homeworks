import { Router } from "express";
import { studentsRouter } from "../routes/students.router.js";
import { authRouter } from "../routes/auth.routes.js";
export const globalRouter = Router();

globalRouter.use("/students", studentsRouter);
globalRouter.use("/", authRouter);
