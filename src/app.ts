import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { allRoutes } from './routes';
import globalErrorsHandler from './utils/globalErrorHandler';

// Create Express server
const app: Application = express()

// Serve static files from the 'public' directory
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Parse URL-encoded bodies
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 100, // 1 minute
  max: 30,
  message: "Too many reuests from this IP",
});

app.use(rateLimiter);
app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// test route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the -> zb ut _server -id: 1.0.0',
  })
})

// import routes
app.use('/api/v1/', allRoutes)

// global error handler
app.use(globalErrorsHandler)

//handel not found :
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'api not found',
      },
    ],
  })
})

export default app
