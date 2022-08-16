/* eslint-disable import/prefer-default-export */
import { User } from '../../models/User';
import { constants } from '../../utils';
// eslint-disable-next-line no-unused-vars
import { ErrorFactory, AuthHelper } from '../../utils/helpers';

// Check if a user exists for signing up
export const checkForUser = async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const user = await User.findOne({ emailAddress: req.body.emailAddress });
  try {
    if (!user) {
      next();
    } else {
      return res.status(400).send({
        message: constants.USER_ALREADY_EXISTS,
        data: null
      });
    }
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};
// export const userToken = async (req, res, next) => {
//   try {
//     const { _id, firstName, lastName, email } = req.user;
//     const { token } = AuthHelper.addTokenToData({ _id, firstName, lastName, email });
//     req.header('x-access-token') = token;
//     next();
//   } catch (e) {
//     return ErrorFactory.resolveError(e);
//   }
// };
