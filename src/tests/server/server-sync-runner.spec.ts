describe('🔍 Run Async Execution as Main', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('🚀 should execute startServer when TEST_MAIN is set', async () => {
    process.env.TEST_MAIN = 'true';
    jest.resetModules();

    const startServerMock = jest.fn();

    jest.doMock('../../server/server', () => ({
      __esModule: true,
      startServer: startServerMock,
      runServerIfMain: () => startServerMock(),
    }));

    await jest.isolateModulesAsync(async () => {
      await import('../../server/main');
    });

    expect(startServerMock).toHaveBeenCalled();

    delete process.env.TEST_MAIN;
  });
});
