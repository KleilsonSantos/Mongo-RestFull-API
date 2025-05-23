import Logger from '../../config/logger';
import swaggerAuthMiddleware from '../../middlewares/swagger.middleware';
import { Request, Response, NextFunction } from 'express';

jest.mock('../../config/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe('🛡️ swaggerAuthMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV };
    req = {
      header: jest.fn(),
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('❌ should respond 500 if SWAGGER_API_KEY is not defined', () => {
    process.env.SWAGGER_API_KEY = undefined;

    swaggerAuthMiddleware(req as Request, res as Response, next);

    expect(Logger.error).toHaveBeenCalledWith(
      '❌ SWAGGER_API_KEY not found in environment variables',
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    expect(next).not.toHaveBeenCalled();
  });

  it('❌ should respond 403 if no API key is provided', () => {
    process.env.SWAGGER_API_KEY = Buffer.from('correct-api-key').toString('base64');
    (req.header as jest.Mock).mockReturnValue(undefined);

    swaggerAuthMiddleware(req as Request, res as Response, next);

    expect(Logger.error).toHaveBeenCalledWith('❌ Unauthorized Access to Swagger UI');
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized Access to Swagger UI' });
    expect(next).not.toHaveBeenCalled();
  });

  it('❌ should respond 403 if API key is invalid', () => {
    process.env.SWAGGER_API_KEY = Buffer.from('correct-api-key').toString('base64');
    (req.header as jest.Mock).mockReturnValue('wrong-api-key');

    swaggerAuthMiddleware(req as Request, res as Response, next);

    expect(Logger.error).toHaveBeenCalledWith('❌ Unauthorized Access to Swagger UI');
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized Access to Swagger UI' });
    expect(next).not.toHaveBeenCalled();
  });

  it('✅ should call next() if API key is valid', () => {
    const apiKey = 'correct-api-key';
    process.env.SWAGGER_API_KEY = Buffer.from(apiKey).toString('base64');
    (req.header as jest.Mock).mockReturnValue(apiKey);

    swaggerAuthMiddleware(req as Request, res as Response, next);

    expect(Logger.info).toHaveBeenCalledWith('✅ Authorized Access to Swagger UI');
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
