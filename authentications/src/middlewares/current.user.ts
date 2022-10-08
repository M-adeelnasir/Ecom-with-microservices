import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { findUserByEmail } from '../services/user.service';

export const requireUserSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = await get(req.user, 'email');

  if (!email) {
    return res.status(401);
  }
  const user = await findUserByEmail(email);

  if (!user) {
    return res.sendStatus(401).json({ msg: 'Please log in first' });
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
    return res.sendStatus(401).json({ msg: "You don't have admin rights" });
  }
  return next();
};
