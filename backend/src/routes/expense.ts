import express from 'express';
import { Expense } from '../src/models/Expense';
import { expenseController } from '../src/controllers/expenseController';
import { validateZodRoute } from 'zod-express-route';
import { z } from 'zod';

const router = express.Router();

// Create Expense
router.post('/', validateZodRoute(expenseZodSchema), expenseController.createExpense);

// Get All Expenses
router.get('/', expenseController.getAllExpenses);

// Get Expense by ID
router.get('/:id', expenseController.getExpenseById);

// Update Expense
router.patch('/:id', expenseController.updateExpense);

// Delete Expense
router.delete('/:id', expenseController.deleteExpense);

const expenseZodSchema = z({
  amount: z.number().positive(),
  description: z.string().optional(),
  date: z.date().refine((value) => value >= new Date(), 'Date must be in the future'),
  category: z.string().optional(),
});

export { router };