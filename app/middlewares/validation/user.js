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

export const joiForAdminSignup = Joi.object({
  profileImage: Joi.any(),
  fullName: Joi.string().required(),
  emailAddress: Joi.string().email().required(),
  phoneNumber: Joi.number().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.ref('password'),
  country: Joi.string().required(),
  address: Joi.string().required()
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

export const joiForCreateAssesment = Joi.object({
  question: Joi.string().required(),
  optionA: Joi.string().required(),
  optionB: Joi.string().required(),
  optionC: Joi.string().required(),
  optionD: Joi.string().required(),
  correctAnswer: Joi.string().required()
});
