import { Response, Request } from 'express';
import { findUserByEmail } from '../services/session.service';
import { BadRequestError } from '../errors/badRequest.error';
import { createSession } from '../services/session.service';
import { jwtSign } from '../utils/jwt.utils';
import config from 'config';

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

  //create user jwt access token
  const token = await jwtSign(
    user,
    session,
    config.get('jwt_access_token_expired')
  );

  res.status(201).cookie('accessToken', token, { httpOnly: true }).json({
    session,
    token,
  });
};
