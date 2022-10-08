import { string, object } from 'yup';

export const phoneOPTScehma = object({
  body: object({
    countryCode: string().required('country code is required'),
    phoneNumber: string().required('Phone number is required'),
  }),
});
export const verifyOPTSchema = object({
  body: object({
    opt: string().required('opt code is required'),
  }),
});
