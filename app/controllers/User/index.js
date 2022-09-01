import { User, userApplication } from '../../models/User';
import { createAssessment } from '../../models/Admin';
import { AuthHelper, ErrorFactory } from '../../utils/helpers';
import { constants } from '../../utils';
import cloudinary from '../../utils/cloudinary';

// SignsUp a user
export const userSignUp = async (req, res) => {
  const { password, ...body } = req.body;
  const { salt, hash } = AuthHelper.hashString(password);
  try {
    const newUser = await User.create({
      ...body,
      password: hash,
      salt,
      role: 'User',
      is_admin: false,
      is_applied: false
    });
    const { _id, firstName, lastName } = newUser;
    return res.status(201).send({
      message: constants.RESOURCE_CREATE_SUCCESS('User'),
      data: { user: { _id, firstName, lastName } }
    });
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};

// Logs a user in
export const userLogIn = async (req, res) => {
  try {
    const { _id, firstName, lastName, emailAddress, role, is_applied } = req.user;
    const { token } = AuthHelper.addTokenToData({ _id, firstName, lastName, emailAddress });
    return res
      .header('x-access-token', token)
      .status(200)
      .send({
        message: constants.RESOURCE_LOGIN_SUCCESSFUL('User'),
        data: { user: { _id, firstName, lastName, role, is_applied, token } }
      });
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};

// creates an application
export const createUserApplication = async (req, res) => {
  try {
    const { image, cv } = req.files;
    const imageResult = await cloudinary.uploader.upload(image.tempFilePath);
    const cvResult = await cloudinary.uploader.upload(cv.tempFilePath);
    const { body } = req;
    const { _id } = req.data;
    const newApplication = await userApplication.create({
      ...body,
      cv: cvResult.url,
      image: imageResult.url,
      app_status: 'Pending',
      scores: 0,
      is_taken_test: false,
      timer: ''
    });
    await User.findByIdAndUpdate(_id, { is_applied: true });
    return res.status(201).send({
      message: constants.RESOURCE_CREATE_SUCCESS('Application'),
      data: newApplication
    });
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};

// fetches a user's information
export const getUserInfo = async (req, res) => {
  try {
    const userInfo = await userApplication.findOne({ emailAddress: req.data.emailAddress });
    const { firstName, lastName, emailAddress, image, createdAt, app_status } = userInfo;
    return res.status(200).send({
      message: constants.RESOURCE_FETCH_SUCCESS('UserInfo'),
      data: { user: { firstName, lastName, emailAddress, image, createdAt, app_status } }
    });
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};

// get user info with param
export const getSingleUser = async (req, res) => {
  try {
    const singleUser = await userApplication.findOne({ _id: req.params.id });
    // const {firstName, lastName, emailAddress}
    return res.status(200).send({
      message: constants.RESOURCE_FETCH_SUCCESS('ApplicantInfo'),
      data: singleUser
    });
  } catch (error) {
    return ErrorFactory.resolveError(error);
  }
};

// get aseessment questions
export const assessmentQuestions = async (req, res) => {
  try {
    const question = await createAssessment.find();
    return res.status(200).send({
      message: constants.RESOURCE_FETCH_SUCCESS('Assessment questions'),
      data: question
    });
  } catch (error) {
    return ErrorFactory.resolveError(error);
  }
};

// update user info
export const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, scores, is_taken_test, phoneNumber } = req.body;
    const updatedUser = await userApplication.findByIdAndUpdate(
      { _id: req.params.id },
      {
        firstName,
        lastName,
        emailAddress,
        scores,
        is_taken_test,
        phoneNumber
      }
    );
    return res.status(200).send({
      message: constants.RESOURCE_UPDATE_SUCCESS('User'),
      data: updatedUser
    });
  } catch (error) {
    return ErrorFactory.resolveError(error);
  }
};
