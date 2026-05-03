import {StatusCodes } from 'StatusCodes';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Income } from '../models/Income';
import { ZodError } from 'zod';

export const createIncome = async (req: Request, res: Response) => {
  try {
    const { amount, description, date } = req.body;

    if (!amount || !date) {
      return res.status(StatusCodes.BadRequest).json({
        message: 'Amount and date are required',
      });
    }

    const income = new Income({
      amount,
      description,
      date,
    });

    await income.save();

    res.status(StatusCodes.Created).json({
      message: 'Income created successfully',
      income,
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
      message: 'Failed to create income',
    });
  }
};

export const getAllIncome = async (req: Request, res: Response) => {
  try {
    const income = await Income.find();
    res.status(StatusCodes.Ok).json({
      message: 'All incomes',
      income,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.InternalServerError).json({
      message: 'Failed to get incomes',
    });
  }
};

export const deleteIncome = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const income = await Income.findByIdAndDelete(id);

    if (!income) {
      return res.status(StatusCodes.NotFound).json({
        message: 'Income not found',
      });
    }

    res.status(StatusCodes.Ok).json({
      message: 'Income deleted successfully',
      income,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.InternalServerError).json({
      message: 'Failed to delete income',
    });
  }
};