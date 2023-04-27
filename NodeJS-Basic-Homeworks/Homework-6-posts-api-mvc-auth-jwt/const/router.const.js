import { Router } from "express";
import { postsRouter } from "../routes/posts.routes.js";
import { usersRouter } from "../routes/auth.routes.js";
import { tokenValidator } from "../middlewares/middlewares.js";
export const globalRouter = Router();

globalRouter.use("/", usersRouter);
globalRouter.use("/posts", tokenValidator, postsRouter);
