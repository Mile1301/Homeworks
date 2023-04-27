import { PostsModel } from "../models/posts.model.js";

export class PostsController {
  static async getAllPosts(req, res) {
    // const filters = req.query;
    // const authorizationHeader = req.headers.authorization; //why did we wrote this line in here - just for accesstoken comparison
    // console.log("Auth header from post.controller is", req.headers);
    const posts = await PostsModel.getAllPosts();
    return res.status(200).json(posts);
  }
  static async getPostById(req, res) {
    const { id: postId } = req.params;
    const postById = await PostsModel.getPostsById(postId);
    return res.status(200).json(postById);
  }
  static async createPost(req, res) {
    const data = req.body;
    const createdPost = await PostsModel.createPost(data);
    return res.status(201).json(createdPost);
  }
  static async updatePost(req, res) {
    const data = req.body;
    const { id: postId } = req.params;
    const updatedPost = await PostsModel.updatePost(postId, data);
    return res.status(201).json(updatedPost);
  }
  static async deletePost(req, res) {
    const { id: postId } = req.params;
    await PostsModel.deletePost(postId);
    return res.status(204).json({ msg: `The post with the ID ${postId} has been deleted!!! ` });
  }
  static async deleteAllPosts(req, res) {
    await PostsModel.deleteAllPosts();
    return res.sendStatus(204);
  }
}
