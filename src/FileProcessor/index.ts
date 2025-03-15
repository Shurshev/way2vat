import { ExpenseRepository } from '../repositories/ExpenseRepository';
import { RowExpense, Expense } from '../types';
import { ExpenseStatusSingleton } from './ExpenseStatus';
import { Parser } from 'csv-parse';
import { logger } from '../utils/logger';

export class FileProcessor {
  private expenseRepository: ExpenseRepository;
  private batchSize: number = 50;

  constructor(expenseRepository: ExpenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async process(parser: Parser): Promise<void> {
    logger.info('File processing started...');
    let batch: RowExpense[] = [];
    let batchCount = 0;
    let totalRecords = 0;

    for await (const record of parser) {
      batch.push(record);
      totalRecords++;

      if (batch.length >= this.batchSize) {
        await this.processBatch(batch);
        batchCount++;
        logger.info(`Processed batch ${batchCount}, total records processed: ${totalRecords}`);
        batch = [];
      }
    }

    if (batch.length > 0) {
      await this.processBatch(batch);
      batchCount++;
      logger.info(`Processed batch ${batchCount} (final batch), total records processed: ${totalRecords}`);
    }

    logger.info(`File processing completed. Total batches: ${batchCount}, Total records: ${totalRecords}`);
  }

  private async processBatch(expenses: RowExpense[]): Promise<void> {
    const processedExpenses = await Promise.all(expenses.map(this.getProcessedExpense));
    await this.expenseRepository.saveMany(processedExpenses);
  }

  private getProcessedExpense = async (expense: RowExpense): Promise<Expense> => {
    const status = await ExpenseStatusSingleton.getStatus(expense);
    return { ...expense, status };
  };
}
