import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerAuthMiddleware from '../middlewares/swaggerAuthMiddleware';
import { Express } from 'express';

// ⚙️ Swagger options configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title:
        'API Node + Express + MongoDB + Mongoose + TypeScript + JWT + Swagger + Docker',
      version: '1.0.2',
      description: 'API Documentation',
    },
  },
  // 📚 API routes and controllers files
  apis: ['./src/routers/*.ts', './src/controllers/*.ts'],
};

// 📄 Generate swagger specification
const swaggerSpec: object = swaggerJsDoc(options);

// 🛠️ Setup Swagger UI
const setupSwagger = (app: Express) => {
  // 🔒 Authenticate Swagger UI access
  app.use('/api/v1/api-docs', swaggerAuthMiddleware);
  // 📄 Serve Swagger UI
  app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
