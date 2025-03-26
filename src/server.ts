<<<<<<< Updated upstream
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
=======
import dotenv from 'dotenv';
import { connect } from './config/db';
import { Logger } from './config/logger';
import { router } from './routers/router';
import { morganMiddleware } from './middlewares/morgan-middleware';
import { generateToken, UserRole } from './utils/generate-token';
import express, { Express, NextFunction, Request, Response } from 'express';
import { metricsMiddleware } from './middlewares/metrics-middleware';
>>>>>>> Stashed changes

// 📌 Load environment variables from .env file
dotenv.config();

<<<<<<< Updated upstream
// Define port
const port: string | number = process.env.PORT || 3000;
const apiUrl :string | undefined = process.env.API_URL;

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Create schema
const schema: any = new mongoose.Schema({
  title: String,
  rating: Number,
  description: String,
  director: String,
  genre: String,
  stars: Number,
  poster: String,
});

// Create model
const Movie: any = mongoose.model("Movie", schema);

// Connect to MongoDB
async function connect() {
  const dbDocker:string | undefined = process.env.MONGODB_URI;
  const dbDockerUri:string = `${dbDocker}`
  try {
    await mongoose.connect(dbDockerUri);
    console.log("Connected with success to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}


// Get all movies
async function getMovies() {
  const movies = await Movie.find();
  return movies;
}

// Create movie
async function createMovie(){
  const movie = new Movie({
    title: "Avatar",
    rating: 7.8,
    description: "A marine on an alien planet",
    director: "James Cameron",
    genre: "Action",
    stars: 5,
    poster: "https://m.media-amazon.com/images/M/MV5BMjA0NzE1Njg4OV5BMl5BanBnXkFtZTgwODA0NjQ3MTE@._V1_SX300.jpg",
  })
  await movie.save();
  console.log("Movie created with success!");
}

// Routes
// Create a movie
app.post(
  apiUrl + "/movies",(req:Request,res:Response,next:NextFunction)=>{
    try {
      createMovie();
      res.status(201).json({message:"Movie created with success!"});
    } catch (error) {
      next(error);
    }
  }
);
// Get all movies
app.get(
  apiUrl + "/movies",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const movies = await getMovies();
      if (movies.length === 0) {
        res.status(404).json({ message: "No movies found" });
      } else {
        res.status(200).send({ data: { movies: movies } });
      }
    } catch (error) {
      next(error);
    }
  }
);

// Initialize server on port
app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});
=======
// 🌍 Get environment variables
const port: string | number = process.env.PORT || 3000;
const apiUrl: string | undefined = process.env.API_URL || '/api/v1';
const localhost: string | undefined = process.env.LOCALHOST || 'localhost';

// 🚀 Create an Express application
export const app: Express = express();

// 🛑 Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error('❌ Unhandled error:', err);
  res.status(500).json({ message: '⚠️ Internal Server Error' });
  next();
});

// 🔌 Connect to MongoDB before starting the server
connect()
  .then(() => {
    startServer();
  })
  .catch((error) => {
    Logger.error('❌ Database connection error:', error);
    process.exit(1); // 🔄 Exit process if the database connection fails
  });

// 🛠️ Middleware setup
app.use(express.json()); // 📄 Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // 🔄 Parse URL-encoded data
app.use(metricsMiddleware); // 📊 Collect and expose metrics
app.use(morganMiddleware); // 📜 Log HTTP requests
app.use(apiUrl, router); // 🌐 Use main router for API endpoints

// 🎯 Function to start the server
const startServer = (): void => {
  app.listen(port, () => {
    Logger.info(`🚀 Server running on ${localhost}:${port}${apiUrl}`);
    Logger.info(`🔑 Token generated: 
      ${generateToken({
      id: '123',
      email: 'user@example.com',
      role: UserRole.ADMIN,
    })}`);
  });
};
>>>>>>> Stashed changes
