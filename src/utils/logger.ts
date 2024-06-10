import path from 'path'
import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
const { combine, timestamp, label, printf } = format

const myFormat = printf(({ timestamp, level, message, label }) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  //make hours in 12 hours format with AM/PM
  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
  const am_pm = date.getHours() >= 12 ? 'PM' : 'AM'
  return `${year}-${month}-${day} (${hours}${am_pm})[${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'zb' }), timestamp(), myFormat),
  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'zb-%DATE%-success.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '10d',
    }),
  ],
})
const erLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'zb' }), timestamp(), myFormat),
  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'error',
        'zb-%DATE%-error.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: myFormat,
    })
  )
  erLogger.add(
    new transports.Console({
      format: myFormat,
    })
  )
}
export { logger, erLogger }
