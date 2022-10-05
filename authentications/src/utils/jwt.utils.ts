import jwt from 'jsonwebtoken';
import config from 'config';
import { get } from 'lodash';
import Session from '../model/session.model';

const JWT_PRIVATE_KEY = config.get<string>('jwt_private_key');

//  jwt sign (token created)
export const jwtSign = async (
  payload: any,
  session: any,
  expiresIn: number | string
) => {
  console.log({ ...payload });

  const accessToken = jwt.sign(
    {
      email: payload.email,
      user: payload._id,
      verified: payload.verified,
      session: session._id,
    },
    JWT_PRIVATE_KEY,
    { expiresIn }
  );
  console.log('YES ==>', accessToken);
  return accessToken;
};

//jwt sign (refresh token created)
export const jwtRefreshTokenSign = (
  payload: any,
  expiresIn: number | string
) => {
  const { user, userAgent, valid, _id, createdAt, updatedAt } = payload;

  console.log(user, userAgent, _id);

  const token = jwt.sign(
    { user, userAgent, valid, _id, createdAt, updatedAt },
    JWT_PRIVATE_KEY,
    {
      expiresIn,
    }
  );

  return token;
};

//jwt decode/verify token
export const decodeToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);

    return { valid: true, decoded, expired: false };
  } catch (err) {
    if (err instanceof Error) {
      return {
        valid: false,
        decoded: null,
        expired: err.message === 'jwt expired',
      };
    }
  }
};
