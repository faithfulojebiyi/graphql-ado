import { json } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { helpers } from '../app/utils'
const morgan = require('morgan')
const {
  ResponseHelper: { errorResponse },
  errorHelper: { notFoundApi }
} = helpers

const appConfig = async (app, server) => {
  app.use(json())
  app.use(cors())
  app.use(helmet())
  app.use(morgan('combined', { stream: logger.stream }))

  await server.start()
  server.applyMiddleware({ app, path: '/graphiql' })

  app.use((req, res, next) => {
    next(notFoundApi)
  })
  app.use((err, req, res, next) => errorResponse(req, res, err))
}

export default appConfig
