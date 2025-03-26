module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  //testMatch: ['**/src/tests/**/*.test.ts'],
  testMatch: ['**/src/tests/movie-controller.test.ts'],
  verbose: true,
  clearMocks: true,
  testTimeout: 10000,
  collectCoverage: true,
  setupFiles: ['dotenv/config'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  collectCoverageFrom: [
    'src/**/*.ts', // Inclua todos os arquivos TypeScript na pasta src
    '!src/**/*.d.ts', // Exclua arquivos de declaração
    '!src/**/index.ts', // Exclua arquivos de índice, se necessário
    '!src/tests/**', // Exclua os arquivos de teste
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  reporters: [
    'default',
    [
      'jest-summary-reporter',
      {
        failuresOnly: true,
        outputPath: './jest-summary.txt',
      },
    ],
    [
      'jest-html-reporter',
      {
        pageTitle: 'Relatório de Testes',
        outputPath: './coverage/test-report.html',
        includeFailureMsg: true,
        includeConsoleLog: true,
      },
    ],
  ],
};
