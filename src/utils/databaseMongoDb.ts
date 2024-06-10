import mongoose from 'mongoose'
import { erLogger, logger } from './logger'
import { AppConfig } from '../config/appConfig'

// Connect to MongoDB using Mongoose

const connectToMongoDB = async () => {
  const url = AppConfig.databaseUrl
  try {
    if (!url) {
      erLogger.error('MongoDB connection string not provided')
      return
    }
    await mongoose.connect(url).then(() => logger.info('🔍 MongoDB connected'))
  } catch (error) {
    erLogger.error(' MongoDB connection error:', error)
    process.exit(1)
  }
}
export default connectToMongoDB
