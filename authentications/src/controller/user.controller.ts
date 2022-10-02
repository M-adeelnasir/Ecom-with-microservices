import { Response, Request } from 'express';
import { signupUser } from '../services/user.service';
import { omit } from 'lodash';
import { BadRequestError } from '../errors/badRequest.error';

export const createUserHandler = async (req: Request, res: Response) => {
  const user = await signupUser(req.body);

  if (!user) {
    throw new BadRequestError('Email is already reserved');
  }

  res.status(201).json({
    success: true,
    user: omit(user.toJSON(), 'password', 'confirmPassword'),
  });
};
