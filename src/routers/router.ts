import express from "express";
import {
  createMovie,
  deleteMovieById,
  getAllMovies,
  getMovieById,
  updateMovieById,
} from "../controllers/movie-controller";
import authMiddleware from "../middlewares/authMiddleware";

// Create a router object
const router = express.Router();

// Create routes
router.get("/movies", authMiddleware, getAllMovies);
router.post("/movies", authMiddleware, createMovie);
router.get("/movies/:id", authMiddleware,getMovieById);
router.put("/movies/:id", authMiddleware, updateMovieById);
router.delete("/movies/:id", authMiddleware,deleteMovieById);

export { router };
