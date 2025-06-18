import './config/load-env';
import express from 'express';
import setupSwagger from './config/swagger';
import { router } from './routers/router';
import { errorMiddleware } from './middlewares/error.middleware';
import { morganMiddleware } from './middlewares/morgan.middleware';

// 🌍 Get environment variables
const apiUrl: string | undefined = process.env.API_URL ?? '/api/v1';

// 🚀 Create an Express application
const app = express();

// 🛠️ Middleware setup
app.use(express.json()); // 📄 Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // 🔄 Parse URL-encoded data
app.use(morganMiddleware); // 📜 Log HTTP requests
app.use(apiUrl, router); // 🌐 Use main router for API endpoints

// 📊 Swagger
setupSwagger(app);

// ⚠️ Global Middleware error handling
app.use(errorMiddleware);

export default app;
