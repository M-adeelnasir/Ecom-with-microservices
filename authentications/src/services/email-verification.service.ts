import nodemailer from 'nodemailer';
import config from 'config';
import EmailVerification, {
  EmailVerificationDocument,
} from '../model/email-verification.model';
import { DocumentDefinition, FilterQuery } from 'mongoose';

const sendEmail = async (email: string, subject: string, HTMLbody: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      service: 'gmail',
      port: 587,
      secure: true,
      auth: {
        user: config.get<string>('email_address'),
        pass: config.get<string>('email_password'),
      },
    });

    await transporter.sendMail({
      from: config.get<string>('email_address'),
      to: email,
      subject: subject,
      html: HTMLbody,
    });
    return true;
  } catch (error) {
    console.log('email not sent');
    console.log(error);
    return false;
  }
};

export default sendEmail;

//create user email verification document
export const createEmailDocument = async (
  input: DocumentDefinition<Omit<EmailVerificationDocument, 'compareEmailOPT'>>
) => {
  const response = await EmailVerification.create(input);
  return response;
};
//find user email verification document
export const findEmailDocument = async (
  email: FilterQuery<EmailVerificationDocument['email']>
) => {
  const response = await EmailVerification.findOne({ email });
  return response;
};
export const deleteEmailDocument = async (
  email: FilterQuery<EmailVerificationDocument['email']>
) => {
  const response = await EmailVerification.deleteMany({ email });
  return response;
};
