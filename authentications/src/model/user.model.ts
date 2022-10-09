import mongoose from 'mongoose';
import { emailRegex } from '../schemas/create-user.schema';
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
      match: [emailRegex, 'Invalid Email Address'],
    },
    password: {
      type: String,
      min: [8, 'password must conatain atleast 8 charcters'],
      trim: true,
    },
    confirmPassword: {
      type: String,
      min: [8, 'password must conatain atleast 8 charcters'],
      trim: true,
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
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.password;
        delete ret.confirmPassword;
      },
    },
  }
);

userSchema.pre('save', async function (next) {
  const user = this as UserDocument;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;
  user.confirmPassword = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<Boolean> {
  const user = this as UserDocument;
  return bcrypt
    .compare(enteredPassword, user.password)
    .catch((err: any) => false);
};

const User = mongoose.model<UserDocument>('User', userSchema);

export { User };
