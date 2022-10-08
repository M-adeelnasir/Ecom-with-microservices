import { Response, Request } from 'express';
import { get } from 'lodash';
import EmailVerification from '../model/email-verification.model';
import { findUserByEmail } from '../services/user.service';
import sendEmail, {
  createEmailDocument,
} from '../services/email-verification.service';

export const sendEmailVerificationHandler = async (
  req: Request,
  res: Response
) => {
  const email = await get(req.user, 'email');
  const user = await findUserByEmail(email);
  const opt = `${Math.floor(10000 + Math.random() * 900000)}`;

  const response = await createEmailDocument({
    email,
    user: user._id,
    opt,
    createdAt: new Date(Date.now()),
    expiresAt: Date.now() + 360000,
  });

  const body = `<div>
  <h1>Verify Your Email</h1>
  <h4>your verification code is <b><u><h3>${opt}</h3></u></b></h4>
  <p style="color:red">Don't share your verfication anyone else</p>
  <br>
  <h2>Description</h2>
  <p>This code is from shoppy application for more information or facing any problem you can contact <u>adeelnasirkbw@gmail.com</u></p>
  </div>`;

  const subject = 'Email Verification';

  const result = await sendEmail(email, subject, body);

  if (!result) {
    return res.status(500).json({ msg: 'Try later', success: false });
  }

  res.status(200).json({
    msg: `Email send to ${response.email}`,
    success: true,
  });
};
