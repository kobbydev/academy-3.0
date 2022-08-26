import { User, userApplication } from '../../models/User';
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
    const { _id, firstName, lastName, emailAddress, role } = req.user;
    const { token } = AuthHelper.addTokenToData({ _id, firstName, lastName, emailAddress });
    return res
      .header('x-access-token', token)
      .status(200)
      .send({
        message: constants.RESOURCE_LOGIN_SUCCESSFUL('User'),
        data: { user: { _id, firstName, lastName, role, token } }
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
      app_status: 'Pending'
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
