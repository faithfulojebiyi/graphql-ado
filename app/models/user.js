import db from '../db'
import queries from '../db/queries'
import { helpers, constants, DBError } from '../utils'

const { CREATE_USER_ERROR } = constants
const { insertUser } = queries
const { ResponseHelper: { moduleErrLogMessager, generateId } } = helpers

/**
 * Contains a schema that describes the User resource on the app.
 * @class UserModel
 */
class UserModel {
  /**
   * This is a constructor for creating a User
   * @param { Object } options - contains the required properties for creating a User instance
   * @returns { UserModel } - An instance of the User Model.
   * @constructor UserModel
   */
  constructor (options) {
    this.id = generateId()
    this.firstname = options.firstname
    this.lastname = options.lastname
    this.isactive = options.isactive
  }

  /**
   *Persists a new User to the DB.
   * @memberof UserModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   */
  async save () {
    try {
      return db.one(insertUser, [
        this.id,
        this.firstname,
        this.lastname,
        this.isactive
      ])
    } catch (e) {
      const dbError = new DBError({
        status: CREATE_USER_ERROR,
        message: e.message
      })
      moduleErrLogMessager(dbError)
      throw dbError
    }
  }
}

module.exports = UserModel
