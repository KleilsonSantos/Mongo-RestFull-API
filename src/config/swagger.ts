import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerAuthMiddleware from "../middlewares/swaggerAuthMiddleware";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Node + Express + MongoDB",
      version: "1.0.1",
      description: "Documentação da API",
    },
  },
  apis: ["./src/routers/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app: Express) => {
  app.use("/api/v1/api-docs", swaggerAuthMiddleware); // 🔒 Authenticate Middleware
  app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // 📄 Swagger UI
};

export default setupSwagger;
