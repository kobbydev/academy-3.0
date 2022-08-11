import { helpers, ApiError, constants } from '../../utils';

const {
  GenericHelper: { errorResponse, validateInput }
} = helpers;
const { PARAM_ABSENT } = constants;
/**
 * A collection of middleware methods used to validate requests
 * @class ValidationMiddleware
 */
class ValidationMiddleware {
  /**
   * @static
   */
  static validate(schema) {
    return async (req, res, next) => {
      try {
        await validateInput(schema, req.body);
        next();
      } catch (error) {
        const apiError = new ApiError({
          status: 400,
          message: error.details[0].message
        });
        errorResponse(req, res, apiError);
      }
    };
  }

  /**
   * @static
   */
  static validateParam(schema) {
    return (req, res, next) => {
      const data = req.params[schema];
      if (data.length === 36) {
        return next();
      }
      errorResponse(
        req,
        res,
        new ApiError({
          status: 400,
          message: PARAM_ABSENT(schema)
        })
      );
    };
  }
}

export default ValidationMiddleware;
