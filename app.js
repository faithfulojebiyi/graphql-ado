import express from 'express'
import { appConfig, Logger } from './config'

global.logger = Logger.createLogger({ label: 'GRAPHQL_ADO' })

const app = express()

appConfig(app)

export default app
