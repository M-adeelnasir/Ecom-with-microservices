import { Response, Request, NextFunction } from 'express';
import { BaseError } from '../errors/base.error';

export const errorResponse = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }

  res.status(500).send('something went wrong');
  console.log(err);
};
