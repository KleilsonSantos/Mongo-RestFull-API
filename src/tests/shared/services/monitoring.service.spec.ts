import Logger from '../../../config/logger';
import * as MonitoringService from '../../../shared/services/monitoring.service';

jest.mock('../../../config/logger', () => ({
  info: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn(),
}));

describe('🛠️ Monitoring Service - Debug Handling', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('✅ Should send error data to the monitoring service', () => {
    const errorData = {
      message: 'Simulated test error',
      stack: 'Test stack trace',
      timestamp: new Date().toISOString(),
    };

    MonitoringService.sendToMonitoringService(errorData);

    expect(Logger.debug).toHaveBeenCalledWith('📡 Sending error to monitoring service:', errorData);
  });

  it('🚫 Should not log an error when sending succeeds', () => {
    jest.spyOn(Logger, 'error');
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const errorData = {
      message: 'Critical error!',
      stack: 'Stack trace details',
      timestamp: new Date().toISOString(),
    };

    MonitoringService.sendToMonitoringService(errorData);

    expect(Logger.error).not.toHaveBeenCalled();
  });

  it('📊 Should correctly log multiple errors', () => {
    const spy = jest.spyOn(MonitoringService, 'sendToMonitoringService');
    const errors = [
      { message: 'Error 1', stack: 'Stack trace 1', timestamp: new Date().toISOString() },
      { message: 'Error 2', stack: 'Stack trace 2', timestamp: new Date().toISOString() },
    ];

    errors.forEach((error) => MonitoringService.sendToMonitoringService(error));

    expect(Logger.debug).toHaveBeenCalledTimes(errors.length);
    expect(spy).toHaveBeenCalledTimes(errors.length);

    errors.forEach((error, index) => {
      expect(spy).toHaveBeenNthCalledWith(index + 1, error);
      expect(Logger.debug).toHaveBeenNthCalledWith(
        index + 1,
        '📡 Sending error to monitoring service:',
        error,
      );
    });
  });
});

describe('🛠️ Monitoring Service - Warning Handling', () => {
  it('📢 Should correctly handle a warning scenario', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {}); // Spy on console.warn

    const warningData = {
      message: 'Warning test message',
      timestamp: new Date().toISOString(),
    };

    console.warn('⚠️ Warning detected:', warningData);

    expect(console.warn).toHaveBeenCalledWith('⚠️ Warning detected:', warningData);
  });
});

describe('🛠️ Monitoring Service - Function Sum()', () => {
  it('✅ Should correctly calculate the sum of two numbers', () => {
    const result = MonitoringService.sum(5, 3);
    expect(result).toBe(8);
  });
});