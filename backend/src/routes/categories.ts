import express from 'express';
import { Category } from '../src/models/Categories';
import { categoriesController } from '../src/controllers/categoriesController';
import { validateZodRoute } from 'zod-express-route';
import { z } from 'zod';

const router = express.Router();

// Create Category
router.post('/', validateZodRoute(CategorySchema), categoriesController.createCategory);

// Get All Categories
router.get('/', categoriesController.getAllCategories);

// Get Category by ID
router.get('/:id', categoriesController.getCategoryById);

// Update Category
router.patch('/:id', categoriesController.updateCategory);

// Delete Category
router.delete('/:id', categoriesController.deleteCategory);

const CategorySchema = z({
  name: z.string().min(3, 'Category name must be at least 3 characters long'),
});