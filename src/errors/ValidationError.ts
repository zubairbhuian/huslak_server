import mongoose from 'mongoose'
import {
  IGenericError,
  IGenericErrorResponse,
} from '../interfaces/errorsInterfaces'

const ValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors = Object.values(err.errors).map((el): IGenericError => {
    return {
      path: el.path,
      message: el.message,
    }
  })
  return {
    statusCode: 400,
    message: 'something is not right',
    errorMessages: errors,
  }
}

export default ValidationError
