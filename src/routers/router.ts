import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import getAllMetrics from '../controllers/metrics-controller';
import { metricsMiddleware } from '../middlewares/metrics.middleware';

import {
  createUser,
  getAllUsers,
  userLogin,
  getUserById,
  updateUserById,
  deleteUserById,
  testErrorMiddleware,
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
router.post('/create/user', authMiddleware, createUser); // ➕ Create user
router.get('/users', authMiddleware, getAllUsers); // 📋 Get all users
router.get('/users/:id', authMiddleware, getUserById); // 🔍 Get user by ID
router.put('/users/:id', authMiddleware, updateUserById); // ✏️ Update user by ID
router.delete('/users/:id', authMiddleware, deleteUserById); // 🗑️ Delete user by ID

// 🎬 Movie routes (authentication required)
router.post('/create/movie', authMiddleware, createMovie); // ➕ Add new movie
router.get('/movies', authMiddleware, getAllMovies); // 🎥 Get all movies
router.get('/movies/:id', authMiddleware, getMovieById); // 🔍 Get movie by ID
router.put('/movies/:id', authMiddleware, updateMovieById); // ✏️ Update movie by ID
router.delete('/movies/:id', authMiddleware, deleteMovieById); // 🗑️ Delete movie by ID

// 🛠️ Error handling middleware
router.get('/test-error', testErrorMiddleware); // ❌ Test error handling

// 📊 Metrics route
router.get('/metrics', getAllMetrics);

export { router };
