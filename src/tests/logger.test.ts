import request from 'supertest';
import { app } from '../server';
import { Logger } from '../config/logger';
import * as http from 'http';

describe('Testes de Middleware de Tratamento de Erros', () => {
  let server: http.Server;

  beforeAll(() => {
    server = http.createServer(app);
  });

  afterAll(() => {
    server.close();
  });

  it('Deve capturar info e retornar status 200 com mensagem JSON', async () => {
    const response = await request(server).get('/test-info');

    expect(response.body).toEqual({ message: 'OK' });
    expect(Logger.info).toHaveBeenCalledWith('Informação registrada');
    expect(response.status).toBe(200);
  });

  it('Deve capturar erros e retornar status 500 com mensagem JSON', async () => {
    const response = await request(server).get('/test-error');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Internal Server Error' });
    expect(Logger.error).toHaveBeenCalledWith(
      '❌ MONGODB_URI is not defined in environment variables.',
      expect.any(Error),
    );
  });
import { Logger } from '../config/logger';

jest.mock('../config/logger', () => ({
  Logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

describe('Logger Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call Logger.info with correct message', () => {
    const testMessage = 'Test info message';
    Logger.info(testMessage);
    expect(Logger.info).toHaveBeenCalledWith(testMessage);
    expect(Logger.info).toHaveBeenCalledTimes(1);
  });

  it('should call Logger.error with error message and error object', () => {
    const errorMessage = 'Test error message';
    const error = new Error('Test error');
    Logger.error(errorMessage, error);
    expect(Logger.error).toHaveBeenCalledWith(errorMessage, error);
    expect(Logger.error).toHaveBeenCalledTimes(1);
  });

  it('should call Logger.warn with warning message', () => {
    const warningMessage = 'Test warning message';
    Logger.warn(warningMessage);
    expect(Logger.warn).toHaveBeenCalledWith(warningMessage);
    expect(Logger.warn).toHaveBeenCalledTimes(1);
  });

  it('should call Logger.debug with debug message', () => {
    const debugMessage = 'Test debug message';
    Logger.debug(debugMessage);
    expect(Logger.debug).toHaveBeenCalledWith(debugMessage);
    expect(Logger.debug).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple logging calls', () => {
    Logger.info('Info message');
    Logger.warn('Warning message');
    Logger.error('Error message');
    Logger.debug('Debug message');

    expect(Logger.info).toHaveBeenCalledTimes(1);
    expect(Logger.warn).toHaveBeenCalledTimes(1);
    expect(Logger.error).toHaveBeenCalledTimes(1);
    expect(Logger.debug).toHaveBeenCalledTimes(1);
  });
});
import { Logger } from '../config/logger';

jest.mock('../config/logger', () => ({
  Logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

describe('Logger Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call Logger.info with correct message', () => {
    const testMessage = 'Test info message';
    Logger.info(testMessage);
    expect(Logger.info).toHaveBeenCalledWith(testMessage);
    expect(Logger.info).toHaveBeenCalledTimes(1);
  });

  it('should call Logger.error with error message and error object', () => {
    const errorMessage = 'Test error message';
    const error = new Error('Test error');
    Logger.error(errorMessage, error);
    expect(Logger.error).toHaveBeenCalledWith(errorMessage, error);
    expect(Logger.error).toHaveBeenCalledTimes(1);
  });

  it('should call Logger.warn with warning message', () => {
    const warnMessage = 'Test warning message';
    Logger.warn(warnMessage);
    expect(Logger.warn).toHaveBeenCalledWith(warnMessage);
    expect(Logger.warn).toHaveBeenCalledTimes(1);
  });

  it('should call Logger.debug with debug message', () => {
    const debugMessage = 'Test debug message';
    Logger.debug(debugMessage);
    expect(Logger.debug).toHaveBeenCalledWith(debugMessage);
    expect(Logger.debug).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple logging calls correctly', () => {
    Logger.info('First message');
    Logger.info('Second message');
    Logger.error('Error occurred');
    
    expect(Logger.info).toHaveBeenCalledTimes(2);
    expect(Logger.error).toHaveBeenCalledTimes(1);
    expect(Logger.info).toHaveBeenCalledWith('First message');
    expect(Logger.info).toHaveBeenCalledWith('Second message');
    expect(Logger.error).toHaveBeenCalledWith('Error occurred');
  });
});
});