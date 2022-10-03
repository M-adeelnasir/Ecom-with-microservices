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
