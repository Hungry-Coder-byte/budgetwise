import express from 'express';
import { Income } from '../src/models/Income';
import { incomeController } from '../src/controllers/incomeController';
import { validateZodRoute } from 'zod-express-route';
import { CreateIncomeSchema } from '../../frontend/src/pages/AddIncome';

const router = express.Router();

router.post('/', validateZodRoute(CreateIncomeSchema), incomeController.createIncome);
router.get('/', incomeController.getIncome);
router.delete('/:id', incomeController.deleteIncome);

export { router };