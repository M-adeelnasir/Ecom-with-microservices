import { DocumentDefinition } from 'mongoose';
import { UserDocument, User } from '../model/user.model';

export const signupUser = async (
  input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt'>>
) => {
  try {
    const user = await User.create(input);
    return user;
  } catch (err: any) {
    if (err.code === 11000) {
      //   console.log(err.keyValue.email);
      //   throw new Error(`${err.keyValue.email} is already exits`);
      return false;
    }
    throw new Error();
  }
};
