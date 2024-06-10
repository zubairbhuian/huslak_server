import { ErrorRequestHandler } from 'express'
import ApiErrors from '../errors/ApiErrors'
import ValidationError from '../errors/ValidationError'
import castError from '../errors/castError'
import { IGenericError } from '../interfaces/errorsInterfaces'
import { erLogger } from './logger'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorsHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500
  let message = 'something is not right'
  let errorMessages: IGenericError[] = []

  if (error.name === 'ValidationError') {
    const structureError = ValidationError(error)
    statusCode = structureError.statusCode
    message = structureError.message
    errorMessages = structureError.errorMessages
  } else if (error?.name === "CastError") {
    const structureError = castError(error)
    statusCode = structureError.statusCode
    message = structureError.message
    errorMessages = structureError.errorMessages

  }
  else if (error instanceof ApiErrors) {
    statusCode = error?.status
    message = error?.message
    errorMessages = error?.message
      ? [
        {
          path: '',
          message: error.message,
        },
      ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
        {
          path: '',
          message: error.message,
        },
      ]
      : []
  }
  erLogger.error(error.message)

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: error.stack,
  })

}
export default globalErrorsHandler
