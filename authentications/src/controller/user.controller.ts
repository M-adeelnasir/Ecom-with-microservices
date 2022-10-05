import { Response, Request } from 'express';
import { signupUser } from '../services/user.service';
import { BadRequestError } from '../errors/badRequest.error';
import { get, omit } from 'lodash';

export const createUserHandler = async (req: Request, res: Response) => {
  const user = await signupUser(req.body);
  res.status(201).json({
    success: true,
    user,
  });
};
export const curretUser = async (req: Request, res: Response) => {
  const user = get(req, 'user');
  if (!user) {
    throw new BadRequestError('Sign in required');
  }

  res.json({
    user: omit(user, 'iat', 'exp'),
  });
};
