import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';
import { BadRequestError } from '@shopproduct/common-module';

export const validateRequest =
  (Schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err: any) {
      throw new BadRequestError(err.message);
    }
  };
