import mongoose, { Schema, Document } from 'mongoose';

export interface Expense extends Document {
  amount: number;
  description?: string;
  date: Date;
  category?: string;
}

const expenseSchema: Schema = {
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  category: { type: String },
};

export default mongoose.model<Expense>('Expense', expenseSchema);