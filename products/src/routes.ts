import { Response, Request, Express } from 'express';
import { validateRequest } from '@shopproduct/common-module';
import deserializeUser from './middlewares/deserialize.user';
import {
  createCategoryHandler,
  deleteProductHandler,
  findProductHandler,
  getAllProductHandler,
  updateProductHandler,
} from './controller/category.controller';

const baseURI = '/api/v1/products';

export default function (app: Express) {
  app.get(baseURI + '/health-check', async (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post(baseURI + '/create', createCategoryHandler);
}
