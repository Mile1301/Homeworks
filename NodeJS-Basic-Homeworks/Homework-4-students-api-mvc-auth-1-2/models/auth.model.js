import { DataService } from "../services/data.service.js";
import { pathBuilder } from "../utils/utils.js";
import { v4 as uuid } from "uuid";
import Joi from "joi";
import bcrypt from "bcryptjs";

const usersPath = pathBuilder(["..", "/", "data", "users.json"]);

const usersSchema = Joi.object({
  firstName: Joi.string().min(2).max(10).required(),
  lastName: Joi.string().min(2).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(2).required(),
});

class User {
  constructor(firstName, lastName, email, password) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

class ServiceAuthModel {
  static async getAllUsers() {
    const users = await DataService.readJSONFile(usersPath);
    return users;
  }
  static async saveUsers(data) {
    return await DataService.saveJSONFile(usersPath, data);
  }
}
export class AuthModel {
  //1.Register user
  static async registerUser(data) {
    const users = await ServiceAuthModel.getAllUsers();
    const emailExists = users.some((user) => user.email === data.email);

    if (emailExists) throw new Error("Email already exists.Please provide new valid email");
    const validateNewUser = usersSchema.validate(data);
    if (validateNewUser?.error) throw new Error(validateNewUser.error.details[0].message);

    const hashedPassword = await bcrypt.hash(data.password, 8);
    // const { password, ...credentials } = data;

    // const newUser = {
    //   id: uuid(),
    //   ...credentials,
    //   hashedPassword,
    // };

    const { firstName, lastName, email, password } = data;
    const newUser = new User(firstName, lastName, email, hashedPassword);

    const arrayWithNewUser = [...users, newUser];
    await ServiceAuthModel.saveUsers(arrayWithNewUser);

    const { password: userPassword, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
  static async loginUser(loginData) {
    const { email, password } = loginData;
    const users = await ServiceAuthModel.getAllUsers();

    const foundUser = users.find((user) => user.email === email);
    if (!foundUser) throw new Error("Invalid credentials");

    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword) throw new Error("Invalid credentials");

    const { password: userPassword, ...userWithoutPassword } = foundUser;
    return userWithoutPassword;
  }
}
