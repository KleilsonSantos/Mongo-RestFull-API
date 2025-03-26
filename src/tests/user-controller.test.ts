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

describe('User Controller Tests', () => {
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

  it('should create a new user successfully', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    const response = await request(server)
      .post('/api/users')
      .send(userData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe(userData.username);
    expect(response.body.email).toBe(userData.email);
    expect(Logger.info).toHaveBeenCalledWith('New user created successfully');
  });

  it('should return 400 when creating user with invalid data', async () => {
    const invalidUserData = {
      username: '',
      email: 'invalid-email',
      password: '123'
    };

    const response = await request(server)
      .post('/api/users')
      .send(invalidUserData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(Logger.warn).toHaveBeenCalledWith('Invalid user data received');
  });

  it('should get user profile successfully', async () => {
    const userId = '123';
    const response = await request(server)
      .get(`/api/users/${userId}`)
      .set('Authorization', 'Bearer valid_token')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username');
    expect(response.body).toHaveProperty('email');
    expect(Logger.info).toHaveBeenCalledWith(`User profile retrieved: ${userId}`);
  });

  it('should return 404 when user not found', async () => {
    const nonExistentId = 'nonexistent123';
    const response = await request(server)
      .get(`/api/users/${nonExistentId}`)
      .set('Authorization', 'Bearer valid_token')
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'User not found' });
    expect(Logger.warn).toHaveBeenCalledWith(`User not found: ${nonExistentId}`);
  });

  it('should update user profile successfully', async () => {
    const userId = '123';
    const updateData = {
      username: 'updateduser',
      email: 'updated@example.com'
    };

    const response = await request(server)
      .put(`/api/users/${userId}`)
      .send(updateData)
      .set('Authorization', 'Bearer valid_token')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.username).toBe(updateData.username);
    expect(response.body.email).toBe(updateData.email);
    expect(Logger.info).toHaveBeenCalledWith(`User profile updated: ${userId}`);
  });
});
