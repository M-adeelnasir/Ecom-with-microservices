import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { getAUser } from '../services/user.service';

export const requireUserSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await get(req, 'user');
  if (!user) {
    return res.sendStatus(403);
  }
  next();
};

export const requireAdminSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = await get(req.user, 'user');
  const user = await getAUser(userId);

  if (user!.role !== 'admin') {
    return res.sendStatus(403);
  }
  return next();
};
