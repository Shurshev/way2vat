export type Expense = {
    expenseId: string,
    // TODO: there should be file ID or any other id for this processing session
    // fileId: string,
    companyName: string,
    reportId: number,
    amount: number,
    status: STATUS,
    img?: string
}

export type RowExpense = Omit<Expense, 'status'>

export enum STATUS {
    EXCLUDED = 'excluded',
    FAILED = 'failed',
    COMPLETED = 'completed',
}

type CheckResult = { errorStatus?: STATUS, result: boolean }

export interface Check {
    check(expense: Omit<Expense, 'status'>): Promise<CheckResult> | CheckResult ;
}

export type Summary = {
    statuses: {
        [STATUS.EXCLUDED]: {count: number};
        [STATUS.FAILED]: {count: number};
        [STATUS.COMPLETED]: {count: number};
    }
    reportsCount: number
}