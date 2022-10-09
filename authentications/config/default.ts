import * as dotenv from 'dotenv';
dotenv.config();
export default {
  port: 3000,
  host: 'shopproduct.dev',
  node_env: 'development',
  jwt_private_key: process.env.JWT_PRIVATE_KEY,
  jwt_access_token_expired: '15m',
  jwt_refresh_token_expired: '1y',
  twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
  twilio_service_sid: process.env.TWILIO_SERVICE_SID,
  twilio_account_auth: process.env.TWILIO_ACCOUNT_AUTH,
  email_address: process.env.EMAIL_ADDRESS,
  email_password: process.env.EMAIL_PASSWORD,
  email_host: 'smtp.ethereal.email',
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
};
