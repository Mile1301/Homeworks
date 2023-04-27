import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { catchAsync } from "../utils/utils.js";
export const authRouter = Router();

authRouter.post("/register", catchAsync(AuthController.registerUser));
authRouter.post("/login", catchAsync(AuthController.loginUser));
