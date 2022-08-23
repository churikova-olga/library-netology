import * as Joi from 'joi';

export const createBookSchema = Joi.object().keys({
  title: Joi.string().min(5).max(40).required(),
  description: Joi.string().min(10).max(300).optional(),
  favorite: Joi.string().min(10).max(30).optional(),
  fileCover: Joi.string().min(10).max(50).optional(),
  fileName: Joi.string().min(10).max(40).optional(),
  fileBook: Joi.string().min(10).max(50).optional(),
});
