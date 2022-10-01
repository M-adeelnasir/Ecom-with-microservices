import express from 'express';
import Routes from '../routes';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

Routes(app);

export { app };
