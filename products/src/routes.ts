import { Response, Request, Express } from 'express';
import { validateRequest } from '@shopproduct/common-module';
import deserializeUser from './middlewares/deserialize.user';

const baseURI = '/api/v1/products';

export default function (app: Express) {
  app.get(baseURI + '/health-check', async (req: Request, res: Response) => {
    res.sendStatus(200);
  });
}
