import mongoose from 'mongoose';
import { logger } from '../utils/logger';

const DB_NAME = 'way2vat';

export const connectMongoDB = async (uri: string) => {
  try {
    await mongoose.connect(uri, { dbName: DB_NAME});
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

