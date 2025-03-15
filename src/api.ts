import {NextFunction, Router, Response, Request} from "express";
import {logger} from "./utils/logger";
import { summaryController } from './controllers/SummaryController';
import { expenseController } from './controllers/ExpenseController';
import { processFileController } from './controllers/ProcessFileController';

const router = Router();
router.post('/processFile', async (req, res) => {
  req.setTimeout(0); // remove timeout
  await processFileController.processRequest(req).catch(err => {
      logger.error('Process request failed.', err);
    })
    res.status(200).send();
});

router.get('/summary', async (req, res) => {
  const summary = await summaryController.getSummary()
  res.json({summary}).status(200).send();
});

router.get('/expense/:id', async (req, res) => {
  const expense = await expenseController.getExpense(req.params.id);
  res.json({expense}).status(200).send();
});

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
): void => {
    logger.error('API error:', err);
    res.status(500).json({ message: 'Internal server error' });
};

router.use(errorHandler)

export default router;