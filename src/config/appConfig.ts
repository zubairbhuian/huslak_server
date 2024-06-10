import dotenv from 'dotenv';
dotenv.config();


const isDevMode:boolean = true



const port = process.env.PORT
const databaseUrl = process.env.database_url
const defaultPassword = process.env.DEFAULT_STUDENT_PASSWORD
const jwtSecretKey = process.env.JWT_SECRET_KEY
const tokenExpiresIn = process.env.TOKEN_EXPIRES_IN


export const AppConfig = {
    isDevMode, port, databaseUrl, defaultPassword, jwtSecretKey, tokenExpiresIn
}



