import { MovieModel } from '../../../model/Movie';
import { connect, disconnect } from '../../../config/db';
import { Movie } from '../../../interfaces/Movie.interface';
import { PartialMovie } from '../../../types/partial-movie.type';
import { MovieService } from '../../../services/movie.service';

jest.mock('../../../model/Movie', () => ({
  MovieModel: {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

jest.mock('../../../config/db', () => ({
  connect: jest.fn().mockResolvedValue(true),
  disconnect: jest.fn(),
  Error: jest.fn(),
}));

describe('MovieService', () => {
  let movieService: MovieService;

  beforeAll(async () => {
    await connect();
    movieService = new MovieService();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createMovie', () => {
    const foundMovie: PartialMovie = {
      title: 'Inception',
      director: 'Christopher Nolan',
      genre: 'Sci-Fi',
      rating: 8.8,
    };

    it('should create a movie and return it', async () => {
      const createdMovie: Movie = {
        ...foundMovie,
      };

      (MovieModel.create as jest.Mock).mockResolvedValue(createdMovie);

      const result: Movie = await movieService.createMovie(foundMovie);

      expect(MovieModel.create).toHaveBeenCalledWith(foundMovie);
      expect(result).toEqual(createdMovie);
    });
  });

  describe('getMovieById', () => {
    const movieId = '12345';
    it('should return a movie by ID', async () => {
      const foundMovie: PartialMovie = {
        title: 'Inception',
        director: 'Christopher Nolan',
        genre: 'Sci-Fi',
        rating: 8.8,
      };

      (MovieModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(foundMovie),
      });

      const result = await movieService.getMovieById(movieId);

      expect(MovieModel.findById).toHaveBeenCalledWith(movieId);
      expect(result).toEqual(foundMovie);
    });

    it('should return null if no movie is found', async () => {
      (MovieModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });

      const result: Movie | null = await movieService.getMovieById(movieId);

      expect(MovieModel.findById).toHaveBeenCalledWith(movieId);
      expect(result).toBeNull();
    });
  });
});
