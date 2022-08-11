/* istanbul ignore file */
import axios from 'axios';
import { nanoid } from 'nanoid';
import genericError from '../errors/generic';
import constants from '../constants';
import DBError from '../errors/db.error';
import ModuleError from '../errors/module.error';

const { serverError } = genericError;
const { FAIL, SUCCESS, SUCCESS_RESPONSE } = constants;
/**
 *Contains GenericHelper methods
 * @class GenericHelper
 */
class GenericHelper {
  /**
   * It generates a uniqueId.
   * @static
   * @memberof GenericHelper
   * @returns {String} - A unique string.
   */
  static generateId() {
    return nanoid();
  }

  /**
   * Creates DB Error object and logs it with respective error message and status.
   * @static
   * @param { String | Object } data - The data.
   * @memberof GenericHelper
   * @returns { Object } - It returns an Error Object.
   */
  static makeError({ error, status }) {
    const dbError = new DBError({
      status,
      message: error.message
    });
    GenericHelper.moduleErrLogMessager(dbError);
    return dbError;
  }

  /**
   * Generates a JSON response for success scenarios.
   * @static
   * @param {Response} res - Response object.
   * @param {object} options - An object containing response properties.
   * @param {object} options.data - The payload.
   * @param {string} options.message -  HTTP Status code.
   * @param {number} options.code -  HTTP Status code.
   * @memberof GenericHelpers
   * @returns {JSON} - A JSON success response.
   */
  static successResponse(
    res,
    { data, message = SUCCESS_RESPONSE, code = 200 }
  ) {
    return res.status(code).json({
      status: SUCCESS,
      message,
      data
    });
  }

  /**
   * Generates a JSON response for failure scenarios.
   * @static
   * @param {Request} req - Request object.
   * @param {Response} res - Response object.
   * @param {object} error - The error object.
   * @param {number} error.status -  HTTP Status code, default is 500.
   * @param {string} error.message -  Error message.
   * @param {object|array} error.errors -  A collection of  error message.
   * @memberof GenericHelpers
   * @returns {JSON} - A JSON failure response.
   */
  static errorResponse(req, res, error) {
    const aggregateError = { ...serverError, ...error };
    GenericHelper.apiErrLogMessager(aggregateError, req);
    return res.status(aggregateError.status).json({
      status: FAIL,
      message: aggregateError.message,
      errors: aggregateError.errors
    });
  }

  /**
   * Generates log for module errors.
   * @static
   * @param {object} error - The module error object.
   * @memberof GenericHelpers
   * @returns { Null } -  It returns null.
   */
  static moduleErrLogMessager(error) {
    return logger.error(`${error.status} - ${error.name} - ${error.message}`);
  }

  /**
   * Generates log for api errors.
   * @static
   * @private
   * @param {object} error - The API error object.
   * @param {Request} req - Request object.
   * @memberof GenericHelpers
   * @returns {String} - It returns null.
   */
  static apiErrLogMessager(error, req) {
    logger.error(
      `${error.name} - ${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }

  /**
   * calculate number of pages
   * @static
   * @param { Number } total - Total number of a particular resource.
   * @param { Number } limit - The total number of resource to be displayed per page
   * @memberof GenericHelper
   * @returns { Number } - Returns the display page value.
   */
  static calcPages(total, limit) {
    const displayPage = Math.floor(total / +limit);
    return total % +limit ? displayPage + 1 : displayPage;
  }

  /**
   * validates an input based on a schema
   * @static
   * @param { Joi } schema - The validation schema.
   * @param { Object } object - The data to be validated
   * @memberof GenericHelper
   * @returns { boolean }
   */
  static async validateInput(schema, object) {
    return schema.validateAsync(object);
  }

  /**
   * Makes a POST Request to an external API.
   * @static
   * @param {string} url - URL.
   * @param { Object } options - Query object (optional).
   * @memberof GenericHelper
   * @returns {Promise <Object | Error>} - A HTTP response object or an Error Object.
   */
  static async makePostRequest(url, options = {}) {
    try {
      const { status, data } = await axios({ url, method: 'POST', ...options });
      return { status, data };
    } catch (e) {
      const status = e.response ? e.response.status : 500;
      const moduleError = new ModuleError({ message: e.message, status });
      GenericHelper.moduleErrLogMessager(moduleError);
      throw moduleError;
    }
  }

  /**
   * Makes a POST Request to an external API.
   * @static
   * @param {string} url - URL.
   * @param { Object } options - Query object (optional).
   * @memberof GenericHelper
   * @returns {Promise <Object | Error>} - A HTTP response object or an Error Object.
   */
  static async makeGetRequest(url, options = {}) {
    try {
      const { status, data } = await axios({ url, method: 'GET', ...options });
      return { status, data };
    } catch (e) {
      const status = e.response ? e.response.status : 500;
      const moduleError = new ModuleError({ message: e.message, status });
      GenericHelper.moduleErrLogMessager(moduleError);
      throw moduleError;
    }
  }
}

export default GenericHelper;
