import { Response, Request } from 'express';
import { signupUser } from '../services/user.service';
import { BadRequestError } from '@shopproduct/common-module';
import { get, omit } from 'lodash';
import { findUserByEmail } from '../services/user.service';
import { userCreateEventHandler } from '../services/events.service';

export const createUserHandler = async (req: Request, res: Response) => {
  const user = await signupUser(req.body);

  await userCreateEventHandler(
    user._id,
    user.email,
    user.verified,
    //@ts-ignore
    user.googleId,
    user.role
  );

  res.status(201).json({
    success: true,
    user,
  });
};
export const currentUser = async (req: Request, res: Response) => {
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
