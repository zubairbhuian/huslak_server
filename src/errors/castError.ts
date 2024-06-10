import mongoose from "mongoose"
import { IGenericError } from "../interfaces/errorsInterfaces"

const castError = (error: mongoose.Error.CastError) => {

    const err: IGenericError[] = [
        {
            path: error.path,
            message: "invalid ID"
        }
    ]
    return {
        statusCode: 400,
        message: 'cast error',
        errorMessages: err,
    }
}
export default castError