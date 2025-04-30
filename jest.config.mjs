import { defaults } from 'jest-config';

// Função de configuração do Jest
async function setupJestConfig() {
  return {
    // 🔧 Carrega as configurações padrão do Jest
    ...defaults,

    // 📚 Usa o preset ESM do ts-jest para suporte a módulos ES no TypeScript
    preset: 'ts-jest/presets/default-esm',

    // 🌎 Define o ambiente de teste como Node.js
    testEnvironment: 'node',

    // 📁 Define a raiz dos testes como a pasta "src"
    roots: ['<rootDir>/src'],

    // 📄 Extensões de arquivos que o Jest deve considerar
    moduleFileExtensions: ['ts', 'js'],

    // 🔄 Como transformar os arquivos TypeScript para testes
    transform: {
      '^.+\\.ts?$': ['ts-jest', { useESM: true }],
    },

    // 📦 Extensões tratadas como módulos ES
    extensionsToTreatAsEsm: ['.ts'],

    // 📈 Ativa a coleta de cobertura de testes
    collectCoverage: true,

    // 🧹 Define quais arquivos serão considerados para cobertura de testes
    collectCoverageFrom: [
      'src/**/*.ts',
      '!src/**/*.d.ts', // Ignora arquivos de definição de tipos
      '!src/**/*.test.ts', // Ignora arquivos de teste
    ],

    // 🗂️ Pasta onde será gerado o relatório de cobertura
    coverageDirectory: 'coverage',

    // 🚫 Ignora arquivos/pastas específicos da cobertura
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '<rootDir>/src/interfaces/',
      '<rootDir>/src/types/',
    ],

    // 📰 Define os "reporters" para saída dos testes
    reporters: [
      'default', // Reporter padrão do Jest
      [
        'jest-html-reporter', // Gera relatório HTML
        {
          outputDirectory: 'coverage/jest-html-reporter',
          outputName: 'jest-html-reporter.html',
        },
      ],
      [
        'jest-sonar', // Gera relatório SonarQube
        {
          outputDirectory: 'coverage/sonar-report',
          outputName: 'sonar-report.xml',
        },
      ],
    ],

    // ⏱️ Configurações relacionadas a fake timers do Jest
    fakeTimers: {
      enableGlobally: false,
    },

    // ⚙️ Scripts que devem ser executados antes de inicializar os testes
    setupFiles: ['<rootDir>/src/config/load-env.ts'],
    globalSetup: './src/tests/setup/globalSetup.ts',
    globalTeardown: './src/tests/setup/globalTeardown.ts',
    setupFilesAfterEnv: ['./src/tests/setup/jest.setup.ts'],
  };
}

export default setupJestConfig();
