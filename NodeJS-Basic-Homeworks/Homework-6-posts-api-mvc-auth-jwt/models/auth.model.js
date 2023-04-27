import { DataServices } from "../services/data.service.js";
import { v4 as uuid } from "uuid";
import { pathBuilder } from "../utils/utils.js";
import bcrypt from "bcryptjs";
import { CustomError } from "../utils/customError.js";
const usersPath = pathBuilder(["..", "/", "data", "users.json"]);

class User {
  constructor(firstName, lastName, email, role, password) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.password = password;
    this.refreshToken = null;
  }
}

class ServiceAuthModel {
  static async getallUsers() {
    const users = await DataServices.readJSONFile(usersPath);
    return users;
  }
  static async saveUser(data) {
    return await DataServices.saveJSONFile(usersPath, data);
  }
}
export class AuthModel {
  static async getUserById(userId) {
    const users = await ServiceAuthModel.getallUsers();
    const foundUser = users.find((user) => user.id === userId);
    if (!foundUser) throw new CustomError("User not found", 400);
    return foundUser;
  }
  static async registerUser(data) {
    const users = await ServiceAuthModel.getallUsers();
    const emailExists = users.some((user) => user.email === data.email);
    if (emailExists) throw new CustomError("Email already in use!!!", 409);
    const hashedPassword = await bcrypt.hash(data.password, 8);
    const { firstName, lastName, email, role, password } = data;

    const newUser = new User(firstName, lastName, email, role, hashedPassword);
    const arrayWithNewUser = [...users, newUser];
    await ServiceAuthModel.saveUser(arrayWithNewUser);
    const { password: userPassword, ...userWithOutPassword } = newUser;
    return userPassword;
  }
  static async loginUser(loginData) {
    const users = await ServiceAuthModel.getallUsers();
    const foundUser = users.find((user) => user.email === loginData.email);
    if (!foundUser) throw new CustomError("Invalid username or password", 401);
    const isPasswordValid = await bcrypt.compare(loginData.password, foundUser.password);
    if (!isPasswordValid) throw new CustomError("Invalid username OR password", 401);
    const { password: userPassword, ...userWithOutPassword } = foundUser;
    return userWithOutPassword;
  }
  static async saveRefreshToken(userId, refreshToken) {
    const users = await ServiceAuthModel.getallUsers();
    const updatedUserWithRefreshToken = users.map((user) => {
      if (user.id === userId) {
        user.refreshToken = refreshToken;
        return user;
      }
      return user;
    });
    await ServiceAuthModel.saveUser(updatedUserWithRefreshToken);
  }
  static async deleteRefreshToken(userId) {
    const users = await ServiceAuthModel.getallUsers();
    const updatedUserWithDeletedRefreshToken = users.map((user) => {
      if (user.id === userId) {
        user.refreshToken = null;
        return user;
      }
      return user;
    });
    await ServiceAuthModel.saveUser(updatedUserWithDeletedRefreshToken);
  }
}
