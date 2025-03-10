import { Logger } from "../config/logger";
import { MovieModel } from "../model/Movie";
import { Request, Response, NextFunction } from "express";

const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const movieData = req.body;
    if (!movieData) {
      res.status(400).json({ message: "Movie not found" });
    }

    const movie = await MovieModel.create(movieData);
    Logger.info("✅ Creating movie", movie);

    res
      .status(201)
      .json({ message: "Movie created with success!", data: { movie } });
  } catch (error) {
    next(error);
  }
};

const getMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const movieId = req.params.id;
    const movie = await MovieModel.findById(movieId);

    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
    }

    Logger.info("✅ Getting movie by id", movie);
    res.status(200).json({ data: { movie } });
  } catch (error) {
    next(error);
  }
};

const updateMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const movieId = req.params.id;
    const movieData = req.body;

    const updatedMovie = await MovieModel.findByIdAndUpdate(movieId, movieData);

    if (!updatedMovie) {
      res.status(404).json({ message: "Movie not found" });
    }

    Logger.info("✅ Movie updated:", updatedMovie);
    res.status(200).json({ data: { movie: updatedMovie } });
  } catch (error) {
    next(error);
  }
};
const getAllMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const movies = await MovieModel.find();

    if (!movies) {
      res.status(404).json({ message: "No movies found" });
    }

    Logger.info("✅ Movies retrieved:", movies);
    res.status(200).json({ data: { movies } });
  } catch (error) {
    next(error);
  }
};

const deleteMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const movieId = req.params.id;
    const movie = await MovieModel.findById(String(movieId));

    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
    }

    await MovieModel.findByIdAndDelete(movieId);
    Logger.info("✅ Movie deleted:", movie);

    res
      .status(200)
      .json({ message: "Movie deleted successfully", data: { movie } });
  } catch (error) {
    next(error);
  }
};

export {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
};
