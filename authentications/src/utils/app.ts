import express from 'express';
import Routes from '../routes';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(cors());

Routes(app);

export { app };
