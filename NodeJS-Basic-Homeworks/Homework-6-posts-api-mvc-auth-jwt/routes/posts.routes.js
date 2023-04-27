import { PostsController } from "../controllers/posts.controller.js";
import { Router } from "express";
import { catchAsync } from "../utils/utils.js";
import { adminRole, validatePost, validateUpdatedPost } from "../middlewares/middlewares.js";
export const postsRouter = Router();

postsRouter
  .route("/")
  .get(catchAsync(PostsController.getAllPosts))
  .post(validatePost, catchAsync(PostsController.createPost))
  .delete(adminRole, catchAsync(PostsController.deleteAllPosts));

postsRouter
  .route("/:id")
  .get(catchAsync(PostsController.getPostById))
  .patch(validateUpdatedPost, catchAsync(PostsController.updatePost))
  .delete(catchAsync(PostsController.deletePost));
