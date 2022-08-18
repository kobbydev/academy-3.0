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
        message: constants.RESOURCE_ALREADY_EXIST('User'),
        data: null
      });
    }
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};

// checks if the information provided by the user matches what he/she signed up with
export const applicationValidator = async (req, res, next) => {
  try {
    if (
      req.data.firstName === req.body.firstName &&
      req.data.lastName === req.body.lastName &&
      req.data.emailAddress === req.body.emailAddress
    ) {
      next();
    } else {
      return res.status(400).send({
        message: constants.NO_MATCHING_INFO,
        data: null
      });
    }
  } catch (e) {
    return ErrorFactory.resolveError(e);
  }
};
