import { BadRequestError } from '@shopproduct/common-module';
import { Twilio } from 'twilio';
import config from 'config';

const TWILIO_ACCOUNT_AUTH = config.get<string>('twilio_account_auth');
const TWILIO_SERVICE_SID = config.get<string>('twilio_service_sid');
const TWILIO_ACCOUNT_SID = config.get<string>('twilio_account_sid');

const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_ACCOUNT_AUTH, {
  lazyLoading: true,
});

export const sendOPT = async (countryCode: string, phoneNumber: string) => {
  try {
    const response = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+${countryCode}${phoneNumber}`,
        channel: 'sms',
      });

    return response;
  } catch (err: any) {
    throw new BadRequestError(err?.message || 'Something wrong in sending opt');
  }
};

export const verifyOPT = async (
  phoneNumber: any,
  countryCode: any,
  optCode: string
) => {
  try {
    const response = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+${countryCode}${phoneNumber}`,
        code: optCode,
      });

    return response;
  } catch (err: any) {
    throw new BadRequestError(err?.message || 'Invalid or expired OPT');
  }
};
