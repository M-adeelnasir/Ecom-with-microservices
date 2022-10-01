import mongoose from 'mongoose';
import { emailRegex } from '../schemas/create-user.schema';
export interface UserDocument extends mongoose.Document {}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Name is required'],
      min: [4, 'Name is too short'],
      trim: true,
    },
    lastName: {
      type: String,
      min: [4, 'Name is too short'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email Is aleardy exist, try witn another one'],
      match: [emailRegex, 'Invalid Email Address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      min: [8, 'password must conatain atleast 8 charcters'],
      trim: true,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Password is required'],
      min: [8, 'password must conatain atleast 8 charcters'],
      trim: true,
    },
    verifed: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
