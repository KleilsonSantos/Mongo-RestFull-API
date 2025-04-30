import Logger from '../../config/logger';
import { runAsyncPackageVersion } from '../../utils/package-sync-runner';
import { checkVersionMismatch } from '../../utils/check-package-version';

jest.mock('../../config/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

jest.mock('../../utils/check-package-version', () => ({
  checkVersionMismatch: jest.fn(),
}));

describe('🚀 package-sync-runner', () => {
  describe('🔍 Run Async Package Version Catch Block', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('❌ should log error when runAsyncPackageVersion throws', async () => {
      const mockError = new Error('Test error');

      (checkVersionMismatch as jest.Mock).mockRejectedValueOnce(mockError);

      await runAsyncPackageVersion();

      expect(Logger.error).toHaveBeenCalledWith('❌ Failed running function:', mockError);
    });
  });

  describe('🔍 Run Async Package Version Execution as Main', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...OLD_ENV };
    });

    afterEach(() => {
      process.env = OLD_ENV;
      jest.resetModules();
    });

    it('🚀 should execute runAsync when TEST_MAIN is set', async () => {
      (checkVersionMismatch as jest.Mock).mockResolvedValue(undefined);

      process.env.TEST_MAIN = 'true';

      const module = await import('../../utils/package-sync-runner');

      expect(module).toBeDefined();
      expect(module.runAsyncPackageVersion).toBeDefined();
      expect(checkVersionMismatch).toHaveBeenCalled();
    });
  });
});
