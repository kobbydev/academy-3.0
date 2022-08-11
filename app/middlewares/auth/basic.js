import { helpers, genericErrors, ApiError, constants } from '../../utils';
import config from '../../../config/env';

const {
  GenericHelper: { errorResponse, moduleErrLogMessager },
  AuthHelper: { verifyToken, compareHash }
} = helpers;
const {
  RESOURCE_EXIST_VERIFICATION_FAIL,
  RESOURCE_EXIST_VERIFICATION_FAIL_MSG
} = constants;
const { SECRET, REFRESH_SECRET } = config;

/**
 * A collection of middleware methods used to verify the authenticity
 * of requests through protected routes.
 *
 * @class AuthMiddleware
 */
class AuthMiddleware {
  /**
   * Checks for token in the authorization and x-access-token header properties.
   * @static
   * @private
   * @param {object} authorization - The headers object
   * @memberof AuthMiddleware
   * @returns {string | null} - Returns the Token or Null
   */
  static checkAuthorizationToken(authorization) {
    let bearerToken = null;
    if (authorization) {
      const token = authorization.split(' ')[1];
      bearerToken = token || authorization;
    }
    return bearerToken;
  }

  /**
   * Compares password from request and the one in the database.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @memberof AuthMiddleware
   * @returns {string | null} - Returns the Token or Null
   */
  static comparePassword(req, res, next) {
    const { user, body } = req;
    const isAuthenticUser = compareHash(
      body.password,
      user.password,
      user.salt
    );
    if (!isAuthenticUser) {
      return errorResponse(req, res, genericErrors.inValidLogin);
    }
    next();
  }

  /**
   * Aggregates a search for the access token in a number of places.
   * @static
   * @private
   * @param {Request} req - The express request object.
   * @memberof AuthMiddleware
   * @returns {string | null} - Returns the Token or Null
   */
  static checkToken(req) {
    const {
      headers: { authorization }
    } = req;
    const bearerToken = AuthMiddleware.checkAuthorizationToken(authorization);
    return req.body.refreshToken
      ? req.body.refreshToken
      : bearerToken
          || req.headers['x-access-token']
          || req.headers.token
          || req.body.token;
  }

  /**
   * Verifies the validity of a user's access token or and the presence of it.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof AuthMiddleware
   *
   */
  static authenticate(req, res, next) {
    const token = AuthMiddleware.checkToken(req);
    if (!token) {
      return errorResponse(req, res, genericErrors.authRequired);
    }
    try {
      const decoded = req.body.refreshToken
        ? verifyToken(token, REFRESH_SECRET)
        : verifyToken(token, SECRET);
      req.data = decoded;
      next();
    } catch (err) {
      errorResponse(req, res, genericErrors.authRequired);
    }
  }

  static async loginEmailValidator(req, res, next) {
    try {
      req.body = { ...req.body, ...req.data };
      req.user = await (req.body.email);
      return req.user
        ? next()
        : errorResponse(req, res, genericErrors.inValidLogin);
    } catch (e) {
      e.status = RESOURCE_EXIST_VERIFICATION_FAIL('ADMIN');
      moduleErrLogMessager(e);
      errorResponse(
        req,
        res,
        new ApiError({ message: RESOURCE_EXIST_VERIFICATION_FAIL_MSG('Admin') })
      );
    }
  }
}

export default AuthMiddleware;
