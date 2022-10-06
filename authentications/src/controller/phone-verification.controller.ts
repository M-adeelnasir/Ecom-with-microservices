import { Response, Request } from 'express';
import { BadRequestError } from '../errors/badRequest.error';
import { sendOPT, verifyOPT } from '../services/phone-verification.service';
import { get } from 'lodash';
import { findUserByEmail } from '../services/user.service';

export const sendOPTHandler = async (req: Request, res: Response) => {
  const { countryCode, phoneNumber } = req.body;
  if (!countryCode || !phoneNumber) {
    throw new BadRequestError('country code and phone number is required');
  }

  const email = get(req.user, 'email');

  const user = await findUserByEmail(email);

  user.set({ countryCode, phoneNumber });

  await user.save();

  const response = await sendOPT(countryCode, phoneNumber);
  res.send(`OPT code is sent to ${response.to}`);
};

export const verifyOPTHandler = async (req: Request, res: Response) => {
  const { optCode } = req.body;
  const email = await get(req.user, 'email');

  if (!optCode) {
    throw new BadRequestError('OPT code in=s required');
  }

  const user = await findUserByEmail(email);
  if (!user) {
    throw new BadRequestError('User not found');
  }

  const { phoneNumber, countryCode } = user;

  const response = await verifyOPT(phoneNumber, countryCode, optCode);

  // console.log(resp);

  if (!response.valid) {
    throw new BadRequestError('Invalid OPT Code');
  }

  res.send('OPT verified successfull');
};
