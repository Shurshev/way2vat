import { Expense } from '../types';
import { ExpenseRepository } from '../repositories/ExpenseRepository';

class ExpenseController {
  private expenseRepository: ExpenseRepository;

  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  getExpense = async (id: string): Promise<Expense | null> => {
    return this.expenseRepository.findByExpenseId(id);
  };
}

export const expenseController = new ExpenseController();
