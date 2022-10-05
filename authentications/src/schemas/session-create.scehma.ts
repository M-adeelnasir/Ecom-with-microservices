import { object, ref, string } from 'yup';
import {
  emailRegex,
  passwordRegex,
  passwordRegexError,
} from './create-user.schema';

export const sessionCreate = object({
  body: object({
    email: string()
      .required('Email is required')
      .matches(emailRegex, 'Invalid Email address'),
    password: string()
      .required('Password is required')
      .matches(passwordRegex, passwordRegexError),
  }),
});

export const userSessions = object({
  body: object({
    userId: string().required('User Id is required'),
  }),
});
export const sessionIdSchema = object({
  body: object({
    sessionId: string().required('Session id is required'),
  }),
});
