jest.mock('fs');
jest.mock('winston', () => ({
  format: {
    combine: jest.fn().mockReturnValue('combined-format'),
    timestamp: jest.fn().mockReturnValue('timestamp-format'),
    printf: jest.fn().mockReturnValue('printf-format'),
    colorize: jest.fn().mockReturnValue('colorize-format'),
  },
  transports: {
    File: jest.fn(),
    Console: jest.fn(),
  },
  createLogger: jest.fn(),
  addColors: jest.fn(),
}));

import fs from 'fs';
import winston from 'winston';

describe('📝 Logger Configuration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'test';
  });

  it('✅ should create logs directory if it does not exist', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    (fs.mkdirSync as jest.Mock).mockImplementation(() => {});

    jest.isolateModules(() => {
      require('../../config/logger');
    });

    expect(fs.existsSync).toHaveBeenCalledWith('logs');
    expect(fs.mkdirSync).toHaveBeenCalledWith('logs');
  });

  it('✅ should not create logs directory if it exists', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.mkdirSync as jest.Mock).mockImplementation(() => {});

    jest.isolateModules(() => {
      require('../../config/logger');
    });

    expect(fs.existsSync).toHaveBeenCalledWith('logs');
    expect(fs.mkdirSync).not.toHaveBeenCalled();
  });

  it('✅ should configure winston with correct log levels', () => {
    const mockAddColors = jest.fn();
    (winston.addColors as jest.Mock).mockImplementation(mockAddColors);

    jest.isolateModules(() => {
      require('../../config/logger');
    });

    expect(mockAddColors).toHaveBeenCalledWith({
      error: 'red',
      warn: 'yellow',
      info: 'green',
      http: 'magenta',
      debug: 'cyan',
    });
  });

  it('✅ should create file transports for each log level', () => {
    const mockFileTransport = jest.fn();
    (winston.transports.File as unknown as jest.Mock).mockImplementation(() => mockFileTransport);

    jest.isolateModules(() => {
      require('../../config/logger');
    });

    expect(winston.transports.File).toHaveBeenCalledTimes(8); // 5 levels + all.log + exceptions.log + rejections.log
    expect(winston.transports.File).toHaveBeenCalledWith({
      filename: expect.stringContaining('error.log'),
      level: 'error',
    });
  });

  it('✅ should add console transport in development environment', () => {
    process.env.NODE_ENV = 'development';
    const mockConsoleTransport = jest.fn();
    (winston.transports.Console as unknown as jest.Mock).mockImplementation(
      () => mockConsoleTransport,
    );

    jest.isolateModules(() => {
      require('../../config/logger');
    });

    expect(winston.transports.Console).toHaveBeenCalledWith({
      format: 'combined-format',
    });
  });

  it('✅ should not add console transport in production environment', () => {
    process.env.NODE_ENV = 'production';
    const mockConsoleTransport = jest.fn();
    (winston.transports.Console as unknown as jest.Mock).mockImplementation(
      () => mockConsoleTransport,
    );

    jest.isolateModules(() => {
      require('../../config/logger');
    });

    expect(winston.transports.Console).not.toHaveBeenCalled();
  });

  it('✅ should create logger with correct configuration', () => {
    const mockCreateLogger = jest.fn();
    (winston.createLogger as jest.Mock).mockImplementation(mockCreateLogger);

    jest.isolateModules(() => {
      require('../../config/logger');
    });

    expect(mockCreateLogger).toHaveBeenCalledWith({
      level: 'info',
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
      },
      format: 'combined-format',
      transports: expect.any(Array),
      exceptionHandlers: expect.any(Array),
      rejectionHandlers: expect.any(Array),
    });
  });
});
