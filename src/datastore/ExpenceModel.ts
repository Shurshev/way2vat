//TODO: I prefer to use my own DTO and Models instead of mongoose, but for home task it is ok
import { Schema, model, Document } from 'mongoose';
import { Expense, STATUS } from '../types';

interface IExpenseModel extends Document, Expense {}

const ExpenseSchema = new Schema<IExpenseModel>(
  {
    expenseId: { type: String, required: true, index: true },
    reportId: { type: Number, required: true, index: true },
    status: {
      type: String,
      required: true,
      enum: Object.values(STATUS),
      index: true,
    },
    companyName: { type: String, required: true, },
    amount: { type: Number, required: true },
    img: { type: String, },
  },
  {
    timestamps: true,
  }
);

export const ExpensesModel = model<IExpenseModel>('expense', ExpenseSchema);
