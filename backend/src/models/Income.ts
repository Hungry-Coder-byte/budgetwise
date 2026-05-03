import mongoose, { Schema, Document } from 'mongoose';

export interface Income extends Document {
  amount: number;
  description?: string;
  date: Date;
}

const incomeSchema: Schema = {
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, required: true },
};

export default mongoose.model<Income>('Income', incomeSchema);