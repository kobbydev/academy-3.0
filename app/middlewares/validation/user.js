/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const joiForUser = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  emailAddress: Joi.string().email().required(),
  phoneNumber: Joi.number().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.ref('password')
});

export const joiForLogin = Joi.object({
  emailAddress: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

export const joiForApplication = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  emailAddress: Joi.string().email(),
  dateOfBirth: Joi.date(),
  address: Joi.string(),
  university: Joi.string(),
  courseOfStudy: Joi.string(),
  cgpa: Joi.number().max(4).min(1),
  image: Joi.any(),
  cv: Joi.any()
});

export const joiForAdminApplication = Joi.object({
  // applicationFile: Joi.any().required(),
  link: Joi.string(),
  dateOfApplication: Joi.date().required(),
  batchId: Joi.string().required(),
  instructions: Joi.string()
});
