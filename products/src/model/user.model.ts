import mongoose from 'mongoose';
export interface UserDocument extends mongoose.Document {
  email: string;
  verified: boolean;
  role?: string;
  googleId?: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email Is aleardy exist, try witn another one'],
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
