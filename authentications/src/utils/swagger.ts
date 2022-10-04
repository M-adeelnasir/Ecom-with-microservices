import { Request, Express, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import { log } from './logger';
import config from 'config';

const HOST = config.get<string>('host');

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Authentication Swagger API Documentation',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
        cookieAuth: [],
      },
    ],
  },
  apis: ['./src/routes.ts', './src/schema/*.ts'],
};

const openapiSpecification = swaggerJsDoc(options);

function swaggerDocs(app: Express) {
  app.use(
    '/api/v1/users/auth-api-docs',
    swaggerUi.serve,
    swaggerUi.setup(openapiSpecification)
  );

  app.get('/api/v1/users/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(openapiSpecification);
  });
  log.info(
    `Authentication API Docs are available at " http://${HOST}/api/v1/users/auth-api-docs "`
  );
}

export default swaggerDocs;
