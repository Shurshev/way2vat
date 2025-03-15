import { Check, Expense, STATUS } from '../types';
import { getChecks } from './Checks';
import { AllowedCompanies } from '../const';

class ExpenseStatus{
  private checks: Check[];

  constructor(checks: Check[]) {
    this.checks = checks;
  }

  getStatus = async (expense: Omit<Expense, 'status'>): Promise<STATUS> => {
    for(const check of this.checks) {
      const data = await check.check(expense);
        if(!data.result && data.errorStatus) {
          return data.errorStatus
        }
    }

    return STATUS.COMPLETED
  }
}

export const ExpenseStatusSingleton = new ExpenseStatus(getChecks(AllowedCompanies))
