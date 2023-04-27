import { DataServices } from "../services/data.service.js";
import { pathBuilder } from "../utils/utils.js";
import { v4 as uuid } from "uuid";
import { CustomError } from "../utils/customError.js";
const postsPath = pathBuilder(["..", "/", "data", "posts.json"]);

class Post {
  constructor(title, body) {
    this.id = uuid();
    this.userId = 1;
    this.title = title;
    this.body = body;
  }
}

export class PostsModel {
  static async getAllPosts() {
    const posts = await DataServices.readJSONFile(postsPath);
    return posts;
  }
  static async savePosts(data) {
    return await DataServices.saveJSONFile(postsPath, data);
  }
  static async getPostsById(postId) {
    const posts = await this.getAllPosts();
    const foundPost = posts.find((post) => (typeof post.id === "number" ? Number(post.id) === Number(postId) : post.id === postId));
    if (!foundPost) throw new CustomError("Post not found", 404);
    return foundPost;
  }
  static async createPost(data) {
    const posts = await this.getAllPosts();
    const { title, body } = data;
    const newPost = new Post(title, body);
    const arrayWithNewPost = [...posts, newPost];
    await this.savePosts(arrayWithNewPost);
    return newPost;
  }
  static async updatePost(postId, data) {
    const posts = await this.getAllPosts();
    const foundPost = await this.getPostsById(postId);
    if (data.id || data.userId) throw new CustomError("Invalid input!!!", 400);
    const updatedPost = { ...foundPost, ...data };
    const updatedPostsArray = posts.map((post) => {
      if (typeof post.id === "number") return Number(post.id) === Number(postId) ? updatedPost : post;
      return post.id === postId ? updatedPost : post;
    });
    await this.savePosts(updatedPostsArray);
    return updatedPost;
  }
  static async deletePost(postId) {
    const posts = await this.getAllPosts();
    const deletedPostsArray = posts.filter((post) => (typeof post.id === "number" ? Number(post.id) !== Number(postId) : post.id !== postId));
    if (deletedPostsArray.length === posts.length) throw new CustomError("Post not found!!!", 404);
    await this.savePosts(deletedPostsArray);
  }
  static async deleteAllPosts() {
    await this.savePosts([]);
  }
}
