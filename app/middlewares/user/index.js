/* eslint-disable import/prefer-default-export */
import { User } from '../../models/User';
import { constants } from '../../utils';
import { ErrorFactory } from '../../utils/helpers';

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
