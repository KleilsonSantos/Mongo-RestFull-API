import jwt from 'jsonwebtoken';
import Logger from '../../config/logger';
import { Payload } from '../../model/Payload.interface';
import { Response, NextFunction } from 'express';
import { UserRole } from '../../enum/user-role.enum';
import { generateMockToken } from '../mocks/validate-token.mock';
import authMiddleware, { CustomRequest } from '../../middlewares/auth.middleware';
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
  sign: jest.fn(),
  decode: jest.fn(),
  jwt: jest.fn(),
}));

jest.mock('../../config/logger', () => ({
  error: jest.fn(),
}));

const token = generateMockToken();

describe('🔐 Auth Middleware Tests', () => {
  let mockReq: Partial<CustomRequest>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      header: jest.fn(),
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    process.env.JWT_SECRET = 'test-secret';
    jest.clearAllMocks();
  });

  it('❌ should return 401 if no token is provided', () => {
    (mockReq.header as jest.Mock).mockReturnValue(undefined);

    authMiddleware(mockReq as CustomRequest, mockRes as Response, mockNext);

    expect(Logger.error).toHaveBeenCalledWith('❌ Unauthorized - Missing token');
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Unauthorized - Missing token' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('❌ should return 500 if JWT_SECRET is not defined', () => {
    process.env.JWT_SECRET = '';
    (mockReq.header as jest.Mock).mockReturnValue(`Bearer ${token}`);

    authMiddleware(mockReq as CustomRequest, mockRes as Response, mockNext);

    expect(Logger.error).toHaveBeenCalledWith(
      '❌ JWT_SECRET is not defined in environment variables.',
    );
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Internal server error: missing JWT secret',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('✅ should set user in request when token is valid', () => {
    const mockPayload: Payload = { id: '123', email: 'test@test.com', role: 'admin' as UserRole };
    (mockReq.header as jest.Mock).mockReturnValue(`Bearer ${token}`);
    (jwt.verify as jest.Mock).mockReturnValue(mockPayload);
    mockReq.user = mockPayload;

    authMiddleware(mockReq as CustomRequest, mockRes as Response, mockNext);

    expect(mockReq.user).toEqual(mockPayload);
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it('❌ should return 401 if token is invalid', () => {
    (jwt.verify as jest.Mock).mockResolvedValue('Bearer ivalid-token');

    authMiddleware(mockReq as CustomRequest, mockRes as Response, mockNext);

    expect(Logger.error).toHaveBeenCalledWith('❌ Unauthorized - Missing token');
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Unauthorized - Missing token' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('❌ should handle non-string token or secret', () => {
    (mockReq.header as jest.Mock).mockReturnValue('');
    (jwt.verify as jest.Mock).mockResolvedValue('');

    authMiddleware(mockReq as CustomRequest, mockRes as Response, mockNext);

    expect(Logger.error).toHaveBeenCalledWith('❌ Unauthorized - Missing token');
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Unauthorized - Missing token' });
  });

  it('✅ should set user in request when token is valid and role is ADMIN', () => {
    const mockPayload: Payload = { id: '123', email: 'test@test.com', role: 'admin' as UserRole };
    (mockReq.header as jest.Mock).mockReturnValue(`Bearer ${token}`);
    (jwt.verify as jest.Mock).mockReturnValue(mockPayload);

    mockReq.user = {
      id: '123',
      email: 'test@test.com',
      role: 'admin' as UserRole,
    };

    authMiddleware(mockReq as CustomRequest, mockRes as Response, mockNext);

    expect(mockReq.user).toEqual(mockPayload);
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });
});
