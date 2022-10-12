import * as dotenv from 'dotenv';
dotenv.config();
export default {
  port: 3000,
  host: 'shopproduct.dev',
  node_env: 'development',
  jwt_private_key: process.env.JWT_PRIVATE_KEY,
  jwt_access_token_expired: '15m',
  jwt_refresh_token_expired: '1y',
  email_address: process.env.EMAIL_ADDRESS,
  email_password: process.env.EMAIL_PASSWORD,
  email_host: 'smtp.ethereal.email',
};
