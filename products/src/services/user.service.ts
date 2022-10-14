import { FilterQuery, DocumentDefinition } from 'mongoose';
import { UserDocument, User } from '../model/user.model';
import { BadRequestError } from '@shopproduct/common-module';
import Session, { SessionDocument } from '../model/session.model';
import { decodeToken, jwtSign } from '../utils/jwt.utils';
import { get } from 'lodash';
import config from 'config';

export const signupUser = async (
  input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt'>>
) => {
  try {
    const user = await User.create(input);
    return user;
  } catch (err: any) {
    if (err.code === 11000) {
      throw new BadRequestError('Email is already reserved');
    }
    throw new Error();
  }
};

const getAUser = async (query: string) => {
  try {
    const user = await User.findOne({ _id: query }).lean();
    return user;
  } catch (err: any) {
    throw new Error();
  }
};

// find user with email
export const findUserByEmail = async (
  email: FilterQuery<UserDocument['email']>
) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError('Invalid Creadentials');
  }
  return user;
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
