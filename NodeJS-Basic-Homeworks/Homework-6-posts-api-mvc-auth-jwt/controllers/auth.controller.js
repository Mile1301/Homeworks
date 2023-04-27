import { AuthModel } from "../models/auth.model.js";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../const/jwt.const.js";

export class AuthController {
  static async registerUser(req, res) {
    const data = req.body;
    const registeredUser = await AuthModel.registerUser(data);
    return res.status(201).json(registeredUser);
  }
  static async loginUser(req, res) {
    const data = req.body;

    const loggedUser = await AuthModel.loginUser(data);
    const accessToken = createAccessToken(loggedUser.id, loggedUser.role);
    res.set("access-token", accessToken);

    req.role = loggedUser.role;

    console.log("The access token from auth controller is", accessToken);
    console.log("The user from auth controller has the role of:", req.headers.role);

    const refreshToken = createRefreshToken(loggedUser.id);
    await AuthModel.saveRefreshToken(loggedUser.id, refreshToken);
    res.set("refresh-token", refreshToken);

    return res.status(200).json({ msg: `Welcome ${loggedUser.firstName}` });
  }
  static async refreshAccessToken(req, res) {
    try {
      const refreshToken = req.headers["refresh-token"];
      if (!refreshToken) throw new Error();

      const { userId } = verifyRefreshToken(refreshToken);
      const foundUser = await AuthModel.getUserById(userId);

      if (refreshToken !== foundUser.refreshToken) throw new Error();

      const accessToken = createAccessToken(foundUser.id, foundUser.role);
      res.set("access-token", accessToken);

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.sendStatus(403);
    }
  }
  static async logoutUser(req, res) {
    try {
      const refreshToken = req.headers["refresh-token"];
      const { userId } = verifyRefreshToken(refreshToken);

      await AuthModel.deleteRefreshToken(userId);
      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.sendStatus(403);
    }
  }
}
