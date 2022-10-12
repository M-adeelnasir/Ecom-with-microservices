import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { findUserByEmail } from '../services/user.service';
import { UnAuthorizedError } from '@shopproduct/common-module';

export const requireUserSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = await get(req.user, 'email');

  if (!email) {
    throw new UnAuthorizedError();
  }
  const user = await findUserByEmail(email);

  if (!user) {
    throw new UnAuthorizedError();
  }
  next();
};

export const requireAdminSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = await get(req.user, 'email');
  const user = await findUserByEmail(email);

  if (user!.role !== 'admin') {
    throw new UnAuthorizedError();
  }
  return next();
};
