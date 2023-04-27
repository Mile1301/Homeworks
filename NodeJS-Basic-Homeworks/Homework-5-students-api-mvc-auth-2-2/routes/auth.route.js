import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { roleValidator, sessionValidator } from "../middlewares/middlewares.js";
import { catchAsync } from "../utils/utils.js";
export const usersRoutes = Router();

usersRoutes.post("/register", catchAsync(AuthController.register));
usersRoutes.post("/login", catchAsync(AuthController.login));
usersRoutes.post("/logout", catchAsync(AuthController.logout));
usersRoutes.patch("/admin/:id", sessionValidator, roleValidator, catchAsync(AuthController.admin));
