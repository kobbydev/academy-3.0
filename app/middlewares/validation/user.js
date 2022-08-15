/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const joiForUser = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  emailAddress: Joi.string().email().required(),
  phoneNumber: Joi.number().required(),
  password: Joi.string().min(8).required()
});

export const joiForLogin = Joi.object({
  emailAddress: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});
