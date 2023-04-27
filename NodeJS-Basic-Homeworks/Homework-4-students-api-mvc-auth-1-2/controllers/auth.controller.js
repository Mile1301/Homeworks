import { AuthModel } from "../models/auth.model.js";

export class AuthController {
  //1.Register user
  static async registerUser(req, res) {
    const data = req.body;
    const registeredUser = await AuthModel.registerUser(data);
    res.status(200).json(registeredUser);
  }
  //1.Login user
  static async loginUser(req, res) {
    const loginData = req.body;
    const loggedUser = await AuthModel.loginUser(loginData);
    res.status(200).json(loggedUser);
  }
}
