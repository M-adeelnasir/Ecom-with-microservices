import { object, ref, string } from 'yup';
export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const passwordRegexError =
  'Password must have Minimum eight, at least one uppercase letter, one lowercase letter, one number and one special character';

let createUserSchema = object({
  body: object({
    firstName: string()
      .required('Name is required')
      .min(4, 'Name is too short'),
    lastName: string().notRequired().min(3, 'Name is too short'),
    email: string()
      .required('Email is required')
      .matches(emailRegex, 'Invalid Email address'),
    password: string()
      .required('Password is required')
      .matches(passwordRegex, passwordRegexError),
    confirmPassword: string()
      .required('Confirm the password')
      .matches(passwordRegex, passwordRegexError)
      .oneOf([ref('password'), null], 'Password must match'),
  }),
});

export { createUserSchema };
