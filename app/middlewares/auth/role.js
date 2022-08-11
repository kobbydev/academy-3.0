import { helpers, genericErrors, ApiError, constants } from '../../utils';

const {
  GenericHelper: { errorResponse }
} = helpers;

/**
 * A collection of middleware methods used to validate
 * access levels for protected resources based on membership and role.
 *
 * @class RoleMiddleware
 */
class RoleMiddleware {
  /**
    * Checks that the role value is one of the valid roles on the app.
    * @static
    * @param { Object } req - The request from the endpoint.
    * @param { Object } res - The response returned by the method.
    * @param { function } next - Calls the next handle.
    * @memberof RoleMiddleware
    * @returns { JSON | Null } - Returns error response if validation fails
    * or fires the next function if otherwise.
    */
  static roleValueValidator(req, res, next) {
    return constants.ROLE_ARRAY.includes(req.body.role)
      ? next()
      : errorResponse(req, res, new ApiError({
        status: 400,
        message: constants.INVALID_ROLE_PARAMETER
      }));
  }

  /**
    * Checks if a logged in user is an admin.
    * @static
    * @param { Object } req - The request from the endpoint.
    * @param { Object } res - The response returned by the method.
    * @param { function } next - Calls the next handle.
    * @memberof RoleMiddleware
    * @returns { JSON | Null } - Returns error response if validation fails
    * or fires the next function if otherwise.
    */
  static adminAccessValidator(req, res, next) {
    return req.data.is_admin
      ? next()
      : errorResponse(req, res, genericErrors.unAuthorized);
  }

  /**
    * Verifies that user has the required role access for the resource.
    * @static
    * @param { Array } roles - A list of roles that can access the resource.
    * @param { String } position - Where to look for the role value, defaults to data.
    * @memberof RoleMiddleware
    * @returns { Function } - Returns a middleware function.
    */
  static roleAccessValidator(roles, position = 'data') {
    return (req, res, next) => (roles.includes(req[position].role)
      ? next() : errorResponse(req, res, new ApiError({
        status: 403,
        message: constants.ROLE_NOT_SUFFICIENT
      })));
  }
}

export default RoleMiddleware;
