export type IGenericError = {
  path: string | number
  message: string
}
export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericError[]
}
