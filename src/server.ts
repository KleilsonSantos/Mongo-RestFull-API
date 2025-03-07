import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

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
