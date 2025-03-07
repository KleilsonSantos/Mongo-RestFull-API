import express from "express";
import {
  createMovie,
  deleteMovieById,
  getAllMovies,
  getMovieById,
  updateMovieById,
} from "../controllers/movieControlller";

// Create a router object
const router = express.Router();

// Create routes
router.get("/movies", getAllMovies);
router.post("/movies", createMovie);
router.get("/movies/:id", getMovieById);
router.put("/movies/:id", updateMovieById);
router.delete("/movies/:id", deleteMovieById);

export { router };
