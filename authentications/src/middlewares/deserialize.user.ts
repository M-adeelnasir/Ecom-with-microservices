import { Request, Response, NextFunction, Express } from 'express';
import { get } from 'lodash';
import { decodeToken, jwtSign } from '../utils/jwt.utils';
import { reIssueAccessToken } from './../services/session.service';

declare global {
  namespace Express {
    interface Request {
      user?: object;
    }
  }
}

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = await get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  );
  if (!accessToken) next();
  const { expired, decoded } = (await decodeToken(accessToken)) as any;
  if (decoded) {
    req.user = decoded;
    return next();
  }

  const refreshToken = await get(req, 'headers.x-refresh');

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);
    if (!newAccessToken) return next();

    res.setHeader('x-refresh', newAccessToken);

    console.log('---------ACCESS TOKEN IS REFRESHED----------');

    const { decoded } = (await decodeToken(newAccessToken)) as any;
    req.user = decoded;

    return next();
  }
  next();
};

export default deserializeUser;
