/* eslint-disable import/prefer-default-export */
import { User } from '../../models/User';
import { AuthHelper, ErrorFactory } from '../../utils/helpers';
import { constants } from '../../utils';

export const userSignUp = async (req, res) => {
  const { password, ...body } = req.body;
  const { salt, hash } = AuthHelper.hashString(password);
  try {
    const newUser = await User.create({ ...body, password: hash, salt, role: 'User' });
    return res.status(201).send({
      message: constants.SUCCESS_RESPONSE,
      data: newUser
    });
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};
