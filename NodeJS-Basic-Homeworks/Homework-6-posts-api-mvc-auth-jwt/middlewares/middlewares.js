import { postSchema, updatePostSchema, userSchema } from "../schemas/schemas.js";
import { CustomError } from "../utils/customError.js";
import { AuthModel } from "../models/auth.model.js";
import { verifyAccessToken } from "../const/jwt.const.js";

export const validateUser = (req, res, next) => {
  const data = req.body;
  const validUser = userSchema.validate(data);
  if (validUser?.error) throw new CustomError(validUser.error.details[0].message, 400);
  next();
};
export const validatePost = (req, res, next) => {
  const data = req.body;
  const validPost = postSchema.validate(data);
  if (validPost?.error) throw new CustomError(validPost.error.details[0].message, 400);
  next();
};
export const validateUpdatedPost = (req, res, next) => {
  const data = req.body;
  const validPost = updatePostSchema.validate(data);
  if (validPost?.error) throw new CustomError(validPost.error.details[0].message, 400);
  next();
};

export const tokenValidator = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) throw new Error();

    const token = authorizationHeader.split(" ")[1];
    const { userId, role } = verifyAccessToken(token);
    // const payload = verifyAccessToken(token);
    console.log("The userId from middleware is", userId);
    console.log("The role from middleware is", role);
    // console.log("The payload from middleware is", payload);
    await AuthModel.getUserById(userId);
    return next();
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};

export const adminRole = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) throw new Error();
  const token = authorizationHeader.split(" ")[1];
  const { role } = verifyAccessToken(token);
  const adminRole = role;
  console.log("adminRole", adminRole);

  if (adminRole === "admin") {
    next();
  } else {
    res.sendStatus(401);
  }
};
