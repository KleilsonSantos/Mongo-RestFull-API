import { defaults } from 'jest-config';

export default {
  ...defaults,
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts?$': ['ts-jest', { useESM: true }],
  },
  extensionsToTreatAsEsm: ['.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/**/*.test.ts'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/interfaces/',
    '<rootDir>/src/types/',
  ],
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        outputDirectory: 'coverage/jest-html-reporter',
        outputName: 'jest-html-reporter.html',
      },
    ],
    [
      'jest-sonar',
      {
        outputDirectory: 'coverage/sonar-report',
        outputName: 'sonar-report.xml',
      },
    ],
  ],
  fakeTimers: {
    enableGlobally: false,
  },
  setupFiles: ['<rootDir>/src/config/load-env.ts'],
};
