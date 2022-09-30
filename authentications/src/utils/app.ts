import express from 'express';
import Routes from '../routes';

const app = express();

Routes(app);

export { app };
