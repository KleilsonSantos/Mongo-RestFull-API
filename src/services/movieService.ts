import { Logger } from "../config/loggers";
import { MovieInput } from "../../model/MovieInput";
import { MovieModel } from "../model/Movie";

// The createMovieService function creates a new movie in the database.
const createMovieService = async (inputMovie: MovieInput) => {
  try {
    const movie = new MovieModel(inputMovie);
    await movie.save();
    return movie;
  } catch (error) {
    Logger.error("Error creating movie:", error);
  }
};

// The getAllMoviesService function retrieves all movies from the database.
const getAllMoviesService = async () => {
  try {
    const movies = await MovieModel.find();
    return movies;
  } catch (error) {
    Logger.error("Error getting movies:", error);
  }
};

const getMovieByIdService = async (movieId: string) => {
  try {
    const movie = await MovieModel.findById(String(movieId));
    return movie;
  } catch (error) {
    Logger.error("Error getting movie by id:", error);
  }
};

const updateMovieByIdService = async (
  movieId: string,
  movieInput: MovieInput
) => {
  try {
    const movie = await MovieModel.findByIdAndUpdate(movieId, movieInput);
  } catch (error) {
    Logger.error("Error updating movie by id:", error);
  }
};

const deleteMovieByIdService = async (movieId: string) => {
  try {
    const movie = await MovieModel.findByIdAndDelete(movieId);
    return movie;
  } catch (error) {
    Logger.error("Error deleting movie by id:", error);
  }
};

export {
  getAllMoviesService,
  createMovieService,
  getMovieByIdService,
  updateMovieByIdService,
  deleteMovieByIdService,
};
