import dotenv from 'dotenv';
import express from 'express';
import router from './api';
import { logger } from './utils/logger';
import { connectMongoDB } from './datastore/mongoConnection';
import invariant from 'invariant';
import { requestLoggerMV } from './utils/requestLoggerMiddleware';


dotenv.config();
const port = process.env.PORT
const MONGO_URL = process.env.MONGO_URL


const main = async () => {
  invariant(MONGO_URL, `MongoDB URI is undefined`);
  invariant(port, `Port is undefined`);

  await connectMongoDB(MONGO_URL)
  const app = express();

  app.use(requestLoggerMV);

  app.use(router)
  app.listen(port, () => {
    logger.info('Server started on port', port);
  })
}

main().catch((error) => {
  logger.error(error);
  process.exit(1);
});
