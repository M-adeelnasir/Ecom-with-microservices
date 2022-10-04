import jwt from 'jsonwebtoken';
import config from 'config';

const JWT_PRIVATE_KEY = config.get<string>('jwt_private_key');

export const jwtSign = async (
  payload: any,
  session: any,
  expiresIn: number | string
) => {
  console.log('Payload ===>', payload);

  console.log({
    email: payload.email,
    user: payload._id,
    verified: payload.verified,
    session: session._id,
  });

  try {
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
  } catch (err) {
    console.log(err);
  }
};
