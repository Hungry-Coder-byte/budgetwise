import express from 'express';
import { db } from './config/db';
import incomeRoutes from './routes/income';
import expenseRoutes from './routes/expense';
import categoriesRoutes from './routes/categories';
import errorHandler from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    await db.connect();
    res.status(200).json({ message: 'Server is running' });
  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).json({ error: 'Failed to connect to database' });
  }
});

app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/categories', categoriesRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});