/* eslint-disable import/prefer-default-export */
import { AuthHelper, ErrorFactory } from '../../utils/helpers';
import { constants } from '../../utils';
import { userApplication } from '../../models/User';

// Logs a user in
export const adminLogIn = async (req, res) => {
  try {
    const { _id, firstName, lastName, emailAddress, is_admin } = req.user;
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
        data: { admin: { _id, firstName, lastName, emailAddress, is_admin } }
      });
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};

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
