import mongoose from 'mongoose';
import { log } from './logger';

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO URI must be defined');
  }
  const conn = await mongoose.connect(process.env.MONGO_URI);

  log.info(`Authentication DB is conneted with ${conn.connection.host}`);
};

export default connectDB;
