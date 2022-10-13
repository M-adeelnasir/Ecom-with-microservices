import {
  UserCreatedPublisher,
  SessionCreatedPublisher,
} from '../publisher/user.publisher';
import natsWrapper from '../utils/natsWrapper.nats';

//session event handler
export const sessionCreateEventHandler = async (
  _id: string,
  valid: boolean,
  user: string
) => {
  try {
    await new SessionCreatedPublisher(natsWrapper.client).publish({
      _id,
      valid,
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

//user create handle
export const userCreateEventHandler = async (
  _id: string,
  email: string,
  verified: boolean,
  googleId: string,
  role: string
) => {
  try {
    await new UserCreatedPublisher(natsWrapper.client).publish({
      _id,
      email,
      verified,
      googleId,
      role,
    });
  } catch (err) {
    console.log(err);
  }
};
