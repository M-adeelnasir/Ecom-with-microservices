import express from 'express';
import Routes from '../routes';
import morgan from 'morgan';
import 'express-async-errors';
import cors from 'cors';
import config from 'config';
import { errorResponse } from '@shopproduct/common-module';
import * as dotenv from 'dotenv';
dotenv.config();
import '../services/passport-oauth.service';
import cookieSession from 'cookie-session';

const app = express();

app.use(cors());
app.use(express.json());

const NODE_ENV = config.get<string>('node_env');
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['498493'],
  })
);

Routes(app);
app.use(errorResponse);
// app.all('*', async (req, res) => {
//   res.status(404).send('Invalid Request');
// });

export { app };
