

import jwt from 'jsonwebtoken';
import { AppConfig } from '../../config/appConfig';


const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, `${AppConfig.jwtSecretKey}`, { expiresIn: AppConfig.tokenExpiresIn });
};

export const JWTHelper = { generateToken }
