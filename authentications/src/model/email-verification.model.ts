import mongoose from 'mongoose';
import { UserDocument } from './user.model';
import bcrypt from 'bcrypt';

export interface EmailVerificationDocument extends mongoose.Document {
  email: string;
  user: UserDocument['_id'];
  opt: string;
  expiresAt: Date;
  createdAt: Date;
  compareEmailOPT(enteredOpt: string): Promise<boolean>;
}

const emailVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  opt: {
    type: String,
    required: [true, 'email code is required'],
  },
  expiresAt: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
  },
});

emailVerificationSchema.pre('save', async function (done) {
  const email = this as EmailVerificationDocument;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(email.opt, salt);
  email.opt = hash;
  return done();
});

emailVerificationSchema.methods.compareEmailOPT = async function (
  enteredOpt: string
): Promise<boolean> {
  const email = this as EmailVerificationDocument;
  return await bcrypt.compare(enteredOpt, email.opt).catch((err: any) => false);
};

const EmailVerification = mongoose.model<EmailVerificationDocument>(
  'EmailVerification',
  emailVerificationSchema
);

export default EmailVerification;
