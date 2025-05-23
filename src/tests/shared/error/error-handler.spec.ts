import Logger from '../../../config/logger';
import { ErrorHandler, isError } from '../../../shared/errors/ErrorHandler';

jest.mock('../../../config/logger', () => ({
  info: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn(),
}));

describe('🛠️ Error Handler - Function handle()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('✅ Should test function isError', () => {
    const error = new Error('Test error');
    const nonError = 'Test string';

    expect(isError(error)).toBe(true);
    expect(isError(nonError)).toBe(false);
  });

  it('✅ Should test function handle', () => {
    const error = new Error('Test error');
    const nonError = 'Test string';

    const spyError = jest.spyOn(Logger, 'error');
    const spyInfo = jest.spyOn(Logger, 'info');

    expect(() => ErrorHandler.handle(error)).toThrow(error);
    expect(spyError).toHaveBeenCalledWith(`💥⚠️ ${error.message}`);
    expect(spyInfo).not.toHaveBeenCalled();

    ErrorHandler.handle(nonError, false);
    expect(spyInfo).toHaveBeenCalledWith(`⚠️ Erro tratado: ${nonError}`);
  });
});
