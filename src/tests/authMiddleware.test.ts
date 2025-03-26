import * as http from 'http';
import request from 'supertest';
import { app } from '../server';
import { Logger } from '../config/logger';

jest.mock('../config/logger', () => ({
  Logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

describe('Auth Middleware Tests', () => {
  let server: http.Server;

  beforeAll(() => {
    server = http.createServer(app);
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 when no token is provided', async () => {
    const response = await request(server)
      .get('/protected-route')
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
    expect(Logger.warn).toHaveBeenCalledWith('Authentication attempt without token');
  });

  it('should return 401 when invalid token is provided', async () => {
    const response = await request(server)
      .get('/protected-route')
      .set('Authorization', 'Bearer invalid_token')
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid token' });
    expect(Logger.error).toHaveBeenCalledWith('Token validation failed', expect.any(Error));
  });

  it('should allow access with valid token', async () => {
    const validToken = 'valid_token_here';
    const response = await request(server)
      .get('/protected-route')
      .set('Authorization', `Bearer ${validToken}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(Logger.info).toHaveBeenCalledWith('Successful authentication');
  });

  it('should handle malformed authorization header', async () => {
    const response = await request(server)
      .get('/protected-route')
      .set('Authorization', 'malformed_header')
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid authorization format' });
    expect(Logger.warn).toHaveBeenCalledWith('Malformed authorization header received');
  });
});
