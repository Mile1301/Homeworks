import { readFile, writeFile } from "node:fs/promises";

export class DataService {
  static async readJSONFile(path) {
    const stringData = await readFile(path, "utf-8");
    return JSON.parse(stringData);
  }
  static async saveJSONFile(path, data) {
    return await writeFile(path, JSON.stringify(data, 0, 2), "utf-8");
  }
}
