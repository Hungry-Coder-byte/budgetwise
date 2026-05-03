import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import { Bar, Line } from 'react-chartjs-2';
import { useApi } from '../../src/api/client';
import { Expense } from '../../src/types/Expense';

interface ReportsProps {
  expenses: Expense[];
}

const Reports: React.FC<ReportsProps> = ({ expenses }) => {
  const { getExpenses } = useApi();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch expenses');
        console.error('Error fetching expenses:', error);
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const chartData = {
    labels: expenses.map((expense) => expense.category),
    datasets: [
      {
        label: 'Total Expenses',
        data: expenses.map((expense) => expense.amount),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Category',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
        },
      },
    },
  };

  if (loading) {
    return <div>Loading expenses...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="report-container">
      <h2>Spending Analysis</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default Reports;