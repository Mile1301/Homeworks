import { AuthController } from "../controllers/auth.controller.js";
import { Router } from "express";
import { catchAsync } from "../utils/utils.js";
import { validateUser } from "../middlewares/middlewares.js";
export const usersRouter = Router();

usersRouter.post("/register", validateUser, catchAsync(AuthController.registerUser));
usersRouter.post("/login", catchAsync(AuthController.loginUser));
usersRouter.post("/refresh-token", catchAsync(AuthController.refreshAccessToken));
usersRouter.post("/logout", catchAsync(AuthController.logoutUser));
