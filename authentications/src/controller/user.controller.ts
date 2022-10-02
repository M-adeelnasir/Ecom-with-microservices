import { Response, Request } from 'express';
import { signupUser } from '../services/user.service';
import { omit } from 'lodash';
import { NotFoundError } from '../errors/NotFound.error';

export const createUserHandler = async (req: Request, res: Response) => {
  const user = await signupUser(req.body);

  if (!user) {
    throw new NotFoundError();
  }

  res.status(201).json({
    success: true,
    user: omit(user.toJSON(), 'password', 'confirmPassword'),
  });
};
