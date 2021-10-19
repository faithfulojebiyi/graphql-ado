import ApiError from '../error/api.error'
import constants from '../constants'

const {
  INTERNAL_SERVER_ERROR_MSG, NOT_FOUND_API, httpStatusCodes: {
    NOT_FOUND, INTERNAL_SERVER_ERROR
  }
} = constants

export default {
  serverError: new ApiError({ message: INTERNAL_SERVER_ERROR_MSG, status: INTERNAL_SERVER_ERROR }),
  notFoundApi: new ApiError({ message: NOT_FOUND_API, status: NOT_FOUND })
}
