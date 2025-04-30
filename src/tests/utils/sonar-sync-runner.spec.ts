import Logger from '../../config/logger';
import { runAsync } from '../../utils/sonar-sync-runner';
import { synchronizeSonarVersion } from '../../utils/package-sonar-sync';

jest.mock('../../config/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

jest.mock('../../utils/package-sonar-sync', () => ({
  synchronizeSonarVersion: jest.fn(),
}));

describe('🚀 sonar-sync-runner', () => {
  describe('🔍 Run Async Catch Block', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('❌ should log error when synchronizeSonarVersion throws', async () => {
      const mockError = new Error('Test error');

      (synchronizeSonarVersion as jest.Mock).mockRejectedValueOnce(mockError);

      await runAsync();

      expect(Logger.error).toHaveBeenCalledWith('❌ Failed running function:', mockError);
    });
  });

  describe('🔍 Run Async Execution as Main', () => {
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
      (synchronizeSonarVersion as jest.Mock).mockResolvedValue(undefined);

      process.env.TEST_MAIN = 'true';

      const module = await import('../../utils/sonar-sync-runner');

      expect(module).toBeDefined();
      expect(module.runAsync).toBeDefined();
      expect(synchronizeSonarVersion).toHaveBeenCalled();
    });
  });
});
