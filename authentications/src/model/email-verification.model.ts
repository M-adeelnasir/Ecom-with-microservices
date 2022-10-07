import mongoose from 'mongoose';

export interface EmailVerificationDocument extends mongoose.Document {}

const emailVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  emailCode: {
    type: Number,
    required: [true, 'email code is required'],
  },
  expiresAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
});

const EmailVerification = mongoose.model<EmailVerificationDocument>(
  'EmailVerification',
  emailVerificationSchema
);

export default EmailVerification;
