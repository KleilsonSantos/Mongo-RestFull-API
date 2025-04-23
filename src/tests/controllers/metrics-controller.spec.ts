import { Request, Response, NextFunction } from 'express';
import Logger from '../../config/logger';
import getAllMetrics from '../../controllers/metrics-controller';
import { register } from '../../metrics/metrics';

jest.mock('../../config/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

jest.mock('../../metrics/metrics', () => ({
  register: {
    contentType: 'text/plain',
    metrics: jest.fn(),
  },
}));

describe('📊 Metrics Controller Tests', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      set: jest.fn(),
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  it('✅ should return metrics successfully', async () => {
    const mockMetrics = 'metric1 1\nmetric2 2';
    (register.metrics as jest.Mock).mockResolvedValue(mockMetrics);

    await getAllMetrics(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.set).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.end).toHaveBeenCalledWith(mockMetrics);
    expect(Logger.info).toHaveBeenCalledWith('✅ Metrics successfully retrieved');
  });

  it('❌ should handle errors when fetching metrics fails', async () => {
    const mockError = new Error('Failed to fetch metrics');
    (register.metrics as jest.Mock).mockRejectedValue(mockError);

    await getAllMetrics(mockReq as Request, mockRes as Response, mockNext);

    expect(Logger.error).toHaveBeenCalledWith(
      '❌ Internal Server Error while fetching metrics',
      mockError,
    );
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: '❌ Internal Server Error' });
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
