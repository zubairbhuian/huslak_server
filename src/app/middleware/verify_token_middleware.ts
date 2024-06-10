import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import ApiErrors from "../../errors/ApiErrors";
import { config } from "dotenv";
import { AppConfig } from "../../config/appConfig";

// Extend Request interface to include userId property
interface AuthenticatedRequest extends Request {
  userId?: string;
}
const verifyToken = catchAsync(async (req: AuthenticatedRequest, res, next) => {
  if (!AppConfig.isDevMode) {
    const token = req.headers['authorization'];
    if (!token) {
      throw new ApiErrors(403, 'Token not provided');
    }
    jwt.verify(token, `${AppConfig.jwtSecretKey}`, (err, decoded) => {
      if (err) {
        throw new ApiErrors(400, 'Invalid token');
      }
      req.userId = (decoded as JwtPayload).userId as string;
      next();
    });
  }
  next();
})

export default verifyToken;