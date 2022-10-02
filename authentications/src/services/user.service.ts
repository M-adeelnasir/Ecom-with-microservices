import { DocumentDefinition } from 'mongoose';
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
