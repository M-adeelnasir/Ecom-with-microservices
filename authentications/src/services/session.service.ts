import mongoose, { FilterQuery, QueryOptions } from 'mongoose';
import { UserDocument } from '../model/user.model';
import { User } from '../model/user.model';
import { BadRequestError } from '../errors/badRequest.error';
import Session, { SessionDocument } from '../model/session.model';

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

//create user session
export const createSession = async (userId: string, userAgent: string) => {
  const session = await Session.create({ user: userId, userAgent });
  return session;
};

export const getAllSessionsOfUser = async (
  userId: FilterQuery<SessionDocument['user']>
) => {
  const sessions = await Session.find({ user: userId, valid: true });
  return sessions;
};

export const deleteASession = async (
  sessionId: FilterQuery<SessionDocument>
) => {
  return await Session.findByIdAndDelete({ _id: sessionId });
};
