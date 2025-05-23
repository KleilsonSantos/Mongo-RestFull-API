import { Movie } from '../interfaces/Movie.interface';
import { MovieModel } from '../model/Movie';
import { PartialMovie } from '../types/partial-movie.type';

export class MovieService {
  async getMovieById(id: string): Promise<PartialMovie | null> {
    const resultMovie = Promise.resolve(MovieModel.findById(id).lean());
    const movie = await resultMovie;

    return movie ?? null;
  }

  async createMovie(data: Movie): Promise<PartialMovie> {
    const movie = await MovieModel.create(data);
    return movie;
  }
}
