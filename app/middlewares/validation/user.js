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
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  emailAddress: Joi.string().email().required(),
  dateOfBirth: Joi.date(),
  address: Joi.string().required(),
  university: Joi.string().required(),
  courseOfStudy: Joi.string().required(),
  cgpa: Joi.number().max(4).min(1).required(),
  image: Joi.any().required(),
  cv: Joi.any().required()
});

export const joiForAdminApplication = Joi.object({
  // applicationFile: Joi.any().required(),
  link: Joi.string(),
  dateOfApplication: Joi.date().required(),
  batchId: Joi.string().required(),
  instructions: Joi.string()
});

export const joiForCreateAssesment = Joi.object({
  assessmentFile: Joi.any(),
  questions: Joi.string().required(),
  optionA: Joi.string().required(),
  optionB: Joi.string().required(),
  optionC: Joi.string().required(),
  optionD: Joi.string().required()
});
