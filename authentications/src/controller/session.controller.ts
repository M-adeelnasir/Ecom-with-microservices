import { Response, Request } from 'express';
import config from 'config';
import { findUserByEmail } from '../services/user.service';
import { BadRequestError } from '@shopproduct/common-module';
import { get } from 'lodash';
import {
  createSession,
  getAllSessionsOfUser,
  deleteASession,
} from '../services/session.service';
import { jwtSign, jwtRefreshTokenSign } from '../utils/jwt.utils';
import { sessionCreateEventHandler } from '../services/events.service';

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
    config.get('jwt_refresh_token_expired')
  );

  //publish the data to event bus
  await sessionCreateEventHandler(session._id, session.valid, session.user);

  //set the access token in cookie
  res.cookie('accessToken', accessToken, {
    maxAge: 300000, //5min
    httpOnly: true,
  });
  //set the refresh token in cookie
  res.cookie('refreshToken', refreshToken, {
    maxAge: 3.15e10, //1 year
    httpOnly: true,
  });

  res.status(201).send({ success: true, session, accessToken, refreshToken });
};

export const getAllSessionOfUserHanlder = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.body;

  const sessions = await getAllSessionsOfUser(userId);
  res.send({ sessions });
};

export const deleteUserSessionHandler = async (req: Request, res: Response) => {
  const { sessionId } = req.body;
  await deleteASession(sessionId);
  res.status(204).send('Session deleted successful');
};

export const logoutSessionHandler = async (req: Request, res: Response) => {
  try {
    const sessionId = await get(req.user, 'session');
    await deleteASession(sessionId);

    res
      .cookie('refreshToken', '')
      .cookie('accessToken', '')
      .setHeader('accessToken', '')
      .status(204)
      .send('logout');
  } catch (err) {
    res.status(500).json({
      msg: 'SERVER ERROR',
      success: false,
    });
  }
};
