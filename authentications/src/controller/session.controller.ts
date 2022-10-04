import { Response, Request } from 'express';
import { findUserByEmail } from '../services/session.service';
import { BadRequestError } from '../errors/badRequest.error';
import { get } from 'lodash';
import {
  createSession,
  getAllSessionsOfUser,
} from '../services/session.service';
import { jwtSign, jwtRefreshTokenSign } from '../utils/jwt.utils';
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
  const accessToken = await jwtSign(
    user,
    session,
    config.get('jwt_access_token_expired')
  );

  //create jwt refresh token
  const refreshToken = await jwtRefreshTokenSign(
    session,
    config.get('jwt_access_token_expired')
  );

  //set the access token in cookie
  res.cookie('accessToken', accessToken, {
    maxAge: 300000, //5min
    httpOnly: true,
  });
  //set the refresh token in cookie
  res.cookie('refreshToken', refreshToken, {
    maxAge: 3.15e10, //5 year
    httpOnly: true,
  });

  res.status(201).send({ success: true, session, accessToken, refreshToken });
};

export const getAllSessionOfUserHanlder = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.body;
  console.log(userId);

  const sessions = await getAllSessionsOfUser(userId);
  res.send({ sessions });
};
