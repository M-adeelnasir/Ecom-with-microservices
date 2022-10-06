import { Response, Request } from 'express';
import { signupUser } from '../services/user.service';
import { BadRequestError } from '../errors/badRequest.error';
import { get, omit } from 'lodash';
import { findUserByEmail } from '../services/user.service';

export const createUserHandler = async (req: Request, res: Response) => {
  const user = await signupUser(req.body);
  res.status(201).json({
    success: true,
    user,
  });
};
export const curretUser = async (req: Request, res: Response) => {
  const email = get(req.user, 'email');

  if (!email) {
    throw new BadRequestError('Sign in required');
  }

  const user = await findUserByEmail(email);
  if (!user) {
    throw new BadRequestError('User not found or eamil is invalid');
  }
  res.send(user);
};
