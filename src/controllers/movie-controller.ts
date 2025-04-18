import Logger from '../config/logger';
import { MovieModel } from '../model/Movie';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

// ⚙️ Load environment variables from .env file

// 🎬 Create a new movie
const createMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      Logger.error('❌ Validation error:', errors.array());
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const movieData = req.body;

    // 💾 Create movie in database
    const resolveMovie = Promise.resolve(MovieModel.create(movieData));
    const movie = await resolveMovie;

    Logger.info('✅ Creating movie', movie);
    res.status(201).json({ message: 'Movie created with success! 🎉', data: { movie } });
  } catch (error) {
    Logger.error('❌ Error creating movie', error);
    res.status(500).json({ message: '❌ Internal Server Error' });
    next(error);
  }
};

// 🎥 Get movie by ID
const getMovieById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movieId = req.params.id;

    const resolveMovieId = Promise.resolve(MovieModel.findById(movieId).lean());
    const movie = await resolveMovieId;

    if (!movie) {
      Logger.error('❌ Movie not found');
      res.status(404).json({ message: 'Movie not found' });
      return;
    }

    Logger.info('✅ Getting movie by id', movie);
    res.status(200).json({ data: { movie } });
  } catch (error) {
    Logger.error('❌ Internal Server Error', error);
    res.status(500).json({ message: '❌ Internal Server Error' });
    next(error);
  }
};

// 🔄 Update movie by ID
const updateMovieById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movieId = req.params.id;
    const movieData = req.body;

    const resolveUpdate = Promise.resolve(MovieModel.findByIdAndUpdate(movieId, movieData));
    const updatedMovie = await resolveUpdate;

    if (!updatedMovie) {
      Logger.error('❌ Movie not found');
      res.status(404).json({ message: 'Movie not found' });
      return;
    }

    const resolveMovie = Promise.resolve(MovieModel.findById(movieId).lean());
    const movie = await resolveMovie;

    Logger.info('✅ Movie updated:', movie);
    res.status(200).json({ data: { movie: movie } });
  } catch (error) {
    Logger.error('❌ Error updating movie by id', error);
    res.status(500).json({ message: '❌ Internal Server Error' });
    next(error);
  }
};

// 🎞️ Get all movies
const getAllMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const resolveMovies = Promise.resolve(MovieModel.find());
    const movies = await resolveMovies;

    if (!movies) {
      Logger.error('❌ No movies found');
      res.status(404).json({ message: 'No movies found' });
      return;
    }

    Logger.info('✅ Movies retrieved:', movies);
    res.status(200).json({ data: { movies } });
  } catch (error) {
    Logger.error('❌ Error getting movies', error);
    res.status(500).json({ message: '❌ Internal Server Error' });
    next(error);
  }
};

// 🗑️ Delete movie by ID
const deleteMovieById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      Logger.error('❌ Validation error:', errors.array());
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const movieId = req.params.id;
    const resolveMovieId = Promise.resolve(MovieModel.findById(String(movieId)).lean());
    const movie = await resolveMovieId;

    if (!movie) {
      Logger.error('❌ Movie not found');
      res.status(404).json({ message: 'Movie not found' });
      return;
    }

    const resolveDelete = Promise.resolve(MovieModel.findByIdAndDelete(movieId));
    await resolveDelete;

    Logger.info('✅ Movie deleted:', movie);
    res.status(200).json({ message: 'Movie deleted successfully', data: { movie } });
  } catch (error) {
    Logger.error('❌ Error getting movie by id', error);
    res.status(500).json({ message: '❌ Internal Server Error' });
    next(error);
  }
};

export { createMovie, getAllMovies, getMovieById, updateMovieById, deleteMovieById };
