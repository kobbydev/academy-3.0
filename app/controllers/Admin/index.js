import { AuthHelper, ErrorFactory } from '../../utils/helpers';
import { constants } from '../../utils';
import { userApplication } from '../../models/User';
import adminApplication from '../../models/Admin';
import cloudinary from '../../utils/cloudinary';

// Logs a user in
export const adminLogIn = async (req, res) => {
  try {
    const { _id, firstName, lastName, emailAddress, is_admin, role } = req.user;
    const { token } = AuthHelper.addTokenToData({
      _id,
      firstName,
      lastName,
      emailAddress,
      is_admin
    });
    return res
      .header('x-access-token', token)
      .status(200)
      .send({
        message: constants.RESOURCE_LOGIN_SUCCESSFUL('Admin'),
        data: { admin: { _id, firstName, lastName, emailAddress, is_admin, role, token } }
      });
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};

// Get all Applicants info
export const getAllUserInfo = async (req, res) => {
  try {
    const userInfo = await userApplication.find().sort({ dateOfBirth: 1 });
    return res.status(200).send({
      message: constants.RESOURCE_FETCH_SUCCESS('All Applicants'),
      data: userInfo
    });
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};

// Admin creates a batch
export const adminCreateApplication = async (req, res) => {
  try {
    const { applicationFile } = req.files;
    const fileResult = await cloudinary.uploader.upload(applicationFile.tempFilePath);
    const { body } = req;
    const newAdminApplication = await adminApplication.create({
      ...body,
      applicationFile: fileResult.url
    });
    return res.status(201).send({
      message: constants.RESOURCE_CREATE_SUCCESS('Application'),
      data: newAdminApplication
    });
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};

// Get all admin applications
export const getAllAdminApplications = async (req, res) => {
  try {
    const applications = await adminApplication.find();
    return res.status(200).send({
      message: constants.RESOURCE_FETCH_SUCCESS('Applications'),
      data: applications
    });
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};
