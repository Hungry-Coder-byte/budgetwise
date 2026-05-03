import { Income } from '@/backend/src/models/Income';
import { Expense } from '@/backend/src/models/Expense';
import { Category } from '@/backend/src/models/Categories';

export type DataPoint = {
  x: number;
  y: number;
};

export interface IncomeItem {
  id: string;
  amount: number;
  description?: string;
  date: Date;
}

export interface ExpenseItem {
  id: string;
  amount: number;
  description?: string;
  date: Date;
  category?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  description?: string;
}

export interface ReportData {
  year: number;
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
}

export type ChartData = {
  label: string;
  data: DataPoint[];
};

export type IncomeChartData = ChartData & {
  category: CategoryItem;
});

export type ExpenseChartData = ChartData & {
  category: CategoryItem;
};