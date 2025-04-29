import setupSwagger from '../../config/swagger'; // ajuste o caminho conforme seu projeto
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { Express } from 'express';

// 🔥 Mock do swaggerUi
jest.mock('swagger-ui-express', () => ({
  serve: jest.fn(),
  setup: jest.fn(() => 'mocked-swagger-setup'),
}));

// 🔥 Mock do swaggerJsDoc
jest.mock('swagger-jsdoc', () => jest.fn(() => ({ openapi: '3.0.0' })));

// 🔥 Mock do middleware de autenticação
jest.mock('../../middlewares/swagger-auth-middleware', () => jest.fn((req, res, next) => next()));

import swaggerAuthMiddleware from '../../middlewares/swagger-auth-middleware';

describe('📄 setupSwagger', () => {
  let app: Partial<Express>;

  beforeEach(() => {
    app = {
      use: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('✅ should setup swagger UI with authentication middleware', () => {
    setupSwagger(app as Express);

    expect(app.use).toHaveBeenCalledWith('/api/v1/api-docs', swaggerAuthMiddleware);

    expect(app.use).toHaveBeenCalledWith(
      '/api/v1/api-docs',
      swaggerUi.serve,
      'mocked-swagger-setup',
    );

    expect(swaggerJsDoc).toHaveBeenCalled();
  });
});
