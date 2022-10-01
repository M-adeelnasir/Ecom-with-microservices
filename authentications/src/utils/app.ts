import express from 'express';
import Routes from '../routes';
import morgan from 'morgan';
import cors from 'cors';
import config from 'config';

const app = express();
const NODE_ENV = config.get<string>('node_env');
app.use(cors());

if (NODE_ENV) {
  app.use(morgan('dev'));
}

Routes(app);

export { app };
