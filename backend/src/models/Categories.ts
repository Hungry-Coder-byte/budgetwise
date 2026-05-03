import mongoose, { Schema, Document } from 'mongoose';

export interface Category extends Document {
  name: string;
  description?: string;
}

const categorySchema: Schema = {
  name: { type: String, required: true },
  description: { type: String },
};

export default mongoose.model<Category>('Category', categorySchema);