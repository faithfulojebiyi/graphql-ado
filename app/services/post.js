import DataLoader from 'dataloader'
import queries from '../db/queries'
import db from '../db'

/**
 * Contains a collection of service methods for managing Post resource on the app.
 * @class PostService
 */
class PostService {
  /**
   * Fetches the use by id
   * @param {string} userIds - Th user id to be fetched
   * @returns {Promise<Array<User> | Error> } - A promise that resolves or rejects
   * witj the user resource of DB Error
   */
  static async postByUserIds (userIds) {
    const posts = await db.manyOrNone(queries.getUserPosts, [userIds])
    return userIds.map((el) => posts.filter((n) => n.userId === el))
  }

  /**
   *
   * @returns { Object } - DataLoader
   */
  static postsDataLoader () {
    return new DataLoader(PostService.postByUserIds)
  }
}

export default PostService
