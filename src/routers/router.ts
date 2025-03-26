import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { metricsMiddleware } from '../middlewares/metrics-middleware';

import {
  createUser,
  getAllUsers,
  userLogin,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/user-controller';

import {
  createMovie,
  deleteMovieById,
  getAllMovies,
  getMovieById,
  updateMovieById,
} from '../controllers/movie-controller';

const router = express.Router();

// 📊 Apply metrics tracking globally to all routes
router.use(metricsMiddleware);

// 🔐 Authentication routes
router.post('/login', userLogin); // 🏷️ User login

// 👤 User routes (authentication required)
router.post('/create', authMiddleware, createUser); // ➕ Create user
router.get('/users', authMiddleware, getAllUsers); // 📋 Get all users
router.get('/users/:id', authMiddleware, getUserById); // 🔍 Get user by ID
router.put('/users/:id', authMiddleware, updateUserById); // ✏️ Update user by ID
router.delete('/users/:id', authMiddleware, deleteUserById); // 🗑️ Delete user by ID

// 🎬 Movie routes (authentication required)
router.get('/movies', authMiddleware, getAllMovies); // 🎥 Get all movies
router.post('/movies', authMiddleware, createMovie); // ➕ Add new movie
router.get('/movies/:id', authMiddleware, getMovieById); // 🔍 Get movie by ID
router.put('/movies/:id', authMiddleware, updateMovieById); // ✏️ Update movie by ID
router.delete('/movies/:id', authMiddleware, deleteMovieById); // 🗑️ Delete movie by ID

export { router };
