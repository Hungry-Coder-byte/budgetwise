import {StatusCodes } from 'StatusCodes';
import { NextFunction } from 'express';
import { Category } from '../src/models/Categories';
import { CategoryInput } from '../src/types/CategoryInput';
import { ZodError } from 'zod';

export const categoriesController = {
  async createCategory(
    req: Express.Request,
    res: Express.Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, description } = CategoryInput.parse(req.body);
      const newCategory = new Category({ name, description });
      await newCategory.save();
      res.status(StatusCodes.CREATED).json(newCategory);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error.errors);
        res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Validation Error',
          errors: error.errors,
        });
      } else {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'Internal Server Error',
        });
      }
    }
  },

  async getAllCategories(
    req: Express.Request,
    res: Express.Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await Category.find();
      res.status(StatusCodes.OK).json(categories);
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error',
      });
    }
  },

  async getCategoryById(
    req: Express.Request,
    res: Express.Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Category not found',
        });
      }
      res.status(StatusCodes.OK).json(category);
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error',
      });
    }
  },

  async updateCategory(
    req: Express.Request,
    res: Express.Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { name, description } = CategoryInput.parse(req.body);
      const category = await Category.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }
      );
      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Category not found',
        });
      }
      res.status(StatusCodes.OK).json(category);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error.errors);
        res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Validation Error',
          errors: error.errors,
        });
      } else {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'Internal Server Error',
        });
      }
    }
  },

  async deleteCategory(
    req: Express.Request,
    res: Express.Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Category not found',
        });
      }
      res.status(StatusCodes.OK).json({ message: 'Category deleted' });
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error',
      });
    }
  },
};