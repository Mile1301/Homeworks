import { AuthModel } from "../models/auth.model.js";

export class AuthController {
  static async register(req, res) {
    const data = req.body;
    const registerUser = await AuthModel.register(data);
    req.session.isLoggedIn = true;
    req.session.role = registerUser.role;
    console.log(req.session);

    return res.redirect("/api/students");
  }
  static async login(req, res) {
    const data = req.body;
    const loginUser = await AuthModel.login(data);
    req.session.isLoggedIn = true;
    req.session.role = loginUser.role;
    // console.log(req.session);
    return res.status(200).send({ msg: `Welcome ${loginUser.firstName}` });
  }
  static async logout(req, res) {
    req.session.destroy();
    return res.status(200).json({ msg: "Logged out" });
  }
  static async admin(req, res) {
    const { id: userID } = req.params;
    const data = req.body;
    const changeCredentialsByAdmin = await AuthModel.admin(userID, data);
    return res.status(200).json(changeCredentialsByAdmin);
  }
}
