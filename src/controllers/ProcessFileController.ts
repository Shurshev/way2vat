import { ExpenseRepository } from '../repositories/ExpenseRepository';
import { parse, Parser } from 'csv-parse';
import { logger } from '../utils/logger';
import { getColumnNames } from '../FileProcessor/mapColumns';
import { FileProcessor } from '../FileProcessor';

import type { Request } from 'express';

class ProcessFileController {
  private fileProcessor: FileProcessor;

  constructor(expenseRepository: ExpenseRepository) {
    this.fileProcessor = new FileProcessor(expenseRepository);
  }

  processRequest = async (req: Request) => {
    logger.info('Processing file...');
    const parser = this.getParser(req);
    await this.fileProcessor.process(parser);
    logger.info('...done');
  };

  private getParser = (request: Request): Parser => {
    return request.pipe(
      parse({
        relax_quotes: true,
        delimiter: ',',
        relax_column_count: true,
        columns: getColumnNames,
      }),
    );
  };
}

export const processFileController = new ProcessFileController(new ExpenseRepository());
