import { BadRequestError } from '../errors/badRequest.error';
import { Twilio } from 'twilio';
import config from 'config';
const TWILIO_ACCOUNT_AUTH = config.get<string>('twilio_account_auth');
const TWILIO_SERVICE_SID = config.get<string>('twilio_service_sid');
const TWILIO_ACCOUNT_SID = config.get<string>('twilio_account_sid');

const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_ACCOUNT_AUTH, {
  lazyLoading: true,
});

export const sendVerificationOPTCode = async (
  coutryCode: string,
  phoneNumber: string
) => {
  try {
    const response = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+${coutryCode}${phoneNumber}`,
        channel: 'sms',
      });

    return response;
  } catch (err: any) {
    throw new BadRequestError(err?.message || 'Something wrong in sending opt');
  }
};
