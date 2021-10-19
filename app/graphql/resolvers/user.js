import queries from '../../db/queries'
import db from '../../db'
import { helpers, constants, ApiError } from '../../utils'

const {
  ResponseHelper: { moduleErrLogMessager, graphQLResponse }
} = helpers

const {
  GRAPHQL_ERROR_MSG,
  httpStatusCodes: { OK, INTERNAL_SERVER_ERROR }
} = constants

const userResolvers = {
  Query: {
    async getAllUsers () {
      try {
        const data = await db.many(queries.getAllUsers)
        return graphQLResponse(OK, 'Fetched users successfully', data)
      } catch (err) {
        const error = new ApiError({
          status: 'USERS',
          message: err.message
        })
        moduleErrLogMessager(error)
        return graphQLResponse(
          INTERNAL_SERVER_ERROR,
          GRAPHQL_ERROR_MSG
        )
      }
    },
    getUserById (_, args, ctx, info) {
      try {
        const singleUser = db.oneOrNone(queries.getSingleUser, args.id)
        return graphQLResponse(OK, 'Fetched users successfully', singleUser)
      } catch (err) {
        const error = new ApiError({
          status: 'SINGLE_USERS',
          message: err.message
        })
        moduleErrLogMessager(error)
        return graphQLResponse(
          INTERNAL_SERVER_ERROR,
          GRAPHQL_ERROR_MSG
        )
      }
    }

    // TODO: Add more resolver
  },
  Mutation: {
    addNewUser (_, args, ctx, info) {
      try {
        return graphQLResponse(OK, ' user added ', { ...args.data })
      } catch (err) {
        const error = new ApiError({
          status: 'ADD_USER',
          message: err.message
        })
        moduleErrLogMessager(error)
        return graphQLResponse(
          INTERNAL_SERVER_ERROR,
          GRAPHQL_ERROR_MSG
        )
      }
    }
  },
  User: {
    post: ({ id }, { limit }, { loaders }) => loaders.postsLoader.load(id)
  }
}

export default userResolvers
