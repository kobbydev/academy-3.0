/* eslint-disable import/prefer-default-export */
import { AuthHelper, ErrorFactory } from '../../utils/helpers';
import { constants } from '../../utils';

// Logs a user in
export const adminLogIn = async (req, res) => {
  try {
    const { _id, firstName, lastName, email } = req.user;
    const { token } = AuthHelper.addTokenToData({ _id, firstName, lastName, email });
    return res
      .header('x-access-token', token)
      .status(200)
      .send({
        message: constants.SUCCESS_RESPONSE,
        data: { admin: req.user }
      });
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};
