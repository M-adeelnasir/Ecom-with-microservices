import { FilterQuery } from 'mongoose';
import Session, { SessionDocument } from '../model/session.model';
import { decodeToken, jwtSign } from '../utils/jwt.utils';
import { get } from 'lodash';
import config from 'config';
import { getAUser } from './user.service';

//create user session
export const createSession = async (userId: string, userAgent: string) => {
  const session = await Session.create({ user: userId, userAgent });
  return session;
};

// get all session
export const getAllSessionsOfUser = async (
  userId: FilterQuery<SessionDocument['user']>
) => {
  const sessions = await Session.find({ user: userId, valid: true });
  return sessions;
};

//delete login session
export const deleteASession = async (
  sessionId: FilterQuery<SessionDocument>
) => {
  return await Session.findByIdAndDelete({ _id: sessionId });
};

//re Issue access token to user
export const reIssueAccessToken = async (token: string) => {
  const { decoded } = (await decodeToken(token)) as any;

  const sessionId = await get(decoded, '_id');

  if (!decoded || !sessionId) return false;
  const session = await Session.findById({ _id: sessionId });

  if (!session || !session!.valid) return false;

  const userId = session.user.toString();

  const user = await getAUser(userId);

  if (!user) return false;

  const newAssignedAccessToken = await jwtSign(
    user,
    session,
    config.get('jwt_access_token_expired')
  );

  return newAssignedAccessToken;
};
