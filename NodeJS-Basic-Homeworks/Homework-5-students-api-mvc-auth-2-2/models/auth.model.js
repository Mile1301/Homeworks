import { DataService } from "../services/data.service.js";
import { pathBuilder } from "../utils/utils.js";
import Joi from "joi";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";

const usersPath = pathBuilder(["..", "/", "data", "users.json"]);

const userSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("business", "user").required(),
  password: Joi.string().min(2).required(),
});
class User {
  constructor(firstName, lastname, email, role, password) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastname;
    this.email = email;
    this.role = role;
    this.password = password;
  }
}

class ServiceAuthModel {
  static async getAllUsers() {
    return await DataService.readJSONFile(usersPath);
  }
  static async saveUsers(data) {
    return await DataService.saveJSONFile(usersPath, data);
  }
}
export class AuthModel {
  static async register(data) {
    const users = await ServiceAuthModel.getAllUsers();
    const emailExists = users.some((user) => user.email === data.email);
    if (emailExists) throw new Error("Email already exists!!!");

    const isValidUser = userSchema.validate(data);
    if (isValidUser?.error) throw new Error(isValidUser.error.details[0].message);

    const hashedPassword = await bcrypt.hash(data.password, 8);
    const { firstName, lastName, email, role, password } = data;

    const newUser = new User(firstName, lastName, email, role, hashedPassword);

    const arrayWithNewUser = [...users, newUser];

    await ServiceAuthModel.saveUsers(arrayWithNewUser);
    const { password: userPassword, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
  static async login(credentials) {
    const { email, password } = credentials;
    const users = await ServiceAuthModel.getAllUsers();

    const foundUser = users.find((user) => user.email === email);
    if (!foundUser) throw new Error("Invalid credentials");

    const isValidPassword = await bcrypt.compare(password, foundUser.password);
    if (!isValidPassword) throw new Error("Invalid credentials");

    const { password: userPassword, ...userWithoutPassword } = foundUser;
    return userWithoutPassword;
  }
  static async admin(userId, data) {
    const users = await ServiceAuthModel.getAllUsers();
    const foundUser = users.find((user) => user.id === userId);
    if (!foundUser) throw new Error("User not found");
    if (data.id) throw new Error("Invalid input!!!");
    const emailExists = users.some((user) => user.email === data.email);
    if (emailExists) throw new Error("Email already in use. Get a new one!!!");
    const updatedUser = {
      ...foundUser,
      ...data,
    };
    const arrayWithUpdatedUser = users.map((user) => (user.id === userId ? updatedUser : user));
    await ServiceAuthModel.saveUsers(arrayWithUpdatedUser);
    return updatedUser;
  }
}
