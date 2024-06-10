import { Server } from 'http'
import app from './app'
import connectToMongoDB from './utils/databaseMongoDb'
import { erLogger, logger } from './utils/logger'
import { AppConfig } from './config/appConfig'

process.on('uncaughtException', err => {
  // eslint-disable-next-line no-console
  console.log('uncaughtException is detected ...')
  erLogger.error(err)
  process.exit(1)
})

let server: Server
const connectServer = async () => {
  const port = AppConfig.port
  try {
    if (!port) {
      erLogger.error('Server connection failed: no port provided')
      return
    }
    connectToMongoDB()
    server = app.listen(port, () =>
      logger.info(` 🔗 Server is running on port ${port}`)
    )
  } catch (error) {
    erLogger.error(`Error: ${error}`)
  }

  process.on('unhandledRejection', err => {
    // eslint-disable-next-line no-console
    console.log('unhandledRejection happened :( we are closing our server')
    erLogger.error(err)
    if (server) {
      server.close(() => {
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
connectServer()

