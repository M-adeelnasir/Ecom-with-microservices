import { DocumentDefinition, FilterQuery } from 'mongoose';
import { UserDocument, User } from '../model/user.model';
import { BadRequestError } from '../errors/badRequest.error';

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
export const getAUser = async (query: string) => {
  try {
    const user = await User.findOne({ _id: query })
      .lean()
      .select('-password -confirmPassword');
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
