import mongoose, { FilterQuery, QueryOptions } from 'mongoose';
import { UserDocument } from '../model/user.model';
import { User } from '../model/user.model';
import { BadRequestError } from '../errors/badRequest.error';
import Session from '../model/session.model';

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
