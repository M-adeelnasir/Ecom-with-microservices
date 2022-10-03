import { Response, Request } from 'express';
import { findUserByEmail } from '../services/session.service';
import { BadRequestError } from '../errors/badRequest.error';
import { createSession } from '../services/session.service';

export const sessionCreateleHandler = async (req: Request, res: Response) => {
  //validate user if exits
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  //comparing passwords
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new BadRequestError('Invalid Credentials');
  }
  //create login session
  const session = await createSession(user._id, req.get('user-agent') || '');
  res.status(201).send(session);
};
