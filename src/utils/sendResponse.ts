import { Response } from 'express'

type IResponse<T> = {
    statusCode: number
    success: boolean
    message: string | null
    pagination?: {
        page: number
        limit: number
        total: number
        nextPage: number| null
        prevousPage: number| null
    }
    data: T | null
}
const sendResponse = <T>(res: Response, data: IResponse<T>): void => {
    const responseData: IResponse<T> = {
        success: data.success,
        statusCode: data.statusCode,
        message: data.message || null,
        pagination: data.pagination,
        data: data.data || null,
    }
    res.status(data.statusCode).json(responseData)
}
export default sendResponse
