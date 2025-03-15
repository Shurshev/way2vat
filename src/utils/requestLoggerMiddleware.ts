import { v4 as uuidv4 } from 'uuid';
import { logger } from './logger';
import type { NextFunction, Request , Response} from 'express';

// TODO: simple logging
export const requestLoggerMV = (req: Request, res: Response, next: NextFunction) => {
  setTimeout(() => {
    const logEntry = {
      reqId: uuidv4(),
      method: req.method,
      url: req.originalUrl,
      timestamp: new Date().toISOString()
    };
    logger.info('req:' + JSON.stringify(logEntry));
    const startTime = Date.now();
    res.on('finish', () => {
      logger.info(`resp: reqId: ${logEntry.reqId}; duration: ${Date.now() - startTime}ms`);
    });
  }, 0)
  next();
}