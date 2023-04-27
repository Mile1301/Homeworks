import { Router } from "express";
import { studentsRoute } from "../routes/students.route.js";
import { usersRoutes } from "../routes/auth.route.js";
import { sessionValidator } from "../middlewares/middlewares.js";

export const globalRouter = Router();
globalRouter.use("/", usersRoutes);
globalRouter.use("/students", sessionValidator, studentsRoute);
