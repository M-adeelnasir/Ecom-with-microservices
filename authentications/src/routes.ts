import { Response, Request, Express } from 'express';
import { createUserHandler } from './controller/user.controller';
import { validateRequest } from './middlewares/validateRequest';
import { createUserSchema } from './schemas/create-user.schema';

const baseURI = '/api/v1/users';

export default function (app: Express) {
  /**
   * @openapi
   * /api/v1/users/health-check:
   *   get:
   *    tags:
   *      - Health-Check
   *    description: Respond if the app is ruuning
   *    responses:
   *      200:
   *        description: App is running and up :)
   */
  app.get(baseURI + '/health-check', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post(
    baseURI + '/signup',
    validateRequest(createUserSchema),
    createUserHandler
  );
}
