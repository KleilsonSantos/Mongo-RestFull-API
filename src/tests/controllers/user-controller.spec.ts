import app from '../../app';
import bcrypt from 'bcrypt';
import request from 'supertest';
import Logger from '../../config/logger';
import mongoose, { Error } from 'mongoose';
import UserModel from '../../model/User';
import { disconnect } from '../../config/db';
import { generateMockToken } from '../mocks/validate-token.mock';
import { createServer, Server } from 'http';
import {
  userExample,
  responseUsers,
  responseAllUsers,
  responseUpdateUser,
  responseDeleteUser,
  responseLoginStarted,
  responseUsersNotFound,
  responseUsersForbidden,
  responseUserAlreadyExists,
  responseUserByIdNotFound,
  responseUserMissingCredentials,
  responseUserById,
  responseJwtEnvMissing,
  userAdmin,
} from '../mocks/user.mock';

jest.mock('../../enum/user-role.enum.ts', () => ({
  UserRole: {
    ADMIN: 'admin',
    USER: 'user',
    MODERATOR: 'moderator',
  },
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

jest.mock('../../model/User', () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn().mockImplementation(() => ({
      lean: () => Promise.resolve(userExample),
    })),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

jest.mock('../../config/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

jest.mock('../../config/db', () => ({
  connect: jest.fn().mockResolvedValue(true),
  disconnect: jest.fn(),
  Error: jest.fn(),
}));

jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

const ENV = process.env;
const token = generateMockToken();
const leanMethod = () => Promise.reject(new Error('DB Failure'));

describe('🎬 User Controller Tests', () => {
  let server: Server = createServer(app);

  afterAll(async () => {
    await mongoose.disconnect();
    await disconnect();
    server.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('🎥 POST /api/v1/user', () => {
    it('🚫 should return 400 when validation fails', async () => {
      (UserModel.findOne as jest.Mock).mockResolvedValue({});
      const response = await request(app)
        .post('/api/v1/create/user')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(response.status).toBe(400);
      expect((Logger.info as jest.Mock).mock.calls[0][0]).toEqual(responseUserAlreadyExists);
    });

    it('✅ should return 201 when a new user is successfully created', async () => {
      (UserModel.findOne as jest.Mock).mockResolvedValue(null);
      (UserModel.create as jest.Mock).mockResolvedValue({
        email: 'admin@example.com',
        password: 'hashedPassword',
        role: 'admin',
      });
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      const resultHashedPassword = Promise.resolve(bcrypt.hash('123456', 12));
      await resultHashedPassword;
      const res = await request(app)
        .post('/api/v1/create/user')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ email: 'exemplo@example.com', password: '123456', role: 'user' });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        message: 'User created with success!',
        data: { user: { email: 'admin@example.com', password: 'hashedPassword', role: 'admin' } },
      });
    });

    it('💣 should return 500 when a database error occurs during user creation', async () => {
      jest.spyOn(global.Date, 'now').mockImplementation(() => 1712345678900);
      const errorId = Date.now();

      (UserModel.findOne as jest.Mock).mockRejectedValue(leanMethod);
      (Logger.error as jest.Mock).mockResolvedValue(() => {
        throw new Error('Error ID: ' + errorId);
      });

      const response = await request(app)
        .post('/api/v1/create/user')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(500);
      expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual(
        '❌ Error ID: ' + errorId + ' | POST /api/v1/create/user',
      );
    });
  });

  describe('🎞️ GET /api/v1/users', () => {
  it('✅ should return 200 and list all users', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(userAdmin);
    (UserModel.find as jest.Mock).mockResolvedValue(responseUsers);

    const response = await request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: userAdmin.email }); // 👈 obrigatório agora

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: { users: responseUsers } });
    expect((Logger.info as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining(responseAllUsers),
    );
  });

  it('❌ should return 403 when the user is not an admin', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue({ role: 'USER' });

    const response = await request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'nao.admin@example.com' }); // 👈 obrigatório agora

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      message: 'Access denied, role mismatch. Only admins are allowed.',
    });
    expect((Logger.info as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining(responseUsersForbidden),
    );
  });

  it('🔍 should return 404 when no users are found', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(userAdmin);
    (UserModel.find as jest.Mock).mockResolvedValue([]);

    const response = await request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: userAdmin.email }); // 👈 obrigatório agora

    expect(response.status).toBe(404);
    expect((Logger.info as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining(responseUsersNotFound),
    );
  });

  it('💥 should return 500 when a database error occurs while retrieving users', async () => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => 1712345678900);
    const errorId = Date.now();

    (Logger.error as jest.Mock).mockResolvedValue(() => {
      throw new Error('Error ID: ' + errorId);
    });
    (UserModel.findOne as jest.Mock).mockRejectedValue(userExample);
    (UserModel.find as jest.Mock).mockRejectedValue(leanMethod);

    const response = await request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: userAdmin.email }); // 👈 obrigatório agora

    expect(response.status).toBe(500);
    expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual(
      '❌ Error ID: ' + errorId + ' | GET /api/v1/users',
    );
  });
});


  describe('🎯 GET /api/v1/users/:id', () => {
    it('🎯 should return 200 when retrieving a user by valid id', async () => {
      (UserModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(userExample),
      });

      const response = await request(app)
        .get('/api/v1/users/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect((Logger.info as jest.Mock).mock.calls[0][0]).toContain(responseUserById);
    });

    it('🔍 should return 404 when retrieving a user by non-existent id', async () => {
      (UserModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });

      const response = await request(app)
        .get('/api/v1/users/1213')
        .set('Accept', 'application/json')
        .set('Header', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual(responseUserByIdNotFound);
    });

    it('💣 should return 500 when a database error occurs while retrieving user by id', async () => {
      jest.spyOn(global.Date, 'now').mockImplementation(() => 1712345678900);
      const errorId = Date.now();

      (UserModel.findById as jest.Mock).mockImplementation(() => ({
        lean: leanMethod,
      }));
      (Logger.error as jest.Mock).mockResolvedValue(() => {
        throw new Error('Error ID: ' + errorId);
      });

      const response = await request(app)
        .get('/api/v1/users/f3ed')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(500);
      expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual(
        '❌ Error ID: ' + errorId + ' | GET /api/v1/users/f3ed',
      );
    });
  });

  describe('🔄 test-error /api/v1/test-error', () => {
    it('💣 should return 500 testErrorMiddleware ', async () => {
      const response = await request(app)
        .get('/api/v1/test-error')
        .set('Accept', 'application/json');
      expect(response.status).toBe(500);
    });
  });

  describe('📝 PUT /api/v1/users/:id', () => {
    it('🔍 should return 404 when updating a user by non-existent id', async () => {
      (UserModel.findByIdAndUpdate as jest.Mock).mockReturnValue(null);

      const response = await request(app)
        .put('/api/v1/users/1213')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual('❌ User not found');
    });

    it('✅ should return 200 when user is successfully updated', async () => {
      (UserModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(userExample),
      });

      (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        email: 'admin@admin.com',
        password: ENV['MOCK_PASSWORD_USER'],
        role: 'moderator',
      });

      const response = await request(app)
        .put('/api/v1/users/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'admin@admin.com',
          password: ENV['MOCK_PASSWORD_USER'],
          role: 'moderator',
        });

      expect(response.status).toBe(200);
      expect((Logger.info as jest.Mock).mock.calls[0][0]).toEqual(
        expect.stringContaining(responseUpdateUser),
      );
    });

    it('💥 should return 500 when a database error occurs during user update', async () => {
      jest.spyOn(global.Date, 'now').mockImplementation(() => 1712345678900);
      const errorId = Date.now();

      (Logger.error as jest.Mock).mockResolvedValue(() => {
        throw new Error('Error ID: ' + errorId);
      });
      (UserModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(leanMethod),
      });
      (UserModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(leanMethod);

      const response = await request(app)
        .put('/api/v1/users/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(500);
      expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual(
        '❌ Error ID: ' + errorId + ' | PUT /api/v1/users/1',
      );
    });
  });

  describe('🗑️ DELETE /api/v1/users/:id', () => {
    it('✅ should return 200 when user is successfully deleted', async () => {
      (UserModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(userExample),
      });

      (UserModel.findByIdAndDelete as jest.Mock).mockResolvedValue(true);

      const response = await request(app)
        .delete('/api/v1/users/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect((Logger.info as jest.Mock).mock.calls[0][0]).toEqual(
        expect.stringContaining(responseDeleteUser),
      );
    });

    it('🔍 should return 404 when deleting a user by non-existent id', async () => {
      (UserModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(''),
      });

      const response = await request(app)
        .delete('/api/v1/users/1213')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual(responseUserByIdNotFound);
    });

    it('💣 should return 500 when a database error occurs during user deletion', async () => {
      jest.spyOn(global.Date, 'now').mockImplementation(() => 1712345678900);
      const errorId = Date.now();

      (Logger.error as jest.Mock).mockResolvedValue(() => {
        throw new Error('Error ID: ' + errorId);
      });
      (UserModel.findById as jest.Mock).mockReturnValue(null);

      const response = await request(app)
        .delete('/api/v1/users/1213')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(500);
      expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual(
        '❌ Error ID: ' + errorId + ' | DELETE /api/v1/users/1213',
      );
    });
  });

  describe('🔒 POST /api/v1/login', () => {
    it('🔒 should return 400 when no token is provided', async () => {
      process.env.JWT_SECRET = 'my-secret';
      (UserModel.findOne as jest.Mock).mockResolvedValue({ email: '', password: '' });
      const response = await request(app)
        .post('/api/v1/login')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual(responseUserMissingCredentials);
    });
    it('🔒 should return 401 when no token is provided', async () => {
      process.env.JWT_EXPIRES_IN = '1h';
      (UserModel.findOne as jest.Mock).mockReturnValue('');
      const response = await request(app)
        .post('/api/v1/login')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'elena.martins@example.com',
          password: ENV['MOCK_PASSWORD_USER'],
          role: 'admin',
        });
      expect(response.status).toBe(401);
    });
    it('🔒 should return 401 isMatch passwor', async () => {
      process.env.JWT_EXPIRES_IN = '1h';
      process.env.JWT_SECRET = 'my-secret';
      (UserModel.findOne as jest.Mock).mockReturnValue(userExample);
      (bcrypt.compare as jest.Mock).mockReturnValue(false);

      const response = await request(app)
        .post('/api/v1/login')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'elena.martins@example.com',
          password: ENV['MOCK_PASSWORD_USER'],
          role: 'admin',
        });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: 'Invalid email or password',
      });
      expect((Logger.info as jest.Mock).mock.calls[0][0]).toEqual(responseLoginStarted);
    });
    it('🔒 should return 200 when login is successful', async () => {
      (UserModel.findOne as jest.Mock).mockReturnValue(userExample);
      (bcrypt.compare as jest.Mock).mockReturnValue(true);

      const response = await request(app)
        .post('/api/v1/login')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'elena.martins@example.com',
          password: ENV['MOCK_PASSWORD_USER'],
          role: 'admin',
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: '✅ Login successful',
      });
      expect((Logger.info as jest.Mock).mock.calls[0][0]).toEqual(responseLoginStarted);
    });
    it('🔒 should return 500 when a database error occurs during login', async () => {
      jest.spyOn(global.Date, 'now').mockImplementation(() => 1712345678900);
      const errorId = Date.now();

      (Logger.error as jest.Mock).mockResolvedValue(() => {
        throw new Error('Error ID: ' + errorId);
      });
      (UserModel.findOne as jest.Mock).mockRejectedValue(leanMethod);

      const response = await request(app)
        .post('/api/v1/login')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'elena.martins@example.com',
          password: ENV['MOCK_PASSWORD_USER'],
          role: 'admin',
        });

      expect(response.status).toBe(500);
      expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual(
        '❌ Error ID: ' + errorId + ' | POST /api/v1/login',
      );
    });
  });

  describe('🔒 Validation of JWT_SECRET and JWT_EXPIRES_IN in POST /api/v1/login', () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
      jest.resetModules();
      process.env = {
        ...OLD_ENV,
        JWT_SECRET: '',
        JWT_EXPIRES_IN: '',
      };
    });

    afterEach(() => {
      process.env = OLD_ENV;
      jest.resetModules();
    });

    it('⚠️ should log an error when JWT_SECRET or JWT_EXPIRES_IN are not defined', async () => {
      const loggerErrorMock = jest.fn();

      jest.doMock('../../config/logger', () => ({
        __esModule: true,
        default: {
          error: loggerErrorMock,
          info: jest.fn(),
        },
      }));

      try {
        await import('../../controllers/user-controller');
      } catch (error) {
        expect(error).toEqual(
          new Error('JWT_SECRET or JWT_EXPIRES_IN not found in environment variables'),
        );
      }
      expect(loggerErrorMock).toHaveBeenCalledWith(responseJwtEnvMissing);
    });
  });
});
