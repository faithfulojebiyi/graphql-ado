import express from 'express'
import { appConfig, Logger } from './config'
import config from './config/env'
import { ApolloServer } from 'apollo-server-express'
import { resolvers, typeDefs } from './app/graphql'
import { PostService } from './app/services'
import db from './app/db'

global.logger = Logger.createLogger({ label: 'GRAPHQL_ADO' })

const { postsDataLoader } = PostService

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    req,
    loaders: {
      notesLoader: postsDataLoader()
    }
  })
})

const app = express()

appConfig(app, server)
const port = config.PORT || 3000
// server listens for connections
db.connect()
  .then(() => {
    app.listen({ port }, () => {
      logger.info(`🚀🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    })
  })
  .catch((error) => {
    logger.error(error.message)
    process.exit(1)
  })

export default app
