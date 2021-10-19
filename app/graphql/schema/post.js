import { gql } from 'apollo-server-express'

const Post = gql`
  type Post {
    id: ID
    content: String
    ispublished: Boolean
    userid: String
  }
`

export default Post
