/* eslint-disable import/prefer-default-export */
import { Admin } from '../../models/Admin';
import { constants } from '../../utils';
// eslint-disable-next-line no-unused-vars
import { ErrorFactory, AuthHelper } from '../../utils/helpers';

export const checkForAdmin = async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const admin = await Admin.findOne({ emailAddress: req.body.emailAddress });
  try {
    if (!admin) {
      next();
    } else {
      return res.status(400).send({
        message: constants.RESOURCE_ALREADY_EXIST('Admin'),
        data: null
      });
    }
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};
