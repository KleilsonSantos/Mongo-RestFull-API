import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  createUser,
  getAllUsers,
  userLogin,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/user-controller";
import {
  createMovie,
  deleteMovieById,
  getAllMovies,
  getMovieById,
  updateMovieById,
} from "../controllers/movie-controller";

// Create a router object
const router = express.Router();

// User routes
router.post("/login", userLogin);
router.post("/create", authMiddleware, createUser);
router.post("/users", authMiddleware, getAllUsers);
router.get("/users/:id", authMiddleware, getUserById);
router.put("/users/:id", authMiddleware, updateUserById);
router.delete("/users/:id", authMiddleware, deleteUserById);

// Movie routes
router.post("/movies", authMiddleware, getAllMovies);
router.post("/movies", authMiddleware, createMovie);
router.get("/movies/:id", authMiddleware, getMovieById);
router.put("/movies/:id", authMiddleware, updateMovieById);
router.delete("/movies/:id", authMiddleware, deleteMovieById);

export { router };
