import { gql } from 'apollo-server-express'

const User = gql`
  # DATA TYPES
  type User {
    id: ID!
    firstname: String
    lastname: String
    isactive: Boolean
    post(limit: Int): [Post]
  }
  # RESPONSE TYPES
  type UsersResponse {
    status: Int!
    message: String!
    data: [User]
  }
  type UserResponse {
    status: Int!
    message: String!
    data: User
  }
  # Input
  input AddNewUserInput {
    id: String
    firstname: String
    lastname: String
    isactive: Boolean
  }
  # Query
  extend type Query {
    getAllUsers: UsersResponse!
    getUserById(id: String): UserResponse!
  }
  # mutation
  extend type Mutation {
    addNewUser(data: AddNewUserInput!): UserResponse!
  }
`

export default User
