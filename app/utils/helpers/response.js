import constants from '../constants'
import { v4 as uuidv4 } from 'uuid'

const {
  FAIL,
  INTERNAL_SERVER_ERROR_MSG,
  httpStatusCodes: { INTERNAL_SERVER_ERROR }
} = constants
const serverError = { message: INTERNAL_SERVER_ERROR_MSG, status: INTERNAL_SERVER_ERROR }

/**
 *Contains Helper methods
 *
 * @class Helper
 */
export default class Helper {
  /**
   * It genrates a uniqueId
   * @static
   * @memberof Helper
   * @returns {string} - A unique string
   */
  static generateId () {
    return uuidv4()
  }

  /**
   * Generates a JSON-like graphQl response for success scenarios.
   * @static
   * @param {number} status -  HTTP Status code.
   * @param {string} message -  message.
   * @param {object} data - The payload.
   * @memberof Helpers
   * @returns {JSON} - A JSON-like response.
   */
  static graphQLResponse (status, message, data) {
    return {
      status,
      message,
      data
    }
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
   * @memberof Helpers
   * @returns {JSON} - A JSON failure response.
   */
  static errorResponse (req, res, error) {
    const aggregateError = { ...serverError, ...error }
    Helper.apiErrLogMessager(aggregateError, req)
    return res.status(aggregateError.status).json({
      status: FAIL,
      message: aggregateError.message,
      errors: aggregateError.errors
    })
  }

  /**
   * Generates log for module errors.
   * @static
   * @param {object} error - The module error object.
   * @memberof Helpers
   * @returns { Null } -  It returns null.
   */
  static moduleErrLogMessager (error) {
    return logger.error(`${error.status} - ${error.name} - ${error.message}`)
  }

  /**
   * Generates log for api errors.
   * @static
   * @param {object} error - The API error object.
   * @param {Request} req - Request object.
   * @memberof Helpers
   * @returns {String} - It returns null.
   */
  static apiErrLogMessager (error, req) {
    logger.error(
      `${error.name} - ${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    )
  }
}
