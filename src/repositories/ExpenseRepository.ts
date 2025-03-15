import { Expense } from '../types';
import { ExpensesModel } from '../datastore/ExpenceModel';
import { logger } from '../utils/logger';

export class ExpenseRepository {
  async saveMany(expenses: Expense[]): Promise<void> {
    const processingResult = await ExpensesModel.insertMany(expenses);
    //TODO: improve error handling
    processingResult.forEach(result => {
        if(result?.errors?.errors?.length) {
          logger.error(result.errors.message);
        }
    })
  }

  async findByExpenseId(id: string): Promise<Expense | null> {
    if (!id) return null;
    const data = await ExpensesModel.findOne({expenseId: id});
    return data ? data.toObject() : null;
  }
}