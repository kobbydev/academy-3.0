/* eslint-disable import/prefer-default-export */
import { User } from '../../models/User';
import { AuthHelper, ErrorFactory } from '../../utils/helpers';
import { constants } from '../../utils';

// SignsUp a user
export const userSignUp = async (req, res) => {
  const { password, ...body } = req.body;
  const { salt, hash } = AuthHelper.hashString(password);
  try {
    const newUser = await User.create({ ...body, password: hash, salt, role: 'User', is_admin: false });
    return res.status(201).send({
      message: constants.SUCCESS_RESPONSE,
      data: newUser
    });
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};

// Logs a user in
export const userLogIn = async (req, res) => {
  try {
    const { _id, firstName, lastName, email } = req.user;
    const { token } = AuthHelper.addTokenToData({ _id, firstName, lastName, email });
    return res.header('x-access-token', token).status(200).send({
      message: constants.SUCCESS_RESPONSE,
      data: { user: req.user }
    });
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};
