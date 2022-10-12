import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
export interface UserDocument extends mongoose.Document {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword: string;
  verified: boolean;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  role?: string;
  countryCode?: string;
  phoneNumber?: string;
  googleId?: string;
  comparePassword(enteredPassword: string): Promise<Boolean>;
}

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
    },
    countryCode: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['admin', 'user'],
    },
    avatar: {
      type: String,
    },
    googleId: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

const User = mongoose.model<UserDocument>('User', userSchema);

export { User };
