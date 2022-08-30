import { AuthHelper, ErrorFactory } from '../../utils/helpers';
import { constants } from '../../utils';
import { userApplication } from '../../models/User';
import { adminApplication, createAssessment, Admin } from '../../models/Admin';
import cloudinary from '../../utils/cloudinary';

// Creates an admin
export const adminSignUp = async (req, res) => {
  const { profileImage } = req.files;
  const profileResult = await cloudinary.uploader.upload(profileImage.tempFilePath);
  const { password, ...body } = req.body;
  const { salt, hash } = AuthHelper.hashString(password);
  try {
    const newAdmin = await Admin.create({
      ...body,
      password: hash,
      salt,
      profileImage: profileResult.url,
      role: 'Admin',
      is_admin: true
    });
    const { _id, firstName, lastName } = newAdmin;
    return res.status(201).send({
      message: constants.RESOURCE_CREATE_SUCCESS('Admin'),
      data: { admin: { _id, firstName, lastName } }
    });
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};

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

// To create Assessment
export const createAdminAssessment = async (req, res) => {
  try {
    const { assessmentFile } = req.files;
    const assessmentFileResult = await cloudinary.uploader.upload(assessmentFile.tempFilePath);
    const { body } = req;
    const newAssessment = await createAssessment.create({
      ...body,
      assessmentFile: assessmentFileResult.url
    });
    return res.status(201).send({
      message: constants.RESOURCE_CREATE_SUCCESS('Assessment'),
      data: newAssessment
    });
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};

// To update the details of an admin
export const updateAdminDetails = async (req, res) => {
  try {
    const { _id } = req.data;
    const { profileImage } = req.files;
    const imageResult = await cloudinary.uploader.upload(profileImage.tempFilePath);
    const { firstName, lastName, phoneNumber, address, country } = req.body;
    // console.log(firstName);
    const adminUpdate = await Admin.findById(_id);
    const newadmin = await adminUpdate.update({
      profileImage: imageResult.url,
      firstName,
      lastName,
      phoneNumber,
      address,
      country
    });
    return res.status(201).send({
      message: constants.RESOURCE_UPDATE_SUCCESS('Admin'),
      data: newadmin
    });
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};

export const approveUser = async (req, res) => {
  try {
    const { app_status } = req.body;
    const approvedUser = await userApplication.findByIdAndUpdate(
      { _id: req.params.id },
      app_status
    );
    return res.status(200).send({
      message: constants.RESOURCE_FETCH_SUCCESS('ApplicantInfo'),
      data: approvedUser
    });
  } catch (error) {
    return ErrorFactory.resolveError(error);
  }
};
