import { json } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { helpers } from '../app/utils'
import config from './env'
const {
  ResponseHelper: { errorResponse },
  errorHelper: { notFoundApi }
} = helpers

const appConfig = async (app) => {
  app.use(json())
  app.use(cors())
  app.use(helmet())
  app.use(morgan('combined', { stream: logger.stream }))

  app.use((req, res, next) => {
    next(notFoundApi)
  })
  app.use((err, req, res, next) => errorResponse(req, res, err))
  const port = config.PORT || 3000
  // server listens for connections
  app.listen(port, () => {
    logger.info(`${'PATRONIZE'} ${port}`)
  })
}

export default appConfig
