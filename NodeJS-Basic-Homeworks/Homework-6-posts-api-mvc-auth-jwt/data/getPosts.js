// installed node-fetch in order to get JSON data from API
// followed the docs and it works :)
import fetch from "node-fetch";
import { DataServices } from "../services/data.service.js";
import { pathBuilder } from "../utils/utils.js";
import { v4 as uuid } from "uuid";

export const postsPath = pathBuilder(["..", "/", "data", "posts.json"]);

async function getPostData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  // for (let item of data) {
  // item.userId = uuid();
  // delete item.userId;
  // item.userId.toString().replaceAll(1, "one");
  // if (item.userId === 10) item.userId = "ten";
  // }
  await DataServices.saveJSONFile(postsPath, data);
  console.log(data);
}

getPostData();
