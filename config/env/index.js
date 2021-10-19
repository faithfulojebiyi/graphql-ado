import rootPath from 'app-root-path'
import 'dotenv/config'

const { PORT, GRAPHQL_NODE_ENV: NODE_ENV } = process.env

export default {
  ...process.env,
  rootPath,
  PORT,
  NODE_ENV
}
