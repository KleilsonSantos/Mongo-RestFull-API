import Logger from '../../config/logger';
import { errorMiddleware } from '../../middlewares/error.middleware';
import { Request, Response, NextFunction } from 'express';

jest.mock('../../config/logger', () => ({
  error: jest.fn(),
}));

describe('🧰 Middleware: errorMiddleware', () => {
  let count = 0;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;
  const mockError = new Error('Test error');

  beforeEach(() => {
    jest.clearAllMocks();
    req = { method: 'GET', path: '/api/test' };
    res = {
      statusCode: 200,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('🪵 should log the error and return 500 with generic message', () => {
    errorMiddleware(mockError, req as Request, res as Response, next);

    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonResponse).toHaveProperty('errorId');
    expect(jsonResponse.message).toBe('Internal Server Error');
    expect(jsonResponse).toHaveProperty('timestamp');
    expect(Logger.error).toHaveBeenCalledWith(expect.stringContaining('Error ID'), {
      message: 'Test error',
      stack: mockError.stack,
    });
    expect(next).toHaveBeenCalled();
  });

  it('should return the statusCode from response if already set and use error message', () => {
    res.statusCode = 400;

    errorMiddleware(mockError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse.message).toBe('Test error');
  });

  it('should handle missing req method/path gracefully', () => {
    req = {}; // sem method ou path

    errorMiddleware(mockError, req as Request, res as Response, next);

    expect(Logger.error).toHaveBeenCalledWith(
      expect.stringContaining('UNKNOWN UNKNOWN'),
      expect.any(Object),
    );
    expect(next).toHaveBeenCalled();
  });
});
