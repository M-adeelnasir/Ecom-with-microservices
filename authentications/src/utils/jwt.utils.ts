import jwt from 'jsonwebtoken';
import config from 'config';

const JWT_PRIVATE_KEY = config.get<string>('jwt_private_key');

//  jwt sign (token created)
export const jwtSign = async (
  payload: any,
  session: any,
  expiresIn: number | string
) => {
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
  return accessToken;
};

//jwt sign (refresh token created)
export const jwtRefreshTokenSign = (
  payload: any,
  expiresIn: number | string
) => {
  const { user, userAgent, valid, _id, createdAt, updatedAt } = payload;
  const token = jwt.sign(
    { user, userAgent, valid, _id, createdAt, updatedAt },
    JWT_PRIVATE_KEY,
    {
      expiresIn,
    }
  );

  return token;
};
