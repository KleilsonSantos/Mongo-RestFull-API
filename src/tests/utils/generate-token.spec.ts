import { UserRole } from '../../enum/user-role.enum';
import { Payload } from '../../model/Payload.interface';
import { responseJwtEnvMissing } from '../mocks/user.mock';
// Mock do módulo jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockImplementation((payload, secret, options) => {
    return 'mock.jwt.token';
  }),
}));

// Mock do Logger
jest.mock('../../config/logger', () => ({
  error: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  http: jest.fn(),
}));

describe('🔐 Token Generator Tests', () => {
  const mockPayload: Payload = {
    id: '123',
    email: 'test@example.com',
    role: UserRole.USER,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
    process.env.JWT_EXPIRES_IN = '1h';
  });

  it('✅ should generate a valid token', () => {
    const { generateToken } = require('../../utils/generate-token');
    const token = generateToken(mockPayload);

    const jwt = require('jsonwebtoken');
    expect(jwt.sign).toHaveBeenCalledWith(mockPayload, 'test-secret', { expiresIn: '1h' });
    expect(token).toBe('mock.jwt.token');
  });

  it('❌ should throw error when jwt.sign fails', () => {
    const mockError = new Error('JWT signing failed');
    const jwt = require('jsonwebtoken');
    (jwt.sign as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    const { generateToken } = require('../../utils/generate-token');
    expect(() => generateToken(mockPayload)).toThrow('JWT signing failed');
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
        await import('../../utils/generate-token');
      } catch (error) {
        expect(error).toEqual(
          new Error('JWT_SECRET or JWT_EXPIRES_IN not found in environment variables'),
        );
      }
      expect(loggerErrorMock).toHaveBeenCalledWith(responseJwtEnvMissing);
    });
  });
});
