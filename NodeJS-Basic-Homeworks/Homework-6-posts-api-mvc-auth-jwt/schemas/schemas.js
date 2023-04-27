import Joi from "joi";

export const userSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("business", "user").required(),
  password: Joi.string().min(2).required(),
});
export const postSchema = Joi.object({
  title: Joi.string().min(2).required(),
  body: Joi.string().min(2).required(),
});

export const updatePostSchema = Joi.object({
  title: Joi.string().min(2).optional(),
  body: Joi.string().min(2).optional(),
});
