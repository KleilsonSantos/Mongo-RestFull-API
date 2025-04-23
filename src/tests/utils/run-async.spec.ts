import Logger from '../../config/logger';
import { runAsync } from '../../utils/run-async';
import { synchronizeSonarVersion } from '../../utils/package-sonar-sync';

jest.mock('../../utils/package-sonar-sync', () => ({
  synchronizeSonarVersion: jest.fn(),
}));

jest.mock('../../config/logger', () => ({
  error: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  http: jest.fn(),
}));

describe('🔍 Run Async Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('✅ should call synchronizeSonarVersion successfully', async () => {
    // Mock para simular sucesso
    (synchronizeSonarVersion as jest.Mock).mockResolvedValue(undefined);

    await runAsync();

    // Verifica se synchronizeSonarVersion foi chamado
    expect(synchronizeSonarVersion).toHaveBeenCalled();
    // Certifica-se de que Logger.error não foi chamado
    expect(Logger.error).not.toHaveBeenCalled();
  });

  it('❌ should handle error when synchronizeSonarVersion fails', async () => {
    const mockError = new Error('Test error');
    // Mock para simular erro
    (synchronizeSonarVersion as jest.Mock).mockRejectedValue(mockError);

    await runAsync();

    // Verifica se Logger.error foi chamado com o erro correto
    expect(Logger.error).toHaveBeenCalledWith('❌ Failed running function:', mockError);
  });
  describe('🔍 Test runAsync execution as main module', () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
      jest.resetModules();
      process.env = {
        ...OLD_ENV,
        TEST_MAIN: 'true',
      };
    });

    afterEach(() => {
      process.env = OLD_ENV;
      jest.resetModules();
    });

    it('🔧 should execute runAsync when TEST_MAIN is set', async () => {
      (synchronizeSonarVersion as jest.Mock).mockResolvedValue('1.3.2');
      const result = await import('../../utils/run-async'); // Importa o arquivo que executa a lógica principal

      expect(result).toBeDefined();
      expect(result.runAsync).toBeDefined();
      delete process.env.TEST_MAIN;
    });
  });
});
