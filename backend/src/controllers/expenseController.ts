import {StatusCodes } from 'StatusCodes';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Expense } from '../models/Expense';
import { ZodError } from 'zod';

const expenseZodSchema = z({
  amount: z.number().positive(),
  description: z.string().optional(),
  categoryId: z.number().positive().optional(),
  date: z.string().optional(),
});

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { amount, description, categoryId, date } = expenseZodSchema.parse(req.body);

    const expense = new Expense({
      amount,
      description,
      categoryId,
      date,
    });

    await expense.save();

    res.status(StatusCodes.Created).json({
      message: 'Expense created successfully',
      expense,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return res.status(StatusCodes.BadRequest).json({
        message: 'Validation error',
        errors: error.errors,
      });
    }
    res.status(StatusCodes.InternalServerError).json({
      message: 'Failed to create expense',
    });
  }
};

export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find();
    res.status(StatusCodes.Ok).json({ expenses });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.InternalServerError).json({
      message: 'Failed to get expenses',
    });
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(StatusCodes.NotFound).json({
        message: 'Expense not found',
      });
    }

    res.status(StatusCodes.Ok).json({ expense });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.InternalServerError).json({
      message: 'Failed to get expense',
    });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { amount, description, categoryId, date } = expenseZodSchema.parse(req.body);

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { amount, description, categoryId, date },
      {
        new: true,
      }
    );

    if (!updatedExpense) {
      return res.status(StatusCodes.NotFound).json({
        message: 'Expense not found',
      });
    }

    res.status(StatusCodes.Ok).json({ updatedExpense });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.InternalServerError).json({
      message: 'Failed to update expense',
    });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(StatusCodes.NotFound).json({
        message: 'Expense not found',
      });
    }

    res.status(StatusCodes.NoContent).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.InternalServerError).json({
      message: 'Failed to delete expense',
    });
  }
};