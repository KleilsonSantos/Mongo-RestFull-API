import dotenv from 'dotenv';
import request from 'supertest';
import Logger from '../config/logger';
import mongoose from 'mongoose';
import { app } from '../server/server';
import { server } from '../index';
import { disconnect } from '../config/db';
import { MovieModel } from '../model/Movie';
import { validationResult } from 'express-validator';
import { generateMockToken } from './mocks/validate-token.mock';
import { mockValidationErrorMessage, mockValidationSuccess } from './mocks/validation.mock';
import {
  movieExample,
  requestCreatingMovie,
  requestValidationError,
  responseAllMovies,
  responseBody,
  responseCreateMovie,
  responseCreateMovieError,
  responseDeleted,
  responseDeleteMovieNotFound,
  responseMovieById,
  responseMovieByIdError,
  responseMovieByIdNotFound,
  responseMovieError,
  responseMovieNotFound,
  responseUpdateMovieError,
  updatedMovie,
} from './mocks/movie.mock';

dotenv.config();

jest.mock('../model/Movie');

jest.mock('../config/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

jest.mock('../config/db', () => ({
  connect: jest.fn().mockResolvedValue(true),
  disconnect: jest.fn(),
}));

const token = generateMockToken();

describe('🎬 User Controller Tests', () => {
  afterAll(async () => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    await mongoose.disconnect();
    await disconnect();
    server.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('🎥 POST /api/v1/movies', () => {
    it('🔍 should return 400 when required movie fields are missing', async () => {
      (validationResult as unknown as jest.Mock).mockReturnValue(mockValidationErrorMessage());

      const response = await request(app)
        .post('/api/v1/movies')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(response.status).toBe(400);
      expect((Logger.error as jest.Mock).mock.calls[0][1][0].msg).toEqual('🎬 Title is required');
    });

    it('✅ should return 201 when movie is successfully created', async () => {
      (validationResult as unknown as jest.Mock).mockReturnValue(mockValidationSuccess());

      (MovieModel.create as jest.Mock).mockResolvedValue(movieExample);

      const response = await request(app)
        .post('/api/v1/movies')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(movieExample);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(responseCreateMovie);
      expect((Logger.info as jest.Mock).mock.calls[2][0]).toEqual(
        expect.stringContaining(requestCreatingMovie),
      );
    });

    it('🚫 should return 400 when validation error occurs', async () => {
      (validationResult as unknown as jest.Mock).mockReturnValue(mockValidationErrorMessage());

      const response = await request(app)
        .post('/api/v1/movies')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toEqual('🎬 Title is required');
      expect((Logger.info as jest.Mock).mock.calls[0][0]).toEqual(
        expect.stringContaining(requestValidationError),
      );
    });

    it('💣 should return 500 when a database error occurs during movie creation', async () => {
      (validationResult as unknown as jest.Mock).mockReturnValue(mockValidationSuccess());
      (MovieModel.create as jest.Mock).mockRejectedValue(new Error('DB Failure'));

      const validMovie = {
        title: 'Movie 1',
        rating: 8.5,
        description: 'Description 1',
        director: 'Director 1',
        genre: 'Action',
        stars: ['Actor 1', 'Actor 2'],
        poster: 'poster1.jpg',
      };

      const response = await request(app)
        .post('/api/v1/movies')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(validMovie);

      expect(response.status).toBe(500);
      expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual(responseCreateMovieError);
    });
  });

  describe('🎞️ GET /api/v1/movies', () => {
    it('✅ should return 200 and list all movies', async () => {
      (MovieModel.find as jest.Mock).mockResolvedValue([
        {
          title: 'Movie 1',
          rating: 8.5,
          description: 'Description 1',
          director: 'Director 1',
          genre: 'Action',
          stars: ['Actor 1', 'Actor 2'],
          poster: 'poster1.jpg',
        },
      ]);

      const response = await request(app)
        .get('/api/v1/movies')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect((Logger.info as jest.Mock).mock.calls[2][0]).toEqual(
        expect.stringContaining(responseAllMovies),
      );
      expect(response.body).toEqual(responseBody);
    });

    it('❌ should return 404 when no movies are found', async () => {
      (MovieModel.find as jest.Mock).mockResolvedValue(null);
      (Logger.error as jest.Mock).mockReturnThis();

      const response = await request(app)
        .get('/api/v1/movies')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'No movies found' });
      expect((Logger.info as jest.Mock).mock.calls[0][0]).toEqual(
        expect.stringContaining(responseMovieNotFound),
      );
    });

    it('💥 should return 500 when a database error occurs while retrieving movies', async () => {
      (MovieModel.find as jest.Mock).mockRejectedValue(new Error('DB Failure'));
      (Logger.error as jest.Mock).mockReturnThis();

      const response = await request(app)
        .get('/api/v1/movies')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(500);
      expect((Logger.info as jest.Mock).mock.calls[0][0]).toEqual(
        expect.stringContaining(responseMovieError),
      );
    });
  });

  describe('🎯 GET /api/v1/movies/:id', () => {
    it('🎯 should return 200 when retrieving movie by valid id', async () => {
      (MovieModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({
          _id: '1',
          title: 'Movie 1',
          rating: 8.5,
          description: 'Description 1',
          director: 'Director 1',
          genre: 'Action',
          stars: ['Actor 1', 'Actor 2'],
          poster: 'poster1.jpg',
        }),
      });

      const response = await request(app)
        .get('/api/v1/movies/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data.movie.title).toBe('Movie 1');
      expect((Logger.info as jest.Mock).mock.calls[0][0]).toEqual(responseMovieById);
    });

    it('🔍 should return 404 when retrieving a movie by non-existent id', async () => {
      (MovieModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockReturnValue(null),
      });

      const response = await request(app)
        .get('/api/v1/movies/1213')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual(responseMovieByIdNotFound);
    });

    it('💣 should return 500 when a database error occurs while retrieving movie by id', async () => {
      (MovieModel.findById as jest.Mock).mockImplementation(() => ({
        lean: () => Promise.reject(new Error('DB Failure')),
      }));

      const response = await request(app)
        .get('/api/v1/movies/1213')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(500);
      expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual('❌ Internal Server Error');
    });
  });

  describe('📝 PUT /api/v1/movies/:id', () => {
    it('🔍 should return 404 when updating a movie by non-existent id', async () => {
      (MovieModel.findByIdAndUpdate as jest.Mock).mockReturnValue(null);

      const response = await request(app)
        .put('/api/v1/movies/1213')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual(responseDeleteMovieNotFound);
    });

    it('✅ should return 200 and update movie with findByIdAndUpdate', async () => {
      (MovieModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({
          _id: '1',
          title: 'Movie 10',
          rating: 10,
          description: 'Description 10',
          director: 'Director 10',
          genre: 'Action',
          stars: ['Actor 10', 'Actor 20'],
          poster: 'poster2.jpg',
        }),
      });

      (MovieModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        _id: '1',
        title: 'Movie 10',
        rating: 10,
        description: 'Description 10',
        director: 'Director 10',
        genre: 'Action',
        stars: ['Actor 10', 'Actor 20'],
        poster: 'poster2.jpg',
      });

      const response = await request(app)
        .put('/api/v1/movies/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          _id: '1',
          title: 'Movie 10',
          rating: 10,
          description: 'Description 10',
          director: 'Director 10',
          genre: 'Action',
          stars: ['Actor 10', 'Actor 20'],
          poster: 'poster2.jpg',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.movie.title).toBe('Movie 10');
      expect((Logger.info as jest.Mock).mock.calls[0]).toEqual(updatedMovie);
    });

    it('💥 should return 500 when a database error occurs during movie update', async () => {
      (MovieModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({
          _id: '1',
          title: 'Movie 1',
          rating: 8.5,
          description: 'Description 1',
          director: 'Director 1',
          genre: 'Action',
          stars: ['Actor 1', 'Actor 2'],
          poster: 'poster1.jpg',
        }),
      });
      (MovieModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('DB Failure'));
      (Logger.error as jest.Mock).mockReturnThis();
      const response = await request(app)
        .put('/api/v1/movies/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(500);
      expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual(responseUpdateMovieError);
    });
  });

  describe('🗑️ DELETE /api/v1/movies/:id', () => {
    it('✅ should return 200 when movie is deleted successfully', async () => {
      (MovieModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({
          _id: '1',
          title: 'Movie 1',
          rating: 8.5,
          description: 'Description 1',
          director: 'Director 1',
          genre: 'Action',
          stars: ['Actor 1', 'Actor 2'],
          poster: 'poster1.jpg',
        }),
      });

      (MovieModel.findByIdAndDelete as jest.Mock).mockResolvedValue(true);

      const response = await request(app)
        .delete('/api/v1/movies/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data.movie.title).toBe('Movie 1');
      expect((Logger.info as jest.Mock).mock.calls[0]).toEqual(responseDeleted);
    });

    it('🔍 should return 404 when deleting a movie by non-existent id', async () => {
      (MovieModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });

      const response = await request(app)
        .delete('/api/v1/movies/1213')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual(responseDeleteMovieNotFound);
    });

    it('💣 should return 500 when a database error occurs during movie deletion', async () => {
      (MovieModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({
          _id: '1',
          title: 'Movie 1',
          rating: 8.5,
          description: 'Description 1',
          director: 'Director 1',
          genre: 'Action',
          stars: ['Actor 1', 'Actor 2'],
          poster: 'poster1.jpg',
        }),
      });

      (MovieModel.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('DB Failure'));

      const response = await request(app)
        .delete('/api/v1/movies/1213')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(500);
      expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual('❌ Error getting movie by id');
    });

    it('🔒 should return 401 when no token is provided', async () => {
      const response = await request(app).get('/api/v1/movies');

      expect(response.status).toBe(401);
    });

    it('⚠️ should return 400 when rating is not a number', async () => {
      (validationResult as unknown as jest.Mock).mockReturnValue(mockValidationErrorMessage());

      const response = await request(app)
        .post('/api/v1/movies')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...movieExample, rating: 'invalid' });

      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('🎬 Title is required');
    });
  });
});
