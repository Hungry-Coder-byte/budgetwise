import React from 'react';
import { useApi } from '../../src/api/client';
import { Income } from '../../src/types/Income';
import { zodResolver } from 'zod-express-route';
import { z } from 'zod';

const CreateIncomeSchema = z({
  amount: z.number().positive(),
  description: z.string().optional(),
  date: z.date().refine((value) => value >= new Date(), 'Date must be in the future'),
}).resolveType<z.inferType<z.object({ amount: z.number().positive(), description: z.string().optional(), date: z.date().refine((value) => value >= new Date(), 'Date must be in the future') })>>;

const AddIncome: React.FC = () => {
  const { postIncome } = useApi();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await postIncome({
        amount: 1000,
        description: 'Salary',
        date: new Date(),
      } as Income);
      console.log('Income created:', response);
      setError(null);
    } catch (err) {
      console.error('Error creating income:', err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Income</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="mt-1 block w-full px-3 py-2 form-control border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            className="mt-1 block w-full px-3 py-2 form-control border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className="mt-1 block w-full px-3 py-2 form-control border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Add Income'}
        </button>
      </form>
    </div>
  );
};

export default AddIncome;