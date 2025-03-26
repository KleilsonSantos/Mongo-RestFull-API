import * as http from 'http';
import request from 'supertest';
import { app } from '../server';
import { Logger } from '../config/logger';
import { mocked } from 'jest-mock';
import { MovieModel } from '../model/Movie'; // Adjust path
import { createMovie } from '../controllers/movie-controller';
import { Request, Response, NextFunction } from 'express';

// Mocking dependencies
jest.mock('./model/Movie');
jest.mock('./utils/logger');

jest.mock('../config/logger', () => ({
  Logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

describe('Movie Controller Tests', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;
  let server: http.Server;

  beforeAll(() => {
    server = http.createServer(app);
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      body: {
        title: 'Test Movie',
        rating: 4.5,
        description: 'Test Description',
        director: 'Test Director',
        genre: 'Test Genre',
        stars: ['Test Star 1', 'Test Star 2'],
        poster: 'test-poster.jpg',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should return a 400 if movie data is missing', async () => {
    req.body = null;

    await createMovie(req as Request, res as Response, next as NextFunction);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Movie not found' });
  });

  it('should create a movie and return 201 on success', async () => {
    const movieData = req.body;
    const createdMovie = { ...movieData, id: 1 };

    // Mocking MovieModel.create to return the movie
    mocked(MovieModel.create).mockResolvedValue(createdMovie);

    await createMovie(req as Request, res as Response, next);

    expect(MovieModel.create).toHaveBeenCalledWith(movieData);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Movie created with success!',
      data: { movie: createdMovie },
    });
    expect(Logger.info).toHaveBeenCalledWith('✅ Creating movie', createdMovie);
  });

  it('should call next if an error occurs', async () => {
    const error = new Error('Something went wrong');
    mocked(MovieModel.create).mockRejectedValue(error);

    await createMovie(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
  /* it('should return 200 and list of movies', async () => {
    const response = await request(server)
      .get('/api/v1/movies')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(Logger.info).toHaveBeenCalledWith('Movies retrieved successfully');
  });

  it('should return 201 when creating a new movie', async () => {
    const movieData = {
      title: 'Test Movie',
      rating: 4.5,
      description: 'Test Description',
      director: 'Test Director',
      genre: 'Test Genre',
      stars: ['Test Star 1', 'Test Star 2'],
      poster: 'test-poster.jpg',
    };

    const response = await request(server)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(Logger.info).toHaveBeenCalledWith('New movie created');
  });

  it('should return 400 when creating movie with invalid data', async () => {
    const invalidMovieData = {
      title: '',
      year: 'invalid'
    };

    const response = await request(server)
      .post('/api/v1/movies')
      .send(invalidMovieData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(Logger.error).toHaveBeenCalled();
  });

  it('should return 404 when movie not found', async () => {
    const response = await request(server)
      .get('/api/v1/movies/999')
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Movie not found' });
    expect(Logger.warn).toHaveBeenCalledWith('Movie not found with id: 999');
  });

  it('should return 200 when updating existing movie', async () => {
    const updateData = {
      title: 'Updated Movie Title'
    };

    const response = await request(server)
      .put('/api/v1/movies/1')
      .send(updateData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Movie Title');
    expect(Logger.info).toHaveBeenCalledWith('Movie updated successfully');
  }); */
});
