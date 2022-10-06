import { Response, Request } from 'express';
import { BadRequestError } from '../errors/badRequest.error';
import { sendVerificationOPTCode } from '../services/phone-verification.service';
import { get } from 'lodash';
import { findUserByEmail } from '../services/user.service';

export const sendVerificationCodeHanlder = async (
  req: Request,
  res: Response
) => {
  const { countryCode, phoneNumber } = req.body;
  if (!countryCode || !phoneNumber) {
    throw new BadRequestError('country code and phone number is required');
  }

  const email = get(req.user, 'email');

  const user = await findUserByEmail(email);

  user.set({ countryCode, phoneNumber });

  await user.save();

  const response = await sendVerificationOPTCode(countryCode, phoneNumber);
  res.send(response.to);
};

export const verifyVerficationCodeHanlder = async (
  req: Request,
  res: Response
) => {
  try {
    const { optCode } = req.body;
  } catch (err) {}
};
