import React from 'react';
import { useApi } from '../../src/api/client';
import { Expense } from '../../src/types/Expense';
import { zodResolver } from 'zod-express-route';
import { z } from 'zod';

interface AddExpenseFormValues {
  amount: number;
  description: string;
  date: Date;
  category: string;
}

const CreateExpenseSchema = z({
  amount: z.number().positive(),
  description: z.string().optional(),
  date: z.date().refine((value) => value >= new Date(), 'Date must be in the future'),
  category: z.string().optional(),
}).resolveType<z.inferType<z.object({ amount: z.number().positive(), description: z.string().optional(), date: z.date().refine((value) => value >= new Date(), 'Date must be in the future'), category: z.string().optional() })>>;

const AddExpense: React.FC = () => {
  const { postExpense } = useApi();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (values: AddExpenseFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const response = await postExpense({
        ...values,
      });

      if (response.error) {
        setError(response.error);
      } else {
        // Handle success - e.g., navigate to the dashboard
        console.log('Expense created successfully:', response.data);
        // You might want to redirect here
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-4 py-6 px-8 rounded-lg shadow-md overflow-hidden">
      <h2 className="text-2xl font-semibold text-gray-900">Add Expense</h2>
      <form onSubmit={(e) => handleSubmit(e.currentTarget.reportData)}>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="mt-1 block w-full px-3 py-2 form-control border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
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
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            className="mt-1 block w-full px-3 py-2 form-control border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;